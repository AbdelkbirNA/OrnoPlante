describe('Page d’accueil OrnoPlante', () => {
  it('devrait afficher le titre', () => {
    cy.visit('http://localhost:3000')   // lance ton frontend en parallèle (npm run dev)
    cy.contains("OrnoPlante").should("be.visible")
  })
})
