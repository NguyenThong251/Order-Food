import React from "react";
// import { Notification } from "../../../../interface";
interface Notification {
  _id: string;
  order_id: string;
  handleCheck: () => void;
}
const CardNoti: React.FC<Notification> = ({ _id, order_id, handleCheck }) => {
  return (
    <>
      <div onClick={handleCheck} className="flex items-center justify-between ">
        <div className="content">
          <p>requested payment for order ${order_id}.</p>
        </div>
        <div className="">
          <button className="text-blue-600">View</button>
        </div>
      </div>
    </>
  );
};

export default CardNoti;
