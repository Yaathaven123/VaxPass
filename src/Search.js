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
          <Navbar onClick={logIn} />
          <Login />
        </div>
      ) : (
        <div onLoad={setTimeout(() => { clearTransactionButtons(); }, 0)}>
          <Navbar />

          <div className="app">

            <div className="searchRecords">
              <div className="title">
                <div className="title">
                  <div>Search Records</div>
                  <h1></h1>
                </div>
              </div>

              <Form>
                <FormGroup>
                  <Label for="name">NIC Number :</Label>
                  <br />
                  <Input type="text" name="name" id="name" placeholder="Enter NIC number of the user" onChange={(e) => { setName(e.target.value); }} />
                  <br />
                  <botton onClick={async (e) => {
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
                   class="button">Search</botton>
                  {" "}
                </FormGroup>
              </Form>
              <div className="heading">
                <div className="title">
                  <div>Vaccination Status</div>
                  <h1> </h1>
                </div>
              </div>
              
                <Button id="vaccinated" color="success" > User is Vaccinated </Button>
                <Button id="notvaccinated" color="danger" > User is NOT Vaccinated </Button>
            </div>


            <Footer onLoad={console.log("Footer Loaded")} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
