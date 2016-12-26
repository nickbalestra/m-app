import xs from 'xstream'
import { API_URL } from '../constants/api'
import { doLogout } from './auth'

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const FETCH_APPS = 'm-app/apps/FETCH_APPS'
const FETCH_APPS_SUCCESS = 'm-app/apps/FETCH_APPS_SUCCESS'
// const FETCH_APPS_FAIL = 'm-app/apps/FETCH_APPS_FAIL'
// const EDIT_APP = 'm-app/apps/EDIT_APP'
// const SAVE_APP = 'm-app/apps/SAVE_APP'

// ACTION CREATORS
// =======================================================
export function fetchApps () {
  return {
    type: FETCH_APPS
  }
}

function fetchAppsSuccess (apps) {
  return {
    type: FETCH_APPS_SUCCESS,
    payload: apps
  }
}

// REDUCER
// =======================================================
const initialState = {
  apps: {},
  isFetching: false
}

const mapAppsToIds = (appsArray) =>
  appsArray.reduce((apps, app) => {
    apps[app.id] = app
    return apps
  }, {})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
      return {...state, fetching: true}
    case FETCH_APPS_SUCCESS:
      return {...state, fetching: false, apps: mapAppsToIds(action.payload)}
    default:
      return state
  }
}

// CYCLE
// =======================================================
const cycleFetchApps = (sources) => {
  function networking (sources) {
    const token$ = sources.STATE
      .map(({auth}) => auth.token)
      .filter(auth => auth)

    const fetchAppAction$ = sources.ACTION
      .filter(({ type }) => type === FETCH_APPS)

    const request$ = xs.combine(fetchAppAction$, token$)
      .map(([ action, token ]) => ({
        url: `${API_URL}/apps`,
        category: FETCH_APPS,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }))
      .take(1)

    return request$
  }

  function intent (sources) {
    const action$ = sources.HTTP
      .select(FETCH_APPS)
      .map((response$) =>
        response$.replaceError((error) =>
          xs.of(error.response)
        ))
      .flatten()
      .map((res) =>
        res.error
        ? doLogout(res.statusText)
        : fetchAppsSuccess(res.body.apps)
        )

    return action$
  }

  return {
    ACTION: intent(sources),
    HTTP: networking(sources)
  }
}

export const cycle = cycleFetchApps
