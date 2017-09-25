/* global FormData */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import range from 'lodash/range'
import dmapi from 'marketplace/services/apiClient'

import FileInput from './FileInput'

class FilesInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    formFields: PropTypes.number.isRequired
  }

  static defaultProps = {}

  render() {
    const { label, description, hint, formFields } = this.props

    return (
      <div>
        <label className="question-heading uikit-text-input__label" htmlFor="file_0">
          {label}
        </label>
        <span>
          {description}
        </span>
        <p className="hint">
          {hint}
        </p>
        {range(formFields).map((field, id) => <FileInput key={field} id={id} {...this.props} />)}
      </div>
    )
  }
}

const uploadDocument = (id, url, file) => () => {
  const data = new FormData()
  data.append(id, file)

  return dmapi({
    url: `${url}/${id}`,
    method: 'POST',
    data
  }).then(
    response =>
      response.error
        ? { errorMessage: response.data.errorMessage || response.statusText }
        : { filename: response.data.filename }
  )
}

const mapStateToProps = (state, ownProps) => ({
  form: state[ownProps.model],
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  onUpload: (id, url, data) => dispatch(uploadDocument(id.toString(), url, data)),
  removeDocument: (model, name, id) => dispatch(actions.omit(`${model}.${name}`, id.toString())),
  createDocument: (model, name, id) => dispatch(actions.change(`${model}.${name}.${id}`, '')),
  updateDocumentName: (model, name, id, filename) => dispatch(actions.change(`${model}.${name}.${id}`, filename))
})

export { mapStateToProps }

export default connect(mapStateToProps, mapDispatchToProps)(FilesInput)
