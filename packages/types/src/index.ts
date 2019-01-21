export interface ApiConfig {
  baseUrl: string;
}

export interface PersistanceConfig {
  mongoHost: string;
  mongoPort: number;
  dbName: string;
}

export interface Paginated {
  offset: number;
  limit: number;
}

export interface PaginatedResponse extends Paginated {
  hasMore: number;
}

export interface Show {
  tvMazeId: number;
  name: string;
}

export interface Person {
  tvMazeId: number;
  name: string;
  birthday: string;
}

export interface ShowSchema {
  tvMazeId: number;
  name: string;
  cast: Person[];
}

export interface ShowAndCastResource {
  getShows(page: number): Promise<Show[]>;
  getCastByShowId(id: number): Promise<Person[]>;
}

export interface PersistenceLayer {
  clear(): void;
  saveShow(Show): void;
  getShows(pageL: number);
}

export enum RequestType {
  ShowRequest = "SHOW_REQUEST",
  CastRequest = "CAST_REQUEST"
}

export interface RequestQueueItem {
  type: RequestType;
  url: string;
  metaData?: {
    showId: number;
  };
}

export interface Page {
  render(): string
}

