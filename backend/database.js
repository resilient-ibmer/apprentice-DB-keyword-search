const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { MongoClient } = require("mongodb");

const {MONGO_USER, MONGO_PASSWORD} = dotenv.parsed;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vrvlw6h.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function getAllProcesses() {
  try {
    const database = client.db('applicationDeveloper');
    const collection = database.collection('processes')
    const processes = await collection.find().toArray();

    console.log("database.js", processes);
    return processes;
  }
  catch {
    console.dir;
  }
}


function isValidArray(array){
    if (Array.isArray(array) && array.length){
        return true;
    } else{
        return false;
    }
};

// exports.insertIntoProceses = insertIntoProceses;
exports.getAllProcesses = getAllProcesses;