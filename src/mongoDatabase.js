const crypto = require('crypto');
const fs = require('fs');
// const path = require('path');

// const betterSqlite3 = require('better-sqlite3');
const Temp = require('./Temp');
const makeDate = new Date();

//verbose is set to log all database operations
// const db = new betterSqlite3(path.join(__dirname, '../data/data.sqlite'), {verbose: console.log});

// const createTable = db.prepare("CREATE TABLE IF NOT EXISTS temp (id INTEGER PRIMARY KEY AUTOINCREMENT, first TEXT NOT NULL, last TEXT NOT NULL, email TEXT UNIQUE, note TEXT)");
// createTable.run();

const {MongoClient, ObjectId} = require('mongodb');

//atlas url here
const url = 'fffff'

const client = new MongoClient(url)

async function run() {
    await client.connect();
    return "Connected to the MongoDB Server..."
}

run().then(console.log).catch(console.error);

const repo = {
    findAll: async () => {

        let tempList = [];
        const tempCollection = client.db('express-temp').collection('temp');
        const cursor = tempCollection.find({});
        await cursor.forEach(doc => {
            console.log(doc)
            const newTemp = new Temp(doc._id.toString(), doc.first, doc.last, doc.email, doc.note)
            tempList.push(newTemp);
        });
        return tempList;
        // //return and array of objects, just like before
        // const statement = db.prepare("SELECT * FROM temp");
        // //this actually gets all of the results that satisfy the statement.
        // const rows = statement.all();
        // console.log(rows);
        // let tempList = [];
        // rows.forEach((row) => {
        //     const newTemp = new Temp(row.id, row.first, row.last, row.email, row.note);
        //     tempList.push(newTemp);
        // });
        // return tempList;
    },
    findById: async (uuid) => {
        // const statement = db.prepare("SELECT * FROM temp WHERE id = ?");
        // const result = statement.get(uuid);
        // return new Temp(result.id, result.first, result.last, result.email, result.note);
        const tempCollection = client.db('express-temp').collection('temp');
        const filter = {
            '_id': new ObjectId(uuid) //imported function, also do not need quotes on _id
        };
        const doc = await tempCollection.findOne(filter);
        return new Temp(doc._id.toString(), doc.first, doc.last, doc.email, doc.note)
    },
    create: async (temp) => {
        // const statement = db.prepare("INSERT INTO temp (first, last, email, note) VALUES (?, ?, ?, ?)");
        // const push = statement.run(temp.first, temp.last, temp.email, temp.note);
        const doc = {first: temp.first, last: temp.last, email: temp.email, note: temp.note};
        const tempCollection = client.db('express-temp').collection('temp');
        const result = await tempCollection.insertOne(doc);
        console.log(`A document was inserted with _id: ${result.insertedId}`)
    },
    deleteById: async (uuid) => {
        // const statement = db.prepare("DELETE FROM temp WHERE id = ?");
        // const remove = statement.run(uuid);

        const tempCollection = client.db('express-temp').collection('temp');
        const filter = {
            '_id': new ObjectId(uuid) //imported function, also do not need quotes on _id
        };
        const result = await tempCollection.deleteOne(filter);
        if (result.deletedCount === 1){
            console.log("Successfully deleted a doc.");
        } else {
            console.log("No docs matched the query, 0 deleted.");
        }
    },
    update: async (temp) => {
        console.log(temp)
        // const statement = db.prepare("UPDATE temp SET first = ?, last = ?, email = ?, note = ? WHERE id = ?");
        // const push = statement.run(temp.first, temp.last, temp.email, temp.note, temp.id);

        const tempCollection = client.db('express-temp').collection('temp');
        const filter = {
            '_id': new ObjectId(temp.id) //imported function, also do not need quotes on _id
        };
        const updateDoc = {
            $set: {
                first: temp.first,
                last: temp.last,
                email: temp.email,
                note: temp.note
            }
        };
        const result = await tempCollection.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} docs matched the filter, updated ${result.modifiedCount} document(s)`)
    },
};

//makes this a module to export for use elsewhere.
module.exports = repo;