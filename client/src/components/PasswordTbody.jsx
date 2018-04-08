import React from 'react'
import PasswordItem from './PasswordItem'

const PasswordTbody = (props) => {
	const { passwords} = props
	return (
		<tbody>
			<PasswordItem passwords={passwords} />
		</tbody>
	)
}

export default PasswordTbody
