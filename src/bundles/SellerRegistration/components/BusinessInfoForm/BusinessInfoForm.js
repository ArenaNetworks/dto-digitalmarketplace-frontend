import React from 'react';
import {connect} from 'react-redux';
import { Form, Control } from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class BusinessInfoForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, title, children, onSubmit } = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">{title}</h1>
                </header>
                <article role="main">
                    <h2>About your business</h2>
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="BusinessDetails__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <fieldset>
                            <legend>Number of employees</legend>
                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="sole"
                                value="Sole trader"/>
                            <label htmlFor="sole">Sole trader

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="2to19"
                                value="2-19"/>
                            <label htmlFor="2to19">2-19

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="20to199"
                                value="20-199"/>
                            <label htmlFor="20to199">20-199

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="200plus"
                                value="200+"/>
                            <label htmlFor="200plus">200+

                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Select all that apply to your business (optional).</legend>

                            <Control.checkbox
                                model={`${model}.seller_type.start_up`}
                                id="start-up"
                                name="start-up"
                                value="Start Up"
                            />
                            <label htmlFor="start-up">Start up
                                <p>Your business aims to disrupt an established market using technology.
                                    Up to 5 years from business
                                    commencement. Not listed on any stock exchange.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.sme`}
                                id="sme"
                                name="sme"
                                value="SME"
                            />
                            <label htmlFor="sme">SME
                                <p>You have less than 200 employees and are independent of any parent organisation for taxation purposes.</p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="Indigenous"
                            />
                            <label htmlFor="indigenous">Indigenous
                                <p>Your business is listed on a directory of indigenous businesses, such as Supply Nation.</p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.regional`}
                                id="regional"
                                name="regional"
                                value="Regional"
                            />
                            <label htmlFor="regional">
                                Rural or non-metro based business
                            </label>

                        </fieldset>

                        <fieldset>
                            <legend>Business purpose</legend>

                            <Control.checkbox
                                model={`${model}.seller_type.nfp_social_enterprise`}
                                id="nfp-social-enterprise"
                                name="nfp-social-enterprise"
                                value="Not-for-profit / social enterprise"
                            />
                            <label htmlFor="nfp-social-enterprise">Not-for-profit / social enterprise
                                <p>An organisation that applies commercial strategies to maximize improvements in human or environmental well-being and reinvests profit to fulfil its mission.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.disability`}
                                id="disability"
                                name="disability"
                                value="Disability"
                            />
                            <label htmlFor="disability">Australian disability enterprise
                                <p>Your business is listed on the <a href="http://www.ade.org.au/ades-directory" rel="external">Australian disability enterprise register</a>.</p>
                            </label>

                        </fieldset>
                        

                        <fieldset>
                            <legend>Have you ever worked with government before?</legend>

                            <Control.checkbox
                                model={`${model}.government_experience.no_experience`}
                                name="no_experience"
                                id="experience"
                                value="experience"/>
                            <label htmlFor="experience">No, we're looking forward to working with government for the first time</label>

                            <Control.checkbox
                                model={`${model}.government_experience.local`}
                                name="local_government_experience"
                                id="local"
                                value="Local"/>
                            <label htmlFor="local">Yes, with local government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.state`}
                                name="state_government_experience"
                                id="state"
                                value="state"/>
                            <label htmlFor="state">Yes, with state or territory government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.federal`}
                                name="federal_government_experience"
                                id="federal"
                                value="federal"/>
                            <label htmlFor="federal">Yes, with federal government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.international`}
                                name="international_government_experience"
                                id="international"
                                value="international"/>
                            <label htmlFor="international">Yes, with government outside Australia</label>

                            
                            <Textfield
                                model={`${model}.other_panels`}
                                name="other-panels"
                                id="other-panels"
                                htmlFor="other-panels"
                                label="List any other Government panels you have joined (optional) "
                            />
                        </fieldset>
                        
                        
                        {children}

                        <input type="submit" value="Save and continue" role="button"/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

BusinessInfoForm.defaultProps = {
  title: 'More about your business'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'businessInfoForm')
    }
}

export {
    mapStateToProps,
    BusinessInfoForm as Form
}

export default connect(mapStateToProps)(BusinessInfoForm);
