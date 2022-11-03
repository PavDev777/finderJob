import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

export const Error = () => {
  return (
    <Wrapper className="full page">
      <div>
        <img src={img} alt="Error" />
        <h3>Page Not Found :(</h3>
        <p>We cant't seem to find the page you're looking for</p>
        <Link to="/"> Back Home</Link>
      </div>
    </Wrapper>
  );
};
