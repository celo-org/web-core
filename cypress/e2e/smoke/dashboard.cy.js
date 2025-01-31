import * as constants from '../../support/constants'

describe('Dashboard', () => {
  before(() => {
    // Go to the test Safe home page
    cy.visit(`/home?safe=${constants.TEST_SAFE}`)

    cy.contains('button', 'Accept selection').click()

    // Wait for dashboard to initialize
    cy.contains('Connect & transact')
  })

  it('should display the overview widget', () => {
    // Alias for the Overview section
    cy.contains('h2', 'Overview').parents('section').as('overviewSection')

    cy.get('@overviewSection').within(() => {
      // Prefix is separated across elements in EthHashInfo
      cy.contains(constants.TEST_SAFE).should('exist')
      cy.contains('1/2')
      cy.get(`a[href="/balances?safe=${encodeURIComponent(constants.TEST_SAFE)}"]`).contains('View assets')
      // Text next to Tokens contains a number greater than 0
      cy.contains('p', 'Tokens').next().contains('1')
      cy.contains('p', 'NFTs').next().contains('0')
    })
  })

  it('should display the tx queue widget', () => {
    // Alias for the Transaction queue section
    cy.contains('h2', 'Transaction queue').parents('section').as('txQueueSection')

    cy.get('@txQueueSection').within(() => {
      // There should be queued transactions
      cy.contains('This Safe has no queued transactions').should('not.exist')

      // Queued txns
      cy.contains(`a[href^="/transactions/tx?id=multisig_0x"]`, '13' + 'Send' + '-0.00002 GOR' + '1/1').should('exist')

      cy.contains(`a[href="/transactions/queue?safe=${encodeURIComponent(constants.TEST_SAFE)}"]`, 'View all')
    })
  })

  it('should display the featured Safe Apps', () => {
    // Alias for the featured Safe Apps section
    cy.contains('h2', 'Connect & transact').parents('section').as('featuredSafeAppsSection')

    // Tx Builder app
    cy.get('@featuredSafeAppsSection').within(() => {
      // Transaction Builder
      cy.contains('Use Transaction Builder')
      cy.get(`a[href*='tx-builder']`).should('exist')

      // WalletConnect app
      cy.contains('Use WalletConnect')
      cy.get(`a[href*='wallet-connect']`).should('exist')

      // Featured apps have a Safe-specific link
      cy.get(`a[href*="&appUrl=http"]`).should('have.length', 2)
    })
  })

  it('should show the Safe Apps Section', () => {
    // Create an alias for the Safe Apps section
    cy.contains('h2', 'Safe Apps').parents('section').as('safeAppsSection')

    cy.get('@safeAppsSection').contains('Explore Safe Apps')

    // Regular safe apps
    cy.get('@safeAppsSection').within(() => {
      // Find exactly 5 Safe Apps cards inside the Safe Apps section
      cy.get(`a[href^="/apps/open?safe=${encodeURIComponent(constants.TEST_SAFE)}&appUrl=http"]`).should(
        'have.length',
        5,
      )
    })
  })
})
