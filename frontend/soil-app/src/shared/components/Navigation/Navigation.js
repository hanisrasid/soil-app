import PathConstants from "../../../routes/pathConstants"
import Header from "./Header"
import NavLinks from "./NavLinks"

//used for page routing
import { Link } from "react-router-dom";

import './Navigation.css'

function Navigation(props) {
    return (
        <>
            <Header>
                <h1 className="title">
                    <Link to={PathConstants.HOME}>Soil</Link>
                </h1>
                <nav className="header-nav">
                    <NavLinks/>
                </nav>
            </Header>
        </>
    )
}

export default Navigation