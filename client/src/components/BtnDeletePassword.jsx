import React, { Component } from 'react';
import { 
  Button
} from 'react-bootstrap';

import axios from '../axios'
import {  deletePassword } from '../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class BtnDeletePassword extends Component {

 constructor(props, context) {
    super(props, context);

    this.state = {
      error: {
        status: false,
        message: ''
      }
    };
  }

  submitForm = () => {

    const app = this
		const { id } = this.props
		this.props.deletePassword(id)
  }

  render() {

    return (
      <Button  bsStyle="danger"  onClick={this.submitForm} >  Delete </Button>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ deletePassword }, dispatch)

export default connect(null, mapDispatchToProps)(BtnDeletePassword);
