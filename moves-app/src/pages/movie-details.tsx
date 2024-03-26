import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { MOVIE_DETAILS_QUERY } from '../api';


export const MovieDetails = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(MOVIE_DETAILS_QUERY, {
        variables: { id }
      });

      console.log(data)


    return (
        <div>{id}</div>
    )
}