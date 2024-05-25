// const fs = require(`node:fs`)
const express = require('express')
const ProductsManagerMongo = require('../dao/productsManagerMongo.js')
const CartsManagerMongo = require('../dao/cartManagerMongo.js')
const { chatsModel } = require('../models/chat.model.js')

const router = express.Router()
const productsService = new ProductsManagerMongo()
const cartsService = new CartsManagerMongo()

router.get('/', async (req, res) => {
    try {
        let user = null
        if (req.session.user) {
            user = {
                name: req.session.user.first_name,
                lastname: req.session.user.last_name,
                isAdmin: req.session.user.admin,
                email: req.session.user.email
            }
        }
        const { numPage, limit } = req.query
        const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getProducts({ limit, numPage },)
        res.render('products', {
            user,
            products: docs,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            styles: 'homeStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while fetching products:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        let user = null
        if (req.session.user) {
            user = {
                name: req.session.user.first_name,
                lastname: req.session.user.last_name,
                isAdmin: req.session.user.admin,
                email: req.session.user.email
            }
        }
        const products = await productsService.getProducts({})
        res.render('realTimeProducts', {
            user,
            products,
            styles: 'homeStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while fetching products:", error)
        res.status(500).send("Internal server error")
    }
})

router.get('/chat', async (req, res) => {
    try {
        let user = null
        if (req.session.user) {
            user = {
                name: req.session.user.first_name,
                lastname: req.session.user.last_name,
                isAdmin: req.session.user.admin,
                email: req.session.user.email
            }
        }
        const messages = await chatsModel.find({})
        res.render('chat', {
            user,
            messages,
            styles: 'homeStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while fetching messages:", error)
        res.status(500).send("Internal server error")
    }
})

router.get('/cart', async (req, res) => {
    try {
        const { cid } = req.params
        const carts = await cartsService.getCarts(cid)
        const products = await productsService.getProducts({})
        res.render('cart', {
            carts,
            products: products,
            styles: 'homeStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while fetching carts:", error)
        res.status(500).send("Internal server error: " + error.message)
    }
})

router.get('/login', async (req, res) => {
    res.render('login', {
        styles: 'homeStyles.css'
    })
})

router.get('/register', async (req, res) => {
    res.render('register', {
        styles: 'homeStyles.css'
    })
})

module.exports = router