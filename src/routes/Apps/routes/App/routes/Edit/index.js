import Edit from './components/Edit'

const route = {
  path: 'edit',

  getComponent(nextState, cb) {
      cb(null, Edit)
  }
}

export default route
