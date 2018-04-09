import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NotFound({...props}) {
  return (
    <div className="centered">
      <h2>Not Found.  What are you looking for? </h2> 
      <h4> <Link to="/" className="text-center" > Back To Home </Link></h4>
    </div>
  );
}

NotFound.defaultProps = {};

NotFound.propTypes = {};

export default NotFound;
