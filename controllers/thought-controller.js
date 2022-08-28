const { Thought, User } = require('../models');

const thoughtController = {

   // GET all thoughts
   getAllThought(req, res) {
      Thought.find({})
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => {
            console.log(err);
            res.status(404).json(err);
         });
   },

   // GET individual thought by ID
   getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // create (POST) user thought
   createThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $push: { thoughts: _id } },
               { new: true, runValidators: true }
            );
         })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   // update (PUT) thought
   updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.status(404).json(err));
   },

   // update (PUT) thought by adding new reaction
   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.id },
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      )
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.json(err));
   },

   // DELETE thought
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
         .then((dbThoughtData) => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No thought found with this id!' });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch((err) => res.status(400).json(err));
   },

   // update (PUT) thought by deleting reaction
   removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.id },
         { $pull: { reactions: { reactionId: params.reactionId } } },
         { new: true }
      )
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => res.json(err));
   }
};

module.exports = thoughtController;