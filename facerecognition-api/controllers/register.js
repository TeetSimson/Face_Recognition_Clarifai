const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()); // Using regular expression to validate email
    }

    if (!email || !name || !password) { // If anything is empty then error
        return res.status(400).json('incorrect form submission') // Need to have return to not continue
    } else if (!validateEmail(email)) { 
        return res.status(400).json('incorrect form submission') // Need to have return to not continue
    }

    const salt = bcrypt.genSaltSync(saltRounds); // Generate Salt for hashing
    const hash = bcrypt.hashSync(password, salt); // Hash password
    db.transaction(trx => { // Transaction set up to check for both table matches (both tables must have same amount of users)
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]); // Returns registered user data 
                })
        })
        .then(trx.commit)
        .catch(trx.rollback) // Something fails we rollback the changes
    })
    .catch(err => res.status(404).json('Unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}