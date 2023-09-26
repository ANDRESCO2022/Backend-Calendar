/**
 * Rutas de usuarios/AUTH
 * host + /api/auth
 */
const { Router } = require('express')
const { check } = require('express-validator')
const { fielValidations } = require('../middlewares/fieldValidation')
const router = Router()
const { createUser, loginUser, renewToken } = require('../controlers/auth')
const { validateJWT } = require('../middlewares/validateToken')

router.post(
  '/new',
  [
    // midelwares
    check('name', 'el nombre  es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({
      min: 6
    }),
    fielValidations
  ],
  createUser
)
router.post(
  '/',
  [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({
      min: 6
    }),
    fielValidations
  ],
  loginUser
)
router.get('/renew', validateJWT, renewToken)

module.exports = router
