import { useUser } from "../../context/userContext";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <>
      <Navigation user={user} logout={logout} />
      <MobileNavigation user={user} logout={logout} />
    </>
  );
}

export default Navbar;
