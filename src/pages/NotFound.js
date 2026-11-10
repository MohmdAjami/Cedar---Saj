import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function NotFound() {
  return (
    <div className="container section">
      <div className="empty-state">
        <RestaurantIcon />
        <h1>404 – Page not found</h1>
        <p>This dish isn't on our menu. Let's get you back to something tasty.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
