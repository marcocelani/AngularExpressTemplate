# AngularExpressTemplate

This is an Angular 6 template with Express 4 (with TypeScript support).

## Configuration
0. Run `npm install` for *node_modules* folder set up.
1. Rename .env.example in .env and configure your vars.

## Angular CLI

Run `ng serve` for running @angular/cli (`http://localhost:4200/`).

## Development server

Run `npm run server` or use "Debug/Run" if you are using *vscode*.

Angular CLI and Expres work togheter. In development mode CORS
are enabled by default.

## Code scaffolding

Angular template is inside *src/client*. Server stuffs is inside *src/server* instead.

*src/shared* contains code shared between client and server (e.g. *models*)

There are two **tsconfig.json**. The first one is located into project's root and is related to Angular.
The second one is related to server and is located in src/server.

## Build

Run `npm run build_all` to build client and server parts. 

Run `npm run build_client` to build client.

Run `npm run build_server` to build server.

*dist/* is the output folder.

## Running Server

Run `npm run server` to run Express (it will automatically build).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

