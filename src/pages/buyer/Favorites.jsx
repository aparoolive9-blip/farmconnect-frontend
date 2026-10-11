import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { favoriteService } from "../../services/favoriteService";

function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      if (!user || user.role !== "buyer") {
        setFavorites([]);
        return;
      }

      try {
        const response = await favoriteService.getMyFavorites();
        setFavorites(response.data.favorites || []);
      } catch (error) {
        setFavorites([]);
      }
    }

    loadFavorites();
  }, [user]);

  return (
    <>
      <h1 className="section-title">Favorites</h1>
      <div className="action-panel">
        {favorites.length === 0 ? (
          <p className="text-muted mb-0">No favorites saved yet. Open a product detail page and save products you want to revisit.</p>
        ) : (
          <ul className="mb-0">
            {favorites.map((item) => (
              <li key={item.product_id}>
                <Link to={`/products/${item.product_id}`}>{item.product_name || `Product #${item.product_id}`}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Favorites;
