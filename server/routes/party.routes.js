const PartyController = require('../controllers/party.controller');

module.exports = app => {
    app.get('/api/parties', PartyController.getAll);
    app.post('/api/party', PartyController.create);
    app.get('/api/party/:id', PartyController.getOne);
    app.put('/api/party/:id', PartyController.update);
    app.delete('/api/party/:id', PartyController.delete);
}