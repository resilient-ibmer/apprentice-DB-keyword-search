const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('keyword_search.db', (error) => {
    if (error) return console.error(error.message);
    
    console.log("Connection Succesfull.");
});

const sql = "INSERT INTO processes (id, title) VALUES (?,?);"
const sql2 = "SELECT * FROM processes;"

// db.run(sql, [1, "Apply agile principles and practices"]);

db.all(sql2, (error, rows) => {
    if (error) return console.error(error.message);

    // This is where we would be looking for those keywords entered on the frontend.
    rows.forEach( (row) => {
        console.log(row);
    });
});

db.close((error) => {
    if (error) return console.error(error.message);
});
