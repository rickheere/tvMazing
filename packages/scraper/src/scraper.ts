import { Config } from "@tv-mazing/types";
import Api from './api'

export default class Scraper {
  private api: Api;
  private config: Config;
  private lastPage: number;
  private hasNext: boolean = true;

  public constructor(config: Config) {
    this.api = new Api(config.baseUrl);
    this.config = config;
  }

  public start() {
    // do {
      this.requestPage();
    // } while (this.hasNext);
  }

  private requestPage() {
    console.log(this.api.getShowPage());
  }
}
