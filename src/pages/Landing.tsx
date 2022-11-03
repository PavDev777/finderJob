import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import mainLogo from "../assets/images/main2.svg";
import { Logo } from "../components";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/user/selectors";

export const Landing = () => {
  const { user } = useAppSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            porro id odit nulla nesciunt mollitia maiores ex aliquam! Autem,
            saepe.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={mainLogo} alt="job hunt " className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
