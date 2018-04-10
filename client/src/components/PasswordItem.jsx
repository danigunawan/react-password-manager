import React from 'react'
import {Link} from 'react-router-dom'
import date from 'date-and-time'
import { connect  } from 'react-redux'
import { deletePassword,  unshowPassword } from '../redux/actions'
import { bindActionCreators } from 'redux'
import { 
  Button
} from 'react-bootstrap'

export const PasswordItem = (props) => {
  const { passwords, deletePassword,  unshowPassword } = props

  return passwords.map(p => {
		const urlEdit = `/edit/${p._id}`
    return (
      <tr key={p._id}>
        <td>{p.url}</td>
        <td>{p.username}</td>
        <td>{ p.show ? p.password :  Array(p.password.length).join("*")}
          { p.show ?
            <Button bsStyle="primary" onClick={() => unshowPassword(p._id)}>Unshow </Button>
            :
            <Link className="btn btn-primary" to={`/show-password/${p._id}`}>Show </Link>
          }
        </td>
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

const mapDispatchToProps = dispatch => bindActionCreators({ deletePassword,  unshowPassword }, dispatch)

export default connect(null, mapDispatchToProps)(PasswordItem)

