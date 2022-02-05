import "./App.scss";
import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
// ### Buyer ####
import Loginbuyer from "./pages/buyer/loginbuyer/Loginbuyer";
import Signupbuyer from "./pages/buyer/signupbuyer/Signupbuyer";
import Buyerhome from "./pages/buyer/buyerhome/Buyerhome";
import Sellerview from "./pages/seller/sellerview/Sellerview";
import Myappointments from "./pages/buyer/myappointments/Myappointments";
// ### Seller ####
import Sellerlogin from "./pages/seller/loginseller/Sellerlogin";
import Signupseller from "./pages/seller/signupseller/Signupseller";
import Sellerhome from "./pages/seller/sellerhome/Sellerhome";
import Sellermanage from "./pages/seller/sellermanage/Sellermanage";

import Landingpage from "./pages/landingpage/Landingpage";
import Errorpage from "./components/errorpage/Errorpage";
import Searchresult from "./pages/search/Searchresult";

function App() {

  const { user } = useContext(AuthContext);

  let isSeller;
  let isBuyer;

  if (user) {
    localStorage.setItem("type", JSON.stringify(user.payload.type)); // incase i need it somewhere else

    if (user.payload.type == 0) {
      isBuyer = true;
      isSeller = false;
      

    }
    if (user.payload.type == 1) {
      isBuyer = false;
      isSeller = true;
    }
  }

  return (
    <Router>
      <Routes>
       
        <Route exact path="/" element={<Landingpage />} />

        <Route exact path="/buyerlogin" element={<Loginbuyer />} />

        <Route exact path="/buyersignup" element={<Signupbuyer />} />

        <Route exact path="/sellerlogin" element={<Sellerlogin />} />

        <Route exact path="/sellersignup" element={<Signupseller />} />

        <Route
          exact
          path="/search/:sellername"
          element={<Searchresult /> }
        />
        
        {isBuyer ?(
        <>
          <Route
            exact
            path="/buyerhome"
            element={<Buyerhome /> }
          />

          <Route
            exact
            path="/viewseller"
            element={<Sellerview /> }
          />
          <Route
            exact
            path="/myappointments"
            element={<Myappointments /> }
          />

          </>
         
        ):isSeller?(
            <>
          <Route
            exact
            path="/sellerhome"
            element={ <Sellerhome /> }
          />

          <Route
            exact
            path="/managelectures"
            element={ <Sellermanage /> }
          />

        </>
        ):<></>}
        <Route
          exact
          path="*"
          element={<Errorpage /> }
        />

      </Routes>
    </Router>
  );
}

export default App;
