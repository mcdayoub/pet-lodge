import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_DOGS_NEED_WALKED_QUERY } from '../util/graphql';

import DogCard from '../components/DogCard';

function Walk(props) {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_DOGS_NEED_WALKED_QUERY);
  if (!loading) {
    if (data.getDogsNeedWalked.length === 0) {
      return (
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1>
              {user.username}, thanks, but no dogs need to be walked right now
            </h1>
          </Grid.Row>
        </Grid>
      );
    }
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>{user.username}, help us walk these dogs</h1>
        <h2>They haven't been walking in over an hour!</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading dogs..</h1>
        ) : (
          <Transition.Group>
            {data.getDogsNeedWalked &&
              data.getDogsNeedWalked.map(dog => (
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
export default Walk;
