import React from "react";
import Sidebar from "../sidebar/sidebar";

function Inventory() {
    return (
        <div className="h-screen w-screen border-4 border-black">
            <Sidebar pageID="2" />
            <div className="md:ml-64">
                <h1 className="mt-20 text-4xl text-center">This is the Inventory page</h1>
            </div>
        </div>
    );
}

export default Inventory;