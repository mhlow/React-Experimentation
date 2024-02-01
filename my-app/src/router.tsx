import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Page imports
import Welcome from "./frontpage/welcome";
import Products from "./interface/products";
import Inventory from "./interface/inventory";
import Statistics from "./interface/statistics";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },
    {
        path: "/products",
        element: <Products />
    },
    {
        path: "/inventory",
        element: <Inventory />
    },
    {
        path: "/statistics",
        element: <Statistics />
    },

])

export default function PageRouter() {
    return(
        <RouterProvider router={router} />
    );
}