import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card, Image } from 'semantic-ui-react';
import moment from 'moment';

import WalkButton from '../components/WalkButton';
import { AuthContext } from '../context/auth';
import CheckoutButton from '../components/CheckoutButton';

import { FETCH_DOG_QUERY } from '../util/graphql';

function DogPage(props) {
  const { user } = useContext(AuthContext);
  const dogId = props.match.params.dogId;
  const { data, loading } = useQuery(FETCH_DOG_QUERY, {
    variables: {
      dogId
    }
  });

  function checkoutDogCallback() {
    props.history.push('/');
  }

  let dogMarkup;
  if (loading) {
    dogMarkup = <p>Loading dog</p>;
  } else {
    const { id, name, username, bookedAt, walks } = data.getDog;
    dogMarkup = (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://dogecoin.com/imgs/doge.png"
                size="small"
                float="right"
              ></Image>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Meta>{moment(bookedAt).fromNow()}</Card.Meta>
                  <Card.Description>{username} is the owner</Card.Description>
                </Card.Content>
                <hr></hr>
                <Card.Content extra>
                  <WalkButton user={user} dog={{ id, walks }}></WalkButton>
                  {user && user.username === username && (
                    <CheckoutButton
                      dogId={id}
                      callback={checkoutDogCallback}
                    ></CheckoutButton>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <h2>Walks</h2>
        <Grid columns={2}>
          {walks &&
            walks.map(walk => (
              <Grid.Row key={walk.id} style={{ marginBottom: 20 }}>
                <Grid.Column width={4}>
                  {walk.username} walked {name}
                </Grid.Column>
                <Grid.Column width={3}>
                  {moment(walk.walkedAt).fromNow()}
                </Grid.Column>
              </Grid.Row>
            ))}
        </Grid>
      </>
    );
  }
  return dogMarkup;
}
export default DogPage;
