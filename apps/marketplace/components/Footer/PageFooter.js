/* eslint-disable  react/no-danger */
import React from 'react'
import Footer, { FooterNav, FooterEnd } from '@gov.au/footer'
import styles from './PageFooter.scss'
import logoGovCrest from './logo_govcrest.svg'
import logoNisa from './logo_nisa.svg'

const PageFooter = () => (
  <Footer>
    <div className={styles.footerWrapper}>
      <FooterNav>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h2 className="uikit-display-1">About</h2>
            <ul className="uikit-link-list">
              <li>
                <a href="/about-us">About us</a>
              </li>
              <li>
                <a href="/contact-us">Contact us</a>
              </li>
              <li>
                <a href="/terms-of-use">Terms of Use</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy</a>
              </li>
              <li>
                <a href="/security">Security</a>
              </li>
              <li>
                <a href="/disclaimer">Disclaimer</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="uikit-display-1">Using the Digital Marketplace</h2>
            <ul className="uikit-link-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/search/sellers">Seller catalogue</a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001542047-Buyer-guide-and-FAQs">
                  Buyer&rsquo;s guide and FAQs
                </a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001540368-Seller-guide-and-FAQs">
                  Seller&rsquo;s guide and FAQs
                </a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/">Support</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="uikit-display-1">
              Digital Marketplace brought to you by the{' '}
              <a rel="external" href="https://www.dta.gov.au/">
                DTA
              </a>
            </h2>
            <ul className="uikit-link-list">
              <li>
                <a rel="external" href="https://www.dta.gov.au/tags/digital-marketplace/">
                  DTA blog
                </a>
              </li>
              <li>
                <a rel="external" href="https://twitter.com/DTA">
                  DTA twitter
                </a>
              </li>
              <li>
                <a rel="external" href="https://github.com/AusDTO">
                  DTA github
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="uikit-display-1">DTA resources</h2>
            <ul className="uikit-link-list">
              <li>
                <a rel="external" href="https://www.dta.gov.au/our-work/">
                  Our work
                </a>
              </li>
              <li>
                <a rel="external" href="https://www.dta.gov.au/standard/">
                  Our standard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </FooterNav>

      <FooterEnd>
        <div className="row">
          <div className="col-sm-12">
            <div className={styles.logoGovcrest}>
              <div dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
            </div>
            <div className={styles.logoNisa}>
              <div dangerouslySetInnerHTML={{ __html: logoNisa }} />
            </div>
            <div className={styles.footerSmallText}>
              This program forms part of the National Innovation and Science Agenda.<br />Visit{' '}
              <strong>
                <a href="https://innovation.gov.au/">Innovation.gov.au</a>
              </strong>{' '}
              to find out more.
            </div>
          </div>
        </div>
      </FooterEnd>
    </div>
  </Footer>
)

export default PageFooter
