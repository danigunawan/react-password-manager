import React, { Component} from 'react';
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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showPassword } from '../redux/actions'
import { Redirect  } from 'react-router-dom'

class ShowPassword extends Component {

 constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      error: {
        status: false,
        message: ''
      }
    };
  }

  validateForm = () => {
    const { email, password } = this.state
    if (email === '') {
      this.setState({
        error: {
          status: true,
          message: 'Username is Required'
        }
      })
      return false
    } else if (password === '') {
      this.setState({
        error: {
          status: true,
          message: 'Password is Required'
        }
      })
      return false
    }
    return true
  }
  
  submitForm = () => {
    const { email, password } = this.state
    const app = this
    const {id} = this.props.match.params


    if(this.validateForm()) {
      const input = { email, password }
      axios.post('/users/signin', input).then(resp => {
        const { data }  = resp
        if(data.token !== ''){
          localStorage.setItem('token', data.token)
          app.props.showPassword(id)
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
      <div className="show-password">
        <Grid>
          <Row className="show-grid">
            <Col md={4} mdOffset={4} >
              <h2>Show Password Confirmation</h2>
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
const mapDispatchToProps = dispatch => bindActionCreators({ showPassword }, dispatch)
export default connect(null, mapDispatchToProps)(ShowPassword);
