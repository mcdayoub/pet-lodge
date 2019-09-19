import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_DOGS_QUERY } from '../util/graphql';

const CHECKOUT_DOG_MUTATION = gql`
  mutation checkoutDog($dogId: ID!) {
    checkoutDog(dogId: $dogId)
  }
`;

function CheckoutButton(props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [checkoutDog] = useMutation(CHECKOUT_DOG_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_DOGS_QUERY
      });
      data.getDogs = data.getDogs.filter(dog => dog.id !== props.dogId);
      proxy.writeQuery({ query: FETCH_DOGS_QUERY, data });
      if (props.callback) props.callback();
    },
    variables: {
      dogId: props.dogId
    }
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        Check out <Icon name="sign out" style={{ margin: 0 }}></Icon>
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={checkoutDog}
      ></Confirm>
    </>
  );
}

export default CheckoutButton;
