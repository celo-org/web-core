import { INFO_MODAL_KEY, TEST_SAFE } from '../e2e/safe-apps/constants'

Cypress.Commands.add('visitSafeApp', (appUrl, testSafe = TEST_SAFE) => {
  cy.on('window:before:load', (window) => {
    window.localStorage.setItem(
      INFO_MODAL_KEY,
      JSON.stringify({
        5: { consentsAccepted: true },
      }),
    )
  })

  cy.visit(`/${testSafe}/apps?appUrl=${encodeURIComponent(appUrl)}`, {
    failOnStatusCode: false,
    onBeforeLoad: (win) => {
      win.addEventListener('message', cy.stub().as('safeAppsMessage'))
    },
  })
})
