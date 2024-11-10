var express = require('express');
var router = express.Router();

const {createEntity, getAllEntity, getById, updateById, deleteEntity} = require('../entity/entityService');

router.post('/',createEntity);
router.get('/',getAllEntity);
router.get('/:id',getById);
router.put('/:id',updateById);
router.delete('/:id',deleteEntity);

module.exports = router;