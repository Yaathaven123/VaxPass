const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: "ilzyz0heng1bygi8.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "widlczvv3myl5n2n",
    password: "zzp2u1cg65pheclx",
    database: "ouu15qix5y3z1eeg",
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


//   connection.query('INSERT INTO records VALUES (231763796);', (err,rows) => {
//     if(err) throw err;
//   });

  connection.query('SELECT * FROM records', (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
  });

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