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

class Register extends Component {


 constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      name: '',
      error: {
        status: false,
        message: ''
      }
    };
  }

  validateForm = () => {
    const { email, password, name } = this.state
    if (name === '') {
      this.setState({
        error: {
          status: true,
          message: 'Name is required'
        }
      })
      return false
    } else if (email === '') {
      this.setState({
        error: {
          status: true,
          message: 'Username is required'
        }
      })
      return false
    } else if (password === '') {
      this.setState({
        error: {
          status: true,
          message: 'Password is required'
        }
      })
      return false
    }
    return true
  }
  
  submitForm = () => {
    const { name, email, password } = this.state
    const app = this

    if(this.validateForm()) {
      const input = { name, email, password }
      axios.post('/users/register', input).then(resp => {
        const { data }  = resp
        if(data.token !== ''){
          localStorage.setItem('token', data.token)
          app.props.history.push('/'); 
        }
        }).catch( err => {
          console.log(err)
          this.setState({ error: { status: true, message: 'Email Has Been Used' } })
          if(err.request.status === 400) {
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
      <div className="Register">
        <Grid>
          <Row className="show-grid">
            <Col md={4} mdOffset={4} >
              <h2> Register </h2>
              <Alert status="danger" show={ error.status } message={ error.message } />
              <form>
                 <FormGroup
                    controlId="email"
                  >
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.email}
                      name="email"
                      placeholder="Enter Username"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                 <FormGroup
                    controlId="name"
                  >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.name}
                      name="name"
                      placeholder="Enter Name"
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
                <Button type="button" onClick={this.submitForm} > Register </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Register;
