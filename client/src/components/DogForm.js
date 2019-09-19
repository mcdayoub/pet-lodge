import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_DOGS_QUERY } from '../util/graphql';

const ADD_DOG_MUTATION = gql`
  mutation addDog($name: String!) {
    addDog(name: $name) {
      id
      name
      bookedAt
      username
      walks {
        id
        walkedAt
        username
      }
    }
  }
`;

function DogForm(props) {
  const { values, onChange, onSubmit } = useForm(addDogCallback, {
    name: ''
  });

  const [addDog, { error }] = useMutation(ADD_DOG_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_DOGS_QUERY
      });
      data.getDogs = [result.data.addDog, ...data.getDogs];
      proxy.writeQuery({ query: FETCH_DOGS_QUERY, data });
      values.name = '';
    }
  });

  function addDogCallback() {
    addDog();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Book your dog</h2>
        <Form.Field>
          <Form.Input
            placeholder="Name of dog"
            name="name"
            onChange={onChange}
            value={values.name}
            error={error ? true : false}
          ></Form.Input>
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default DogForm;
