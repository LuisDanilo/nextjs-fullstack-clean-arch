describe('Sidebar móvil', () => {
  it('abre el menú móvil y muestra los enlaces de navegación', () => {
    cy.viewport(375, 667)
    cy.visit('/')

    cy.findByRole('button', { name: 'Abrir menú' }).click()

    cy.findByRole('button', { name: 'Abrir menú' }).should('have.attr', 'aria-expanded', 'true')
    cy.findByRole('link', { name: 'Tareas' }).should('be.visible')
    cy.findByRole('link', { name: 'Completados' }).should('be.visible')
    cy.findByRole('link', { name: 'Configuración' }).should('be.visible')

    cy.findByRole('button', { name: 'Cerrar menú' }).click()
    cy.findByRole('button', { name: 'Abrir menú' }).should('have.attr', 'aria-expanded', 'false')
  })
})