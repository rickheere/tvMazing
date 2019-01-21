import { Show, ApiConfig, PersistenceLayer } from "@tv-mazing/types";

const logger = require("pino")();
import Api from "./api";

export default class Scraper {
  private api: Api;
  private persistence: PersistenceLayer;

  public constructor({ baseUrl }: ApiConfig, persistence: PersistenceLayer) {
    this.api = new Api(baseUrl);
    this.persistence = persistence;

    this.persistence.clear();

    this.api.on("data", this.onData.bind(this));

    this.api.on("end", function () {
      logger.info("scraping done!");
    });
  }

  public sync() {
    this.api.start();
  }

  private onData(show: Show) {
    logger.info("showdata", show);
    this.persistence.saveShow(show);
  }
}
