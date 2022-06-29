# Feed It Back Test
App is built using Nuxt.js a Vue framework that provides server side rendering. The reason I've chosen this framework is to keep the authorization key provided by the Feed It Back team private and not exposed on the browser when making calls to the api. Also, Nuxt.js leverages a UI library Vuetify, which delivers a wide range of UI elements to be easily used and modified.
Please refer to the steps below to run the app.


## Build Setup

Open a terminal and cd `test_directoy_path`. Inside the project directory run the commands below. You can run the dev mode and prod mode. If you want to get the prod deployed app, please make sure to run the build command first then run the app, because you wont be able to start the app in prod mode if the built is not ran first.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080 so that we can call the api
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
