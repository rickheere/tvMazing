import { Show } from "@tv-mazing/types";

import request = require("request-promise-native");

export default class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getShowPage(): Promise<any> {
    let shows;

    await request(`${this.baseUrl}/shows`)
      .then(responce => (shows = JSON.parse(responce)))
      .catch(err => (shows = { origin: err.toString() }));

    console.log('shows', shows)

    return shows;
  }
}
