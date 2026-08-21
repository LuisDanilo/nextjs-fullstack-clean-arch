describe('Detalle de tarea', () => {
  it('abre el drawer con los detalles y lo cierra', () => {
    const title = `Detalle E2E ${Date.now()}`
    const description = 'Descripción visible en el detalle'

    cy.visit('/')

    cy.findByRole('button', { name: /crear nueva tarea/i }).click()
    cy.findByLabelText('Título').type(title)
    cy.findByLabelText('Descripción').type(description)
    cy.findByRole('button', { name: 'Crear' }).click()
    cy.findByText('Tarea creada').should('be.visible')
    cy.findByRole('table').findByText(title).should('be.visible')

    cy.findByRole('table').findByText(title).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').should('contain.text', description)
    cy.findByRole('dialog').should('contain.text', 'Creada')

    cy.findByRole('button', { name: 'Cerrar' }).click()
    cy.findByRole('dialog').should('not.exist')
  })
})