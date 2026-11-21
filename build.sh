#!/usr/bin/bash
set -e

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

PACKAGE_NAME="achats"
VERSION="1.2.1"
RELEASE="1"
RPMBUILD_DIR="${SCRIPT_DIR}/rpmbuild"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Compilation des RPMs pour ${PACKAGE_NAME} v${VERSION}${NC}"
echo -e "${BLUE}========================================${NC}"

# 1. Nettoyage du répertoire de build précédent
echo -e "\n${YELLOW}[1/4] Nettoyage de l'environnement de build...${NC}"
rm -rf "${RPMBUILD_DIR}"
mkdir -p "${RPMBUILD_DIR}"/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}

# 2. Création de l'archive tarball des sources
echo -e "${YELLOW}[2/4] Création de l'archive tar.gz des sources...${NC}"
TARBALL="${RPMBUILD_DIR}/SOURCES/${PACKAGE_NAME}-${VERSION}.tar.gz"
tar --exclude='.git' \
    --exclude='rpmbuild' \
    --exclude='*.rpm' \
    --exclude='build.sh' \
    --transform "s,^\.,${PACKAGE_NAME}-${VERSION}," \
    -czf "${TARBALL}" .

echo "  -> Archive créée : ${TARBALL}"

# 3. Préparation du fichier spec
echo -e "${YELLOW}[3/4] Préparation du fichier spec...${NC}"
cp "${PACKAGE_NAME}.spec" "${RPMBUILD_DIR}/SPECS/"

# 4. Compilation avec rpmbuild (binaire .rpm et source .src.rpm)
echo -e "${YELLOW}[4/4] Exécution de rpmbuild (-ba)...${NC}"
rpmbuild --define "_topdir ${RPMBUILD_DIR}" \
         --define "_tmppath /tmp" \
         -ba "${RPMBUILD_DIR}/SPECS/${PACKAGE_NAME}.spec"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Compilation terminée avec succès !${NC}"
echo -e "${GREEN}========================================${NC}"

RPM_FILE=$(find "${RPMBUILD_DIR}/RPMS" -type f -name "*.rpm" 2>/dev/null | head -n 1)
SRPM_FILE=$(find "${RPMBUILD_DIR}/SRPMS" -type f -name "*.src.rpm" 2>/dev/null | head -n 1)

echo -e "\n${BLUE}Fichiers générés :${NC}"
echo -e "  ${GREEN}1. RPM Binaire :${NC} ${RPM_FILE}"
echo -e "  ${GREEN}2. RPM Source  :${NC} ${SRPM_FILE}"

echo -e "\n${YELLOW}Pour tester l'installation locale du RPM :${NC}"
echo -e "  sudo dnf install \"${RPM_FILE}\""
echo -e "  # ou :"
echo -e "  sudo rpm -Uvh --force \"${RPM_FILE}\""

echo -e "\n${YELLOW}Pour lancer l'application après installation :${NC}"
echo -e "  achats"

echo -e "\n${YELLOW}Pour publier sur Copr :${NC}"
echo -e "  copr-cli build arrera-software \"${SRPM_FILE}\"\n"
