import { useQuery, gql } from '@apollo/client';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const POPULAR_MOVIES_QUERY = gql`
  query {
    allMovies {
      id
      title
      overview
      releaseDate
      posterPath
      backdropPath
    }
  }
`;

const ANTICIPATED_MOVIES_QUERY = gql`
  query {
    popularMovies {
      id
      title
      overview
      releaseDate
      posterPath
      backdropPath
    }
  }
`;

export const HomePage = () => {
    const { loading, error, data } = useQuery(POPULAR_MOVIES_QUERY);

    console.log(data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

 

    return (
        <div>
          
            {/* <ul>
        {data.popularMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul> */}
        </div>
    );
};
