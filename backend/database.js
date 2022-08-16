const { title } = require('process');

// Until I figure out how to let SQL take care of ID assignment
let criteriaID = 0;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('keyword_search.db', (error) => {
    if (error) return console.error(error.message);
    console.log("Connection Succesfull.");
});

function insertIntoProceses(processes){ 
    if (isValidArray(processes)){
        processes.forEach( (process) => {
            const {id, title, criteria} = process;
            const sql = "INSERT INTO processes (id, title) VALUES (?,?);"

            db.run(sql, [id, title], (error) => {
                if (error) return console.log(error);
            });

            if (isValidArray(criteria)){
                insertIntoCriteria(id, criteria);
            };
        });
    };
};

function insertIntoCriteria(processID, criteria){
    const sql = "INSERT INTO criteria (id, title, process_id) VALUES (?, ?, ?);"
    
    criteria.forEach( title => {
        criteriaID++;
        db.run(sql, [criteriaID, title, processID], (error) => {
            if (error) return console.log(error.message);
        });
    });
};

function printTableRows(table){
    const sql2 = "SELECT * FROM processes;"
    
    db.all(sql2, (error, rows) => {
        if (error) return console.error(error.message);
        
        // This is where we would be looking for those keywords entered on the frontend.
        rows.forEach( (row) => {
            console.log(row);
        });
    });
};

function isValidArray(array){
    if (Array.isArray(array) && array.length){
        return true;
    } else{
        return false;
    }
};

// // It's just good practice \0_0/
// db.close((error) => {
    //     if (error) return console.error(error.message);
    // });
    
exports.insertIntoProceses = insertIntoProceses;