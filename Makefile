
run: components
	@NODE_PATH=lib ./bin/component.io

components:
	@component install

clean:
	@rm -fr components

.PHONY: run clean
