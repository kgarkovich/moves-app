export interface IWatchlist {
    id: string;
    title: string;
    movies: { 
        id: string;
        title: string;
    }[];
}