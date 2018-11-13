import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from './ErrorAlert'
import styles from './BuyerRFQResponseFormatsStage.scss'

const BuyerRFQResponseFormatsStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        atleastOneFormat: formValues => formValues.evaluationType && formValues.evaluationType.length > 0,
        atleastOneProposal: formValues =>
          !formValues.evaluationType.includes('Written proposal') ||
          (formValues.evaluationType.includes('Written proposal') &&
            formValues.proposalType &&
            formValues.proposalType.length > 0)
      }
    }}
    onSubmit={props.onSubmit}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Response formats
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        atleastOneFormat: 'You must select at least one response format',
        atleastOneProposal: 'You must select at least one proposal type if you are requesting a written proposal.'
      }}
    />
    <p>You will receive from sellers:</p>
    <div className={styles.formats}>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_template`}
        name={`response_format_template`}
        label="Response template"
        description="If you select this option, you will need to upload your own template."
        value="Response template"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_proposal`}
        name={`response_format_proposal`}
        label="Written proposal"
        value="Written proposal"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      {props[props.model].evaluationType.includes('Written proposal') && (
        <div>
          <p>Select what you would like sellers to include:</p>
          <div className={styles.subFormats}>
            <CheckboxDetailsField
              model={`${props.model}.proposalType[]`}
              id={`proposal_costings`}
              name={`proposal_costings`}
              label="Costings"
              value="Costings"
              detailsModel={props.model}
              validators={{
                required
              }}
              messages={{}}
            />
            <CheckboxDetailsField
              model={`${props.model}.proposalType[]`}
              id={`proposal_casestudy`}
              name={`proposal_casestudy`}
              label="Case study"
              value="Case study"
              detailsModel={props.model}
              disabled={!props[props.model].evaluationType.includes('Written proposal')}
              validators={{
                required
              }}
              messages={{}}
            />
            <CheckboxDetailsField
              model={`${props.model}.proposalType[]`}
              id={`proposal_references`}
              name={`proposal_references`}
              label="References"
              value="References"
              detailsModel={props.model}
              validators={{
                required
              }}
              messages={{}}
            />
            <CheckboxDetailsField
              model={`${props.model}.proposalType[]`}
              id={`proposal_resumes`}
              name={`proposal_resumes`}
              label="Résumés"
              value="Résumés"
              detailsModel={props.model}
              validators={{
                required
              }}
              messages={{}}
            />
          </div>
        </div>
      )}
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_demonstration`}
        name={`response_format_demonstration`}
        label="Demonstration"
        value="Demonstration"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_presentation`}
        name={`response_format_presentation`}
        label="Presentation"
        value="Presentation"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
    </div>
    {props.formButtons}
  </Form>
)

BuyerRFQResponseFormatsStage.defaultProps = {
  onSubmit: () => {}
}

BuyerRFQResponseFormatsStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQResponseFormatsStage)
