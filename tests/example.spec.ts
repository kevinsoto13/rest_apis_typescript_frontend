import { test, expect } from '@playwright/test';

test.describe('CRUD de Productos', () => {
  test('debería crear un nuevo producto', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: 'Add New Product' }).click();
    await expect(page).toHaveURL('/productos/nuevo');
    
    await page.getByRole('textbox', { name: 'Product Name' }).fill('Mouse Gaming');
    await page.getByRole('spinbutton', { name: 'Price' }).fill('45.99');
    
    await page.getByRole('button', { name: 'Create Product' }).click();
    
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Mouse Gaming')).toBeVisible();
    await expect(page.getByText('$45.99')).toBeVisible();
  });

  test('debería editar un producto existente', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: 'Edit' }).first().click();
    await expect(page).toHaveURL(/\/productos\/.*\/editar/);
    
    await page.getByRole('spinbutton', { name: 'Price' }).click();
    await page.getByRole('spinbutton', { name: 'Price' }).fill('39.99');
    
    await page.getByRole('button', { name: 'Edit Product' }).click();
    
    await expect(page).toHaveURL('/');
    await expect(page.getByText('$39.99')).toBeVisible();
  });

  test('debería eliminar un producto', async ({ page }) => {
    await page.goto('/');
    
    // Manejar el diálogo de confirmación
    page.once('dialog', async dialog => {
      console.log(`Diálogo detectado: ${dialog.message()}`);
      await dialog.accept();
    });
    
    // Buscar el producto que queremos eliminar
    const productRow = page.getByRole('row', { name: /mouse/i });
    
    // Verificar que existe antes de eliminar
    await expect(productRow).toBeVisible();
    
    // Hacer clic en el botón Delete
    await productRow.locator('input[type="submit"]').click();
    
    // Verificar que el producto ya no está en la lista
    await expect(productRow).not.toBeVisible();
  });

  test('debería mostrar la lista de productos al cargar', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('link', { name: 'Add New Product' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Check server status' })).toBeVisible();
    
    // ✅ CORRECCIÓN: Usar toHaveCount con un número mínimo
    const productRows = page.getByRole('row');
    
    // Opción 1: Verificar que hay al menos 2 filas (header + 1 producto)
    const rowCount = await productRows.count();
    expect(rowCount).toBeGreaterThan(1);
    
    // Opción 2: O simplemente verificar que hay productos visibles
    await expect(page.locator('tbody tr, .product-item, [data-testid="product"]').first()).toBeVisible();
  });

  // ✅ PRUEBA ADICIONAL: Verificar que podemos cancelar la eliminación
  test('debería cancelar la eliminación si se rechaza el diálogo', async ({ page }) => {
    await page.goto('/');
    
    // Buscar un producto
    const productRow = page.getByRole('row', { name: /monitor/i });
    await expect(productRow).toBeVisible();
    
    // Configurar para CANCELAR la eliminación
    page.once('dialog', async dialog => {
      console.log(`Diálogo detectado: ${dialog.message()}`);
      await dialog.dismiss(); // Cancelar instead of accept
    });
    
    // Hacer clic en eliminar pero cancelar
    await productRow.locator('input[type="submit"]').click();
    
    // Verificar que el producto SIGUE visible (no se eliminó)
    await expect(productRow).toBeVisible();
  });
});