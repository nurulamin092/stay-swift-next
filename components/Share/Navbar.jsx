import { auth } from "@/auth";
import Link from "next/link";
import Logout from "../auth/SignOut";

const Navbar = async ({ sideMenu }) => {
  const section = await auth();
  return (
    <>
      <nav>
        <Link href="/">
          <img src="/stayswift.svg" alt="Stay Swift Logo" srcSet="" />
        </Link>
        {sideMenu && (
          <ul>
            <li>
              <Link href="#">Recommended Places</Link>
            </li>

            <li>
              <Link href="#">About Us</Link>
            </li>

            <li>
              <Link href="#">Contact us</Link>
            </li>

            <li>
              <Link href="/bookings">Bookings</Link>
            </li>

            <li>
              {section?.user ? (
                <div>
                  <span> {section?.user?.name}</span>
                  <span>| </span>
                  <Logout />
                </div>
              ) : (
                <Link href="/login" className="login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
