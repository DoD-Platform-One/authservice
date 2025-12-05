const username = Cypress.env('cypress_tnr_username') || 'cypress';
const password = Cypress.env('cypress_tnr_password') || 'tnr_w!G33ZyAt@C8';
const prometheusUrl = Cypress.env('cypress_prometheus_url') || 'https://prometheus.dev.bigbang.mil' 

describe('Authservice login test', () => {
  it('Validate Authservice login works', function () {
    // Visit Prometheus which should redirect to Keycloak login
    cy.visit(prometheusUrl);

    // Assert we're redirected to Keycloak
    cy.url().should('include', 'keycloak.dev.bigbang.mil');

    // Wait for Keycloak login page to load and fill in username
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(username);

    // Fill in password
    cy.get('#password').should('be.visible').type(password);

    // Click login button
    cy.get('#kc-login').click();

    // Handle any Keycloak required actions (Terms and Conditions, OAuth Grant, etc.)
    cy.url({ timeout: 5000 }).then((currentUrl) => {
      if (currentUrl.includes('required-action')) {
        // Handle Terms and Conditions
        if (currentUrl.includes('TERMS_AND_CONDITIONS')) {
          cy.get('input[name="accept"]', { timeout: 5000 }).click();
        }

        // Handle OAuth Grant consent screen
        cy.url({ timeout: 5000 }).then((urlAfterTerms) => {
          if (urlAfterTerms.includes('OAUTH_GRANT') || urlAfterTerms.includes('required-action')) {
            // Accept OAuth grant by clicking the submit button
            cy.get('input[type="submit"][value*="Yes"], input[name="accept"], #kc-login', { timeout: 5000 }).first().click();
          }
        });
      }
    });

    // Assert we're redirected back to Prometheus domain
    cy.url().should('include', 'prometheus.dev.bigbang.mil');
  })
})