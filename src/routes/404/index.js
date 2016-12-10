const route = {
  path: '*',
  onEnter(nextState, replace, cb) {
      replace({
        pathname: '/'
      })
    cb()
  }
}

export default route
