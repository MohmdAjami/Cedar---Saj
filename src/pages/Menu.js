import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import TuneIcon from "@mui/icons-material/Tune";
import MenuCard from "../components/MenuCard";
import { CartContext } from "../context/CartContext";
import "../styles/MenuCard.css";
import "../styles/Menu.css";

function Menu() {
  const { favourites } = useContext(CartContext);

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [vegOnly, setVegOnly] = useState(false);
  const [favOnly, setFavOnly] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/menu.json`)
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Sorry, we couldn't load the menu. Please refresh the page.");
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  const filtered = dishes.filter((dish) => {
    const text = (dish.name + " " + dish.description).toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = category === "All" || dish.category === category;
    const matchesVeg = !vegOnly || dish.vegetarian;
    const matchesFav = !favOnly || favourites.includes(dish.id);
    return matchesSearch && matchesCategory && matchesVeg && matchesFav;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.popular - a.popular;
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("recommended");
    setVegOnly(false);
    setFavOnly(false);
  };

  return (
    <div className="menu-page">
      <header className="page-header">
        <h1>Our Menu</h1>
        <p>Every dish is cooked fresh when you order. Search, filter and add your favourites to the cart.</p>
      </header>

      <div className="container section">
        <div className="menu-toolbar">
          <div className="search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search hummus, taouk, knefeh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-right">
            <label className="check">
              <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
              Vegetarian
            </label>
            <label className="check">
              <input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} />
              Favourites ({favourites.length})
            </label>
            <div className="sort-box">
              <TuneIcon fontSize="small" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort dishes">
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "chip active" : "chip"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <div className="empty-state">Loading the menu...</div>}
        {error && <div className="empty-state">{error}</div>}

        {!loading && !error && (
          <>
            <p className="results-count">
              Showing <strong>{sorted.length}</strong> of {dishes.length} dishes
            </p>

            {sorted.length > 0 ? (
              <div className="menu-grid">
                {sorted.map((dish) => (
                  <MenuCard key={dish.id} item={dish} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <SearchOffIcon />
                <h3>No dishes match your search</h3>
                <p>Try another word or clear the filters.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
