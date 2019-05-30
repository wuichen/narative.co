import { combineReducers } from 'redux'
import { SHORTCUT, ESCAPE } from '../shortcuts/constants'

function shortcutsReducer(state = {}, action: any) {
  switch (action.type) {
    case SHORTCUT:
      return { ...state, ...action.payload }
    case ESCAPE:
      return {}
    default:
      return state
  }
}

const reducers = combineReducers({
  shortcuts: shortcutsReducer,
})

export default reducers
