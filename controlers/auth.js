const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generateToken } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email, password } = req.body
  try {
    let usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res.status(400).json({ ok: false, msg: 'El usuario ya existe' })
    }
    const user = new Usuario(req.body)
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()
    // generar JWT
    const token = await generateToken(user.id, user.name)

    res.status(201).json({ ok: true, uid: user.id, name: user.name, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error al registrar usuario' })
  }
}
const loginUser = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ ok: false, msg: 'usuario incorrecto' })
    }
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: 'contraseña incorrecta' })
    }
    // generar JWT
    const token = await generateToken(usuario.id, usuario.name)
    res
      .status(201)
      .json({ ok: true, uid: usuario.id, name: usuario.name, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, msg: 'Error al iniciar sesion ' })
  }
}
const renewToken = async (req, res = response) => {
  const { uid, name } = req

  const token = await generateToken(uid, name)
  res.json({ ok: true, uid, name, token })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}
