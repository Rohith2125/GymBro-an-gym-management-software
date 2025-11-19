import axios from "axios";

const PaymentButton = () => {
  const handlePayment = async () => {

    const { data } = await axios.post(
      "http://localhost:3000/api/CreatePayment",
      { amount: 500 },          // example amount
      { withCredentials: true }
    );

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "Your App Name",
      description: "Membership Purchase",
      order_id: data.orderId,
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },
      prefill: {
        name: "User Name",
        email: "email@example.com",
        contact: "9000000000",
      },
      theme: {
        color: "#0A74DA",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button onClick={handlePayment}>
      Pay ₹500
    </button>
  );
};

export default PaymentButton;
