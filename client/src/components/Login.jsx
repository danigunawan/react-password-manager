import React, { Component } from 'react';
import { 
  Button, 
  Grid, 
  Col, 
  Row, 
  FormControl, 
  FormGroup, 
  ControlLabel
} from 'react-bootstrap';
import Alert from './AlertPanel'
import axios from '../axios'

class Login extends Component {


 constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
      error: {
        status: false,
        message: ''
      }
    };
  }

  validateForm = () => {
    const { username, password } = this.state
    if (username === '') {
      this.setState({
        error: {
          status: true,
          message: 'Username Wajib Diisi'
        }
      })
      return false
    } else if (password === '') {
      this.setState({
        error: {
          status: true,
          message: 'Password Wajib Diisi'
        }
      })
      return false
    }
    return true
  }
  
  submitForm = () => {
    const { username, password } = this.state
    const app = this

    if(this.validateForm()) {
      const input = { username, password }
      axios.post('/users/signin', input).then(resp => {
        const { data }  = resp
        if(data.token !== ''){
          alert('login berhasil') 
          app.props.history.push('/'); 
        }
        }).catch( err => {
          console.log(err)
          if(err.request.status === 403) {
            this.setState({ error: { status: true, message: 'User Not Found' } })
          }
        })
       
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.state
    return (
      <div className="Login">
        <Grid>
          <Row className="show-grid">
            <Col md={4} mdOffset={4} >
              <Alert status="danger" show={ error.status } message={ error.message } />
              <form>
                 <FormGroup
                    controlId="username"
                  >
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.username}
                      name="username"
                      placeholder="Enter Username"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                 <FormGroup
                    controlId="password"
                  >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.password}
                      name="password"
                      placeholder="Enter Password"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                <Button type="button" onClick={this.submitForm} > Login </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
