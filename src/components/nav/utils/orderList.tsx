import axios from "axios";
import React from "react";

interface Order {
  orderedColorsId: number;
  colorID: string;
  quantity: number;
  orderId: number;
}

interface Props {
  orders: Order[];
}

const OrderList: React.FC<Props> = ({ orders }) => {
  const handleMinusClick = async (index: string) => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    if (token && id) {
    try {
        const response = await axios.post(
          "/removeFromCart",
          {
            token:token,
            userId:id,
            colorId:index,
            quantity:1
          }
        );  
        console.log(response)  
      } catch (error) {
        
        console.log(error);
      }
  };
}

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index} className="mb-2">
          <div className="bg-white rounded border border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <span>
                Color ID: {order.colorID}, Quantity: {order.quantity}
              </span>
              <button
                className="ml-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xl  rounded-md"
                onClick={() => handleMinusClick(order.colorID)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;