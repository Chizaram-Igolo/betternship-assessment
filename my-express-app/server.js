const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const payments = [
  {
    id: 1,
    amount: 500,
    description: "Payment for invoice #123",
    date: "2025-12-23",
  },
  { id: 2, amount: 1200, description: "Subscription fee", date: "2025-12-22" },
];

app.get("/payments", (req, res) => {
  //   res.send("Hello, World!");
  res.json(payments);
});

app.post("/payments", (req, res) => {
  console.log(req.body);
  //   res.json({ requestBody: req.body });

  //   const data = req.body;

  payments.push({
    id: payments.length + 1,
    amount: req.body.amount,
    description: req.body.description,
    date: Date.now(),
  });

  res.status(201).json({ message: "Payment received" });
  //   res.send("Payment received");
});

app.patch("/payments/:id", (req, res) => {
  res.send(`Payment ${req.params.id} updated`);
});

app.delete("/payments/:id", (req, res) => {
  payments = payments.filter((payment) => payment.id != req.params.id);
  res.send(`Payment ${req.params.id} deleted`);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
