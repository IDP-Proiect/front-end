import axios from "axios";
import { useEffect, useState } from "react";

interface Order {
    id: number;
    timestamp: string;
    userId: string;
    status: string;
}

interface Props {
    onClose: () => void;
}

const History: React.FC<Props> = ({ onClose }) => {
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem("token")
            const id = localStorage.getItem("id")
            if (token && id) {
                try {
                    const response = await axios.post(
                        "/orders",
                        {
                            token: token,
                            userId: id,
                        }
                    );
                    console.log(response)
                    if (response.data.success === true) {
                        setOrderHistory(response.data.data);
                    }
                } catch (error) {
                    console.error("Error fetching order history:", error);
                }
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center  text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block rounded-lg text-left overflow-hidden transform transition-all px-4 pt-5 pb-4 sm:pb-4">
                    <div className="w-full max-w-xs">
                        <form className="bg-blue-400 rounded px-5 pt-6 pb-8 border">
                            <h1 className="mb-4 block text-gray-700 text-m font-bold">
                                The History of your orders:
                            </h1>

                            {orderHistory.length > 0 ? (
                                <div className="max-h-80 overflow-y-auto">
                                    <h2 className="mb-4 block text-gray-700 text-m font-bold">
                                        Order History
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {orderHistory.map((order) => (
                                            <div
                                                key={order.id}
                                                className="bg-white rounded border border-gray-300 p-4"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span>Order ID: {order.id}</span>
                                                    <span>Status: {order.status}</span>
                                                </div>
                                                <div>
                                                    Time: {new Date(order.timestamp).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="mb-4 block text-gray-700 text-m font-bold">
                                    No order history available :( Add something to cart
                                </p>
                            )}

                            <div className="flex items-center justify-between mt-10">
                                <button
                                    type="button"
                                    className="bg-white hover:bg-gray-100 text-gray-800 border-b-4 border-gray-400 font-semibold py-2 px-4 rounded shadow"
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
};

export default History;