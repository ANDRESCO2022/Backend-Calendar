const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
  // x-token
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No existe  token '
    })
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msq: 'Token Inválido'
    })
  }
  next()
}

module.exports = { validateJWT }
