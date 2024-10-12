const MembershipSection = () => {
    const membershipPlans = [
      { id: 1, plan: "1 Month", price: "₹500" },
      { id: 2, plan: "3 Months", price: "₹1200" },
      { id: 3, plan: "6 Months", price: "₹2000" },
    ];
  
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4">Membership Plans</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <ul>
            {membershipPlans.map((plan) => (
              <li key={plan.id} className="mb-2">
                <span className="font-bold">{plan.plan}</span>: {plan.price}
              </li>
            ))}
          </ul>
          <button className="mt-4 bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-600">
            Add New Plan
          </button>
        </div>
      </div>
    );
  };
  
  export default MembershipSection;
  