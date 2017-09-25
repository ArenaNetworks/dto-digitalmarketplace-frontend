import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import isNumber from 'lodash/isNumber'

import { required, validEmail, validPhoneNumber } from 'shared/validators'

import Layout from 'shared/Layout'
import BaseForm from 'shared/form/BaseForm'
import SubmitForm from 'shared/form/SubmitForm'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { loadProfile } from 'orams/actions/profileActions'

class YourInfoForm extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    supplierCode: PropTypes.number
  }

  componentDidMount() {
    this.props.loadProfileData(this.props.form.model)
  }

  render() {
    const {
      action,
      csrf_token,
      model,
      supplierCode,
      form,
      children,
      handleSubmit,
      nextRoute,
      submitClicked,
      userName, 
      userEmail
    } = this.props
    let title = 'Contact details'
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    return (
      <Layout>
        <header>
          <h1 className="uikit-display-5" tabIndex="-1">
            {title}
          </h1>
        </header>
        <article role="main">
          <ErrorBox model={model} setFocus={setFocus} submitClicked={submitClicked} />
          <Form
            model={model}
            action={action}
            id="yourinfo"
            valid={form.valid}
            component={SubmitForm}
            onSubmit={data => handleSubmit(data)}
          >
            {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}

            <Textfield
              model={`${model}.contacts.0.name`}
              name="contact_name"
              id="contact_name"
              htmlFor="contact_name"
              label="Business contact name"
              description="The contact listed on your seller profile page."
              validators={{ required }}
              messages={{
                required: 'Business contact is required'
              }}
              default={userName}
            />

            <Textfield
              model={`${model}.contacts.0.email`}
              name="contact_email"
              id="contact_email"
              htmlFor="contact_email"
              label="Email"
              validators={{ required, validEmail }}
              messages={{
                required: 'Business contact email is required',
                validEmail: 'Business contact email must be a valid email address'
              }}
              default={userEmail}
            />

            <Textfield
              model={`${model}.contacts.0.phone`}
              name="contact_phone"
              id="contact_phone"
              htmlFor="contact_phone"
              label="Phone"
              validators={{ required, validPhoneNumber }}
              messages={{
                required: 'Business contact phone is required',
                validPhoneNumber: 'Business contact phone number must be a valid phone number'
              }}
            />

            <Textfield
              model={`${model}.representative`}
              name="representative"
              id="representative"
              htmlFor="representative"
              label="Authorised representative name"
              description="This is the person authorised to enter into contracts on behalf of the business. "
              validators={{ required }}
              messages={{
                required: 'Authorised representative is required'
              }}
            />

            <Textfield
              model={`${model}.email`}
              name="email"
              id="email"
              htmlFor="email"
              label="Email"
              validators={{ required, validEmail }}
              messages={{
                required: "Authorised representative's email is required",
                validEmail: "Authorised representative's email must be a valid email address"
              }}
            />

            <Textfield
              model={`${model}.phone`}
              name="phone"
              id="phone"
              htmlFor="phone"
              label="Phone"
              validators={{ required, validPhoneNumber }}
              messages={{
                required: "Authorised representative's phone number is required",
                validPhoneNumber: "Authorised representative's phone number must be a valid phone number"
              }}
            />

            {children}

            <button type="submit" className="uikit-btn">
              Update profile
            </button>
          </Form>
        </article>
      </Layout>
    )
  }
}

YourInfoForm.defaultProps = {
  title: 'Add your contact details'
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'yourInfoForm'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfileData: form => dispatch(loadProfile(form))
  }
}

export { Textfield, mapStateToProps, YourInfoForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(YourInfoForm)
