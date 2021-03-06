install: install-deps install-flow-typed

start:
	npm start

develop:
	NODE_ENV=development npm run webpack -- --watch --config config/webpack.development.babel.js

install-deps:
	yarn install

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

run:
	babel-node src\bin\page-loader

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint -- src test

publish:
	npm publish

.PHONY: test
