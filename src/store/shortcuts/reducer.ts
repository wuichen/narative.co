import { SET_VIEW } from './actions'

const initialState = {}

export default function shortcutsReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SHORTCUT':
      return { ...state, ...action.payload }
    case 'ESCAPE':
      return initialState
    default:
      return state
  }
}
