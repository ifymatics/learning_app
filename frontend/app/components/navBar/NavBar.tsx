import { FaSearchengin } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Card from "../card/Card";
import "./NavBar.scss";
import { AuthContext } from "../../../auth.context";
import { useContext } from "react";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Card className="nav">
      <div className="container">
        <div className="logo">LearningApp</div>
        <div className="search">
          <FaSearchengin className="searchIcon" />
          <input type="search" placeholder="search for subjects" />
        </div>
        <div className="auth">
          {currentUser && currentUser.id ? (
            <>
              <div className="profile">{`ID:${currentUser.id}`}</div>
              <div className="login" onClick={() => logout()}>
                Logout
              </div>
            </>
          ) : (
            <>
              <div className="signup" onClick={() => router.push("/signup")}>
                Signup
              </div>
              <div className="login" onClick={() => router.push("/login")}>
                Login
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NavBar;
