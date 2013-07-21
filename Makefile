
run: node_modules components
	@NODE_PATH=lib ./bin/component.io

node_modules: package.json
	@npm i

components:
	@component install

clean:
	@rm -fr components

.PHONY: run clean
