import About from './components/About'

const route = {
  path: 'about',
  getComponent(nextState, cb) {
    cb(null, About)
  }
}

export default route
