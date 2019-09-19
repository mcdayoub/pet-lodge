import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label } from 'semantic-ui-react';

const WALK_DOG_MUTATION = gql`
  mutation walkDog($dogId: ID!) {
    walkDog(dogId: $dogId) {
      id
      walks {
        id
        username
        walkedAt
      }
    }
  }
`;

function WalkButton({ user, dog: { id, walks } }) {
  const [walked, setWalked] = useState(false);
  useEffect(() => {
    if (user && walks.find(walk => walk.username === user.username)) {
      setWalked(true);
    } else {
      setWalked(false);
    }
  }, [user, walks]);

  const [walkDog, { error }] = useMutation(WALK_DOG_MUTATION, {
    onError(err) {
      return err.graphQLErrors[0].extensions.exception.errors;
    },
    variables: { dogId: id }
  });

  const walkButton = user ? (
    walked ? (
      <Button color="teal">Walk</Button>
    ) : (
      <Button color="teal" basic>
        Walk
      </Button>
    )
  ) : (
    <Button color="teal" basic>
      Walk
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={walkDog} error={error}>
      {walkButton}
      <Label basic color="teal" pointing="left">
        {walks.length}
      </Label>
      {error && (
        <Label className="ui error message" style={{ marginBottom: 20 }}>
          <ul>
            <li>Dog was walked less than an hour ago!</li>
          </ul>
        </Label>
      )}
    </Button>
  );
}

export default WalkButton;
