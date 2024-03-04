import { NavLink  } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const POPULAR_MOVIES_QUERY = gql`
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
            <NavLink  to="/login" replace={true}>Login</NavLink>
            <NavLink  to="/register" replace={true}>Register</NavLink>
            {/* <ul>
        {data.popularMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul> */}
        </div>
    );
};
