import React, { FormEvent, useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import api from "../api";
import { JsxElement } from "typescript";

interface product {
    p_id: number;
    name: string;
    description: string;
    price: number;
    source: string;
    is_available: boolean;
}


function Products() {
    const displayedColumns = [
        "name",
        "description",
        "price",
        "source",
        "is_available",
    ];

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data);
        // console.log(products);
    }



    // TODO 
    // Switch from using any type to an interface?
    function displayTableData(product: product): JSX.Element {
        const formattedName = product.name;

        let formattedProduct: any = {
            ...product,
            name: formattedName,
            price: product.price / 100.0,
        }
        
        let styles: any = {
            name: " w-2/12",
        }

        return (
        <tr className="">
            {displayedColumns.map((colName: string) => {
                return (<td className={styles[colName] + " border border-teal-400"}>{formattedProduct[colName]}</td>);
            })}
        </tr>
        );
    }
    
    
    //onLoad={fetchProducts}
    return (
        <div className="h-screen w-screen bg-gray-100" onLoad={fetchProducts} >
            <Sidebar pageID="1" />
            <div className="md:ml-60">
                <h1 className="pt-20 text-4xl text-center">This is the Products page</h1>
                <div className="m-8 bg-white border border-black">
                    <div className="cursor-pointer m-8 w-32 rounded text-center bg-sky-300 shadow-md hover:bg-sky-400 ring-0 outline-none appearance-none border-gray-300 border transition-all ">
                        <a href="products/create-product" className=""><div className=" ">Create new</div></a>
                    </div>
                    {/* <div></div> for search add product and stuff */}

                    <table className="w-full text-left">
                        <thead>
                            <tr className="mr-4 border-black">
                                {displayedColumns.map((item: string) => {
                                    return <th className="border" key={item}>{item}</th>;
                                })}
                            </tr>
                            
                        </thead>
                        <tbody>
                            {products.map((product: product) => {
                                return displayTableData(product)
                            })}
                            
                        </tbody>
                    </table>
                </div>

                <a href="products/create-product"><div className="cursor-pointer m-8 bg-slate-400">Create new</div></a>
            </div>

        </div>
    );
}

export default Products;