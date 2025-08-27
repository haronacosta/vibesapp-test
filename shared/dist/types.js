// Algoritmo utilitario: obtener los N productos más baratos y disponibles
export function getTopCheapestAvailable(products, top = 3) {
    return products
        .filter(p => p.isAvailable)
        .sort((a, b) => a.price - b.price)
        .slice(0, top);
}
