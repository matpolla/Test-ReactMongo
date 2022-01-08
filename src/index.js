// archivo de node js crearr e inicializar el servidor

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {mongoose} = require('./database');
const app = express();
const routes =require('./routes/task.routes');


//settings
app.set('port', process.env.PORT || 3000);


//Middelwares
app.use(morgan('dev'));
app.use(express.json());
//Routes

app.use('/api/task/', routes);


//Statics files
//console.log();
app.use(express.static(path.join(__dirname,'public')));


//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



