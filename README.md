# Words counter & stats

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


### Installation

Clone the git repository via:

````
$ git clone https://github.com/LiorRabin/words-counter-and-stats.git
````

Navigate to the project folder and install all needed dependencies via **npm**:

````
$ npm install
````

### Run locally
* Create an `.env` file from the `.env.example` file.
* Update the `.env` file parameters:
	* `NODE_ENV`
	* `PORT` = port you wish the server to listen to
	* `REDIS_URL` = `redis://127.0.0.1:6379`
* Start you local redis server
* Run using `npm start` (or `npm run dev` to run with `nodemon` and restart on code changes)

### Run dockerized version
* Create an `.env` file from the `.env.example` file.
* Update the `.env` file parameters:
	* `NODE_ENV`
	* `PORT` = port you wish the server to listen to
	* `REDIS_URL` = `redis://words-counter-and-stats-redis`
* Run using `npm run docker-start` (stop using `npm run docker-stop`)

### API
See [API Docs](https://liorrabin.github.io/words-counter-and-stats/)

### Source linting
`npm run lint` performs a lint for all source code using [standard js](https://standardjs.com/).

### License
Code released under the [MIT License](https://github.com/LiorRabin/words-counter-and-stats/blob/master/LICENSE).