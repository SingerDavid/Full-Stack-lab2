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

/* GET delete temp data form. */
router.get('/:uuid/delete', function(req, res, next) {
  const temp = tempRepo.findById(req.params.uuid)
  res.render('temp_delete', { title: 'Delete Confirmation', temp: temp});
});

/* POST delete temp data. */
router.post('/:uuid/delete', function(req, res, next) {
  //delete from the repo and redirect
  tempRepo.deleteById(req.params.uuid);
  res.redirect('/temp')
});

/* GET update temp data. */
router.get('/:uuid/update', function(req, res, next) {
  const temp = tempRepo.findById(req.params.uuid)
  res.render('temp_update', { title: 'Update Data', temp: temp});
});

/* POST update temp. */
router.post('/:uuid/update', function(req, res, next) {
  //console.log(req.body);
  if (req.body.tempText.trim() === '') {
    const temp = tempRepo.findById(req.params.uuid)
    res.render('temp_update', { title: 'Update Data', msg: 'Field can not be empty', temp: temp})
  } else {
    //update db
    const updateTemp = {id: req.params.uuid, text: req.body.tempText.trim()}
    tempRepo.update(updateTemp);
    res.redirect(`/temp/${req.params.uuid}`);
  }
});

module.exports = router;
