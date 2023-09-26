const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { dbConnection } = require('./dataBase/config')

// servidor de express
const app = express()
//base de Datos
dbConnection()
// cors
app.use(cors())

// directorio público
app.use(express.static('public'))

//parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Conexión a la base de datos')

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor  corriendo en el puerto ${process.env.PORT}`)
})
