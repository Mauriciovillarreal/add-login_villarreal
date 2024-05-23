const { usersModel } = require('../models/users.model.js')

class UsersManagerMongo {
    constructor() {
        this.model = usersModel
    }

    getUsers = async () => {
        const users = await this.model.find()
        return users
    }

    getUsersBy = async (filter) => {
        return this.model.findOne(filter)
    }

    createUser = async (user) => {
        const result = await this.model.create(user)
        return result
    }

}

module.exports = UsersManagerMongo