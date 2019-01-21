import { Page, Person, ShowSchema } from '@tv-mazing/types';

import { Application, Request, Response } from "express";
import { PersistenceLayer } from '@tv-mazing/types';

import Homepage from '../pages/home';


export default class Routes {
  private homePage: Page;
  private persistence: PersistenceLayer;

  constructor(persistence: PersistenceLayer) {

    this.homePage = new Homepage();
    this.persistence = persistence;
  }

  private sortCast(a: Person, b: Person): number {
    if (b.birthday === null) {
      return 1
    }

    if (a.birthday === null) {
      return -1
    }

    if (a.birthday > b.birthday) {
      return 1;
    }

    if (a.birthday < b.birthday) {
      return -1;
    }

    return 0;
  }

  public routes(app: Application): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send(this.homePage.render())
      })

    app.route('/series')
      .get((req: Request, res: Response) => {
        const pageNumber = req.query.page || 0;

        this.persistence.getShows(pageNumber).then((shows: ShowSchema[]) => {

          const withSortedCast = shows.map(({ tvMazeId, name, cast }) => {

            const sortedCast: Person[] = cast.sort(this.sortCast);
            return {
              tvMazeId,
              name,
              cast: sortedCast
            }
          })

          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(withSortedCast, null, 2));
        })
      })
  }
}