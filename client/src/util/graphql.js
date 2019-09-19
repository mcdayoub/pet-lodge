import gql from 'graphql-tag';
export const FETCH_DOGS_QUERY = gql`
  {
    getDogs {
      id
      name
      bookedAt
      walks {
        id
        walkedAt
        username
      }
    }
  }
`;

export const FETCH_DOG_QUERY = gql`
  query($dogId: ID!) {
    getDog(dogId: $dogId) {
      name
      username
      bookedAt
      walks {
        id
        walkedAt
        username
      }
      id
    }
  }
`;

export const FETCH_DOGS_NEED_WALKED_QUERY = gql`
  {
    getDogsNeedWalked {
      id
      name
      bookedAt
      walks {
        id
        walkedAt
        username
      }
    }
  }
`;
