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
        if (req.isAuthenticated()) {
            user = {
                name: req.user.first_name,
                lastname: req.user.last_name,
                role: req.user.admin,
                email: req.user.email
            }
        }
        const { numPage, limit, brands, category } = req.query
        const filter = {}
        if (brands) filter.brands = brands
        if (category) filter.category = category

        const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getProducts({ limit, numPage, filter })
        const brandsList = await productsService.getBrands()
        const categories = await productsService.getCategories()

        const { cid } = req.params
        const carts = await cartsService.getCarts(cid)


        res.render('products', {
            carts,
            user,
            products: docs,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            brands: brandsList,
            categories,
            styles: 'homeStyles.css',
            stylesNav: 'navBarStyles.css',
            stylesProducts: 'productsStyles.css',
            stylesProductDetail: 'productDetailStyles.css',
            stylesRealTime: 'realTimeStyles.css',
            stylesChat: 'chatStyles.css',
            stylesLoginRegister: 'loginRegisterStyles.css',
            stylesCart: 'cartStyles.css',
        })

    } catch (error) {
        console.error("Error occurred while fetching data:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/productdetail/:_id', async (req, res) => {
    try {
        let user = null
        const { _id } = req.params

        // Check if the user is authenticated
        if (req.isAuthenticated()) {
            user = {
                name: req.user.first_name,
                lastname: req.user.last_name,
                role: req.user.admin,
                email: req.user.email
            }
        }

        const product = await productsService.getProductsById(_id)
        res.render('productDetail', {
            product,
            user,
            styles: 'homeStyles.css',
            stylesNav: 'navBarStyles.css',
            stylesProducts: 'productsStyles.css',
            stylesProductDetail: 'productDetailStyles.css',
            stylesRealTime: 'realTimeStyles.css',
            stylesChat: 'chatStyles.css',
            stylesLoginRegister: 'loginRegisterStyles.css',
            stylesCart: 'cartStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while rendering product detail:", error)
        res.status(500).send("Internal server error")
    }
})


router.get('/realtimeproducts', async (req, res) => {
    try {
        let user = null
        if (req.isAuthenticated()) {
            user = {
                name: req.user.first_name,
                lastname: req.user.last_name,
                role: req.user.admin,
                email: req.user.email
            }
        }
        const products = await productsService.getProducts({})
        res.render('realTimeProducts', {
            user,
            products,
            styles: 'homeStyles.css',
            stylesNav: 'navBarStyles.css',
            stylesProducts: 'productsStyles.css',
            stylesProductDetail: 'productDetailStyles.css',
            stylesRealTime: 'realTimeStyles.css',
            stylesChat: 'chatStyles.css',
            stylesLoginRegister: 'loginRegisterStyles.css',
            stylesCart: 'cartStyles.css',
        })
    } catch (error) {
        console.error("Error occurred while fetching products:", error)
        res.status(500).send("Internal server error")
    }
})

router.get('/chat', async (req, res) => {
    try {
        let user = null
        if (req.isAuthenticated()) {
            user = {
                name: req.user.first_name,
                lastname: req.user.last_name,
                role: req.user.admin,
                email: req.user.email
            }
        }
        const messages = await chatsModel.find({})
        res.render('chat', {
            user,
            messages,
            styles: 'homeStyles.css',
            stylesNav: 'navBarStyles.css',
            stylesProducts: 'productsStyles.css',
            stylesProductDetail: 'productDetailStyles.css',
            stylesRealTime: 'realTimeStyles.css',
            stylesChat: 'chatStyles.css',
            stylesLoginRegister: 'loginRegisterStyles.css',
            stylesCart: 'cartStyles.css',
        })
    } catch (error) {
        console.error("Error occurred while fetching messages:", error)
        res.status(500).send("Internal server error")
    }
})

router.get('/cart', async (req, res) => {
    try {
        let user = null
        if (req.isAuthenticated()) {
            user = {
                name: req.user.first_name,
                lastname: req.user.last_name,
                role: req.user.admin,
                email: req.user.email
            }
        }
        const { cid } = req.params
        const carts = await cartsService.getCarts(cid)
        const products = await productsService.getProducts({})
        res.render('cart', {
            user,
            carts,
            products: products,
            styles: 'homeStyles.css',
            stylesCart: 'cartStyles.css',
            stylesNav: 'navBarStyles.css',
            stylesProducts: 'productsStyles.css',
            stylesProductDetail: 'productDetailStyles.css',
            stylesRealTime: 'realTimeStyles.css',
            stylesChat: 'chatStyles.css',
            stylesLoginRegister: 'loginRegisterStyles.css'
        })
    } catch (error) {
        console.error("Error occurred while fetching carts:", error)
        res.status(500).send("Internal server error: " + error.message)
    }
})

router.get('/login', async (req, res) => {
    const error = req.session.error
    delete req.session.error
    res.render('login', {
        error: error || null,
        styles: 'homeStyles.css',
        stylesNav: 'navBarStyles.css',
        stylesProducts: 'productsStyles.css',
        stylesProductDetail: 'productDetailStyles.css',
        stylesRealTime: 'realTimeStyles.css',
        stylesChat: 'chatStyles.css',
        stylesLoginRegister: 'loginRegisterStyles.css',
        stylesCart: 'cartStyles.css',
    })
})

router.get('/register', async (req, res) => {
    const error = req.session.error
    delete req.session.error
    res.render('register', {
        error: error || null,
        styles: 'homeStyles.css',
        stylesNav: 'navBarStyles.css',
        stylesProducts: 'productsStyles.css',
        stylesProductDetail: 'productDetailStyles.css',
        stylesRealTime: 'realTimeStyles.css',
        stylesChat: 'chatStyles.css',
        stylesLoginRegister: 'loginRegisterStyles.css',
        stylesCart: 'cartStyles.css',
    })
})

module.exports = router