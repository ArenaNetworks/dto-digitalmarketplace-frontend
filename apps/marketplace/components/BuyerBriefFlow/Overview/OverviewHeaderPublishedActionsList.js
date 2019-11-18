import React from 'react'

import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'

import styles from '../Overview.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief, briefResponses } = props
  let invitedSellerCode = null
  let respondedSellerCode = null
  let showCloseLink = false

  if (brief.sellerSelector === 'oneSeller') {
    const invitedSellerCodes = Object.keys(brief.sellers)

    if (invitedSellerCodes.length === 1) {
      invitedSellerCode = parseInt(invitedSellerCodes.pop(), 10)
    }

    if (briefResponses.length === 1) {
      respondedSellerCode = briefResponses[0].supplier_code
    }

    showCloseLink = invitedSellerCode && respondedSellerCode && invitedSellerCode === respondedSellerCode
  }

  return (
    <ul className={styles.menuList}>
      <li>
        <div className={styles.headerMenuClosingTime}>
          Closing{' '}
          <strong>
            <ClosedDate countdown date={brief.dates.closing_time} />
          </strong>
        </div>
      </li>
      {showCloseLink && (
        <li>
          <a href={`${rootPath}/brief/${brief.id}/close`}>Close opportunity now</a>
        </li>
      )}
    </ul>
  )
}

export default OverviewHeaderPublishedActionsList
