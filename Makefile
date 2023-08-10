lint-frontend:
	npx eslint frontend/src/

install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

lint:
	npm run lint --prefix frontend

start:
	make start-backend & make start-frontend