import React, { FormEvent, useEffect, useState, useRef } from "react";
import Sidebar from "../sidebar/sidebar";
import api from "../api";
import { JsxElement, canHaveModifiers } from "typescript";
const MAXNAMELEN = 245;
const MAXDESCLEN = 331;

interface product {
    p_id: number;
    name: string;
    description: string;
    price: number;
    source: string;
    is_available: boolean;
}

// Gets font from body
function getTextWidth(text: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
        return 0;
    }
    context.font = getComputedStyle(document.body).font;
  
    return context.measureText(text).width;
}

// From stackoverflow
// (https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators)
// 6/02/2024
function numberDelimiter(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function Products() {
    const displayedColumns = [
        "name",
        "description",
        "price",
        "source",
        "is_available",
        "options",
    ];

    const widths: any = {
        "name": "w-3/12",
        "description": "w-4/12",
        "price": "w-1/12",
        "source": "w-2/12",
        "is_available": "w-1/12",
        "options": "w-1/12",
    }

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
            name: " w-1/12",
        }
        
        return (
        <tr className="">
            {displayedColumns.map((colName: string) => {
                return (<td className={styles[colName] + " border border-teal-400"}>{formattedProduct[colName]}</td>);
            })}
        </tr>
        );
    }

    
    // Formats the data 
    function formatData(rawData: any, colName: string): string {
        
        let i: number = 0;
        switch (colName) {
            case "name":
                var formattedData: string = rawData;
                for (i = 0; i < formattedData.length; i++) {
                    if (getTextWidth(formattedData.slice(0, i)) >= MAXNAMELEN) {
                        formattedData = formattedData.slice(0, i) + "...";
                        break;
                    }
                }

                break;
            case "description":
                var formattedData: string = rawData;

                const reg: RegExp = /\r?\n|\r/g;
                formattedData = formattedData.replace(reg, " "); // Replace newlines with whitespace

                for (i = 0; i < formattedData.length; i++) {
                    if (getTextWidth(formattedData.slice(0, i)) >= MAXDESCLEN) {
                        formattedData = formattedData.slice(0, i) + "...";
                        break;
                    }
                }

                break;
            case "price":
                let priceformattedData: number = rawData;
                var formattedData = numberDelimiter((priceformattedData / 100));
                
                break;
            case "source":
                var formattedData: string = rawData;
                break;
            case "is_available":
                var formattedData: string = rawData ? "Yes" : "No";
                break;
            case "":
                var formattedData: string = "";
                break;
            default:
                console.log("Error: Did not hit a valid column name")
                var formattedData: string = "ERROR";
                break;
        }
        return formattedData;
    }


    function displayColumn(colName: string): JSX.Element {
        let columnStyle = widths[colName] + " border-teal-900 overflow-hidden";
        colName = colName === "options" ? "" : colName;

        return <div className={columnStyle}>
            <div id="columnHeader" className="px-4 py-3 h-12 text-left font-bold bg-slate-400" key={colName}>
                { colName === "is_available" ? "Available?" : 
                (colName[0] || "").toUpperCase() + colName.substring(1) }

            </div>

            {products.map((product) => {
                

                return (
                    <div className={((products.indexOf(product) % 2 === 1) ? " bg-zinc-200 " : " bg-zinc-300 ")  + " px-4 py-2 h-10 text-left font-medium"}>
                        {formatData(product[colName], colName)}
                    </div>
                );
            })}
        </div>;
    }
    
    
    //onLoad={fetchProducts} 
    return (
        <div className="h-screen w-screen bg-gray-100" onLoad={fetchProducts} >
            <Sidebar pageID="1" />
            <div className="md:ml-60">
                <h1 className="pt-20 text-4xl text-center">This is the Products page</h1>
                <div className="m-8 py-8 bg-white border rounded-xl border-black">
                    <div className="cursor-pointer m-8 w-32 rounded text-center bg-sky-300 shadow-md hover:bg-sky-400 ring-0 outline-none appearance-none border-gray-300 border transition-all ">
                        <a href="products/create-product" className=""><div className=" ">Create new</div></a>
                    </div>

                    <div id="productTable" className="w-full text-left flex">

                        {displayedColumns.map((colName: string) => {
                            return displayColumn(colName);
                        })}

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Products;