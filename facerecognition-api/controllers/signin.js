const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body; 

    if (!email || !password) { // If anything is empty then error
        return res.status(400).json('incorrect form submission') // Need to have return to not continue
    }

    db.select('email', 'hash').from('login') 
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // Comparing hashes
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('Unable to get user'));
            } else {
                res.status(404).json('Wrong credentials');
            }
        })
        .catch(err => res.status(404).json('Wrong credentials'))

    // FAKE DATABASE WHEN POSTGRE WAS NOT YET SETUP - FOR MY FUTURE REFERENCE
    /* if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('Login failed')
        } */
}

module.exports = {
    handleSignin: handleSignin
}