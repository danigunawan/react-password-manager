import { 
  FETCH_PASSWORD,
  ERROR
} from './actionTypes'
import { combineReducers } from 'redux'

const initialState = {
  passwords: [],
  error: {
  status: false,
  message: ''
  },
  loading: false
}
const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PASSWORD:
     return {...state, passwords: action.data} 
      break;
    case ERROR:
     return {...state, error: { status: true, message: 'Something Went Wrong' }} 
      break;
    default:
     return state 
  }
  return state
}

export default combineReducers({
  password: passwordReducer
})
