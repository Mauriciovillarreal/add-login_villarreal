const express = require('express')
const UsersManagerMongo = require('../../dao/usersManagerMongo.js')

const sessionsRouter = express.Router()

const userService = new UsersManagerMongo()

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(401).send({ status: 'error', error: 'se deben completar todos los campos' })
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            first_name: 'Admin',
            last_name: 'Coder',
            email: 'adminCoder@coder.com',
            admin: true
        }
        return res.redirect("/products")
    }
    const result = await userService.getUsersBy({ email, password })
    if (!result)
        return res.status(401).send({ status: 'error', error: 'no encontró el usuario' })
    req.session.user = {
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        admin: result.role === 'admin'
    }
    console.log(result)
    res.redirect("/products")
})


sessionsRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        if (!email || !password)
            return res.status(401).send({ status: 'error', error: 'se deben completar todos los campos' })
        const userExist = await userService.getUsersBy({ email })
        if (userExist)
            return res.status(401).send({ status: 'error', error: 'el usuario ya existe' })
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const result = await userService.createUser(newUser)
        console.log(result)
        res.redirect("/login")
    } catch (error) {
        console.log(error)
    }
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(err) return res.send({status: 'error', error: err})
        else return res.redirect("/login")
    })
})

module.exports = sessionsRouter