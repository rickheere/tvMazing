# TvMazing.

## Background

For a new metadata ingester we need a service that provides the cast of all the tv shows in the TVMaze database, so we can enrich our metadata system with this information. The TVMaze database provides a public REST API that you can query for this data.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ yarn
$ yarn bootstrap
```

## Usage

### Scraping
To scrap the tvmaze.com api and populate a database make sure a mongo database is running on localhost:27017.
Or use the docker-compose-dev file that comes with the project:

```sh
$ docker-compose -f docker-compose-dev.yml pull && docker-compose -f docker-compose-dev.yml up
```

To start the scraper, go to the tv-mazing package and run it with node. 

```sh
$ cd packages/tv-mazing
$ node .
```

### Explore the api
With the same database available to the tv-mazing package and run the dev api.

```sh
$ cd packages/tv-mazing
$ yarn dev:server
```

The api can be visited at http://localhost:3000