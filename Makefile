
run: components
	@NODE_PATH=lib ./bin/component.io --port 4000

components:
	@component install

clean:
	@rm -fr components

.PHONY: run clean
