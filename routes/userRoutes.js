var express = require('express');
var router = express.Router();

const {createUser,getAllUsers, getById, updateById, deleteUser} = require('../user/userService');

router.get('/', getAllUsers);
router.post('/',createUser);
router.get('/:id',getById);
router.put('/:id',updateById);
router.delete('/:id',deleteUser);

module.exports = router;
