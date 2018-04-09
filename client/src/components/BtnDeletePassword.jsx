import React, { Component } from 'react';
import { 
  Button
} from 'react-bootstrap';

import axios from '../axios'
import { fetchPassword } from '../redux/actions'
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
		axios.delete(`/passwords/${id}`, { headers: { token: localStorage.token }}).then(resp => {
			const { data }  = resp
			if(data._id === id){
        app.props.fetchPassword()
			}
			}).catch( err => {
				console.log(err)
				if(err.request.status === 500) {
					this.setState({ error: { status: true, message: 'Something Went Wrong' } })
				}
			})
  }

  render() {

    return (
      <Button  bsStyle="danger"  onClick={this.submitForm} >  Delete </Button>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPassword }, dispatch)

export default connect(null, mapDispatchToProps)(BtnDeletePassword);
