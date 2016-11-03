import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import Textfield    from '../../../../shared/form/Textfield';


class BusinessDetailsForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    returnLink: React.PropTypes.string
  }

  render() {
    const { action, csrf_token, model, returnLink, mode, form } = this.props;
    return (
      <Layout>
        <header>
          <h1>Company details</h1>
        </header>
        <article role="main" className="content-main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="BusinessDetails__create"
            valid={form.valid}
            component={SubmitForm}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <Textarea
              model={`${model}.summary`}
              name="summary"
              id="summary"
              controlProps={{ limit: 50 }}
              label="Company summary"
              description="This will be displayed in search results"
              messages={{
              required: 'You must provide a seller summary'
            }}
              validators={{ required }}
            />

            <Textfield
                model={`${model}.website`}
                name="website"
                id="website"
                htmlFor="website"
                label="Website URL"
                messages={{
                    required: 'You must provide a website'
                }}
            />

            <Textfield
                model={`${model}.linkedin`}
                name="linkedin"
                id="linkedin"
                htmlFor="linkedin"
                label="LinkedIn URL"
                messages={{
                    required: 'You must provide a LinkedIn'
                }}
            />

            <fieldset>
              <legend>Company address</legend>
              <Textfield
                  model={`${model}.address.addressLine`}
                  name="address.addressLine"
                  id="addressLine"
                  htmlFor="addressLine"
                  label="Address"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />

              <Textfield
                  model={`${model}.address.suburb`}
                  name="address.suburb"
                  id="suburb"
                  htmlFor="suburb"
                  label="Suburb"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
              <Textfield
                  model={`${model}.address.state`}
                  name="address.state"
                  id="state"
                  htmlFor="state"
                  label="State"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
              <Textfield
                  model={`${model}.address.postalCode`}
                  name="address.postalCode"
                  id="postalCode"
                  htmlFor="postalCode"
                  label="Postcode"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
            </fieldset>
            <input type="submit" value={mode === 'add' ? 'Next' : 'Save and return'} role="button"  />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.forms.businessDetailsForm.$form;
  return {
    model: 'businessDetailsForm',
    formErrors: state.form_options && state.form_options.errors,
    form,
    returnLink: state.businessDetailsForm && state.businessDetailsForm.returnLink,
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  BusinessDetailsForm as Form
}

export default connect(mapStateToProps)(BusinessDetailsForm);
