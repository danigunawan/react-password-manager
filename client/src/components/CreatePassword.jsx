import React, { Component } from 'react';
import { 
  Button, 
  Grid, 
  Col, 
  Row, 
  FormControl, 
  FormGroup, 
  ControlLabel,
	Breadcrumb
} from 'react-bootstrap';
import Alert from './AlertPanel'
import axios from '../axios'
import { Link, Redirect } from 'react-router-dom'
import isUrl from 'is-url'
import passwordValidator from 'password-validator'
import PasswordValidList from './PasswordValidList'

class CreatePassword extends Component {


 constructor(props, context) {
    super(props, context);

    this.state = {
			username: '',
			password: '',
			url: '',
      error: {
        status: false,
        message: ''
      },
      validPassword: {
        upperCase: false,
        lowerCase: false,
        length: false,
        symbol: false,
        number: false
      },
      passwordPass: false
    };
  }

  validatePassword = (password) => {
    const validPassword =  {
        upperCase: false,
        lowerCase: false,
        length: false,
        symbol: false,
        number: false
    }
    let passwordPass = false
    let schema = new passwordValidator()
    schema.is().min(5)
    if(schema.validate(password)) {
      validPassword.length = true
      passwordPass = true
    } else {
      passwordPass = false
    }
    schema = new passwordValidator()
    schema.has().digits()
    if(schema.validate(password)) {
      validPassword.number = true
      passwordPass = true
    } else {
      passwordPass = false
    }

    schema = new passwordValidator()
    schema.has().uppercase()
    if(schema.validate(password)) {
      validPassword.upperCase = true
      passwordPass = true
    } else {
      passwordPass = false
    }

    schema = new passwordValidator()
    schema.has().lowercase()
    if(schema.validate(password)) {
      validPassword.lowerCase = true
      passwordPass = true
    } else {
      passwordPass = false
    }

    schema = new passwordValidator()
    schema.has().symbols()
    if(schema.validate(password)) {
      validPassword.symbol = true
      passwordPass = true
    } else {
      passwordPass = false
    }

    this.setState({ validPassword: validPassword, passwordPass })
  }

  validateURL = (url) => {
    if(!isUrl(url)) {
      this.setState({
        error: {
          status: true,
          message: 'URL is not valid'
        }
      })
      return false
    }
    return true
  }
  validateForm = () => {
    const { username, password, url, passwordPass } = this.state
    if (url === '') {
      this.setState({
        error: {
          status: true,
          message: 'URL is required'
        }
      })
      return false
    } else if (username === '') {
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
    if(!this.validateURL(url)) return false
    if(!passwordPass) {
      
      this.setState({
        error: {
          status: true,
          message: 'Password Not Strength'
        }
      })
      return false
    }
    return true
  }
  
  submitForm = () => {
    const app = this
    const { username, password, url } = this.state
		const input = { username, password, url }

    if(this.validateForm()) {
      axios.post('/passwords', input, { headers: { token: localStorage.token } } ).then(resp => {
        const { data }  = resp
        if(data.data.username === username){
          app.props.history.push('/'); 
        }
        }).catch( err => {
          console.log(err)
          this.setState({ error: { status: true, message: 'Something Went Wrong' } })
        })
       
    }
  }
  handleChange = (e) => {
    if (e.target.name === 'password') {
      this.validatePassword(e.target.value) 
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error, url, username, password, validPassword } = this.state
    if(localStorage.token === undefined){
      return <Redirect to="/login" />
    }
    return (
      <div className="CreatePasswod">
        <Grid>
          <Row className="show-grid">
            <Col md={6} mdOffset={3} >
							<Breadcrumb>
								<Breadcrumb.Item >
								  <Link to="/">Home </Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item active>
									New Password
								</Breadcrumb.Item>
							</Breadcrumb>
              <h2> Save Password </h2>
              <Alert status="danger" show={ error.status } message={ error.message } />
              <form>
                 <FormGroup
                    controlId="name"
                  >
                    <ControlLabel>URL</ControlLabel>
                    <input 
                      type="text"
                      value={url}
                      name="url"
                      placeholder="Enter URL"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                 <FormGroup
                    controlId="username"
                  >
                    <ControlLabel>Username</ControlLabel>
                    <input 
                      type="text"
                      value={username}
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
                    <input 
                      type="password"
                      value={password}
                      name="password"
                      placeholder="Enter Password"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                <button className="btn btn-default" type="button" onClick={this.submitForm} > Save Password </button>
              </form>
              <p> 
                Password Strength: 
              </p>
              <PasswordValidList validPassword={validPassword} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreatePassword;
