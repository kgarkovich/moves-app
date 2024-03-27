import { Container, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ONE_WATCHLIST, REMOVE_MOVIE_FROM_WATCHLIST } from '../api';
import { IWatchlist } from '../types';
import { Link } from 'react-router-dom';

export const WatchlistDetails = () => {
    const { id } = useParams();
    const [removeMovieFromWatchlist] = useMutation(REMOVE_MOVIE_FROM_WATCHLIST);
    const { loading, error, data, refetch } = useQuery(ONE_WATCHLIST, {
        variables: { id }
    });

    const handleMovieFromWatchlist = async (e: React.FormEvent, movieId: string) => {
        e.preventDefault();
    
        try {
            const { data } = await removeMovieFromWatchlist({
                variables: { id, movieId },
            });
    
            if (data) {
                refetch();
            } else {
                console.error('Error:', data);
            }
        }   catch (error) {
                console.error('Creating error:', error);
            }
        };

    return (
        <Container className='mt-4'>
            <Modal.Title>{data?.oneWatchList.title}</Modal.Title>
            <ListGroup className="mt-4">
                {
                    !loading && data?.oneWatchList.movies.map((item: IWatchlist) => {
                        return (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <Link to={`/movie/${item.id}`}>
                                     {item.title} 
                                </Link>
                                <Button variant="dark" onClick={(event) => handleMovieFromWatchlist(event, item.id)}>Remove</Button>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </Container>
    )
}