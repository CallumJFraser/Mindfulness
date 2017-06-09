Mindfulness
===

Small react web application designed to track the reoccurance of significant events for the user. The events are added to the system and can occurances then be tracked to help the user see how often they happen.

Modules
====

This application uses the following:

* Building
    * [Webpack](https://webpack.github.io/) - Combines the JS files in /src folder into one 'bundle' JS file.
    * [Babel](https://babeljs.io/) - Transpiles ES6 JS code into the more compatible ES5 standard.
* Client-side
    * [Bootstrap](https://getbootstrap.com/) - CSS grid and basic application styles
* Testing
	* [AVA](https://github.com/avajs/ava) - Testing framework.

Any feedback or improvements please give me a yell.

Setup
====

run `npm i` in command line/terminal to install node dependencies.

If you don't have it installed you will also need to run `npm i -g webpack` to install webpack globally.

Run
====

run `npm run build` to build the src/index.js file into the needed build/index.bundle.js file.

run `npm run watcher` to run the webpack package listener for local hosting.

run `npm run test` to run the unit tests.
