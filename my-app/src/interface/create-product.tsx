import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import api from "../api";
import { TextareaHTMLAttributes } from "react";

function CreateProducts() {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        source: "",
        is_available: false
    })

    const fetchTransactions = async () => {
        const response = await api.get("/products");
        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);


    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => { // sussy investigate later
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };


    const handleInputChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => { // sussy investigate later
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };


    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        let modifiedFormData = {...formData, price: 100 * Number(formData.price)};
        console.log(formData, modifiedFormData);
        
        await api.post("/products", modifiedFormData);

        fetchTransactions();
        setFormData({
            name: "",
            description: "",
            price: "",
            source: "",
            is_available: false
        });
        window.location.href = "/products";
    }


    const formInputStyle = " mb-6 py-2 px-3 w-72 text-gray-700 align-middle shadow ring-0 outline-none appearance-none rounded border-gray-300 border transition-all focus:shadow-outline focus:ring-2";
    const disableArrows = " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

    return (
        <div className="h-screen w-screen bg-gray-100">
            <Sidebar pageID="1" />
            <div className="md:ml-60">
                <h1 className="pt-20 pb-12 text-4xl text-center">This is the Create Products page</h1>

                <div className="m-12 p-8 bg-slate-50 rounded shadow-md">
                    <form className="" onSubmit={handleFormSubmit}>
                        <div className="">
                            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Product Name</label>
                            <input type="text" className={formInputStyle} name="name" onChange={handleInputChange} value={formData.name} placeholder="Eg. Monitor Stand" autoComplete="off" />
                        </div>

                        <div className="">
                            <label htmlFor="description" className="block mb-2 font-medium text-gray-70">Description of product</label>
                            <textarea className={formInputStyle + " w-full resize-none"} name="description" onChange={handleInputChangeTextArea} value={formData.description} placeholder="Eg. This is a monitor stand for <XXXXXXXXXX>" rows={6} />
                        </div>

                        <div className="relative">
                            <label htmlFor="price" className="block mb-2 font-medium text-gray-700">Price</label>

                            <div className="pointer-events-none w-8 absolute top-10 text-center">
                                <span className="text-gray-600">$</span>
                            </div>
                            <input type="number" className={formInputStyle + disableArrows + " pl-7 pr-12"} name="price" onChange={handleInputChange} value={formData.price} placeholder="0.00" autoComplete="off" min="0.00" max="1000000000.00" step="0.01" />
                            <div className="pointer-events-none w-12 absolute left-60 top-10 text-center px-1">
                                <span className="text-gray-500" id="price-currency">
                                    AUD
                                </span>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="source" className="block mb-2 font-medium text-gray-700">Source</label>
                            <input type="text" className={formInputStyle} name="source" onChange={handleInputChange} value={formData.source} placeholder="Eg. Idk man" autoComplete="off" />
                        </div>

                        <div className="">
                            <label htmlFor="is_available" className="mb-2 mr-4 font-medium text-gray-700">Is available?</label>
                            <input type="checkbox" className="" name="is_available" onChange={handleInputChange} checked={formData.is_available} autoComplete="off" />
                        </div>




                        <button type="submit" className="my-4 px-4 py-2 rounded bg-slate-400">
                            Submit
                        </button>

                    </form>
                </div>


            </div>
        </div>
    );
}

export default CreateProducts;