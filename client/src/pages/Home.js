import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import DogCard from '../components/DogCard';
import DogForm from '../components/DogForm';
import { FETCH_DOGS_QUERY } from '../util/graphql';

function Home(props) {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_DOGS_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Pet Lodge</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <DogForm props={props}></DogForm>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading dogs..</h1>
        ) : (
          <Transition.Group>
            {data.getDogs &&
              data.getDogs.map(dog => (
                <Grid.Column key={dog.id} style={{ marginBottom: 20 }}>
                  <DogCard dog={dog} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
