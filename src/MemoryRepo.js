const crypto = require('crypto');
const db = new Map();
db.set('196a2223-0cfa-4a68-89f4-d79fd38d2cf5', {text: "this is temp 1", id: "196a2223-0cfa-4a68-89f4-d79fd38d2cf5"});
db.set('2c93684d-4a73-4cf4-a8b7-4f6687482a99', {text: "this is temp 2", id: "2c93684d-4a73-4cf4-a8b7-4f6687482a99"});

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (temp) => {
        const newData = {
            id: crypto.randomUUID(),
            text: temp.text
        };
        db.set(newData.id, newData)
    },
    deleteById: (uuid) => db.delete(uuid),
    update: (temp) => db.set(temp.id, temp),
};

//makes this a module to export for use elsewhere.
module.exports = repo;