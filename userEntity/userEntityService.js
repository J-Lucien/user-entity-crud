
const UserEntity = require('./userEntity');
const User = require('../user/user');
const Entity = require('../entity/entity');

async function createUserEntity(req,res) {
    try {
        const { userId, entityId } = req.body;
        const userEntity = await UserEntity.create({userId,entityId});
        return res.status(201).json(userEntity);
    } catch (error) {
        console.log("🚀 ~ createUserEntity ~ error:", error)
        if(error.name === 'SequelizeForeignKeyConstraintError'){
            return res.status(400).json({error: `Vérifiez que l'ID de l'utilisateur et de l'entité existent`});
        }
        if(error.name === 'SequelizeValidationError'){
            const errorsMessage = error.errors.map(er => er.message);
            return res.status(500).json({errors:errorsMessage});
        }
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }
}

async function getAllUsersEntity(req, res) {
    try {
        const userEntities = await UserEntity.findAll({
            include: [
                {
                    model:User,
                    attributes: { exclude: ['password'] } 
                } ,Entity]
        });
        return res.status(200).json(userEntities);
    } catch (error) {
        console.log("🚀 ~ getAllUsersEntity ~ error:", error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getById(req,res) {
    try {
        const {id} = req.params;
        const userEntity = await UserEntity.findByPk(id,{include:[{
            model:User,
            attributes:{exclude:['password']}
        },Entity]});
        if(!userEntity){
            return res.status(404).json({message:'UserEntity non trouvé'});
        }
        return res.status(200).json(userEntity);
    } catch (error) {
        console.log("🚀 ~ getById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateById(req,res) {
    try {
        const {id} = req.params;
        
        const updatedUserEntity = await UserEntity.findOne({ where: { id: id } });
        if (!updatedUserEntity) {
            return res.status(400).json({ message: 'UserEntity non trouvé' });
        }
        const numUpdatedRows = UserEntity.update(
            req.body,
            {
                where: {
                    id:id
                }
            }
        )
       
        return res.status(200).json(updatedUserEntity);
    } catch (error) {
        console.log("🚀 ~ updateById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteUserEntity(req,res) {
    try {
        const {id} = req.params;
        const numDeletedRows = await UserEntity.destroy({
            where:{
                id:id
            }
        })
        if(numDeletedRows === 0){
            return res.status(404).json({ message: 'UserEntity non trouvé' });
        }
        return res.status(200).json({message:'UserEntity supprimé avec succès !'})
    } catch (error) {
        console.log("🚀 ~ deleteUserEntity ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createUserEntity,
    getAllUsersEntity,
    getById,
    updateById,
    deleteUserEntity
}