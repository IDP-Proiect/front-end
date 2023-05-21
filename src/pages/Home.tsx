import React, { useEffect, useState } from "react";
import Navbar from "../components/nav/navbar";
import axios from "axios";
import Confetti from 'react-confetti'


interface Product {
    id: string;
    description: string;
    price: number;
    pictureUrl: string;
    quantity: number;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/product");
                const data = await response.json();
                if (data.data) {
                    const productsWithPictures = await Promise.all(
                        data.data.map(async ( product : Product) => {
                          const imageUrl = `/getImage/${product.id}.png`;
                          try {
                            const imageResponse = await fetch(imageUrl);
                            if (imageResponse.ok) {
                              product.pictureUrl = imageUrl;
                            }
                          } catch (error) {
                            console.error("Error fetching image:", error);
                          }
                          return product;
                        })
                      );
                      setProducts(productsWithPictures);
                      setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };
        fetchProducts();

        let timer: NodeJS.Timeout;
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false);
            }, 1000);
        }
        if (showErrorMessage) {
            timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    const handleAddToCart = async (product: Product, quantity: string) => {
        const quantityNr = parseInt(quantity);
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        if (token && id) {
            try {
                const response = await axios.post(
                    "/addToCart",
                    {
                        token: token,
                        userId: id,
                        colorId: product.id,
                        quantity: quantityNr
                    }
                );
                if (response.data.success == true) {
                    setShowMessage(true);
                }

            } catch (error) {

                console.log(error);
            }
        } else {
            setShowErrorMessage(true)
        }
    };



    const handleChangeQuantity = (quantity: string) => {
        setQuantity(quantity);
    };

    return (
        <div  className="bg-blue-200">
            <Navbar />
            {isLoading && (
                <div className="bg-red-200 border border-red-500 text-red-800 px-4 py-2 mt-4">
                    Getting the products.. Please stand by 
                </div>
            )}
            {showMessage && (
                <div className="bg-green-200 border border-green-500 text-green-800 px-4 py-2 mt-4">
                    Item successfully added to cart
                </div>
            )}
            {showErrorMessage && (
                <div className="bg-red-200 border border-red-500 text-red-800 px-4 py-2 mt-4">
                    Please Log in to continue!
                </div>
            )}
            <div className="bg-blue-200 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10  h-[88vh]">
                {products.map((product) => (
                    <div key={product.id} className="p-4 border border-gray-300 rounded-md shadow-md bg-white">
                        <h3 className="text-lg font-semibold">{product.description}</h3>
                        <h3 className="text-s">code: {product.id}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <img src={product.pictureUrl} alt={product.description} className="mt-4 rounded-md" />
                        <div className="flex mt-2">
                            <label htmlFor={`quantity-${product.id}`} className="mr-2">
                                Quantity:
                            </label>
                            <select
                                id={`quantity-${product.id}`}
                                className="border border-gray-300 rounded-md px-2 py-1"
                                value={quantity}
                                onChange={(e) => handleChangeQuantity(e.target.value)}
                            >
                                {[...Array(product.quantity + 1)].map((_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            onClick={() => handleAddToCart(product, quantity)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}