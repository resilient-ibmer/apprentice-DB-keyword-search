const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('keyword_search.db', (error) => {
    if (error) return console.error(error.message);
    
    console.log("Connection Succesfull.");
});

// INSERT INTO competencies (id, title)
// VALUES (1, "Understand and demonstrate DevOps automation");

// INSERT INTO criterias (title, competency)
// VALUES ("Articulate the value of automation to the development lifecycle", 20);

// UPDATE competencies
// SET id = 20
// WHERE id = 1;

function insertTableRows(table, params){
    const sql = "INSERT INTO processes (id, title) VALUES (?,?);"
    db.run(sql, [1, "Apply agile principles and practices"]);
}

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


// It's just good practice \0_0/
db.close((error) => {
    if (error) return console.error(error.message);
});