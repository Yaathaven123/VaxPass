import { useState } from "react";
import { getItems } from "./Web3Client.js";
import "./Styles.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { initiateApp } from "./Utilities";
import Login from "./Login";

//  Start of the React - Search Record Route
function Search() {
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

  return (
    <div className="main">
      {!LoggedIn ? (
        <div>
          <Navbar />
          <Login onClick={logIn} />
        </div>
      ) : (
        <div onLoad={setTimeout(() => { clearTransactionButtons(); }, 0)}>
          <Navbar />

          <div className="app">

            {/* Left Column */}
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
                  <Input type="text" name="name" id="name" placeholder="Enter NIC number of the patient" onChange={(e) => { setName(e.target.value); }} />
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

                      if (items.includes(name)) {
                        console.log("Vaccinated")
                        document.getElementById("vaccinated").style.transform = "scale(1)";
                      } else {
                        console.log("Not Vaccinated")
                        document.getElementById("notvaccinated").style.transform = "scale(1)";
                      }
                    }}
                  > Search </Button>{" "}
                </FormGroup>
              </Form>
            </div>

            {/* Right Column */}
            <div className="list">
              <div className="heading">
                <div className="title">
                  <div>Vaccination Status</div>
                  <h6>Find the Vaccinated status</h6>
                </div>
              </div>

              {/* Vaccination Status View Start */}
              <ul>
                <li>
                  <Button id="vaccinated" color="success" > User is Vaccinated </Button>
                </li>
                <li>
                  <Button id="notvaccinated" color="danger" > User is NOT Vaccinated </Button>
                </li>
              </ul>
              {/* Vaccination Status View End */}

              <Footer onLoad={console.log("Footer Loaded")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
