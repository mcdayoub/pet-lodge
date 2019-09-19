import React, { useContext } from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import WalkButton from './WalkButton';

import MyPopup from '../util/MyPopup';

function DogCard({ dog: { id, bookedAt, name, walks } }) {
  const { user } = useContext(AuthContext);

  return (
    <MyPopup content={`Go to ${name}'s page`}>
      <Card fluid>
        <Card.Content as={Link} to={`/dogs/${id}`}>
          <Image
            floated="right"
            size="mini"
            src="https://dogecoin.com/imgs/doge.png"
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Booked {moment(bookedAt).fromNow(true)} ago</Card.Meta>
          <Card.Description>
            {name} was booked into Pet Lodge {moment(bookedAt).calendar()}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <WalkButton user={user} dog={{ id, walks }}></WalkButton>
        </Card.Content>
      </Card>
    </MyPopup>
  );
}

export default DogCard;
