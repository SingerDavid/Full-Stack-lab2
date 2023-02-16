const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const db = new Map();
const Temp = require('./Temp');
//db.set('196a2223-0cfa-4a68-89f4-d79fd38d2cf5', {text: "this is temp 1", id: "196a2223-0cfa-4a68-89f4-d79fd38d2cf5"});
//db.set('2c93684d-4a73-4cf4-a8b7-4f6687482a99', {text: "this is temp 2", id: "2c93684d-4a73-4cf4-a8b7-4f6687482a99"});

const loadData = () => {
    //now that we pass objects when saving this to json and reloading it we lose the serialized connection of the object.
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/data.json'));
    const dataArray = JSON.parse(jsonData);
    dataArray.forEach(element => {
        //change to previous comment is below - essentially recreate it as an object, to know it in memory.
        const aTemp = new Temp(element[1].id, element[1].text)
        db.set(aTemp.id, aTemp);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/data.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (temp) => {
        temp.id = crypto.randomUUID(),
        db.set(temp.id, temp)
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (temp) => {
        db.set(temp.id, temp);
        saveData();
    },
};

//pull file from data on load
loadData();

//makes this a module to export for use elsewhere.
module.exports = repo;