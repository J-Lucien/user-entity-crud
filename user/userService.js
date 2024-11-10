const bcrypt = require('bcrypt');
const User = require('./user');

const saltRounds = 10;

async function createUser(req,res) {
    console.log("🚀 ~ createUser ~ req:", req.body);
    try {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password,saltRounds);
        const userdb = await User.create(user);
        return res.status(201).json(userdb);

    } catch (error) {
        console.log("🚀 ~ createUser ~ error:", error);
        if(error.name ==='SequelizeUniqueConstraintError'){
            const { message } = error.errors[0];
            return res.status(500).json({
                errors: message
            })
        }else if (error.name === 'SequelizeValidationError') {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ errors: errorMessages });
          }
        return res.status( 500 ).json( {
            error: 'Internal server error'
        } );
    }
}

async function getAllUsers(req,res) {
    try {
        const users = await User.findAll({
            include:'Entities',
            attributes: { exclude: ['password'] } 
        });
        return res.status(200).json(users);
    } catch (error) {
        console.log("🚀 ~ getAllUsers ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getById(req,res) {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id,{include:'Entities',attributes: { exclude: ['password'] } });
        if(!user){
            return res.status(404).json({message:'User non trouvé'});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ getById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateById(req,res) {

    try {
        const {id} = req.params;
        const { email } = req.body;
        if (email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser && existingUser.id !== parseInt(id, 10)) {
                return res.status(400).json({ message: 'Email must be unique' });
            }
        }
        const numUpdatedRows = User.update(
            req.body,
            {
                where: {
                    id:id
                }
            }
        )
       
        if(numUpdatedRows === 0){
            return res.status(404).json({ message: 'User non trouvé' });
        }
        const updatedUser = await User.findOne({ where: { id: id } });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("🚀 ~ updateById ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteUser(req,res) {
    try {
        const {id} = req.params;
        const numDeletedRows = await User.destroy({
            where:{
                id:id
            }
        })
        if(numDeletedRows === 0){
            return res.status(404).json({ message: 'User non trouvé' });
        }
        return res.status(200).json({message:'User supprimé avec succès !'})
    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getById,
    updateById,
    deleteUser
}