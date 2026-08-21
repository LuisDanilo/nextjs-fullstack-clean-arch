describe('Vistas', () => {
  it('cambia entre la vista tabla y la vista kanban', () => {
    cy.viewport(1280, 800)
    cy.visit('/')

    cy.findByRole('table').should('be.visible')
    cy.findByRole('columnheader', { name: 'Título' }).should('be.visible')

    cy.findByRole('tab', { name: 'Kanban' }).click()
    cy.findByRole('table').should('not.exist')
    cy.findByRole('heading', { name: 'Pendiente' }).should('be.visible')
    cy.findByRole('heading', { name: 'En progreso' }).should('be.visible')
    cy.findByRole('heading', { name: 'En revisión' }).should('be.visible')
    cy.findByRole('heading', { name: 'Bloqueada' }).should('be.visible')
    cy.findByRole('heading', { name: 'Hecha' }).should('be.visible')

    cy.findByRole('tab', { name: 'Tabla' }).click()
    cy.findByRole('table').should('be.visible')
  })
})