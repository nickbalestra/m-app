import xs from 'xstream'
import { combineCycles } from 'redux-cycle-middleware'
import { API_URL } from '../constants/api'
import { doLogout } from './auth'
import dropRepeats from 'xstream/extra/dropRepeats'
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const FETCH_USERS = 'm-app/apps/FETCH_USERS'
const INIT_USERS = 'm-app/apps/INIT_USERS'
const FETCH_USERS_SUCCESS = 'm-app/apps/FETCH_USERS_SUCCESS'
// const FETCH_APPS_FAIL = 'm-app/apps/FETCH_APPS_FAIL'
// const EDIT_APP = 'm-app/apps/EDIT_APP'
// const SAVE_APP = 'm-app/apps/SAVE_APP'

// ACTION CREATORS
// =======================================================
export function fetchUsers (id) {
  return {
    type: FETCH_USERS,
    payload: id
  }
}

export function initUsers (id) {
  return {
    type: INIT_USERS,
    payload: id
  }
}

function fetchUsersSuccess (users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

// REDUCER
// =======================================================
const initialState = {
  users: [],
  fetching: false
}

// const mapAppsToIds = (appsArray) =>
//   appsArray.reduce((apps, app) => {
//     apps[app.id] = app
//     return apps
//   }, {})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INIT_USERS:
      return {...state, users: []}
    case FETCH_USERS:
      return {...state, fetching: true}
    case FETCH_USERS_SUCCESS:
      return {...state, fetching: false, users: state.users.concat(action.payload)}
    default:
      return state
  }
}

// CYCLE
// =======================================================
const cycleFetchUsers = (sources) => {
  function networking (sources) {
    const token$ = sources.STATE
      .map(({auth}) => auth.token)
      .filter(auth => auth)
      .compose(dropRepeats())

    const usersOffset$ = sources.STATE
      .map(({users}) => users.users.length)

    const fetchAppAction$ = sources.ACTION
      .filter(({ type }) => type === FETCH_USERS)

    const request$ = fetchAppAction$
      .compose(sampleCombine(token$, usersOffset$))
      .map(([ action, token, offset ]) => ({
        url: `${API_URL}/apps/${action.payload}/users`,
        category: FETCH_USERS,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        query: {
          offset
        }
      }))

    return request$
  }

  function intent (sources) {
    const action$ = sources.HTTP
      .select(FETCH_USERS)
      .map((response$) =>
        response$.replaceError((error) =>
          xs.of(error.response)
        ))
      .flatten()
      .map((res) =>
        res.error
        ? doLogout(res.statusText)
        : fetchUsersSuccess(res.body.users)
        )

    return action$
  }

  return {
    ACTION: intent(sources),
    HTTP: networking(sources)
  }
}

const cycleInitUsers = (sources) => {
  function intent (sources) {
    return sources.ACTION
    .filter(({type}) => type === INIT_USERS)
    .map(({payload}) => fetchUsers(payload))
    .compose(delay(0))
  }

  return {
    ACTION: intent(sources)
  }
}

export const cycle = combineCycles(
  cycleFetchUsers,
  cycleInitUsers
)
