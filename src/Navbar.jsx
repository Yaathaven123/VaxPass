import React from "react";
import Typical from "react-typical";
function Navbar() {
  return (
    <div className="navbar d-flex">
      <div className="d-flex rounded__image">
        <img src="./logo.png" />
        <div className="title__small">
          <p>
          VaxPass
            <br />
            A Blockchain based Vaccination Passport
            <hr />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
