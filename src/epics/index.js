import { combineEpics } from 'redux-observable'
import { epic as authEpic } from '../ducks/auth'


export default combineEpics(
  authEpic
)
