import classes from "classnames";
import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/user/selectors";
import { sidebarToggle } from "../redux/slices/user/userSlice";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export const SideBarSmall = () => {
  const { isOpenSidebar } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(sidebarToggle());
  };

  const cls = classes("sidebar-container", {
    "show-sidebar": isOpenSidebar,
  });

  return (
    <Wrapper>
      <div className={cls}>
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
