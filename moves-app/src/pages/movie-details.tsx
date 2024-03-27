import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { MOVIE_DETAILS_QUERY, ALL_WATCHLISTS, ADD_MOVIE_TO_WATCHLIST } from '../api';
import { IWatchlist } from '../types';
import { Image, Container, Row, Col, Modal, Button, Dropdown } from 'react-bootstrap';
import { Fragment } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { getUserId } from '../utils/jwt-token';
import { NavLink  } from "react-router-dom";


export const MovieDetails = () => {
    const { id } = useParams();
    const userId = getUserId();
    const baseUrl = 'https://image.tmdb.org/t/p';

    const [addMovieToWatchlist] = useMutation(ADD_MOVIE_TO_WATCHLIST);
    const { loading, error, data } = useQuery(MOVIE_DETAILS_QUERY, {
        variables: { id }
    });
    const { loading: loadingWatchlist, error: errorWatchlist, data: dataWatchlist } = useQuery(ALL_WATCHLISTS, {
        variables: { userId }
      });

      console.log(dataWatchlist)

    const { movieDetails } = !loading && data;

    const year = movieDetails?.release_date.slice(0, 4);

    const handleAddMovie = async (e: React.FormEvent, id: string, movie: {id: string, title: string}) => {
        e.preventDefault();
    
        try {
          const { data } = await addMovieToWatchlist({
            variables: { id, movie },
          });
    
          if (data.register) {
            console.log(data)
          } else {
            console.error('Token not found in response:', data);
          }
        } catch (error) {
          console.error('Registration error:', error);
        }
      };

    return loading ? <div>Loading...</div> : (
        <Container className='mt-4'>
            <Row>
                <Col xs={3}>
                    <Image src={`${baseUrl}/w500${data.movieDetails?.poster_path}`} fluid />
                </Col>
                <Col xs={9} className='px-4'>
                    <div className='mt-5'>
                        <Modal.Title id="example-custom-modal-styling-title">{movieDetails?.title} ({year})</Modal.Title>
                        <p>{movieDetails?.genres.map((item: {id: number, name: string}) => <Fragment key={item.id}>{item.name}, </Fragment>)}</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                <BsFillStarFill  />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item><NavLink to={'/watchlists-managment'}>Create new watchlist</NavLink></Dropdown.Item>
                                {dataWatchlist.allWatchLists.map((watchList: IWatchlist) => {
                                    return (
                                         <Dropdown.Item onClick={(e) => handleAddMovie(e, watchList.id, {id: movieDetails?.id, title: movieDetails?.title})}>{watchList.title}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <h5 className='mt-4'>Overview</h5>
                        <p>{movieDetails?.overview}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}