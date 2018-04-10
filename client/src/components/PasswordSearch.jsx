import React, { Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchPassword } from '../redux/actions'

export class PasswordSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.searchPassword(this.state.query)
  }

  render() {
  const {query } = this.state
    return (
      <div className="password-search">
        <input 
          type="text" 
          className="form-control" 
          name="query" 
          value={query} 
          placeholder="Search URL"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ searchPassword }, dispatch)

export default connect(null, mapDispatchToProps)(PasswordSearch);
