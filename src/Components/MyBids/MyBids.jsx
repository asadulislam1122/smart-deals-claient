import React, { use, useEffect, useState } from "react";
import { AuthContexts } from "../../Context/AuthContexts";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContexts);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids/?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedBids = data.sort((a, b) => b.bid_price - a.bid_price);
          setBids(sortedBids);
        });
    }
  }, [user?.email]);

  // remove
  const handleDeletBits = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              // remainig bid
              const remainigbid = bids.filter((bid) => bid._id !== _id);
              setBids(remainigbid);
            }
          });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl text-center py-2 text-pink-600 font-semibold">
        Total bids: {bids.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="hidden sm:table w-full border border-gray-200 shadow-md rounded-2xl">
          {/* head */}
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-4 py-2">SI No</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Bid Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-all duration-200 border-b last:border-none"
              >
                <td className="px-4 py-2 font-medium text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10">
                      <img
                        src={bid?.buyer_image}
                        alt={bid?.buyer_name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-semibold">{bid.buyer_name}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {bid.buyer_email}
                </td>
                <td className="px-4 py-2 font-semibold text-blue-600 text-center">
                  ${bid.bid_price}
                </td>
                {/* status */}
                <td className="px-4 py-2 font-semibold text-blue-600 text-center">
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeletBits(bid._id)}
                    className="btn btn-sm btn-warning text-black rounded-xl shadow-sm"
                  >
                    Remove Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📱 Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {bids.map((bid, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={bid?.buyer_image}
                      alt={bid?.buyer_name}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {bid.buyer_name}
                  </h3>
                  <p className="text-sm text-gray-500">{bid.buyer_email}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">
                  <span className="font-semibold text-blue-600">
                    ${bid.bid_price}
                  </span>
                </p>
                <button className="btn btn-sm btn-warning  text-black rounded-lg shadow-sm">
                  Remove Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
