Name:           achats
Version:        1.2.1
Release:        1%{?dist}
Summary:        Payer en numéraire le prix d'un objet

License:        GPL-3.0-or-later
URL:            https://forge.apps.education.fr/primtux/applications/achats
Source0:        %{name}-%{version}.tar.gz

BuildArch:      noarch
BuildRequires:  desktop-file-utils
Requires:       bash
Requires:       firefox

%description
Adaptation des jeux "Achats en euros" et "La monnaie" de la compilation
d'applications Clicmenu pour PrimTux. En déplaçant pièces et billets en euros
sur le comptoir, l'élève apprend à composer et payer le montant du prix d'un objet.

%prep
%autosetup

%build
# Application web statique HTML5/JS (aucun binaire à compiler)

%install
mkdir -p %{buildroot}%{_bindir}
mkdir -p %{buildroot}%{_datadir}/%{name}
mkdir -p %{buildroot}%{_datadir}/applications
mkdir -p %{buildroot}%{_datadir}/pixmaps
mkdir -p %{buildroot}%{_datadir}/icons/hicolor/64x64/apps
mkdir -p %{buildroot}%{_sysconfdir}/skel/.local/share/applications
mkdir -p %{buildroot}%{_sysconfdir}/xdg/autostart

# Installation des ressources de l'application
cp -a index.html *.css *.js %{buildroot}%{_datadir}/%{name}/
cp -a img fonts %{buildroot}%{_datadir}/%{name}/

# Scripts de lancement et d'initialisation
install -m 0755 bin/achats %{buildroot}%{_bindir}/achats
install -m 0755 bin/achats-webapp-init %{buildroot}%{_bindir}/achats-webapp-init
ln -s achats %{buildroot}%{_bindir}/achat

# Icônes
install -m 0644 achats.png %{buildroot}%{_datadir}/pixmaps/%{name}.png
install -m 0644 achats.png %{buildroot}%{_datadir}/icons/hicolor/64x64/apps/%{name}.png

# Fichiers .desktop
desktop-file-install --dir=%{buildroot}%{_datadir}/applications desktop/webapp-achats.desktop
install -m 0644 desktop/webapp-achats.desktop %{buildroot}%{_sysconfdir}/skel/.local/share/applications/webapp-achats.desktop
desktop-file-install --dir=%{buildroot}%{_sysconfdir}/xdg/autostart desktop/achats-webapp-init.desktop

%check
desktop-file-validate %{buildroot}%{_datadir}/applications/webapp-achats.desktop
desktop-file-validate %{buildroot}%{_sysconfdir}/xdg/autostart/achats-webapp-init.desktop

%files
%license LICENSE
%doc README.md
%{_bindir}/achats
%{_bindir}/achat
%{_bindir}/achats-webapp-init
%{_datadir}/%{name}
%{_datadir}/applications/webapp-achats.desktop
%{_sysconfdir}/skel/.local/share/applications/webapp-achats.desktop
%{_sysconfdir}/xdg/autostart/achats-webapp-init.desktop
%{_datadir}/pixmaps/%{name}.png
%{_datadir}/icons/hicolor/64x64/apps/%{name}.png

%changelog
* Sat Nov 21 2026 Baptiste Pauchet <baptiste.pauchet13@gmail.com> - 1.2.1-1
- Paquet initial Fedora / Copr avec intégration WebApp Manager et profil Firefox
