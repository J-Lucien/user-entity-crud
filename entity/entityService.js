
const User = require('../user/user');
const Entity = require('./entity');

async function createEntity(req,res) {
    try {
        const entity = await Entity.create(req.body);
        return res.status(201).json(entity);
    } catch (error) {
        console.log("🚀 ~ createEntity ~ error:", error)
        if (error.name === 'SequelizeValidationError') {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ errors: errorMessages });
        }
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }
    
}

async function getAllEntity(req,res) {
    try {
        const entities = await Entity.findAll({ 
            include: {
                model:User,
                as:'Users',
                attributes:{exclude:['password']}
            }
        });
        return res.status(200).json(entities);
    } catch (error) {
        console.log("🚀 ~ getAllEntity ~ error:", error)
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }
}

async function getById(req,res) {
    try {
        const {id} = req.params;
        const entity = await Entity.findByPk(id,{
            include: {
                model:User,
                as:'Users',
                attributes:{exclude:['password','UserEntity']}
            }
        });
        if(!entity){
            return res.status(404).json({message:'Entity non trouvé'});
        }
        return res.status(200).json(entity);
    } catch (error) {
        console.log("🚀 ~ getById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateById(req,res) {
    try {
        const {id} = req.params;
        const numUpdatedRows = Entity.update(
            req.body,
            {
                where: {
                    id:id
                }
            }
        )
        if(numUpdatedRows === 0){
            return res.status(404).json({ message: 'Entity non trouvé' });
        }
        const updatedEntity = await Entity.findOne({ where: { id: id } });

        return res.status(200).json(updatedEntity);
    } catch (error) {
        console.log("🚀 ~ updateById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteEntity(req,res) {
    try {
        const {id} = req.params;
        const numDeletedRows = await Entity.destroy({
            where:{
                id:id
            }
        })
        if(numDeletedRows === 0){
            return res.status(404).json({ message: 'Entity non trouvé' });
        }
        return res.status(200).json({message:'Entity supprimé avec succès !'})
    } catch (error) {
        console.log("🚀 ~ deleteEntity ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createEntity,
    getAllEntity,
    getById,
    updateById,
    deleteEntity
}