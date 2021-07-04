
const express = require('express');
const fs = require('fs');
const path = require('path');

const moment = require('moment');


const app = express();
   //body parse middleware
   app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use('/api/data',require('./routes/api/user'));

const logger = (req, res, next)=>{
    console.log(req.protocol+'://'+req.get('host')+req.originalUrl+'  '+moment().format());
    next();
}
app.use(logger);







app.get('/', (req, res) => {

    res.send('Hello world');

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('sever run complete on ' + PORT + ''));