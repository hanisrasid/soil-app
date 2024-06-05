import React from "react"
import PathConstants from "./pathConstants.js"

const Home = React.lazy(() => import("../pages/Home/index.js"))
const SignUp = React.lazy(() => import("../pages/Sign-Up/index.js"))
const SignIn = React.lazy(() => import("../pages/Sign-In/index.js"))
const Profile = React.lazy(() => import("../pages/Profile/index.js"))
const SpecialDeals = React.lazy(() => import("../pages/Special-Deals/index.js"))
const DeleteProfile = React.lazy(() => import("../pages/Profile/DeleteProfile.js"))
const EditProfile = React.lazy(() => import("../pages/Profile/EditProfile.js"))
const ShoppingCart = React.lazy(()=> import("../pages/Shopping-Cart/index.js"))
const GoalSetting = React.lazy(() => import("../pages/Goal-Setting/index.js"))
const Contact = React.lazy(() => import("../pages/Contact/index.js"))
const Reviews = React.lazy(() => import("../pages/Reviews/index.js"))

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.SIGNUP, element: <SignUp /> },
    { path: PathConstants.SIGNIN, element: <SignIn /> },
    { path: PathConstants.PROFILE, element: <Profile /> },
    { path: PathConstants.SPECIAL_DEALS, element: <SpecialDeals /> },
    { path: PathConstants.DELETEPROFILE, element: <DeleteProfile /> },
    { path: PathConstants.EDITPROFILE, element: <EditProfile /> },
    { path: PathConstants.SHOPPING_CART, element: <ShoppingCart />},
    { path: PathConstants.GOALSETTING, element: <GoalSetting /> },
    { path: PathConstants.CONTACT, element: <Contact /> },
    { path: PathConstants.REVIEWS, element: <Reviews /> }
]

export default routes