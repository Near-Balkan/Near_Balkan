import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <main id="innerGrid" className="container">
            {/* <div id="gridRow breadcrumbs" className="flex flex-col justify-start items-center w-full lg:max-w-5xl">
                <nav className="flex flex-row justify-between gap-5 text-xs self-stretch">
                    <ul className="flex flex-row justify-start gap-3">
                        <li>
                            <Link
                                to='../' className="text-nbgreylight hover:text-nbgreenmain active:text-nbgreenlight">
                                parent page
                            </Link>
                        </li>
                        <p>&gt;</p>
                        <li>
                            <Link
                                to='#'
                                className="text-nbgreenmain hover:text-nbgreenmain active:text-nbgreenlight">
                                this page
                            </Link>
                        </li>
                    </ul>
                    <ul className="sm:flex sm:flex-row sm:justify-start sm:gap-3 hidden">
                        <li>
                            <Link
                                to='#'
                                className="text-nbgreenmain hover:text-nbgreenmain active:text-nbgreenlight">
                                this page
                            </Link>
                        </li>
                        <p>|</p>
                        <li>
                            <Link
                                to='./*' className="text-nbgreenlight hover:text-nbgreenmain active:text-nbgreenlight">
                                sibling page
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div> */}
            <Outlet />
        </main>
    );


};

export default Layout;