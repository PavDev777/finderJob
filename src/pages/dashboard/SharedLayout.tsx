import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { BigSideBar, Navbar, SideBarSmall } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/slices/user/selectors";

export const SharedLayout = () => {
  const { user } = useAppSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/landing");
  }, [user]);

  return (
    <Wrapper>
      <main className="dashboard">
        <SideBarSmall />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
