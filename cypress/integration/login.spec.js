/// <reference types="cypress" />

describe("Login Page", () => {
  it("should show the login page when not authorized", () => {
    cy.visit("/")
    cy.location("pathname").should("include", "login")
  })
})
