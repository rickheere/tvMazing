import { Person, Show, RequestType, RequestQueueItem } from "@tv-mazing/types";
import request = require("request-promise-native");
import { Readable } from "stream";
const logger = require("pino")();

const SECOND = 1000;

export default class Api extends Readable {
  private baseUrl: string;
  private currentPage = 0;
  private queue: RequestQueueItem[] = [];
  private shows: Show[] = [];
  private queueRunning: boolean;
  private intervalTime: number;
  public readable: boolean = false;

  constructor(baseUrl: string) {
    super({ objectMode: true });
    this.baseUrl = baseUrl;
    this.intervalTime = (SECOND * 10) / 20;

    this.queue.push({
      type: RequestType.ShowRequest,
      url: `${this.baseUrl}/shows?page=${this.currentPage}`
    });

    this.currentPage++;
  }

  start(): void {
    this.next();
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  _read() { }

  private pushOnQueue(item: RequestQueueItem) {
    this.queue.push(item);

    if (!this.queueRunning) {
      this.next();
    }
  }

  private next() {
    if (this.queue.length > 0) {
      this.queueRunning = true;
      const nextRequest = this.queue.shift();

      logger.info(nextRequest);

      request({ url: nextRequest.url, resolveWithFullResponse: true })
        .then(response => {
          if (nextRequest.type === RequestType.ShowRequest) {
            this.handleShowResponce(response.body);
          }

          if (nextRequest.type === RequestType.CastRequest) {
            this.handleCastResponce(nextRequest.metaData.showId, response.body);
          }

          if (this.queue.length > 0) {
            setTimeout(this.next.bind(this), this.intervalTime);
          } else {
            logger.info("done, queue empty");
          }
        })
        .catch(
          function (err) {
            if (err.statusCode === 404) {

              logger.info("no more pages show to scrape");

              if (this.queue.length > 0) {
                setTimeout(this.next.bind(this), this.intervalTime);
              } else {
                this.push(null);
              }
            }
          }.bind(this)
        );
    } else {
      this.queueRunning = false;
      this.push(null);
    }
  }

  private handleShowResponce(responce: string) {
    const shows = JSON.parse(responce);

    shows.forEach((show) => {
      this.shows[show.id] = { tvMazeId: show.id, name: show.name };

      this.pushOnQueue({
        type: RequestType.CastRequest,
        url: `${this.baseUrl}/shows/${show.id}/cast`,
        metaData: {
          showId: show.id
        }
      });
    });

    this.pushOnQueue({
      type: RequestType.ShowRequest,
      url: `${this.baseUrl}/shows?page=${this.currentPage}`
    });

    this.currentPage++;
  }

  private handleCastResponce(showId: number, responce: string) {
    const cast: Person[] = JSON.parse(responce).map(
      ({ person: { id: tvMazeId, name, birthday } }) => {
        return {
          tvMazeId,
          name,
          birthday
        };
      }
    );

    this.push({
      ...this.shows[showId],
      cast
    });

    delete this.shows[showId];
  }
}
