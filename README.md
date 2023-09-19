<h1 align="center">🌟 Auth API using Node.js & JWT 🌟</h1>

## Setup local project with running database in docker container

```bash
# cloning this project
git clone https://github.com/kochan4php/auth-api.git

# go to the project folder
cd auth-api

# install pnpm if you don't have it
# In windows :
npm install -g pnpm
# In linux and mac :
sudo npm install -g pnpm

# running mongodb docker image for development
pnpm docker:db:dev:up

# running mongodb docker image for development
pnpm docker:db:dev:up

# install dependencies
pnpm install

# setup and configure your environment variables for this app
cp .env.example .env

# run this app
pnpm dev
```

## Setup production project with running database in docker container

```bash
# cloning this project
git clone https://github.com/kochan4php/auth-api.git

# go to the project folder
cd auth-api

# install pnpm if you don't have it
# In windows :
npm install -g pnpm
# In linux and mac :
sudo npm install -g pnpm

# running mongodb docker image for development
pnpm docker:db:dev:up

# install dependencies
pnpm install

# setup and configure your environment variables for this app
cp .env.example .env

# run this app
pnpm start
```

## Setup production project with docker compose

```bash
# cloning this project
git clone https://github.com/kochan4php/auth-api.git

# go to the project folder
cd auth-api

# run docker command in shell file
pnpm docker:up
```

## Notes

If you want to run husky in mac/linux machine, you should run this command in your terminal :

```bash
chmod ug+x .husky/*
```
