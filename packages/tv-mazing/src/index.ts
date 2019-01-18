#!/usr/bin/env node

import Scraper from "@tv-mazing/scraper";
import { Config } from "@tv-mazing/types";


const scraper = new Scraper({
  baseUrl: 'http://api.tvmaze.com'
});
scraper.start();
