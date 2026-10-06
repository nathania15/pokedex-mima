import { Link } from "react-router-dom";
import PokeballIcon from "../components/PokeballIcon.jsx";

function NotFoundPage() {
  return (
    <div className="status not-found">
      <PokeballIcon size={96} className="spin" />
      <h2>A wild 404 appeared!</h2>
      <p>There's nothing here.</p>
      <Link to="/" className="back-link">← Back to list</Link>
    </div>
  );
}

export default NotFoundPage;
