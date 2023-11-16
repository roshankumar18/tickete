const express = require('express');
const {dates} = require('./controller/dateController');
const { slot } = require('./controller/slotController');
const app = express()
app.get('/api/v1/experience/:id/dates',dates)
app.get('/api/v1/experience/:id/slots',slot)
app.listen(4000,()=>{
    console.log("Server started");
})



