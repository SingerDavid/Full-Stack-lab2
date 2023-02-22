var express = require('express');
var router = express.Router();

const tempController = require('../controllers/tempController');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', tempController.temp_lists);

/* GET create temp form. */
router.get('/add', tempController.temp_create_get);

/* POST create temp. */
router.post('/add',
  body('tempFirst').trim().notEmpty().withMessage('First name can not be empty!'),
  body('tempLast').trim().notEmpty().withMessage('Last name can not be empty!'),
  tempController.temp_create_post);

/* GET single temp data. */
router.get('/:uuid', tempController.temp_single_detail);

/* GET delete temp data form. */
router.get('/:uuid/delete', tempController.temp_delete_get);

/* POST delete temp data. */
router.post('/:uuid/delete', tempController.temp_delete_post);

/* GET update temp data. */
router.get('/:uuid/update', tempController.temp_update_get);

/* POST update temp. */
router.post('/:uuid/update',
  body('tempFirst').trim().notEmpty().withMessage('First name can not be empty!'),
  body('tempLast').trim().notEmpty().withMessage('Last name can not be empty!'),
  tempController.temp_update_post);

module.exports = router;
