const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./config/dbconnect');

const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRouters');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(express.json());

// Connect DB
db.connect();

//Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});