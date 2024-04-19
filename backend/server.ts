const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const {connectDB} = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req: any, res: any) => {
    res.status(201).json({message: 'Welcome to the GET method'});
});

//Routes:
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));