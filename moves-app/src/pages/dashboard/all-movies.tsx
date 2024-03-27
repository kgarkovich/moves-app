import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container, Row, Card , Modal } from 'react-bootstrap';
import { IMovie } from '../../types';
import { ALL_MOVIES_QUERY } from '../../api';

export const AllMovies = () => {
    const { loading, error, data } = useQuery(ALL_MOVIES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const baseUrl = 'https://image.tmdb.org/t/p';

    return (
        <Container className="mt-4">
            <Modal.Title id="example-custom-modal-styling-title">All movies</Modal.Title>
            <Row className="mt-3">
                {data.allMovies.map((movie: IMovie) => (
                    <Card style={{ width: '9.85rem', margin: '0.5rem', padding: 0 }} key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <Card.Img variant="top" src={`${baseUrl}/w500${movie.poster_path}`} />
                            <Card.Body className="d-flex justify-content-between align-items-center p-0">
                                <h6>{movie.title}</h6>
                            </Card.Body>
                        </Link>            
                    </Card>
                ))}
            </Row>
        </Container>
    )
}
