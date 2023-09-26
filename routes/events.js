/**
 * Rutas de  eventos /Events
 * host + /api/events
 */
const { Router } = require('express')
const router = Router()
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controlers/events')
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validateToken')
const { fielValidations } = require('../middlewares/fieldValidation')
const { isDate } = require('../helpers/isDate')
router.use(validateJWT)

// Obtener evento
router.get('/', getEvents)
// Crear evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    fielValidations
  ],

  createEvent
)
// Actualizar evento
router.put('/:id', updateEvent)
// Eliminar evento
router.delete('/:id', deleteEvent)

module.exports = router
