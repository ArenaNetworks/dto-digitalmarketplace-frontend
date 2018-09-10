import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProgressContent extends Component {
  componentDidMount() {
    this.props.setStageStatus(this.props.stage, 'doing')
  }

  render() {
    const StageComponent = this.props.component
    return (
      <StageComponent
        setStageDoneStatus={this.props.setStageDoneStatus}
        stage={this.props.stage}
        model={this.props.model}
        isDone={this.props.isDone}
      />
    )
  }
}

ProgressContent.defaultProps = {
  setStageStatus: () => {},
  setStageDoneStatus: () => {}
}

ProgressContent.propTypes = {
  model: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageStatus: PropTypes.func,
  setStageDoneStatus: PropTypes.func,
  stage: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default ProgressContent
