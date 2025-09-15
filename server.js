const express = require('express'); 
const app = express();
require('dotenv').config()
// require('./src/schedular1')
// require('./src/schedular2')
require('./src/llm/textllm')



const {redisConnection} = require('./DB/redisConfig')
const dbConnect = require('./DB/dbConfig')
const productRoute = require('./src/routes/productRoute')
const shopRoute = require('./src/routes/shopRoute')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRoute)
app.use('/api/shops', shopRoute)
app.get('/api',(req,res)=>{
    res.json('Advanced APIs Operations')
})

app.use((req, res) => {
    res.status(404).json({ status: 'fail', msg: 'page not found' });
});

app.use('/',(err,req,res,next)=>{
    res.status(500).json({
        message:err.message,
        stack:err.stack,
        trace:err.trace
    });
})



const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect()
    // redisConnection()
});