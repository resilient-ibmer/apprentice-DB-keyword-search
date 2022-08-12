const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('keyword_search.db', (error) => {
    if (error) return console.error(error.message);
    
    console.log("Connection Succesfull.");
});


function insertTableRows(process){
    const {id, title, criteria} = process;
    const sql = "INSERT INTO processes (id, title) VALUES (?,?);"

    db.run(sql, [id, title], (error) => {
        return console.log(error)
    });

    if (Array.isArray(criteria) && criteria.length){
        // add to criteri
        criteriaforEach()
    };
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
