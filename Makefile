
.PHONY: lint base

base:
	npm i --no-progress

run: base
	docker-compose up -d 
	nodemon src/app.js

lint:
	./node_modules/eslint/bin/eslint.js --fix src/ test/
