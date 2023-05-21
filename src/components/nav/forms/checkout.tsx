import axios from "axios";
import { useEffect, useState } from "react";
import OrderList from '../utils/orderList'

import React from "react";

interface Props {
    onClose: () => void;
}
interface Order {
    orderedColorsId: number;
    colorID: string;
    quantity: number;
    orderId: number;
  }
export default function Checkout({ onClose }: Props) {
    const [address, setaddress] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const handleAdressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setaddress(event.target.value);
    }

    const handlePay = async () => {
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        if (token && id && orders.length > 0) {
            try {
                const response = await axios.post(
                    "/checkout",
                    {
                        token: token,
                        userId: id,
                    }
                );
                console.log(response)
                localStorage.setItem('checkoutModalOpen', 'false');
                window.location.reload();
            } catch (error) {

                console.log(error);
            }
        };

    };


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("id");
                if (token && userId) {
                    const response = await axios.post(
                        "/getOngoingOrder",
                        {
                            token,
                            userId,
                        }
                    );
                    if (response.data.success === true) {
                       console.log(response)
                    setOrders(response.data.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);

            }
        };
        fetchOrder();

    }, []);


    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center  text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block rounded-lg text-left overflow-hidden transform transition-all px-4 pt-5 pb-4 sm:pb-4">
                    <div className="w-full max-w-xl">
                        <form
                            className="rounded bg-blue-400 px-5 pt-6 pb-8 border"

                        >
                            <h1 className="mb-4 block text-gray-700 text-m font-bold ">
                                Your cart:
                            </h1>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 mt-5"
                                    htmlFor="room"
                                >
                                    Delivery Address:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-72 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="room"
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={handleAdressChange}
                                ></input>
                            </div>

                            <h1 className="mb-4 block text-gray-700 text-m font-bold ">My Order:</h1>
                            {orders.length > 0 ? (
                                <OrderList orders={orders} />
                            ) : (
                                <p className="mb-4 block text-gray-700 text-m font-bold ">No orders :( Add something to cart </p>
                            )}

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-white hover:bg-gray-100 text-gray-800 border-b-4 border-gray-400 font-semibold py-2 px-4  rounded shadow"
                                    type="button"
                                    onClick={handlePay}
                                >
                                    Checkout
                                </button>
                                <button
                                    type="button"
                                    className=" hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow border-b-4 border-blue-700 hover:border-blue-500"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}