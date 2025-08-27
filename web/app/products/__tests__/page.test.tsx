import { render, screen, waitFor } from "@testing-library/react";
import ProductsPage from "../page";

jest.mock("../../lib/api", () => ({
  apiClient: {
    getProducts: jest.fn(),
    getCategories: jest.fn(),
  },
}));

const mockProducts = [
  {
    id: "1",
    name: "Prod 1",
    price: 10,
    isAvailable: true,
    category: "cat",
    image: "/img1.jpg",
  },
  {
    id: "2",
    name: "Prod 2",
    price: 20,
    isAvailable: true,
    category: "cat",
    image: "/img2.jpg",
  },
];

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra los productos cuando la API responde correctamente", async () => {
    const { apiClient } = require("../../lib/api");
    apiClient.getProducts.mockResolvedValue({
      products: mockProducts,
      pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
    });
    apiClient.getCategories.mockResolvedValue([]);

    render(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText("Prod 1")).toBeInTheDocument();
      expect(screen.getByText("Prod 2")).toBeInTheDocument();
    });
  });

  it("muestra mensaje de error si la API falla", async () => {
    const { apiClient } = require("../../lib/api");
    apiClient.getProducts.mockRejectedValue(new Error("Error de API"));
    apiClient.getCategories.mockResolvedValue([]);

    render(<ProductsPage />);
    await waitFor(() => {
      expect(
        screen.getByText(/error al cargar los productos/i),
      ).toBeInTheDocument();
    });
  });
});
