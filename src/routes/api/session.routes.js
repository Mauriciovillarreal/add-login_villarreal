const express = require('express')
const UsersManagerMongo = require('../../dao/usersManagerMongo.js')
const passport = require('passport')

const sessionsRouter = express.Router()

// const userService = new UsersManagerMongo()

// sessionsRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         req.session.error = 'Missing data'
//         return res.redirect('/login')
//     }
//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.user = {
//             first_name: 'Admin',
//             last_name: 'Coder',
//             email: 'adminCoder@coder.com',
//             admin: true
//         }
//         return res.redirect("/")
//     }
//     const result = await userService.getUsersBy({ email })
//     if (!result) {
//         req.session.error = 'Email or password incorrect'
//         return res.redirect('/login')
//     }
//     if (!IsValidPassword(password, result)) {
//         req.session.error = 'Email or password incorrect'
//         return res.redirect('/login')
//     }
//     req.session.user = {
//         email: result.email,
//         first_name: result.first_name,
//         last_name: result.last_name,
//         admin: result.role === 'admin'
//     }
//     res.redirect("/")
// })


// sessionsRouter.post('/register', async (req, res) => {
//     try {
//         const { first_name, last_name, email, age, password } = req.body
//         if (!email || !password) {
//             req.session.error = 'Complete all the data'
//             return res.redirect('/register')
//         }
//         const userExist = await userService.getUsersBy({ email })
//         if (userExist) {
//             req.session.error = 'Existing user'
//             return res.redirect('/login')
//         }
//         const newUser = {
//             first_name,
//             last_name,
//             email,
//             age,
//             password: createHash(password)
//         }
//         const result = await userService.createUser(newUser)
//         res.redirect("/login")
//     } catch (error) {
//         console.log(error)
//     }
// })
sessionsRouter.get('/github',
    passport.authenticate('github', { scope: 'user:email' }), async (req, res) => { })


sessionsRouter.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    })

sessionsRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', (error, user, info) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      req.session.error = 'Email or password incorrect'
      return res.redirect('/login')
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

sessionsRouter.post('/register', (req, res, next) => {
  passport.authenticate('register', (error, user, info) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      req.session.error = 'Error registering user'
      return res.redirect('/register')
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error)
      }
      return res.redirect('/login')
    })
  })(req, res, next)
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send({ status: 'error', error: error })
        else return res.redirect("/login")
    })
})

module.exports = sessionsRouter