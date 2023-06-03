import axios from "axios";

const URL = "http://localhost:3000";

const productsController = {
  async getProducts(_page = 1, _limit = 5, q = "", minPrice, maxPrice) {
    const params = {
      _page,
      _limit,
      _total: true,
      q,
      price_gte: minPrice,
      price_lte: maxPrice,
    };

    const response = await axios.get(`${URL}/products`, { params });

    const totalProducts = response.headers["x-total-count"];
    const data = response.data;

    return { totalProducts, data };
  },

  async getProduct(id) {
    return await axios.get(`${URL}/products/${id}`);
  },

  async createProduct(product) {
    return await axios.post(`${URL}/products`, product);
  },

  async updateProduct(id, product) {
    return await axios.put(`${URL}/products/${id}`, product);
  },

  async deleteProduct(id) {
    return await axios.delete(`${URL}/products/${id}`);
  },
};

export default productsController;
