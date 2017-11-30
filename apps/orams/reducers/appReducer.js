/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGES,
  SET_AUTH,
  PROFILE_UPDATED,
  DISPLAY_STEP_2
} from 'orams/constants/constants'

// The initial application state
const initialState = {
  currentlySending: false,
  errorMessage: null,
  loggedIn: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.sending
      }

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case CLEAR_ERROR_MESSAGES:
      return {
        ...state,
        errorMessage: null
      }

    case SET_AUTH:
      return {
        ...state,
        loggedIn: action.newState.isAuthenticated,
        userType: action.newState.userType,
        supplierCode: action.newState.supplierCode
      }

    case PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: true
      }

    case DISPLAY_STEP_2:
      return {
        ...state,
        displayStepTwo: true
      }

    default:
      return state
  }
}

export default appReducer
