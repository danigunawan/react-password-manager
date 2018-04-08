import React from 'react'
import BtnDeletePassword from './BtnDeletePassword'
import {Link} from 'react-router-dom'

const PasswordItem = (props) => {
  const { passwords } = props
  return passwords.map(p => {
		const urlEdit = `/edit/${p._id}`
    return (
      <tr key={p._id}>
        <td>{p.url}</td>
        <td>{p.username}</td>
        <td>{p.password}</td>
        <td>{p.updatedAt}</td>
        <td>{p.createdAt}</td>
				<td>
					<BtnDeletePassword id={p._id} />
					<Link  to={ urlEdit } className="btn btn-warning" > Edit </Link>
				</td>
      </tr>
    )
  }) 
}
export default PasswordItem

