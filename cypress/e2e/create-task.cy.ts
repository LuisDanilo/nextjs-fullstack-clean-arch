describe('Crear tarea', () => {
  it('crea una tarea desde el diálogo y la muestra en la tabla', () => {
    const title = `Tarea E2E ${Date.now()}`
    const description = 'Descripción generada por el test E2E'

    cy.visit('/')

    cy.findByRole('button', { name: /crear nueva tarea/i }).click()
    cy.findByRole('dialog').should('be.visible')

    cy.findByLabelText('Título').type(title)
    cy.findByLabelText('Descripción').type(description)
    cy.findByRole('button', { name: 'Crear' }).click()

    cy.findByText('Tarea creada').should('be.visible')
    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('table').findByText(title).should('be.visible')
  })
})