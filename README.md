# Quick start

First, clone this repo.

## To run only UI part(without any backend)
1. In a project root run `npm run setup`. It will install all dependencies.
2. According to environment `development` or `production` to build the project you should run `npm run build:dev` or `npm run build:prod` respectively. This relates to starting `webpack-dev-server`, so just run `npm run start:dev` or `npm run start:prod` and then open a browser at: [http://localhost:3000/webpack-dev-server](http://localhost:3000/webpack-dev-server)  

## To Run server(Node.JS) part with simple front end 
1. In a project root run `npm install`. It will install all dependencies.
2. Just to run project run `npm run server:start`. If you want to allow the server monitoring for any changes and automatically restart run `npm run server:watch`. 

