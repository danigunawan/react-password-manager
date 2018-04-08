import {
  FETCH_PASSWORD,
  ERROR
} from './actionTypes'
import axios from '../axios'

const fetchPassword = () => {

  return dispatch => {
    axios.get('/passwords', { headers: { token: localStorage.token } }).then(resp => {
      dispatch({
      type: FETCH_PASSWORD,
      data: resp.data.data
      })
    }).catch(err => {
      dispatch(errorSomethingWrong)
    })
  }
}

const errorSomethingWrong = { type: ERROR }

export {
  fetchPassword
}
