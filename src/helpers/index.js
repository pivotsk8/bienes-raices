export const propertyPrice = (price) =>
  Number(price).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
