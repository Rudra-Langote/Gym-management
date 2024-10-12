const PaymentSection = () => {
    const payments = [
      { id: 1, name: "John Doe", amount: "₹500", status: "Completed" },
      { id: 2, name: "Jane Doe", amount: "₹1200", status: "Pending" },
    ];
  
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4">Payments</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2">{payment.name}</td>
                  <td className="py-2">{payment.amount}</td>
                  <td className={`py-2 ${payment.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default PaymentSection;
  