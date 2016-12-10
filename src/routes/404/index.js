import NotFound from './components/NotFound'

const route = {
  path: '*',
  getComponent(nextState, cb) {
    cb(null, NotFound)
  }
}

export default route
