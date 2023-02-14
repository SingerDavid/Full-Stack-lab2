const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const db = new Map();
//db.set('196a2223-0cfa-4a68-89f4-d79fd38d2cf5', {text: "this is temp 1", id: "196a2223-0cfa-4a68-89f4-d79fd38d2cf5"});
//db.set('2c93684d-4a73-4cf4-a8b7-4f6687482a99', {text: "this is temp 2", id: "2c93684d-4a73-4cf4-a8b7-4f6687482a99"});

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/data.json'));
    const dataArray = JSON.parse(jsonData);
    dataArray.forEach(element => {
        db.set(element[0], element[1]);
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
        const newData = {
            id: crypto.randomUUID(),
            text: temp.text
        };
        db.set(newData.id, newData)
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