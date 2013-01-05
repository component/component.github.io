
run: components
	@NODE_PATH=lib node index

components:
	@component install

clean:
	@rm -fr components

.PHONY: run clean
