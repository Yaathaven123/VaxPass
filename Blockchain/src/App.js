import react, { useEffect } from "react";
import { useState } from "react";
import { init, addItem, getItems, deleteItem } from "./Web3Client";
import "./App.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  failedTransaction,
  initiateApp,
  successfulTransaction,
  updateTransactionStatus,
  clearTx,
} from "./Utilities";
import Login from "./Login";
import { clear } from "@testing-library/user-event/dist/clear";

const mysql = require('mysql');

function App() {
  const [itemNumber, setItemNumber] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);

  function logIn() {
    initiateApp(setLoggedIn);
    getItems(setItems);
  }

  function clearTransactionButtons() {
    document.getElementById("initiate").style.transform = "scale(0)";
    document.getElementById("pending").style.transform = "scale(0)";
    document.getElementById("success").style.transform = "scale(0)";
    document.getElementById("rejected").style.transform = "scale(0)";
  }
  //  clearTransactionButtons();

  function pushItem(item = undefined) {
    let stuff = [...items];
    if (item !== undefined) {
      stuff.push(item);
      setItems(stuff);
    } else getItems(setItems);

    successfulTransaction();
  }

  function syncItems(){
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
    
    connection.query('INSERT INTO records (nic) VALUES ("3141xxxx");', (err, rows) => {
      if (err) throw err;
    });
  }

  // // Push records to the MySQL server     -- THIS PART IS NOT WORKING
  // pushRecords: async () => {
  //   App.setLoading(false)
  //   const dbService = require('./dbService');
  //   const db = dbService.getDbServiceInstance();

  //   //const result = db.pushData();

  //   connection.query('INSERT INTO records VALUES (231763796);', (err, rows) => {
  //     if (err) throw err;
  //   });

  // }

  return (
    <div className="main">
      {!LoggedIn ? (
        <div>
          <Navbar />
          <Login onClick={logIn} />
        </div>
      ) : (
        <div
          onLoad={setTimeout(() => {
            clearTransactionButtons();
          }, 0)}
        >
          <Navbar />
          <div className="app">
            <div className="addItem">
              <div className="title">
                <div className="title">
                  <div>New Record</div>
                  <h6>Add New Vaccination Record to Blockchain</h6>
                </div>
              </div>
              

              <Form>
                <FormGroup>
                  <Label for="name">NIC Number :</Label>
                  <br />
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter NIC number of the patient"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <br/>
                  <Button
                    color="success"
                    className="btn-scale"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (document.getElementById("name").value == "") {
                        alert("NIC is Empty. Please try again");
                        return;
                      }
                      document.getElementById("name").value = "";
                      updateTransactionStatus("initiate");
                      await addItem(
                        name.toString(),
                        pushItem,
                        failedTransaction,
                        updateTransactionStatus
                      );
                    }}
                  >
                    Add Record
                  </Button>{" "}
                </FormGroup>
              </Form>
              <div className="transact_status" id="transact_status">
                <Button id="pending" className="pending" color="warning">
                  Pending
                </Button>
                <Button id="success" className="success" color="success">
                  Success
                </Button>
                <Button id="rejected" className="rejected" color="danger">
                  Rejected !!
                </Button>
                <Button id="initiate" className="initiate" color="info">
                  Initiated
                </Button>
              </div>
            </div>



            <div className="list">
              <div className="heading">
                <div className="title">
                  <div>Recent Records</div>
                  <h6>Recently Added Records to the Blockchain</h6>
                </div>
              </div>


              {!items.length ? (
                <ul className="">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <li>
                    <h1>No Records Available</h1>
                  </li>{" "}
                  <br />
                </ul>
              ) : (
                <ul>

                  <Button color="success"
                          key={"itembutton no "}
                          onClick={() => {

                            setTimeout(() => {
                              syncItems();
                            }, 1000);
                          }}> Sync </Button>

                  {items.map((item, index) => {
                    return (
                      <li key={"item no " + index}>
                        {" "}
                        <Button
                          color="danger"
                          key={"itembutton no " + index}
                          onClick={() => {
                            updateTransactionStatus("initiate");

                            console.log("attempt to delete item ", index);

                            setTimeout(() => {
                              deleteItem(
                                index,
                                pushItem,
                                updateTransactionStatus
                              );
                            }, 1000);
                          }}
                        >
                          {" "}
                          {item}
                        </Button>
                      </li>
                      
                    );
                  })}
                </ul>
              )}


              <Footer onLoad={console.log("Footer Loaded")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;