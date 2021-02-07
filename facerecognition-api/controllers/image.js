const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ece29e8998e848f1b24542a3844b4aaa' // Free API key
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, // API for face recognition
      req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('API error'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1) // Add plus 1 to update the entries value
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
        })
    .catch(err => res.status(404).json('Error updating count'))
}

module.exports = {
    handleImage,
    handleApiCall
}