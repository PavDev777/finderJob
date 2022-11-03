import classes from "classnames";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/user/selectors";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export const BigSideBar = () => {
  const { isOpenSidebar } = useAppSelector(userSelector);

  const cls = classes("sidebar-container", {
    "show-sidebar": isOpenSidebar,
  });

  return (
    <Wrapper>
      <aside></aside>
      <div className={cls}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
