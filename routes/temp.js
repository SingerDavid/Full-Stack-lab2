var express = require('express');
var router = express.Router();

const tempRepo = require('../src/fileDatabase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = tempRepo.findAll();
  res.render('temp', { title: 'Express Temp', temp: data });
});

/* GET create temp form. */
router.get('/add', function(req, res, next) {
  res.render('temp_add', { title: 'Add'});
});

/* POST create temp. */
router.post('/add', function(req, res, next) {
  //console.log(req.body);
  if (req.body.tempText.trim() === '') {
    res.render('temp_add', { title: 'Add Data', msg: 'Field can not be empty'})
  } else {
    tempRepo.create({text: req.body.tempText.trim()});
    res.redirect('/temp');
  }
});

/* GET single temp data. */
router.get('/:uuid', function(req, res, next) {
  const singleData = tempRepo.findById(req.params.uuid)
  if (singleData) {
    res.render('single_temp', { title: 'Single Result', singleData: singleData });
  } else {
    res.redirect('/temp');
  }
});

module.exports = router;
