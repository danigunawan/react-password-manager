import {
  FETCH_PASSWORD,
  ERROR,
  LOADING_START,
  LOADING_END
} from './actionTypes'
import axios from '../axios'

const fetchPassword = () => {

  return dispatch => {
    dispatch(loadingStart)
    axios.get('/passwords', { headers: { token: localStorage.token } }).then(resp => {
      dispatch({
      type: FETCH_PASSWORD,
      data: resp.data.data
      })
      dispatch(loadingEnd)
    }).catch(err => {
      dispatch(errorSomethingWrong)
      dispatch(loadingEnd)
    })
  }
}

const errorSomethingWrong = { type: ERROR }
const loadingStart = { type: LOADING_START }
const loadingEnd = { type: LOADING_END }

export {
  fetchPassword
}
