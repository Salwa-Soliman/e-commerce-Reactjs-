import React, { useContext } from "react";
//For Context
import { GeneralContext } from "./contexts/GeneralContext";
//CSS File
import "./App.css";
//For Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//App Components
import FooterComponent from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import FormComponent from "./components/Form";
import Products from "./components/Products";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
  let theme = useContext(GeneralContext);
  let darkThemeStyle = theme.darkMode ? "dark-mode" : "";
  console.log(darkThemeStyle);

  return (
    <Router>
      <div className={`main-container ${darkThemeStyle}`}>
        <NavbarComponent></NavbarComponent>

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Products />
              {/* <Home /> */}
            </Route>
            {/* <Route path="/home">
              <Home />
            </Route> */}
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/login">
              <FormComponent />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </div>

        <FooterComponent></FooterComponent>
      </div>
    </Router>
  );
}

export default App;
