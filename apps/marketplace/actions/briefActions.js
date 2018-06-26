import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_OVERVIEW_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  DELETE_BRIEF_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST,
  BRIEF_SENDING_REQUEST,
  BRIEF_ASSESSORS_FETCH_DATA_SUCCESS,
  BRIEF_ASSESSOR_SUBMIT_SUCCESS
} from '../constants/constants'

import {
  BRIEF_ID_NOT_FOUND,
  BRIEF_LOT_NOT_SUPPORTED,
  BRIEF_MUST_BE_DRAFT,
  GENERAL_ERROR
} from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage, clearErrorMessages } from './appActions'

export const sendingBriefRequest = currentlySending => ({
  type: BRIEF_SENDING_REQUEST,
  currentlySending
})

export const handleBriefOverviewSuccess = response => ({
  type: BRIEF_OVERVIEW_SUCCESS,
  data: response.data
})

export const loadBriefOverview = briefId => dispatch => {
  const getErrorMessage = status =>
    ({
      400: BRIEF_LOT_NOT_SUPPORTED,
      404: BRIEF_ID_NOT_FOUND,
      default: GENERAL_ERROR
    }[status])

  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}/overview` }).then(response => {
    if (!response || response.error) {
      const errorMessage = getErrorMessage(response.status) || getErrorMessage('default')
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleBriefOverviewSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleDeleteBriefSuccess = response => ({
  type: DELETE_BRIEF_SUCCESS,
  data: response.data
})

export const deleteBrief = briefId => dispatch => {
  const getErrorMessage = status =>
    ({
      400: BRIEF_MUST_BE_DRAFT,
      404: BRIEF_ID_NOT_FOUND,
      default: GENERAL_ERROR
    }[status])

  dispatch(sendingRequest(true))
  dmapi({ method: 'delete', url: `/brief/${briefId}` }).then(response => {
    if (!response || response.error) {
      const errorMessage = getErrorMessage(response.status) || getErrorMessage('default')
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleDeleteBriefSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponses: response.data.briefResponses
})

export const handleErrorFailure = response => dispatch => {
  if (!response) {
    dispatch(setErrorMessage(GENERAL_ERROR))
  } else {
    if (response.data && response.data.message) {
      dispatch(setErrorMessage(response.data.message))
    }
    if (response.message) {
      if (response.code) {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.code}: ${response.message})`))
      } else {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.message})`))
      }
    } else {
      setErrorMessage(GENERAL_ERROR)
    }
  }
}

export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}/responses` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefResponseSuccess = response => ({
  type: BRIEF_RESPONSE_SUCCESS,
  briefResponse: response.data.briefResponses
})

export const handleBriefResponseSubmit = (briefId, model) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export function handleBriefNameSubmit(specialistName) {
  return { type: SPECIALIST_NAME, specialistName }
}

export function handleSpecialistNumberSubmit(specialistNumber) {
  return { type: SPECIALIST_NUMBER, specialistNumber }
}

export function addAnotherSpecialistSubmit(addAnotherSpecialist) {
  return { type: ADD_ANOTHER_SPECIALIST, addAnotherSpecialist }
}

export const handleBriefAssessorsSuccess = response => ({
  type: BRIEF_ASSESSORS_FETCH_DATA_SUCCESS,
  briefAssessors: response.data
})

export const loadBriefAssessors = briefId => dispatch => {
  dispatch(sendingBriefRequest(true))
  dmapi({ url: `/brief/${briefId}/assessors` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBriefAssessorsSuccess(response))
    }
    dispatch(sendingBriefRequest(false))
  })
}

export const handleBriefAssessorSubmitSuccess = response => ({
  type: BRIEF_ASSESSOR_SUBMIT_SUCCESS,
  briefAssessors: response.data
})

export const handleBriefAssessorSubmit = (briefId, data, assessors) => dispatch => {
  dispatch(clearErrorMessages())

  const emailAddresses = data.assessors.map(a => a.email_address)
  if (emailAddresses.some((e, index) => emailAddresses.indexOf(e) !== index)) {
    dispatch(setErrorMessage('There is a duplicate email address'))
    return
  }
  const duplicates = data.assessors.filter(a => assessors.filter(b => a.email_address === b.email_address).length)
  if (duplicates.length) {
    dispatch(setErrorMessage(`${duplicates[0].email_address} has already been invited`))
    return
  }

  dispatch(sendingBriefRequest(true))
  dmapi({
    url: `/brief/${briefId}/assessors`,
    method: 'POST',
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleBriefAssessorSubmitSuccess(response))
    }
    dispatch(sendingBriefRequest(false))
  })
}
