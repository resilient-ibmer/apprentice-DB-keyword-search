const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { MongoClient } = require("mongodb");

const {MONGO_USER, MONGO_PASSWORD} = dotenv.parsed;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vrvlw6h.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);
const database = client.db('applicationDeveloper');
const collection = database.collection('processes')

async function getAllProcesses() {
  try {
    const processes = await collection.find().toArray();

    return processes;
  }
  catch (e) {
    console.log(e);
  }
}

async function insertAllProcesses(processes){
    try {
        const result = await collection.insertMany(processes);
    
        console.log(result);
      }
      catch (e) {
        console.log(e);
      };
};

function isValidArray(array){
    if (Array.isArray(array) && array.length){
        return true;
    } else{
        return false;
    }
};

exports.insertAllProcesses = insertAllProcesses;
exports.getAllProcesses = getAllProcesses;