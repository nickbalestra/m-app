import { combineCycles } from 'redux-cycle-middleware'
import { cycle as appsCycle } from '../ducks/apps'
import { cycle as authCycle } from '../ducks/auth'


export default combineCycles(
  appsCycle,
  authCycle
)
