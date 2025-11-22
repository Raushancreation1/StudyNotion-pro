import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandCatalog, setExpandCatalog] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setExpandCatalog(false)
  }, [location.pathname])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
       >
          {isMobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-0 top-14 z-[1000] w-full border-b border-b-richblack-700 bg-richblack-800">
          <nav className="mx-auto w-11/12 max-w-maxContent py-4">
            <ul className="flex flex-col gap-2 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-2"
                        onClick={() => setExpandCatalog((prev) => !prev)}
                      >
                        <span
                          className={`${
                            matchRoute("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </span>
                        <BsChevronDown
                          className={`transition-transform ${expandCatalog ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expandCatalog && (
                        <div className="pl-4">
                          {loading ? (
                            <p className="py-2">Loading...</p>
                          ) : subLinks && subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter((subLink) => subLink?.courses?.length > 0)
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="block rounded-lg py-2 hover:text-yellow-25"
                                    key={i}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subLink.name}
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="py-2">No Courses Found</p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={link?.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <p
                        className={`${
                          matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"
                        } py-2`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="relative w-fit"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2 text-richblack-100">
                    <AiOutlineShoppingCart className="text-2xl" />
                    <span>Cart</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-3 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {token === null && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Navbar