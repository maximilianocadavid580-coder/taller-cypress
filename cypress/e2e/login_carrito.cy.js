describe('Pruebas de Interfaz - Sauce Demo', function () {
  it('Validación de flujo de login y agregado de producto al carrito', function () {

    // 1. Navegación inicial
    cy.visit('https://www.saucedemo.com');

    // 2. Interacciones: iniciar sesión con usuario y contraseña
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // 3. Aserción: se cargó correctamente la página de productos
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('contain', 'Products');

    // 4. Interacción: agregar un producto específico al carrito
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('button')
      .click();

    // 5. Aserción: el contador del carrito se actualizó a 1
    cy.get('.shopping_cart_badge').should('be.visible').and('contain', '1');

    // 6. Interacción: entrar al carrito de compras
    cy.get('.shopping_cart_link').click();

    // 7. Aserción final obligatoria: el producto agregado aparece en el carrito
    cy.get('.cart_item').should('have.length', 1);
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible');
  });
});