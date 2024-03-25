import { gql } from '@apollo/client';

export const ALL_WATCHLISTS = gql`
  query {
    allWatchLists {
        id
        title
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