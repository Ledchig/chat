lint-frontend:
	npx eslint frontend/src/

install:
	npm ci

start-frontend:
	npm start --prefix frontend

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend