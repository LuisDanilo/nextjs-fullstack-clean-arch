import '@testing-library/cypress/add-commands'

beforeEach(() => {
  cy.setCookie('locale', 'es')
})