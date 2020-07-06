describe('Feed', () => {
  it('Access Feed', () => {
    cy.visit('/');
  });

  it('Should contain post list', () => {
    cy.get('ul[data-post-list]').should('exist');
  });

  it('Should have 10 posts initially', () => {
    cy.get('ul[data-post-list] li').should('have.length', 10);
  });

  it('Should load 10 more posts after we scroll to bottom', () => {
    cy.scrollTo('bottom');
    cy.wait(1000);
    cy.get('ul[data-post-list] li').should('have.length', 20);
  });
});