import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [payments, setPayments] = useState([]);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    description: "",
  });

  const getPayments = async () => {
    const response = await fetch("http://localhost:3001/payments");
    const data = await response.json();

    setPayments(data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  const handleAddPayment = async () => {
    const amount = parseFloat(newPayment.amount);
    const description = newPayment.description;

    if (isNaN(amount) || description.trim() === "") {
      alert("Please enter a valid amount and description.");
      return;
    }

    const paymentData = {
      amount,
      description,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      console.log("Payment added successfully", response);

      await getPayments();
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  const handleRemovePayment = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/payments/${id}`, {
        method: "DELETE",
      });

      console.log("Payment deleted successfully", response);

      await getPayments();
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPayment({ ...newPayment, amount: e.target.value });
    console.log(newPayment);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPayment({ ...newPayment, description: e.target.value });
    console.log(newPayment);
  };

  return (
    <>
      <div></div>
      <h1>Betternship Assessment</h1>
      <div className="card">
        <h2>Payments</h2>

        <input type="number" onChange={onChangeAmount} />
        <textarea placeholder="Description..." onChange={onChangeDescription} />
        <button onClick={handleAddPayment}>Add Payment</button>

        <ul>
          {payments.map((payment: any) => (
            <li key={payment.id}>
              {payment.id} - {payment.amount} - {payment.description} -{" "}
              {payment.date}
              &nbsp;&nbsp;
              <button onClick={() => handleRemovePayment(payment.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
