import { Container, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_WATCHLIST, ALL_WATCHLISTS, REMOVE_WATCHLIST } from '../api';
import { IWatchlist } from '../types';
import { getUserId } from '../utils/jwt-token';
import { Link } from 'react-router-dom';

export const WatchlistsManagment = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
    
  const userId = getUserId();

  const [createWatchlist] = useMutation(CREATE_WATCHLIST);
  const [removeWatchlist] = useMutation(REMOVE_WATCHLIST);

  const { loading, error, data, refetch } = useQuery(ALL_WATCHLISTS, {
    variables: { userId }
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const { data } = await createWatchlist({
            variables: { userId, title },
        });

        if (data) {
            refetch();
            handleClose();
        } else {
            console.error('Error:', data);
        }
    }   catch (error) {
            console.error('Creating error:', error);
        }
    };

    const handleRemoveWatchlist = async (e: React.FormEvent, id: string) => {
      e.preventDefault();
  
      try {
          const { data } = await removeWatchlist({
              variables: { id },
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
        <Container>
            <Button variant="dark" onClick={handleShow} className="mt-4">Create Watchlist</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Watchlist</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateWatchlist}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Watchlist Name</Form.Label>
                        <Form.Control type="text" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="dark">Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ListGroup className="mt-4">
                {
                    !loading && data && data.allWatchLists.map((item: IWatchlist) => {
                        return (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <Link to={`/watchlist/${item.id}`}>
                                     {item.title} 
                                </Link>
                                <Button variant="dark" onClick={(event) => handleRemoveWatchlist(event, item.id)}>Remove</Button>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </Container>
    )
}