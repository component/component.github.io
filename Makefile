
site:
	@rm -rf build
	@component build --copy
	@rm -rf /tmp/site \
		&& mkdir -p /tmp/site \
		&& cp -rf index.html favicon.ico build /tmp/site \
		&& git checkout gh-pages \
		&& cp -rf /tmp/site/* .

.PHONY: site