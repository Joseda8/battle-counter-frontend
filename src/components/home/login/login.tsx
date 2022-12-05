import React from 'react';
import PositionedSnackbar from "../../../helpers/notify-msg";
import Button from '@material-ui/core/Button';
import  { Redirect } from 'react-router-dom' 
import Box from '@material-ui/core/Box';
import Copyright from "../../../helpers/copyright";
import axios from 'axios';
import { urlAPI } from "../../../helpers/constants";

type MyProps = {
    message: string;
};

type MyState = {
    valid_data: boolean; 
    open: boolean;
    errorMessage: string;
    jose_counter: number;
    ana_counter: number;
};

export default  class LogIn extends React.Component<MyProps, MyState> {

  state: MyState = {
    valid_data: false,
    open: false,
    errorMessage: "",
    jose_counter: 0,
    ana_counter: 0,
  };

  constructor(props: MyProps) {
    super(props);

    var this_jose_counter = 0;
    var this_ana_counter = 0;

    axios.get(urlAPI + '').then(
      response => {
        this_jose_counter = response.data.jose;
        this_ana_counter = response.data.ana;
        this.setState({
          valid_data: false,
          open: false,
          errorMessage: "",
          jose_counter: this_jose_counter,  
          ana_counter: this_ana_counter,        
        });
      }
    );
  }
    
  notify = () => {
    this.setState({
        open: !this.state.open,
    })
  };

  plus1_jose = () => {
    axios.get(urlAPI + 'plus1_jose').then(
      response => {
        this.setState({
          jose_counter: this.state.jose_counter+1,
        })
      }
    );
  };

  less1_jose = () => {
    axios.get(urlAPI + 'less1_jose').then(
      response => {
        this.setState({
          jose_counter: this.state.jose_counter-1,
        })
      }
    );
  };

  plus1_ana = () => {
    axios.get(urlAPI + 'plus1_ana').then(
      response => {
        this.setState({
          ana_counter: this.state.ana_counter+1,
        })
      }
    );
  };

  less1_ana = () => {
    axios.get(urlAPI + 'less1_ana').then(
      response => {
        this.setState({
          ana_counter: this.state.ana_counter-1,
        })
      }
    );
  };

  setErrorMessage(message: string) {
    this.setState({
      errorMessage: message
    });
  }

  setLogIn(state: boolean) {
    this.setState({
      valid_data: state
    });
  }

  validateInputs(email: string, password: string) {
      if(!email || !password) {
        this.setErrorMessage("Empty fields")
        return false;
      }
    
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email)) {
        this.setErrorMessage("Invalid format: email")
        return false;
      }

      return true;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    if(target.type === "checkbox"){
      const e_password = (document.querySelector('#password') as HTMLInputElement);
      if(target.checked) {
        e_password.type = "text";
      } else {
        e_password.type = "password";
      }
    }
  }

  onSubmit = (e: any) => {
    e.preventDefault();
  }

    render() {
        if(this.state.valid_data){
            return <Redirect to='/files'  />
        }
        return (
            <div>

                {/* <Button onClick={this.notify}>Top-Right</Button>

                {this.props.message} {this.state.valid_data} */}

                <form noValidate onSubmit={this.onSubmit}>

                  <h2 style={{ textAlign: "center" }}>José's points: {this.state.jose_counter} </h2>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.plus1_jose}
                    style={{ backgroundColor: "#379683", color: "white", textTransform: 'capitalize' }}
                  >
                    Add
                  </Button>
                  <br />
                  <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={this.less1_jose}
                    style={{ backgroundColor: "#5D5C61", color: "white", textTransform: 'capitalize' }}
                  >
                    Dicrease
                  </Button>
                  <br/>
                  <br/>
                  <hr/>
                </form>

                <form noValidate onSubmit={this.onSubmit}>

                  <h2 style={{ textAlign: "center" }}>Ana's points: {this.state.ana_counter} </h2>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.plus1_ana}
                    style={{ backgroundColor: "#379683", color: "white", textTransform: 'capitalize' }}
                  >
                    Add
                  </Button>
                  <br />
                  <br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={this.less1_ana}
                    style={{ backgroundColor: "#5D5C61", color: "white", textTransform: 'capitalize' }}
                  >
                    Dicrease
                  </Button>
                  <br/>
                  <br/>
                  <hr/>

                </form>

                <Box mt={1}>
                    <Copyright />
                  </Box>
                <PositionedSnackbar message={this.state.errorMessage} open_msg={this.state.open} close={this.notify} />
                
            </div>
        );
    }
  }