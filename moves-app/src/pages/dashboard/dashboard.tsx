import { log } from 'console';
import { PopularMovies } from './popular-movies';
import { useQuery, gql } from '@apollo/client';


// const POPULAR_MOVIES_QUERY = gql`
//   query {
//     allMovies {
//         results {
//             id
//             title
//             overview
//             releaseDate
//             poster_path
//             backdrop_path
//         }
//         page
//         total_pages
//         total_results
//     }
//   }
// `;


const POPULAR_MOVIES_QUERY = gql`
  query {
    allMovies {
        id
        title
        overview
        releaseDate
        poster_path
        backdrop_path
    }
  }
`;

export const Dashboard = () => {
    const { loading, error, data } = useQuery(POPULAR_MOVIES_QUERY);

    console.log(data)

    return (
        <div>
            <PopularMovies />
        </div>
    )
}