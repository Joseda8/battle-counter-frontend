import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from "./components/home/home";
import LogIn from "./components/home/login/login";
// import SignUp from "./components/home/sign_up/sign_up";
// import Files from "./components/files/index";

const theme = createMuiTheme({
  palette: {

    primary: {
      main: "#4A4A4A",
    }, 

    secondary: {
      main: '#FFFFFF'
    }

  }

});

function App() {

  return (
      <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home title="Battle counter">
                  <LogIn message="Sign in"></LogIn>
                </Home>
              </Route>
              {/* <Route exact path="/sign_up">
                <Home title="Sign up">
                  <SignUp message="Sign in"></SignUp>
                </Home>
              </Route> */}
              {/* <Route exact path="/files" component={Files} /> */}

              <Route>
                <Home title="Sign in">
                  <LogIn message="Sign in"></LogIn>
                </Home>
              </Route>
              
            </Switch>
          </Router>
      </MuiThemeProvider>
  );

}

export default App;


