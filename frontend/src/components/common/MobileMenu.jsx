import { useEffect } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { ACCOUNT_TYPE } from "../../utils/constants";

function MobileMenu({ isOpen, onClose, subLinks, loading }) {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[999] bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 z-[1000] h-full w-[85%] max-w-[400px] bg-richblack-800 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4">
                    <h2 className="text-xl font-semibold text-richblack-5">Menu</h2>
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 text-richblack-200 hover:bg-richblack-700 transition-colors"
                        aria-label="Close menu"
                    >
                        <AiOutlineClose fontSize={24} />
                    </button>
                </div>

                {/* Menu Content */}
                <div className="flex h-[calc(100%-73px)] flex-col overflow-y-auto px-6 py-6">
                    {/* Navigation Links */}
                    <nav className="flex-1">
                        <ul className="flex flex-col gap-y-2">
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <details className="group">
                                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-richblack-25 hover:bg-richblack-700 transition-colors">
                                                <span className="font-medium">{link.title}</span>
                                                <BsChevronDown className="transition-transform group-open:rotate-180" />
                                            </summary>
                                            <div className="mt-2 ml-4 flex flex-col gap-y-1">
                                                {loading ? (
                                                    <p className="px-4 py-2 text-sm text-richblack-300">
                                                        Loading...
                                                    </p>
                                                ) : subLinks.length ? (
                                                    <>
                                                        {subLinks
                                                            ?.filter((subLink) => subLink?.courses?.length > 0)
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                    key={i}
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 transition-colors"
                                                                    onClick={onClose}
                                                                >
                                                                    {subLink.name}
                                                                </Link>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <p className="px-4 py-2 text-sm text-richblack-300">
                                                        No Courses Found
                                                    </p>
                                                )}
                                            </div>
                                        </details>
                                    ) : (
                                        <Link
                                            to={link?.path}
                                            onClick={onClose}
                                            className={`block rounded-lg px-4 py-3 font-medium transition-colors ${matchRoute(link?.path)
                                                    ? "bg-richblack-700 text-yellow-25"
                                                    : "text-richblack-25 hover:bg-richblack-700"
                                                }`}
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Divider */}
                    <div className="my-6 h-[1px] bg-richblack-700" />

                    {/* Authentication & Cart Section */}
                    <div className="flex flex-col gap-y-3">
                        {/* Cart Icon for Students */}
                        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link
                                to="/dashboard/cart"
                                onClick={onClose}
                                className="flex items-center gap-x-3 rounded-lg px-4 py-3 text-richblack-100 hover:bg-richblack-700 transition-colors"
                            >
                                <div className="relative">
                                    <AiOutlineShoppingCart fontSize={24} />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-caribbeangreen-300 text-center text-xs font-bold text-richblack-900">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <span className="font-medium">Cart</span>
                            </Link>
                        )}

                        {/* Login/Signup Buttons */}
                        {token === null && (
                            <>
                                <Link to="/login" onClick={onClose}>
                                    <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-center font-medium text-richblack-100 hover:bg-richblack-700 transition-colors">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={onClose}>
                                    <button className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-center font-medium text-richblack-900 hover:bg-yellow-100 transition-colors">
                                        Sign up
                                    </button>
                                </Link>
                            </>
                        )}

                        {/* Dashboard Link when logged in */}
                        {token !== null && (
                            <Link
                                to="/dashboard/my-profile"
                                onClick={onClose}
                                className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-center font-medium text-richblack-900 hover:bg-yellow-100 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileMenu;
