var express = require('express');
var router = express.Router();

const { createUserEntity, getAllUsersEntity, getById, updateById, deleteUserEntity } = require('../userEntity/userEntityService');

router.post('/',createUserEntity);
router.get('/',getAllUsersEntity);
router.get('/:id',getById);
router.put('/:id',updateById);
router.delete('/:id',deleteUserEntity);

module.exports = router;