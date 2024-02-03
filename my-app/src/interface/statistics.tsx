import React from "react";
import Sidebar from "../sidebar/sidebar";

function Statistics() {
    return (
        <div className="h-screen w-screen">
            <Sidebar pageID="3" />
            <div className="md:ml-60">
                <h1 className="mt-20 text-4xl text-center">This is the Statistics page</h1>
            </div>
        </div>
    );
}

export default Statistics;