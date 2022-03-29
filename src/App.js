import { useState } from "react";
import { addItem, getItems, deleteItem } from "./Web3Client.js";
import "./Styles.css";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { failedTransaction, initiateApp, successfulTransaction, updateTransactionStatus} from "./Utilities";
import Login from "./Login";

//  Start of the React - New Record Route
function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);

  function logIn() {
    initiateApp(setLoggedIn);
    getItems(setItems);
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
          <Navbar onClick={logIn} />
          <Login />
        </div>
      ) : (
        <div onLoad={setTimeout(() => { }, 0)}>
          <Navbar />
          <div className="app">

            {/* Left Column */}
            <div className="addItem">
              <div className="title">
                <div className="title">
                  <div>New Record</div>
                  <h6>Add New Vaccination Record to Blockchain</h6>
                </div>
              </div>

              <Form>
                <FormGroup>
                  {/* <Label id="flabel" for="name">NIC Number</Label> */}
                  <br />
                  <Input type="text" name="name" id="name" placeholder="Enter NIC number of the user" onChange={(e) => { setName(e.target.value); }} />
                  <br />
                  <Button
                    color="success"
                    className="btn-scale"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (document.getElementById("name").value === "") {
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
                  > Add Record </Button>{" "}
                </FormGroup>
              </Form>
            </div>

            {/* Right Column */}
            <div className="list">
              <div className="heading">
                <div className="title">
                  <div>Recent Records</div>
                  <h6>Recently Added Records to the Blockchain</h6>
                </div>
              </div>

              {/* Displaying Available Records View Start*/}
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
                  {items.map((item, index) => {
                    return (
                      <li key={"item no " + index}>
                        {" "}
                        <Button
                          color="info"
                          key={"itembutton no " + index}
                          onClick={() => {
                            updateTransactionStatus("initiate");
                            console.log("Trying to delete item ", index);
                            setTimeout(() => {
                              deleteItem(
                                index,
                                pushItem,
                                updateTransactionStatus
                              );
                            }, 1000);
                          }}>{" "}{item}</Button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {/* Displaying Available Records View End*/}

              <Footer onLoad={console.log("Footer Loaded")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
