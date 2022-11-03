import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { sidebarToggle } from "../redux/slices/user/userSlice";
import { links } from "../utils/links";

export const NavLinks = () => {
  const dispatch = useAppDispatch();

  const toggles = () => {
    dispatch(sidebarToggle());
  };

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, icon, path, text } = link;
        return (
          <NavLink
            end
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={toggles}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
