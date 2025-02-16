import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/SavedCandidates" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
