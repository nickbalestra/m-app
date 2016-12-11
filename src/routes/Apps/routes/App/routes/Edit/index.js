import Edit from './components/Edit'

const route = {
  path: 'edit',
  name: 'Edit',

  getComponent(nextState, cb) {
      cb(null, Edit)
  }
}

export default route
