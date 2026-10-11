import api from "./api";

export const favoriteService = {
  getMyFavorites: () => api.get("/favorites"),
  getFavoriteStatus: (productId) => api.get(`/favorites/${productId}`),
  toggleFavorite: (productId) => api.post(`/favorites/${productId}`),
  removeFavorite: (productId) => api.delete(`/favorites/${productId}`)
};
