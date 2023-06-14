import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import darkLogo from "../assets/darkLogo.png";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "./UserContext";

function Header() {
  const { user } = useContext(UserContext);

  // Styling for the navigation links
  const navStyling = "p-1 m-2 border-tc hover:border-b-4";

  // Function to determine if a navigation link is active
  const isActive = ({ isActive }) =>
    isActive ? `border-b-4 text-bgc ${navStyling}` : navStyling;

  // State for displaying the mobile menu
  const [displyMenu, setDisplyMenu] = useState(false);

  const navbar = () => {
    // Function to render the navigation links
    return (
      <div
        className="items-center space-x-0 text-center
              md:flex-row md:space-x-10 md:flex"
      >
        <nav className="flex flex-col md:flex-row">
          <NavLink to="/" className={isActive}>
            Home
          </NavLink>
          <NavLink to="services" className={isActive}>
            Services
          </NavLink>
          <NavLink to="about" className={isActive}>
            About
          </NavLink>
          <NavLink to="host" className={isActive}>
            Host
          </NavLink>
        </nav>
        <Link
        // if user is logged in navigate to account
          to={user ? "account" : "login"}
          className={`m-2 justify-center border-tc flex items-center border rounded-lg p-1`}
        >
          {/* User icon */}
          <UserCircleIcon className="h-5 w-5" />
          <span className="pl-1">{user ? user.userName : "login"}</span>
        </Link>
      </div>
    );
  };

  const showMenu = () => {
    // Function to toggle the mobile menu
    setDisplyMenu((prevDisplyMenu) => !prevDisplyMenu);
  };

  return (
    <header className="flex sticky top-0 justify-center border-tc border-b text-tc bg-slate-300">
      <div>
        <div className="flex justify-between w-[80vw] my-2 items-center font-semibold md:">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center p-0.5">
            <img src={darkLogo} width={40} alt="logo" />
            <span className="text-lg pl-1">PropChase</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:block">{navbar()}</div>

          {/* Mobile menu button */}
          <button onClick={showMenu} className="block md:hidden">
            {displyMenu ? (
              <XMarkIcon className="h-6 w-6" strokeWidth="2" />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth="2" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${displyMenu ? "block" : "hidden"} block md:hidden`}>
          {navbar()}
        </div>
      </div>
    </header>
  );
}

export default Header;
