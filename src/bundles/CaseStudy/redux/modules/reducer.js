import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import casestudy from './casestudy'

export default combineReducers({
  casestudy,
  form_options: (state = {}) => state,
  form: combineForms({
    caseStudyForm: { title: '' , opportunity: '' }
  }, 'form'),
})
