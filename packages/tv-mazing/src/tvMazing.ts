#!/usr/bin/env node

import Scraper from "@tv-mazing/scraper";
import Persistance from '@tv-mazing/persistence'

const mongo = new Persistance({
  mongoHost: "localhost",
  mongoPort: 27017,
  dbName: "shows"
});

const scraper = new Scraper({
  baseUrl: "http://api.tvmaze.com"
}, mongo);

scraper.sync();
