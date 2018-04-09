import React from 'react'
import {Link} from 'react-router-dom'
import date from 'date-and-time'
import { connect  } from 'react-redux'
import { deletePassword } from '../redux/actions'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

const PasswordItem = (props) => {
  const { passwords, deletePassword } = props

  return passwords.map(p => {
		const urlEdit = `/edit/${p._id}`
    return (
      <tr key={p._id}>
        <td>{p.url}</td>
        <td>{p.username}</td>
        <td>{Array(p.password.length).join("*")}</td>
        <td>{date.format(new Date(p.createdAt), 'DD MMM  YYYY')}</td>
        <td>{date.format(new Date(p.updatedAt), 'DD MMM YYYY')}</td>
				<td>
					<Button bsStyle="danger" onClick={ () => deletePassword(p._id) } >Delete</Button>
					<Link  to={ urlEdit } className="btn btn-warning" > Edit </Link>
				</td>
      </tr>
    )
  }) 
}

const mapDispatchToProps = dispatch => bindActionCreators({ deletePassword }, dispatch)

export default connect(null, mapDispatchToProps)(PasswordItem)

