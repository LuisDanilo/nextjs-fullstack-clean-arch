describe('Cambiar estado', () => {
  it('cambia el estado de una tarea desde el select', () => {
    const title = `Estado E2E ${Date.now()}`

    cy.visit('/')

    cy.findByRole('button', { name: /crear nueva tarea/i }).click()
    cy.findByLabelText('Título').type(title)
    cy.findByLabelText('Descripción').type('Descripción para test de estado')
    cy.findByRole('button', { name: 'Crear' }).click()
    cy.findByText('Tarea creada').should('be.visible')
    cy.findByRole('table').findByText(title).should('be.visible')

    cy.findByRole('table')
      .findByText(title)
      .closest('[role="row"]')
      .findByRole('combobox')
      .select('done')

    cy.findByText('Estado actualizado').should('be.visible')
    cy.findByRole('table')
      .findByText(title)
      .closest('[role="row"]')
      .findByRole('combobox')
      .should('have.value', 'done')
  })
})