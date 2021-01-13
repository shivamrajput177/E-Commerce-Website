const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
var bodyParser = require('body-parser')

dotenv.config()
 
connectDB()


const app =express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send('API is running ...')
})

app.use('/api/products/',productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server Running on ${process.env.NODE_ENV} mode PORT ${PORT}`))