import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";


function Cart() {

  const context = useContext(myContext)
  const { mode } = context;

  const generateShareLink = (product) => {
    return `${window.location.origin}/product/${product.id}`;
  };

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  const [totalAmout, setTotalAmount] = useState(0);

  const [formState, setFormState] = useState({
    name: "",
    address: "",
    pincode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price)
    })
    setTotalAmount(temp);
    console.log(temp)
  }, [cartItems])

  const shipping = parseInt(100);
  const Discount = parseInt(100);

  const grandTotal =  totalAmout;
  // console.log(grandTotal)

  /**========================================================================
   *!                           Payment Intigration
   *========================================================================**/ 

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    const { name, address, pincode, phoneNumber } = formState;
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

    const addressInfo = { ...formState, date: new Date().toLocaleString() };
    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString(),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place the order.");
      console.error(error);
    }

    var options = {
      key: "rzp_test_Bfn1uxrkPmW4RI",
      key_secret: "NjkWxcOSIoYj5c6sqhMosCfL",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Grabnest",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          const orderRef = collection(fireDB, 'order');
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  };

 return (
    <Layout>
      <div
        className="h-screen bg-gray-100 pt-5 mb-[60%]"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items Section */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => {
              const { id, title, price, description, imageUrl } = item;
              const shareLink = generateShareLink(item);

              return (
                <div
                  key={id}
                  className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </p>
                      <p
                        className="mt-1 text-xs font-semibold"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>
                    </div>
                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-4 sm:mt-0 sm:block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                    {/* Share Buttons */}
                    <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4">
                      <FacebookShareButton
                        url={shareLink}
                        quote={title}
                        aria-label="Share on Facebook"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={shareLink}
                        title={title}
                        aria-label="Share on Twitter"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={shareLink}
                        title={title}
                        aria-label="Share on WhatsApp"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <EmailShareButton
                        url={shareLink}
                        subject={`Check out this product: ${title}`}
                        aria-label="Share via Email"
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Section */}
          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalAmout}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>₹-{Discount}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹{grandTotal}</p>
            </div>
            <Modal
              {...formState}
              setName={(value) =>
                setFormState((prev) => ({ ...prev, name: value }))
              }
              setAddress={(value) =>
                setFormState((prev) => ({ ...prev, address: value }))
              }
              setPincode={(value) =>
                setFormState((prev) => ({ ...prev, pincode: value }))
              }
              setPhoneNumber={(value) =>
                setFormState((prev) => ({ ...prev, phoneNumber: value }))
              }
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart;