import React, { Component } from 'react';
import { 
  Grid, 
  Col, 
  Row,
	Breadcrumb
} from 'react-bootstrap';
import Alert from './AlertPanel'
import axios from '../axios'
import PasswordTable from './PasswordTable'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPassword, searchPassword } from '../redux/actions'
import { RingLoader } from 'react-spinners'

class PasswordList extends Component {
  constructor(){
    super()
    this.state = {
      query: ''
    }
  }
  componentDidMount () {
    this.props.fetchPassword()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.searchPassword(this.state.query)
  }
  
  render() {
    const { error, loading, isSearch, searchPassword } = this.props.password
    let { passwords } = this.props.password
    const { query  } = this.state

    if (isSearch) {
     passwords = searchPassword 
    }

    if(localStorage.token == undefined){

      return <Redirect to="/login" />
    }

    if (loading) {
     return <div className="centered"><RingLoader/></div> 
    }

    return (
      <div className="PasswordList">
        <Grid>
          <Row className="show-grid">
            <Col md={8} mdOffset={2} >
              <Breadcrumb>
                <Breadcrumb.Item active>
                <Link to="/">Home </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <input 
                type="text" 
                className="form-control" 
                name="query" 
                value={query} 
                placeholder="Search URL "
                onChange={this.handleChange}
              />
              <Link className="btn btn-primary" to="/create"> Save New Passsword </Link>
              <Alert status="danger" show={error.status} message={error.message} />
              <PasswordTable passwords={passwords} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    password: state.password
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPassword, searchPassword }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PasswordList);
