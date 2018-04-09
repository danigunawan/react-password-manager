import {
  FETCH_PASSWORD,
  DELETE_PASSWORD,
  ERROR,
  LOADING_START,
  LOADING_END,
  SEARCH_PASSWORD
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

const deletePassword = (id) => {

  return dispatch => {
		axios.delete(`/passwords/${id}`, { headers: { token: localStorage.token }}).then(resp => {
        dispatch({
          type: DELETE_PASSWORD,
          id
        })
    }).catch( err => {
      console.log(err)
      if(err.request.status === 500) {
        dispatch(errorSomethingWrong)
        dispatch(loadingEnd)
      }
    })
  }
}

const searchPassword = (query) => {
  return {
    type: SEARCH_PASSWORD,
    query
  }
}

const errorSomethingWrong = { type: ERROR }
const loadingStart = { type: LOADING_START }
const loadingEnd = { type: LOADING_END }

export {
  fetchPassword,
  searchPassword,
  deletePassword
}
