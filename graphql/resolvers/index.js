const dogsResolvers = require('./dogs');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...dogsResolvers.Query
  },
  Mutation: {
    ...dogsResolvers.Mutation,
    ...usersResolvers.Mutation
  }
};
