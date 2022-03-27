import react, { useEffect } from "react";
import { useState } from "react";
import { init, addItem, getItems, deleteItem } from "./Web3Client.js";
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


function Search() {

  const [itemNumber, setItemNumber] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);

  function logIn() {
    initiateApp(setLoggedIn);
    getItems(setItems);
  }

  function clearTransactionButtons() {
    document.getElementById("vaccinated").style.transform = "scale(0)";
    document.getElementById("notvaccinated").style.transform = "scale(0)";
  }

  function pushItem(item = undefined) {
    let stuff = [...items];
    if (item !== undefined) {
      stuff.push(item);
      setItems(stuff);
    } else getItems(setItems);

    successfulTransaction();
  }

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
                  <div>Search Record</div>
                  <h6>Search Records from the Blockchain</h6>
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
                  <br />
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

                      if (items.includes(name)) {
                        console.log("Vaccinated")
                        document.getElementById("vaccinated").style.transform = "scale(1)";
                      } else {
                        console.log("Not Vaccinated")
                        document.getElementById("notvaccinated").style.transform = "scale(1)";
                      }
                    }}
                  >
                    Search
                  </Button>{" "}
                </FormGroup>
              </Form>


            </div>



            <div className="list">
              <div className="heading">
                <div className="title">
                  <div>Vaccination Status</div>
                  <h6>Find the Vaccinated status</h6>
                </div>
              </div>




              <ul>
                <li>
                  <Button id="vaccinated" color="success" > User is Vaccinated </Button>
                </li>
                <li>
                  <Button id="notvaccinated" color="danger" > User is NOT Vaccinated </Button>
                </li>
              </ul>


              <Footer onLoad={console.log("Footer Loaded")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
