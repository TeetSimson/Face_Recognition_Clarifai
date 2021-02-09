const express = require('express');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

// Start express and cors
app.use(express.json());
app.use(cors()) // For local web development

// GET all users
app.get('/', (req, res) => { res.send('working') })

// Signin function in separate file, passing database and hashing (bcrypt) as well
// POST not PUT because we want to send user credentials through body securely over https
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) }) 
// GET user
app.get('/profile/:id', (req, res, db) => { profile.handleProfile(req, res, db) })
// PUT because we update image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
    /* database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('No such user')
    } */

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

// Server starts listening
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})