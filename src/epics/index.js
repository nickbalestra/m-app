import { combineEpics } from 'redux-observable'
import { epic as authEpic } from '../ducks/auth'
import { epic as appsEpic } from '../ducks/apps'


export default combineEpics(
  authEpic,
  appsEpic
)
