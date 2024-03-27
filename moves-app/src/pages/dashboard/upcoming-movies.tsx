import { useQuery } from '@apollo/client';
import { Container, Row, Card , Modal } from 'react-bootstrap';
import { IMovie } from '../../types';
import { UPCOMING_MOVIES_QUERY } from '../../api';
import { Link } from 'react-router-dom';

export const UpcomingMovies = () => {
    const { loading, error, data } = useQuery(UPCOMING_MOVIES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const baseUrl = 'https://image.tmdb.org/t/p';

    return (
        <Container className="mt-4">
            <Modal.Title id="example-custom-modal-styling-title">Upcoming movies</Modal.Title>
            <Row className="mt-3">
                {data.anticipatedMovies.map((movie: IMovie) => (
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
