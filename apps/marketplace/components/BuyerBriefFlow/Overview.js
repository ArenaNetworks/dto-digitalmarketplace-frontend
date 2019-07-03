import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBrief } from 'marketplace/actions/briefActions'
import isValid from 'date-fns/is_valid'
import { rootPath } from 'marketplace/routes'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import ClosedDate from 'shared/ClosedDate'
import styles from './Overview.scss'

const answerSellerQuestionsRender = (brief, flow, isPublished, isClosed) => {
  if (!isPublished) {
    return <span>Answer seller questions</span>
  }

  if (isPublished && isClosed) {
    return (
      <span>
        <Tick className={styles.tick} colour="#17788D" />
        <span>Answer seller questions</span>
      </span>
    )
  }

  return <a href={`${rootPath}/brief/${brief.id}/questions`}>Answer seller questions</a>
}

const downloadResponsesRender = (brief, isPublished, isClosed) => {
  if (isPublished && isClosed) {
    return <a href={`${rootPath}/brief/${brief.id}/download-responses`}>Download responses</a>
  }

  return <span>Download responses</span>
}

const createWorkOrderRender = (brief, flow, isPublished, isClosed, oldWorkOrderCreator) => {
  if (isPublished && isClosed) {
    let url = ''
    let title = ''
    if (brief.work_order_id) {
      url = `/work-orders/${brief.work_order_id}`
      title = 'Edit work order'
    } else {
      url = `/buyers/frameworks/${brief.frameworkSlug}/requirements/${flow}/${brief.id}/work-orders/create`
      title = 'Create work order'
    }
    if (!oldWorkOrderCreator) {
      url = `/2/buyer-award/${brief.id}`
      title = 'Download work order'
    }
    return <a href={url}>{title}</a>
  }

  return <span>Create work order</span>
}

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
  }

  handleDeleteBrief(id) {
    this.props.deleteBrief(id)
  }

  toggleDeleteAlert() {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert
    }))
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true
    })
  }

  render() {
    if (this.props.deleteBriefSuccess) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    const { brief, briefResponses, flow, oldWorkOrderCreator, questionsAsked } = this.props

    if (brief && brief.id && brief.dates) {
      const isPublished = brief.dates.published_date && isValid(new Date(brief.dates.published_date))

      const isClosed = brief.status === 'closed'

      const invitedSellers =
        brief.sellers && Object.keys(brief.sellers).length > 0 ? Object.keys(brief.sellers).length : 0

      const questionsAnswered =
        brief.clarificationQuestions && brief.clarificationQuestions.length > 0
          ? brief.clarificationQuestions.length
          : 0

      const briefResponseCount = briefResponses && briefResponses.length > 0 ? briefResponses.length : 0
      const flowName = flow !== 'specialist' ? flow.toUpperCase() : 'specialist'

      return (
        <div>
          <div className={styles.header}>
            <AUheading size="xl" level="1">
              <small className={styles.briefTitle}>{brief.title || `New ${flowName} request`}</small>
              Overview
            </AUheading>
            <div className={styles.headerMenu}>
              {isPublished &&
                !isClosed && (
                  <div className={styles.headerMenuClosingTime}>
                    Closing{' '}
                    <strong>
                      <ClosedDate countdown date={brief.dates.closing_time} />
                    </strong>
                  </div>
                )}
              <ul>
                {isPublished && (
                  <li>
                    <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
                  </li>
                )}
                {!isPublished && (
                  <div>
                    <li>
                      <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>Preview</a>
                    </li>
                    <li>
                      <a href="#delete" onClick={this.handleDeleteClick} className={styles.headerMenuDelete}>
                        Delete draft
                      </a>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
          {this.state.showDeleteAlert && (
            <div className={styles.deleteAlert}>
              <AUpageAlert as="warning">
                <p>Are you sure you want to delete this opportunity?</p>
                <AUbutton onClick={() => this.handleDeleteBrief(brief.id)}>Yes, delete opportunity</AUbutton>
                <AUbutton as="secondary" onClick={this.toggleDeleteAlert}>
                  Do not delete
                </AUbutton>
              </AUpageAlert>
            </div>
          )}
          <ul className={styles.overviewList}>
            <li>
              {isPublished ? (
                <span>
                  <Tick className={styles.tick} colour="#17788D" />Create and publish request
                  <div className={styles.stageStatus}>
                    {invitedSellers > 0 && (
                      <span>
                        {invitedSellers} seller{invitedSellers > 1 && `s`} invited
                      </span>
                    )}
                  </div>
                </span>
              ) : (
                <span>
                  <a href={`${rootPath}/buyer-${flow}/${brief.id}/introduction`}>
                    {brief.title ? 'Edit and publish request' : 'Create and publish request'}
                  </a>
                </span>
              )}
            </li>
            <li>
              {answerSellerQuestionsRender(brief, flow, isPublished, isClosed)}
              <div className={styles.stageStatus}>
                {questionsAsked} questions asked, {questionsAnswered} answer{questionsAnswered > 1 && `s`} published
              </div>
            </li>
            {(briefResponseCount > 0 || !isPublished || !isClosed) && (
              <li>
                {downloadResponsesRender(brief, isPublished, isClosed)}
                {briefResponseCount > 0 && (
                  <div className={styles.stageStatus}>
                    {flow === 'specialist'
                      ? `${briefResponseCount} candidate${briefResponseCount > 1 ? `s` : ''} submitted`
                      : `${briefResponseCount} seller${briefResponseCount > 1 ? `s` : ''} submitted`}
                  </div>
                )}
              </li>
            )}
            {(flow === 'rfx' || flow === 'specialist') &&
              (briefResponseCount > 0 || !isPublished || !isClosed) && (
                <li>{createWorkOrderRender(brief, flow, isPublished, isClosed, oldWorkOrderCreator)}</li>
              )}
            {briefResponseCount === 0 && isClosed && <li>No sellers responded</li>}
          </ul>
        </div>
      )
    }
    return null
  }
}

Overview.defaultProps = {
  oldWorkOrderCreator: true,
  questionsAsked: 0
}

Overview.propTypes = {
  brief: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired,
  oldWorkOrderCreator: PropTypes.bool,
  questionsAsked: PropTypes.number
}

const mapStateToProps = state => ({
  deleteBriefSuccess: state.brief.deleteBriefSuccess
})

const mapDispatchToProps = dispatch => ({
  deleteBrief: briefId => dispatch(deleteBrief(briefId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
