const Router = require('express')
const router = new Router()
const userControllers = require('./controllers/userControllers')
const itemControllers = require('./controllers/itemControllers')
const authMiddleware = require('./middleware/authMiddleware')
const checkRoleMiddleware = require('./middleware/checkRoleMiddleware')

router.get('/auth', authMiddleware, userControllers.check)
router.get('/all', checkRoleMiddleware('ADMIN'), itemControllers.getAll)
router.post('/create', checkRoleMiddleware('ADMIN'), itemControllers.create)
router.get('/:id', checkRoleMiddleware('ADMIN'), itemControllers.getOne)

router.post('/reg', userControllers.registration)
router.post('/login', userControllers.login)

module.exports = router
