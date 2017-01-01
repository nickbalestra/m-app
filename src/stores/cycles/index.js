import { combineCycles } from 'redux-cycle-middleware'
import { cycle as appsCycle } from '../ducks/apps'
import { cycle as authCycle } from '../ducks/auth'
import { cycle as usersCycle } from '../ducks/users'

export default combineCycles(
  appsCycle,
  authCycle,
  usersCycle
)
