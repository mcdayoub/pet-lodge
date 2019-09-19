const { AuthenticationError, UserInputError } = require('apollo-server');
const Dog = require('../../models/Dog');
const checkAuth = require('../../util/check_auth');

module.exports = {
  Query: {
    async getDogs() {
      try {
        const dogs = await Dog.find().sort({ bookedAt: -1 });
        return dogs;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getDog(_, { dogId }) {
      try {
        const dog = await Dog.findById(dogId);
        if (dog) {
          return dog;
        } else {
          throw new Error('Dog not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getDogsNeedWalked() {
      try {
        let now = new Date();
        nowIso = new Date().toISOString();
        now.setHours(now.getHours() - 1);
        var oneHour = now.toISOString();
        const dogs = await Dog.find()
          .where('lastWalked')
          .lt(oneHour)
          .sort({ lastWalked: 1 });
        return dogs;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async addDog(_, { name, lastWalked }, context) {
      const user = checkAuth(context);

      if (name.trim() === '') {
        throw new Error('Dog must have a name');
      }
      let now = new Date();
      nowIso = new Date().toISOString();
      now.setHours(now.getHours() - 2);
      var twoHours = now.toISOString();

      const newDog = new Dog({
        bookedAt: new Date().toISOString(),
        lastWalked: twoHours,
        name,
        user: user.id,
        username: user.username
      });

      const dog = await newDog.save();

      return dog;
    },
    async checkoutDog(_, { dogId }, context) {
      const user = checkAuth(context);
      try {
        const dog = await Dog.findById(dogId);
        if (user.username === dog.username) {
          await dog.delete();
          return 'dog checked out';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async walkDog(_, { dogId }, context) {
      const { username } = checkAuth(context);
      const dog = await Dog.findById(dogId);
      let now = new Date();
      nowIso = new Date().toISOString();
      now.setHours(now.getHours() - 1);
      var oneHour = now.toISOString();
      try {
        if (dog) {
          console.log(dog.lastWalked);
          if (dog.lastWalked > oneHour) {
            throw new UserInputError('Dog was walked less than an hour ago!');
          }
          dog.lastWalked = new Date().toISOString();
          dog.walks.push({
            username,
            walkedAt: new Date().toISOString()
          });

          await dog.save();
          return dog;
        } else {
          throw new UserInputError('Dog not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
