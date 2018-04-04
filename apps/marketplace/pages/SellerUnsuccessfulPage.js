import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SellerUnsuccessfulNav from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulNav'
import SellerUnsuccessfulIntroduction from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulIntroduction'
import SellerUnsuccessfulSelect from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulSelect'
import SellerUnsuccessfulReview from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulReview'
import { rootPath } from 'marketplace/routes'
import { loadBriefResponses } from 'marketplace/actions/briefActions'

class SellerUnsuccessfulPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stages: {
        introduction: 'todo',
        select: 'todo',
        review: 'todo'
      },
      sellers: [
        {
          id: 1,
          name: 'Test seller 1'
        },
        {
          id: 2,
          name: 'Test seller 2'
        },
        {
          id: 3,
          name: 'Test seller 3'
        },
        {
          id: 4,
          name: 'Test seller 4'
        }
      ],
      selectedSellers: [],
      csrfToken: ''
    }
    this.setStageStatus = this.setStageStatus.bind(this)
    this.moveToNextStage = this.moveToNextStage.bind(this)
    this.selectSeller = this.selectSeller.bind(this)
    this.deselectSeller = this.deselectSeller.bind(this)
    this.hasSelectedASeller = this.hasSelectedASeller.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData(this.props.match.params.briefId)
  }

  setStageStatus(stage, status) {
    const newStagesState = { ...this.state.stages }

    // there can only be one "doing" stage, so change any existing "doing" to "todo"
    if (status === 'doing') {
      Object.keys(this.state.stages).map(stateStage => {
        if (this.state.stages[stateStage] === 'doing') {
          newStagesState[stateStage] = 'todo'
        }
        return true
      })
    }

    newStagesState[stage] = status
    this.setState({ stages: newStagesState })
  }

  moveToNextStage(currentStage) {
    const stages = Object.keys(this.state.stages)
    const index = stages.indexOf(currentStage)

    if (index !== -1 && typeof stages[index + 1] !== 'undefined') {
      this.props.history.push(
        `${rootPath}/brief/${this.props.match.params.briefId}/seller-unsuccessful/${stages[index + 1]}`
      )
    }
  }

  selectSeller(id) {
    const newSelectedSellers = this.state.selectedSellers.slice()
    let newSeller = {}
    this.props.briefResponses.map(response => {
      if (response.supplierCode === parseInt(id, 10)) {
        newSeller = {
          id: response.supplierCode,
          name: response.supplierName
        }
      }
      return true
    })
    newSelectedSellers.push(newSeller)
    this.setState({
      selectedSellers: newSelectedSellers
    })
  }

  deselectSeller(id) {
    let newSelectedSellers = this.state.selectedSellers.slice()
    newSelectedSellers = newSelectedSellers.filter(seller => seller.id !== parseInt(id, 10))
    this.setState({
      selectedSellers: newSelectedSellers
    })
  }

  hasSelectedASeller() {
    return this.state.selectedSellers.length > 0
  }

  render() {
    return (
      <div className="row">
        <article role="main">
          <div className="col-sm-4">
            <SellerUnsuccessfulNav {...this.props} {...this.state} setStageStatus={this.setStageStatus} />
          </div>
          <div className="col-sm-8">
            <Switch>
              <Route
                exact
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-unsuccessful`}
                render={() =>
                  <SellerUnsuccessfulIntroduction
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-unsuccessful/select`}
                render={() =>
                  <SellerUnsuccessfulSelect
                    briefResponses={this.props.briefResponses}
                    selectedSellers={this.state.selectedSellers}
                    setStageStatus={this.setStageStatus}
                    selectSeller={this.selectSeller}
                    deselectSeller={this.deselectSeller}
                    hasSelectedASeller={this.hasSelectedASeller}
                    moveToNextStage={this.moveToNextStage}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-unsuccessful/review`}
                render={() =>
                  <SellerUnsuccessfulReview
                    selectedSellers={this.state.selectedSellers}
                    hasSelectedASeller={this.hasSelectedASeller}
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                  />}
              />
            </Switch>
          </div>
        </article>
      </div>
    )
  }
}

SellerUnsuccessfulPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  briefResponses: state.brief.briefResponses
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBriefResponses(briefId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerUnsuccessfulPage))
