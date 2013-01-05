
run: components
	@NODE_PATH=lib node index

components:
	@component install

.PHONY: run
