export interface Config {
    baseUrl: string;
}
export interface Paginated {
    offset: number;
    limit: number;
}
export interface PaginatedResponse extends Paginated {
    hasMore: number;
}
export interface Show {
    id: number;
    name: string;
}
export interface Person {
    id: number;
    name: string;
    birthday: string;
}
export interface showAndCastResource {
    getShows(page: number): Show[];
    getCastByShowId(id: number): Person[];
}
