const User = require('../../models/User');

module.exports = {
    async getUsers(req, res) {  // return all users in the database     
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async getSingleUser(req, res) {    // return a single user by their id
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
          
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
          
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async createUser(req, res) {  
                try {
                  const dbUserData = await User.create(req.body);
                  res.json(dbUserData);
                } catch (err) {
                  res.status(500).json(err);
                }
              },
 
    async updateUser(req, res) {  // update a user by their id
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
          
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }      
      },

      async deleteUser(req, res) {  // delete a user by their id and remove friends from a user's friend list
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
          
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          
          const userFriends = await User.find({ friends: req.params.userId });
          
          if (userFriends.length) {
            return res.status(400).json({ message: 'User has friends' });
          }
          
          res.json({ message: 'User successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };
