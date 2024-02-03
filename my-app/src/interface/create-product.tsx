import React, { FormEvent, useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import api from "../api";

function CreateProducts() {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        source: "",
        is_available: false
    })

    const fetchTransactions = async () => {
        const response = await api.get("/products/create-product");
        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => { // sussy investigate later
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
        console.log(formData);
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        console.log(formData);
        await api.post("/products/create-product", formData);

        fetchTransactions();
        setFormData({
            name: "",
            description: "",
            price: 0,
            source: "",
            is_available: false
        });
    }

    return (
        <div className="h-screen w-screen border-4 border-black">
            <Sidebar pageID="1" />
            <div className="md:ml-60">
                <h1 className="mt-20 text-4xl text-center">This is the Create Products page</h1>

                <div className="border border-pink-700">
                    <form className="p-8 bg-gray-100" onSubmit={handleFormSubmit}>
                        <div className="">
                            <label htmlFor="name" className="block ">Product Name</label>
                            <input type="text" className="" name="name" onChange={handleInputChange} defaultValue={formData.name} placeholder="Eg. Monitor Stand" />
                        </div>

                        <button type="submit" className="m-4 px-4 py-2 rounded bg-slate-400">
                            Submit
                        </button>

                    </form>
                </div>


            </div>
        </div>
    );
}

export default CreateProducts;