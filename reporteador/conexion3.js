const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pos"
});

async function reporte(query){
  try {
    await con();
    const fields = await
  } catch (error) {
    
  } 
}

console.log('test');
reporte().then(() => {
  process.exit();
});