const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vaxpass",
    port: "3306"
  });

  connection.connect((err)=>{
      if (err){
        console.log("Something went wrong!");
        console.log(err.message);
      }
      else{
        console.log("Connection Successfull!");
        console.log('db status :' + connection.state);
      }
  })


  connection.query('INSERT INTO records (nic) VALUES ("dadads");', (err,rows) => {
    if(err) throw err;
  });

  // connection.query('SELECT * FROM records', (err,rows) => {
  //   if(err) throw err;
  //   console.log('Data received from Db:');
  //   console.log(rows);
  // });

  class DbService {
    static getDbServiceInstance(){
      return instance ? instance : new DbService();
    }

      async pushData(){
          try {
              const records = await new Promise((resolve, reject) => {
                  const query = "INSERT INTO records VALUES (11111111);";

                  connection.query(query, (err, result) => {
                      if (err) reject(new Error(err.message));
                      resolve(result.records);
                  })
              });
              console.log(records);
              
          } catch (error) {
              console.log(error)
          }
      }
  }

module.exports = DbService;