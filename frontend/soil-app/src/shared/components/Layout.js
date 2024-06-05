import {Outlet} from "react-router-dom"
import Navigation from "./Navigation/Navigation.js"
import Footer from "./Footer/Footer.js"
import { Suspense, useState} from "react"
import "./Layout.css"
import { getFromLocalStorage } from "../util/localStorage.util.js"

function Layout() {
    const userId = getFromLocalStorage('USER_ID_' + getFromLocalStorage('logStatus'));
    const [cartItems, setCartItems] = useState(userId ? Object.values(getFromLocalStorage('USER_ID_' + getFromLocalStorage('logStatus'))?.cart).length || 0 : 0);

    return (
        <>
            <Navigation cartItems={cartItems} setCartItems={setCartItems}/>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet cartItems={cartItems} setCartItems={setCartItems}/>
                </Suspense>
            </main>
            <Footer/>
        </>
    )
}

export default Layout