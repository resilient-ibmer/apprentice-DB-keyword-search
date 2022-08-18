const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


if (dotenv.error) {
    // Something went wrong
    console.error(dotenv.error);
  } else {
    // Log parsed values
    console.log(dotenv.parsed);
  }

const { MongoClient } = require("mongodb");

// console.log(path.resolve(__dirname, '../.env'))
// console.log(proccess.env.MONGO_USER)

const uri = "mongodb+srv://arvinf07:n8gLWTZdtFYAJA74@cluster0.vrvlw6h.mongodb.net/?retryWrites=true&w=majority"

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