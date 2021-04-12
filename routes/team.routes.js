const router = require('express').Router();
const teamController = require('../controllers/team.controller');

//basics routes for crud team
router.get('/', teamController.showTeams);
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
//add/remove to wait list user
router.patch('/request-user/:id', teamController.requestUser);
router.patch('/cancel-request-user/:id', teamController.cancelRequestUser);
//show wait list user
router.get('/wait-list/:id', teamController.showWaitListUser);
//accept wait list user
router.patch('/accept-user/:id', teamController.acceptUser);
// add/remove to wait list game
router.patch('/request-game/id', teamController.requestGame);
router.patch('/cancel-request-game/:id', teamController.cancelRequestGame);


module.exports = router;
