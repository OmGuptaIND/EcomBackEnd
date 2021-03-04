const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Environment Variable
env.config();

//Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');



//Middlewares
app.use(bodyParser.urlencoded({extended:true})) //used to parse data from json so we can output it;


//MongoDB connection
const db = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.oi2o4.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
mongoose.connect( db , {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>(console.log(`Database Connected !`)));

//routes;
app.use("/api", authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on ${process.env.PORT}`);
});