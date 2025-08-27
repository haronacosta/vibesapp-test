// Función utilitaria para frontend
export function getTopCheapestAvailable<
  T extends { price: number; isAvailable: boolean },
>(products: T[], top: number = 3): T[] {
  return products
    .filter((p) => p.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
}
