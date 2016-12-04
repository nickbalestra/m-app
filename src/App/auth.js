import store from './store'


module.exports = {
  mustBeLoggedIn(nextState, replace) {
    if (!store.getState().auth.token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  },

  mustBeLoggedOut(nextState, replace) {
    if (store.getState().auth.token) {
      replace({
        pathname: '/'
      })
    }
  }
}
