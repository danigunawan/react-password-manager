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
      }
    };
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
    const { username, password, url } = this.state
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
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error, url, username, password } = this.state
    if(localStorage.token === undefined){
      return <Redirect to="/login" />
    }
    return (
      <div className="CreatePasswod">
        <Grid>
          <Row className="show-grid">
            <Col md={4} mdOffset={4} >
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
                    <FormControl
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
                    <FormControl
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
                    <FormControl
                      type="password"
                      value={password}
                      name="password"
                      placeholder="Enter Password"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup> 
                <Button type="button" onClick={this.submitForm} > Save Password </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreatePassword;
