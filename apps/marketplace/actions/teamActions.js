import { CREATE_TEAM_SUCCESS, GET_TEAM_SUCCESS, SAVE_TEAM_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleCreateTeamSuccess = response => ({
  type: CREATE_TEAM_SUCCESS,
  team: response.data
})

export const createTeam = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/team',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    }
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleCreateTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleGetTeamSuccess = response => ({
  type: GET_TEAM_SUCCESS,
  team: response.data
})

export const getTeam = teamId => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/team/${teamId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    }
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleGetTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleSaveTeamSuccess = response => ({
  type: SAVE_TEAM_SUCCESS,
  team: response.data.team
})

export const saveTeam = team => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/team/update`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    },
    data: JSON.stringify(team)
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleSaveTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}
