const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('keyword_search.db', (error) => {
    console.log(error)
});

db.close()