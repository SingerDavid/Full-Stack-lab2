const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const betterSqlite3 = require('better-sqlite3');
const Temp = require('./Temp');
const makeDate = new Date();

//verbose is set to log all database operations
const db = new betterSqlite3(path.join(__dirname, '../data/data.sqlite'), {verbose: console.log});

const createTable = db.prepare("CREATE TABLE IF NOT EXISTS temp (id INTEGER PRIMARY KEY AUTOINCREMENT, first TEXT NOT NULL, last TEXT NOT NULL, email TEXT UNIQUE, note TEXT)");
createTable.run();

const repo = {
    findAll: () => {
        //return and array of objects, just like before
        const statement = db.prepare("SELECT * FROM temp");
        //this actually gets all of the results that satisfy the statement.
        const rows = statement.all();
        console.log(rows);
        let tempList = [];
        rows.forEach((row) => {
            const newTemp = new Temp(row.id, row.first, row.last, row.email, row.note);
            tempList.push(newTemp);
        });
        return tempList;
    },
    findById: (uuid) => {
        const statement = db.prepare("SELECT * FROM temp WHERE id = ?");
        const result = statement.get(uuid);
        return new Temp(result.id, result.first, result.last, result.email, result.note);
    },
    create: (temp) => {
        const statement = db.prepare("INSERT INTO temp (first, last, email, note) VALUES (?, ?, ?, ?)");
        const push = statement.run(temp.first, temp.last, temp.email, temp.note);
    },
    deleteById: (uuid) => {
        const statement = db.prepare("DELETE FROM temp WHERE id = ?");
        const remove = statement.run(uuid);
    },
    update: (temp) => {
        console.log(temp)
        const statement = db.prepare("UPDATE temp SET first = ?, last = ?, email = ?, note = ? WHERE id = ?");
        const push = statement.run(temp.first, temp.last, temp.email, temp.note, temp.id);
    },
};

//makes this a module to export for use elsewhere.
module.exports = repo;