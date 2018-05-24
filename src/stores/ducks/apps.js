import xs from "xstream";
import { combineCycles } from "redux-cycle-middleware";
import { API_URL } from "../constants/api";
import { doLogout } from "./auth";
import dropRepeats from "xstream/extra/dropRepeats";
import { push } from "react-router-redux";

// ACTION TYPES (Format: app-name/reducer/ACTION_TYPE)
// =======================================================
const FETCH_APPS = "m-app/apps/FETCH_APPS";
const FETCH_APPS_SUCCESS = "m-app/apps/FETCH_APPS_SUCCESS";
// const FETCH_APPS_FAIL = 'm-app/apps/FETCH_APPS_FAIL'
const EDIT_APP = "m-app/apps/EDIT_APP";
const SAVE_APP = "m-app/apps/SAVE_APP";

// ACTION CREATORS
// =======================================================
export function fetchApps() {
  return {
    type: FETCH_APPS
  };
}

function fetchAppsSuccess(apps) {
  return {
    type: FETCH_APPS_SUCCESS,
    payload: apps
  };
}

export function editApp(id, name, logo) {
  return {
    type: EDIT_APP,
    payload: {
      id,
      name,
      logo
    }
  };
}

function saveApp(app) {
  return {
    type: SAVE_APP,
    payload: app
  };
}

// REDUCER
// =======================================================
const initialState = {
  apps: {},
  isFetching: false
};

const mapAppsToIds = appsArray =>
  appsArray.reduce((apps, app) => {
    apps[app.id] = app;
    return apps;
  }, {});

const updateApps = (apps, app) => {
  apps[app.id] = app;
  return apps;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
      return { ...state, fetching: true };
    case FETCH_APPS_SUCCESS:
      return { ...state, fetching: false, apps: mapAppsToIds(action.payload) };
    case EDIT_APP:
      return { ...state, fetching: true };
    case SAVE_APP:
      return {
        ...state,
        fetching: false,
        apps: updateApps(state.apps, action.payload)
      };
    default:
      return state;
  }
}

// CYCLE
// =======================================================
const cycleFetchApps = sources => {
  function networking(sources) {
    const token$ = sources.STATE.map(({ auth }) => auth.token)
      .filter(auth => auth)
      .compose(dropRepeats());

    const fetchAppAction$ = sources.ACTION.filter(
      ({ type }) => type === FETCH_APPS
    );

    const request$ = xs
      .combine(fetchAppAction$, token$)
      .map(([action, token]) => ({
        url: `${API_URL}/apps`,
        category: FETCH_APPS,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }));

    return request$;
  }

  function intent(sources) {
    const action$ = sources.HTTP.select(FETCH_APPS)
      .map(response$ => response$.replaceError(error => xs.of(error.response)))
      .flatten()
      .map(
        res =>
          res.error ? doLogout(res.statusText) : fetchAppsSuccess(res.body.apps)
      );

    return action$;
  }

  return {
    ACTION: intent(sources),
    HTTP: networking(sources)
  };
};

const cycleEditApp = sources => {
  function networking(sources) {
    const token$ = sources.STATE.map(({ auth }) => auth.token)
      .filter(auth => auth)
      .compose(dropRepeats());

    const editAppAction$ = sources.ACTION.filter(
      ({ type }) => type === EDIT_APP
    );

    const request$ = xs
      .combine(editAppAction$, token$)
      .map(([action, token]) => ({
        url: `${API_URL}/apps/${action.payload.id}`,
        category: EDIT_APP,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        send: {
          name: action.payload.name,
          logo: action.payload.logo
        }
      }));

    return request$;
  }

  function intent(sources) {
    const action$ = sources.HTTP.select(EDIT_APP)
      .map(response$ => response$.replaceError(error => xs.of(error.response)))
      .flatten()
      .map(
        res => (res.error ? doLogout(res.statusText) : saveApp(res.body.app))
      );

    return action$;
  }

  return {
    ACTION: intent(sources),
    HTTP: networking(sources)
  };
};

const cycleSaveApp = sources => {
  function intent(sources) {
    const action$ = sources.ACTION.filter(({ type }) => type === SAVE_APP).map(
      ({ payload }) => push(`/apps/${payload.id}`)
    );

    return action$;
  }

  return {
    ACTION: intent(sources)
  };
};

export const cycle = combineCycles(cycleFetchApps, cycleEditApp, cycleSaveApp);
