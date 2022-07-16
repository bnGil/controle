import { useUser } from "../../context/userContext";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

function Navbar() {
  const { logout, token } = useUser();

  return (
    <>
      <Navigation logout={logout} token={token} />
      <MobileNavigation logout={logout} token={token} />
    </>
  );
}

export default Navbar;
