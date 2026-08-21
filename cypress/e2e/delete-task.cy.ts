describe('Eliminar tarea', () => {
  it('elimina una tarea y desaparece de la tabla', () => {
    const title = `Borrar E2E ${Date.now()}`

    cy.visit('/')

    cy.findByRole('button', { name: /crear nueva tarea/i }).click()
    cy.findByLabelText('Título').type(title)
    cy.findByLabelText('Descripción').type('Descripción para borrar tarea')
    cy.findByRole('button', { name: 'Crear' }).click()
    cy.findByText('Tarea creada').should('be.visible')
    cy.findByRole('table').findByText(title).should('be.visible')

    cy.findByRole('table').findByText(title).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').findByRole('button', { name: 'Delete' }).click()

    cy.findByText('Tarea eliminada').should('be.visible')
    cy.findByRole('table').findByText(title).should('not.exist')
  })
})