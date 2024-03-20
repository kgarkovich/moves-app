import { useQuery, gql } from '@apollo/client';
import { Container, Row, Card , Button } from 'react-bootstrap';

interface IMovie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    poster_path: string;
    backdrop_path: string;
}

const POPULAR_MOVIES_QUERY = gql`
    query {
        popularMovies(first: 5) {
            id
            title
            overview
            releaseDate
            poster_path
            backdrop_path
        }
    }
`;

export const PopularMovies = () => {
    const { loading, error, data } = useQuery(POPULAR_MOVIES_QUERY);

    console.log(data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const baseUrl = 'https://image.tmdb.org/t/p';

    return (
        <Container className="mt-5">
            <Row>
            {data.popularMovies.map((movie: IMovie) => (
                <Card style={{ width: '15rem', height: '25rem' }} key={movie.id}>
                    <Card.Img variant="top" src={`${baseUrl}/w500${movie.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
            </Row>
        </Container>
    )
}