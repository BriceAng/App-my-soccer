const router = require('express').Router();
const teamController = require('../controllers/team.controller');

router.get('/', teamController.showTeams);
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);



module.exports = router;
