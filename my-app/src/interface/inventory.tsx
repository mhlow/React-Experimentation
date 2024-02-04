import React from "react";
import Sidebar from "../sidebar/sidebar";

function Inventory() {
    return (
        <div className="h-screen w-screen bg-gray-100">
            <Sidebar pageID="2" />
            <div className="md:ml-60">
                <h1 className="mt-20 text-4xl text-center">This is the Inventory page</h1>
            </div>
        </div>
    );
}

export default Inventory;