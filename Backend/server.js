const path = require('path')
const express = require('express')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config()
 
connectDB()


const app =express()

app.use(express.json())

// app.get('/', (req,res) => {
//     res.send('API is running ...')
// })


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
// const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'))
    )
  } 
//   else {
//     app.get('/', (req, res) => {
//       res.send('API is running....')
//     })
//   }

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server Running on ${process.env.NODE_ENV} mode PORT ${PORT}`))