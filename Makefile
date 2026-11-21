NAME = achats
VERSION = 1.2.1
RELEASE = 1
RPMBUILD_DIR = $(CURDIR)/rpmbuild

.PHONY: all clean dist srpm rpm

all: rpm

clean:
	rm -rf $(RPMBUILD_DIR)

dist: clean
	mkdir -p $(RPMBUILD_DIR)/SOURCES
	tar --exclude='.git' --exclude='rpmbuild' --transform 's,^\.,$(NAME)-$(VERSION),' -czf $(RPMBUILD_DIR)/SOURCES/$(NAME)-$(VERSION).tar.gz .

srpm: dist
	mkdir -p $(RPMBUILD_DIR)/SPECS $(RPMBUILD_DIR)/SRPMS $(RPMBUILD_DIR)/RPMS $(RPMBUILD_DIR)/BUILD $(RPMBUILD_DIR)/BUILDROOT
	cp $(NAME).spec $(RPMBUILD_DIR)/SPECS/
	rpmbuild --define "_topdir $(RPMBUILD_DIR)" --define "_tmppath /tmp" -bs $(RPMBUILD_DIR)/SPECS/$(NAME).spec
	@echo "==> SRPM généré dans: $(RPMBUILD_DIR)/SRPMS/"

rpm: dist
	mkdir -p $(RPMBUILD_DIR)/SPECS $(RPMBUILD_DIR)/SRPMS $(RPMBUILD_DIR)/RPMS $(RPMBUILD_DIR)/BUILD $(RPMBUILD_DIR)/BUILDROOT
	cp $(NAME).spec $(RPMBUILD_DIR)/SPECS/
	rpmbuild --define "_topdir $(RPMBUILD_DIR)" --define "_tmppath /tmp" -ba $(RPMBUILD_DIR)/SPECS/$(NAME).spec
	@echo "==> RPM généré dans: $(RPMBUILD_DIR)/RPMS/noarch/"
