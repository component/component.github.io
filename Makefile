
default: run

clean:
	@rm -fr components

components: $(shell find . -name 'component.json')
	@component install

node_modules: package.json
	@npm install
	@touch node_modules # hack

run: node_modules components
	@NODE_PATH=lib ./bin/component.io

.PHONY: clean run