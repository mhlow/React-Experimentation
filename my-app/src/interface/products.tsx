import React, { FormEvent, useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import api from "../api";

function Products() {
    

    return (
        <div className="h-screen w-screen">
            <Sidebar pageID="1" />
            <div className="md:ml-60">
                <h1 className="mt-20 text-4xl text-center">This is the Products page</h1>

                <a href="products/create-product"><div className="cursor-pointer m-8 bg-slate-400">Create new</div></a>
            </div>

        </div>
    );
}

export default Products;