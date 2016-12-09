import Rx from 'rxjs/Rx'
import { API_URL } from '../constants/api'
import { doLogout } from './auth'

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const FETCH_APPS = 'm-app/apps/FETCH_APPS'
const FETCH_APPS_SUCCESS = 'm-app/apps/FETCH_APPS_SUCCESS'
const FETCH_APPS_FAIL = 'm-app/apps/FETCH_APPS_FAIL'
const EDIT_APP = 'm-app/apps/EDIT_APP'
const SAVE_APP = 'm-app/apps/SAVE_APP'


// ACTION CREATORS
// =======================================================
export function fetchApps() {
  return {
    type: FETCH_APPS
  }
}

function fetchAppsSuccess(apps) {
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
      return {...state, fetching: true}
    case FETCH_APPS_SUCCESS:
      return {...state, fetching: false, apps: mapAppsToIds(action.payload)}
    default:
      return state
  }
}


// EPIC
// =======================================================
const epicFetchApps = (action$, store) =>
  action$
    .ofType(FETCH_APPS)
    .mergeMap(() =>
      Rx.Observable.ajax({
        url: `${API_URL}/apps`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': store.getState().auth.token
        }
      })
      .map(({ response }) => fetchAppsSuccess(response.apps))
      .catch(error => Rx.Observable.of(doLogout(error.xhr.response)))
    )

export const epic = epicFetchApps
