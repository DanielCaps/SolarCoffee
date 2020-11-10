const { Context } = require("mocha");

Context('Inventory Page', () =>{
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })
    it('is the inventory page', () =>{
        cy.get('#inventoryTitle').contains('Inventory Dashboard');
    })
    it('has buttons to add inventory and receive shipment', () =>{
        cy.get('#addNewBtn > .solar-button').contains('Add New Item');
        cy.get('#receiveShipmentBtn > .solar-button').contains('Receive Shipment');
    })
}