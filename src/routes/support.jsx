import React from "react";

const SupportComp = () => {
  const selfServices = [
    "Deposit wasn’t credited",
    "Withdrawal hasn’t arrived",
    "Conversation hasn’t completed",
    "Change account information",
    "Change phone number",
    "Change email address",
    "Change login password",
    "Freeze account",
  ];

  const topQuestions = [
    "How do I buy and sell crypto with a third party?",
    "Why can’t I join or claim rewards from a campaign?",
    "How do I find my deposit address and tag/memo/comment?",
    "What can I do with Discover in the OKX wallet?",
    "New User Bonus program - Terms and Conditions",
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-20 py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold mb-8">Support center</h2>
        <h1 className="text-6xl sm:text-5xl font-bold">
          Here to help you 24/7
        </h1>
      </div>

      {/* Self-services */}
      <div className="mb-16">
        <h3 className="text-2xl font-medium mb-6">Self-services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {selfServices.map((item, i) => (
            <button
              key={i}
              className="border border-gray-400 rounded-full px-5 py-3 mb-2 text-sm hover:bg-gray-900 transition"
              style={{ width: "300px", height: "90px" }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h3 className="text-6xl font-bold mb-12 text-center">FAQs</h3>

        <div>
          <h4 className="text-3xl font-bold mb-12">Top questions</h4>
          <ul className="space-y-8">
            {topQuestions.map((q, i) => (
              <li
                key={i}
                className="text-gray-300 text-sm border-b border-white pb-2 hover:text-white cursor-pointer"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportComp;
