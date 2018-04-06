import React from 'react'
import { Alert } from 'react-bootstrap'


const AlertPanel = (props) => {
  const { show, status, message} = props
  if (show) {
    return (
      <Alert bsStyle={status}>
        { message }
      </Alert>
    )
  } else {
    return ( <span></span> )
  }
}

export default AlertPanel
