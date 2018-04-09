import { 
  FETCH_PASSWORD,
  DELETE_PASSWORD,
  ERROR,
  LOADING_START,
  LOADING_END,
  SEARCH_PASSWORD,
  SHOW_PASSWORD,
  UNSHOW_PASSWORD
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
  let passwords
  switch (action.type) {
    case LOADING_START:
     return {...state, loading: true} 
      break;
    case LOADING_END:
     return {...state, loading: false} 
      break;
    case SHOW_PASSWORD:
      passwords = [ ...state.passwords ]
      passwords.map(data => {
        if (data._id == action.id){
          data.show = true
        }
        return data
      })
     return {...state, passwords} 
      break;
    case UNSHOW_PASSWORD:
      passwords = [ ...state.passwords ]
      passwords.map(data => {
        if (data._id == action.id){
          data.show = false
        }
        return data
      })
     return {...state, passwords} 
      break;
    case FETCH_PASSWORD:
      action.data.map((data, i) => {
        if (state.passwords.length) {
         if (state.passwords[i]._id === data._id) {
          data.show = state.passwords[i].show
         } 
        } else {
          data.show = false
        }
        return data
      })
     return {...state, passwords: action.data} 
      break;
    case DELETE_PASSWORD:
      console.log('delete password ========================>')
      passwords = state.passwords.filter(p => p._id !== action.id )
      return {...state, passwords} 
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
