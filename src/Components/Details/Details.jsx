import { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContexts } from "../../Context/AuthContexts";
import Swal from "sweetalert2";

const Details = () => {
  //

  const { user } = use(AuthContexts);
  const [bids, setBids] = useState([]);
  console.log(bids);

  // modal
  const bidsModalRef = useRef(null);
  const handleBitModalopen = () => {
    bidsModalRef.current.showModal();
  };
  const handleBitSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(_id, name, email, bid);
    const newBids = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "panding",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidsModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add tha new bid
          newBids._id = data.insertedId;
          const newBidss = [...bids, newBids];
          const sortedBids = newBidss.sort((a, b) => b.bid_price - a.bid_price);
          setBids(sortedBids);
        }
      });
  };
  // console.log(handleBitModalopen);
  const product = useLoaderData();
  const {
    _id,
    description,
    title,
    usage,
    condition,
    price_min,
    price_max,
    image,
    created_at,
    location,
    seller_contact,
    status,
    seller_name,
    seller_image,
  } = product;
  // console.log(product);
  // bid load
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [_id]);
  return (
    <div className="">
      {/* product info */}
      <div className="md:grid grid-cols-12 gap-4 ">
        <div className="col-span-6 p-4 space-y-2 shadow-2xl rounded-2xl shadow-fuchsia-300">
          {/* left */}
          <div className=" flex justify-center">
            <img
              className="w-full h-[400px] object-contain"
              src={image}
              alt=""
            />
          </div>
          <div className="flex justify-between px-8 p-2">
            <p className="font-semibold text-xl"> Condition: {condition}</p>
            <div className="font-semibold text-xl">Usage: {usage}</div>
          </div>
          <div className="w-full border-b-2 border-gray-500"></div>
          <p className="font-medium text-[18px] text-gray-600">
            {" "}
            {description}
          </p>
        </div>
        <div className="col-span-6 p-4 space-y-2 shadow-2xl rounded-2xl shadow-indigo-400">
          {/* right */}
          <Link to={"/"}>
            {" "}
            <p className="text-xl text-blue-600 font-semibold">
              ⬅ back to Products page
            </p>
          </Link>
          <p className="font-bold text-3xl mt-2">{title}</p>

          <p className=" font-semibold text-xl">
            {" "}
            ${price_min}-{price_max}
          </p>
          <p className="text-2xl font-bold mb-4"> Products Details</p>
          <p className=" font-semibold text-xl text-gray-800">
            {" "}
            Products ID: {_id}
          </p>
          <p className=" font-semibold text-xl">Posted: {created_at}</p>
          <p className="font-bold text-2xl mb-4 text-gray-800">
            Selar Information
          </p>
          <div className="flex text-center items-center gap-4">
            <img
              className="rounded-[50%] max-h-15.5"
              src={user?.photoURL}
              alt=""
            />
            <p className=" font-semibold text-xl  text-gray-700">
              Name: {seller_name}
            </p>
          </div>
          <p className=" font-semibold text-xl text-gray-700">
            Location: {location}
          </p>
          <p className=" font-semibold text-xl text-gray-700">
            Contact: {seller_contact}
          </p>
          <p className=" font-semibold text-xl text-gray-700">
            Status: {status}
          </p>
          {/* button */}
          <button
            onClick={handleBitModalopen}
            className="btn w-full px-4  text-xl  text-white bg-gradient-to-r from-blue-500 to-green-500"
          >
            I Want Buy This Priducts
          </button>
          <dialog
            ref={bidsModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-2xl bg-gradient-to-r from-pink-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent text-center">
                Give the best Offer!
              </h3>
              <p className="py-4 text-center">
                Offer something seeler can not resist !
              </p>
              {/* input  */}
              <form onSubmit={handleBitSubmit}>
                {" "}
                <fieldset className="fieldset">
                  <label className="label">Baier Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    readOnly
                    defaultValue={user?.email}
                  />
                  <label className="label">Your Bid</label>
                  <input
                    name="bid"
                    type="text"
                    className="input"
                    placeholder="Your Bid"
                    required
                  />

                  <button className="btn btn-accent text-xl mt-4">
                    Places your bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bits */}
      <h2 className="text-3xl font-bold mt-4 mb-4 text-center">
        Bids for this products:{" "}
        <span className="text-shadow-pink-600">({bids.length})</span>
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
                <td className="px-4 py-2 text-center">
                  <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm">
                    Details
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
                <button className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
