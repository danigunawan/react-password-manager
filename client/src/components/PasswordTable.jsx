import React from 'react'
import PasswordThead from './PasswordThead'
import PasswordTbody from './PasswordTbody'

import {Table} from 'react-bootstrap'
const PasswordTable = (props) => {
	const { passwords} = props
	return (
    <Table responsive striped bordered condensed hover>
			<PasswordThead />
			<PasswordTbody passwords={passwords} />
		</Table>
	)
}

export default PasswordTable
