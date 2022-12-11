const PartyController = require('../controllers/party.controller');
const { authenticate, isLoggedIn } = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/parties', PartyController.getAll);
    app.post('/api/party', authenticate, PartyController.create);
    app.get('/api/party/:id', PartyController.getOne);
    app.put('/api/party/:id', PartyController.update);
    app.delete('/api/party/:id', PartyController.delete);
    app.get('/api/party/:id/:memberId', PartyController.getMemberFromParty)
}