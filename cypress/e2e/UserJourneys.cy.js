describe('User journeys', () => {

  it('Journey 1: Users can navigate to the models section, add the first model to favorites, and then remove it from the favorites section and the text should say "No favorites yet"', () => {
    cy.visit('/')
    cy.get('[href="/models"] > .relative > .top-0').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/models?page=1&make=All')
    cy.get('[data-cy="model"]').first().click()
    cy.get('[data-cy="favorites-button"]').contains('Add to favorites', { matchCase: false }).click()
    cy.get('[data-cy="in-favorites-button"]').contains('Already in favorites', { matchCase: false })
    cy.get('[data-cy="hamburger-menu"]').click()
    cy.get('[data-cy="sidebar"]').should('be.visible')
    cy.get('[href="/favorites"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/favorites')
    cy.get('[data-cy="no-favorites-heading"]').should('not.exist')
    cy.get(':nth-child(2) > .relative > [data-cy="carousel-model-image"]').should('exist').click()
    cy.get('[data-cy="no-favorites-heading"]').should('exist')
  })

  it('Journey 2: Users can navigate to the add models section, add a new test model and then delete it, the flash message should be visible and say "Successfully deleted a model"', () => {
    cy.visit('/')
    cy.get('[href="/new"] > .relative > .top-0').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/new')
    cy.get('[data-cy="add-input"]').first().type('Test')
    cy.get('[data-cy="add-input"]').eq(1).type('Test')
    cy.get('[data-cy="select-input"]').select('BMW')
    cy.get('[data-cy="add-input"]').eq(2).type('https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=ecrvXZhimUHnYES-kx7L5b-TDtRU5kAFPpNm0ZtAp1Y=')
    cy.get('[data-cy="add-input"]').eq(3).type('1999-12-31')
    cy.get('[data-cy="preview-and-submit-button"]').should('have.text', 'Preview submission', { matchCase: false }).click()
    cy.get('[data-cy="preview-section"]').should('be.visible')
    cy.get('[data-cy="preview-and-submit-button"]').should('have.text', 'Submit new model', { matchCase: false }).click()
    cy.wait(1000)
    cy.get('[data-cy="flash-message"]').should('have.text', 'Successfully added a new model.')
    cy.get('[data-cy="delete-button"]').click()
    cy.wait(1000)
    cy.url().should('eq', Cypress.config().baseUrl + '/models?page=1&make=All')
    cy.get('[data-cy="flash-message"]').should('have.text', 'Successfully deleted a model.')
  })

  it('Journey 3: Users can navigate to the models section, switch manufacturer to Toyota, sort by oldest, switch manufacturer to Audi, select the last model on the second page, click on it, then update its production start year to 2012 from 2011; flash message should state: "Successfully updated the model."', () => {
    cy.visit('/')
    cy.get('[href="/models"] > .relative > .top-0').click()
    cy.get('[data-cy="filter-manufacturer"]').select('Toyota')
    cy.get('[data-cy="sort-select"]').select('Oldest')
    cy.get('[data-cy="previous-page"]').first().should('be.disabled')
    cy.get('[data-cy="next-page"]').first().click()
    cy.get('[data-cy="filter-manufacturer"]').select('Audi')
    cy.get('[data-cy="next-page"]').first().click()
    cy.get('[data-cy="model"]').last().click()
    cy.wait(1000)
    cy.get('[data-cy="page-heading"]').should('have.text', 'Audi Q3 (8U)', { matchCase: false })
    cy.get('[data-cy="edit-button"]').click()
    cy.get('[data-cy="edit-modal"]').should('be.visible')
    cy.get('[data-cy="edit-input"]').should('be.visible').last().type('2012-12-31')
    cy.get('[data-cy="submit-update-button"]').click()
    cy.wait(1000)
    cy.get('[data-cy="flash-message"]').should('have.text', 'Successfully updated the model.')
  })

  it('Journey 4: Phone users can navigate to the manufacturers section, scroll to the bottom and select the last manufacturer, change manufacturer to Ford, select the third car in the list, add it to favorites, change its name to "Ford Fiesta 2002!", navigate to the favorites section and have the new name be displayed; then close the sidebar thereby closing it.', () => {
    cy.visit('/')
    cy.viewport(360, 740)
    cy.get('[href="/manufacturers"] > .relative > .top-0').click()
    cy.scrollTo('bottom')
    cy.get('[data-cy="make-card"]').last().click()
    cy.get('[href="/manufacturers/Ford"] > .h-10').click()
    cy.wait(500)
    cy.get('[data-cy="model"]').eq(2).click()
    cy.get('[data-cy="favorites-button"]').contains('Add to favorites', { matchCase: false }).click()
    cy.get('[data-cy="edit-button"]').click()
    cy.get('[data-cy="edit-modal"]').should('be.visible')
    cy.get('[data-cy="edit-input"]').should('be.visible').first().clear()
    cy.get('[data-cy="edit-input"]').first().type('Ford Fiesta 2002!')
    cy.get('[data-cy="edit-input"]').should('be.visible').last().type('2002-12-31')
    cy.get('[data-cy="submit-update-button"]').click()
    cy.wait(1000)
    cy.get('[data-cy="flash-message"]').should('have.text', 'Successfully updated the model.')
    cy.get('[data-cy="in-favorites-button"]').contains('Already in favorites', { matchCase: false })
    cy.get('[data-cy="hamburger-menu"]').click()
    cy.get('[data-cy="sidebar"]').should('be.visible')
    cy.get('[href="/favorites"]').click()
    cy.get('[data-cy="favorite-model-name"]').should('have.text', 'Ford Fiesta 2002!', { matchCase: false })
    cy.get('[data-cy="hamburger-menu"]').click()
    cy.get('[data-cy="sidebar"]').should('not.exist')
  })
})