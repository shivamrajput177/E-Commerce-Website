const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
 
connectDB()


const app =express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running ...')
})

app.use('/api/products/',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server Running on ${process.env.NODE_ENV} mode PORT ${PORT}`))