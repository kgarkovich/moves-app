import { gql } from '@apollo/client';

export const POPULAR_MOVIES_QUERY = gql`
    query {
        popularMovies(first: 7) {
            id
            title
            poster_path
        }
    }
`;

export const UPCOMING_MOVIES_QUERY = gql`
    query {
        anticipatedMovies(first: 7) {
            id
            title
            poster_path
        }
    }
`;

export const ALL_MOVIES_QUERY = gql`
    query {
        allMovies {
            id
            title
            poster_path
        }
    }
`;

export const MOVIE_DETAILS_QUERY = gql`
    query movieDetails($id: ID!) {
        movieDetails(id: $id) {
            id
            title
            overview
            release_date
            poster_path
            genres {
                id
                name
            }
        }
    }
`;