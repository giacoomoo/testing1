const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require ('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);  // /api/users
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);  // /api/users/:userId


module.exports = router;        



