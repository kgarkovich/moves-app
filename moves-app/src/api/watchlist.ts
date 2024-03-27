import { gql } from '@apollo/client';

export const ALL_WATCHLISTS = gql`
  query allWatchLists($userId: ID!) {
    allWatchLists(userId: $userId) {
        id
        title
        movies {
          id
          title
        }
    }
  }
`;

export const ONE_WATCHLIST = gql`
  query oneWatchList($id: ID!) {
    oneWatchList(id: $id) {
        id
        title
        movies {
          id
          title
        }
    }
  }
`;

export const CREATE_WATCHLIST = gql`
  mutation createWatchlist($userId: String!, $title: String!) {
    createWatchlist(userId: $userId, title: $title) {
        title
        id
    }
  }
`;

export const REMOVE_WATCHLIST = gql`
  mutation removeWatchlist($id: String!) {
    removeWatchlist(id: $id) {
        title
        id
    }
  }
`;

export const ADD_MOVIE_TO_WATCHLIST = gql`
  mutation addMovieToWatchlist($id: String!, $movie: MovieInput) {
    addMovieToWatchlist(id: $id, movie: $movie) {
      id
      title
      movies {
        id
        title
      }
    }
  }
`;

export const REMOVE_MOVIE_FROM_WATCHLIST = gql`
  mutation removeMovieFromWatchlist($id: String!, $movieId: String!) {
    removeMovieFromWatchlist(id: $id, movieId: $movieId) {
      id
      title
      movies {
        id
        title
      }
    }
  }
`;