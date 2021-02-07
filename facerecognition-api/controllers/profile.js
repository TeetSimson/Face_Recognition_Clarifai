const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id}) // Get user from database (db)
        .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Error finding user')
        }
    })
    .catch(err => res.status(404).json('Error getting user'))
}

module.exports = {
    handleProfile // In ES6 we dont need to do handleProfile: handleProfile bc these are same
}