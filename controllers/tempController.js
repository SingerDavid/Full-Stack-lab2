const tempRepo = require('../src/mongoDatabase');
const { validationResult } = require('express-validator');
const Temp = require('../src/Temp');


/* GET users listing. */
exports.temp_lists = async function(req, res, next) {
  const data = await tempRepo.findAll();
  res.render('temp', { title: 'View All Contacts', temp: data });
};

/* GET create temp form. */
exports.temp_create_get = function(req, res, next) {
  res.render('temp_add', { title: 'Add New Contact'});
};

/* POST create temp. */
exports.temp_create_post = async function(req, res, next) {
  //console.log(req.body);
  //validation result capture
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('temp_add', { title: 'Add Data', msg: result.array()})
  } else {
    const newTemp = new Temp('', req.body.tempFirst, req.body.tempLast, req.body.tempEmail, req.body.tempNote, '')
    tempRepo.create(newTemp);
    res.redirect('/temp');
  }
};

/* GET single temp data. */
exports.temp_single_detail = async function(req, res, next) {
  const singleData = await tempRepo.findById(req.params.uuid)
  if (singleData) {
    res.render('single_temp', { title: 'Contact Information', singleData: singleData });
  } else {
    res.redirect('/temp');
  }
};

/* GET delete temp data form. */
exports.temp_delete_get = async function(req, res, next) {
  const temp = await tempRepo.findById(req.params.uuid)
  res.render('temp_delete', { title: 'Delete Confirmation', temp: temp});
};

/* POST delete temp data. */
exports.temp_delete_post = async function(req, res, next) {
  //delete from the repo and redirect
  await tempRepo.deleteById(req.params.uuid);
  res.redirect('/temp')
};

/* GET update temp data. */
exports.temp_update_get = async function(req, res, next) {
  const temp = await tempRepo.findById(req.params.uuid)
  res.render('temp_update', { title: 'Update Data', temp: temp});
};

/* POST update temp. */
exports.temp_update_post = async function(req, res, next) {
  console.log(req.body);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const temp =  await tempRepo.findById(req.params.uuid)
    res.render('temp_update', { title: 'Update Data', msg: result.array(), temp: temp})
  } else {
    //update db
    const updateTemp = new Temp(req.params.uuid, req.body.tempFirst.trim(), req.body.tempLast.trim(), req.body.tempEmail.trim(), req.body.tempNote.trim())
    await tempRepo.update(updateTemp);
    res.redirect(`/temp/${req.params.uuid}`);
  }
};