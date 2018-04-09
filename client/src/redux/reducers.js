import { 
  FETCH_PASSWORD,
  ERROR,
  LOADING_START,
  LOADING_END,
  SEARCH_PASSWORD
} from './actionTypes'
import { combineReducers } from 'redux'

const initialState = {
  passwords: [],
  searchPassword: [],
  error: {
    status: false,
    message: ''
  },
  isSearch: false,
  loading: false
}
const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
     return {...state, loading: true} 
      break;
    case LOADING_END:
     return {...state, loading: false} 
      break;
    case FETCH_PASSWORD:
     return {...state, passwords: action.data} 
      break;
    case SEARCH_PASSWORD:
      if (action.query) {
        const searchPassword = state.passwords.filter(p => p.url.search(action.query.toLowerCase()) >= 0 )
       return {...state, searchPassword, isSearch: true} 
      } else {

       return {...state, searchPassword: [], isSearch: false} 
      }
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
