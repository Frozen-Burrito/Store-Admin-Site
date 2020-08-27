const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const passport = require('passport');
const session = require('express-session');

const router = require('./Routes/index');
const userRouter = require('./Routes/users');
const itemRouter = require('./Routes/items');
const categoryRouter = require('./Routes/categories');

const connectMongoDB = require('./Config/connectMongoDB');
const passportStrategy = require('./Config/passport');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env'})
}

// View Engine
app.set('view engine', 'ejs');  
app.use(expressLayouts);

// Database config
connectMongoDB(process.env.MONGODB_URL);

// Static Files
app.use(express.static('Public'));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Auth
passportStrategy(passport);

app.use(session({
    secret: 'A secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/v1', router);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/categories', categoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server on port ${PORT}`));

