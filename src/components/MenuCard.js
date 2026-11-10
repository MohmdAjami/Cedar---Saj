import { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EcoIcon from "@mui/icons-material/Spa";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/storage";
import "../styles/MenuCard.css";

function MenuCard({ item }) {
  const { addToCart, favourites, toggleFavourite } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const isFavourite = favourites.includes(item.id);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <img src={`${process.env.PUBLIC_URL}/${item.image}`} alt={item.name} loading="lazy" />
        <button
          className={isFavourite ? "fav-btn active" : "fav-btn"}
          onClick={() => toggleFavourite(item.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
        <span className="menu-card-category">{item.category}</span>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-title">
          <h3>{item.name}</h3>
          <span className="arabic">{item.arabic}</span>
        </div>

        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-tags">
          {item.popular && <span className="badge badge-popular">Popular</span>}
          {item.vegetarian && (
            <span className="badge badge-veg"><EcoIcon fontSize="inherit" /> Veg</span>
          )}
          {item.spicy && (
            <span className="badge badge-spicy"><LocalFireDepartmentIcon fontSize="inherit" /> Spicy</span>
          )}
        </div>

        <div className="menu-card-meta">
          <span><StarIcon fontSize="inherit" className="star" /> {item.rating.toFixed(1)}</span>
          <span><AccessTimeIcon fontSize="inherit" /> {item.prepTime} min</span>
        </div>

        <div className="menu-card-footer">
          <span className="price">{formatPrice(item.price)}</span>
          <button className={added ? "add-btn added" : "add-btn"} onClick={handleAdd}>
            {added ? <CheckIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
