import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
export default function TailendSection() {
  const cards = [
    {
      id: 1,
      img: card1,
      title:
        "New Leveraged Pairs Added to Margin Trading on the Crypto.com Exchange",
      desc: "We urge everyone adopt good cybersecurity habits, and to have unique passwords on every site they use...",
      author: "Jennia Peris",
      date: "15/07/2021",
      readTime: "5 Min to read",
    },
    {
      id: 2,
      img: card2,
      title:
        "New Leveraged Pairs Added to Margin Trading on the Crypto.com Exchange",
      desc: "We urge everyone adopt good cybersecurity habits, and to have unique passwords on every site they use...",
      author: "Jennia Peris",
      date: "15/07/2021",
      readTime: "5 Min to read",
    },
    {
      id: 3,
      img: card3,
      title:
        "New Leveraged Pairs Added to Margin Trading on the Crypto.com Exchange",
      desc: "We urge everyone adopt good cybersecurity habits, and to have unique passwords on every site they use...",
      author: "Jennia Peris",
      date: "15/07/2021",
      readTime: "5 Min to read",
    },
  ];

  return (
    <div className="text-white">
      {/* --- Learn Section --- */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Learn to thrive
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white text-black rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                <div className="text-gray-500 text-xs flex items-center justify-between">
                  <span>By: {card.author}</span>
                  <div className="flex space-x-3">
                    <span>{card.date}</span>
                    <span>{card.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Subscribe Section --- */}
      <section className=" py-20 px-6 text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-2">Never miss a drop</h2>
        <p className="text-gray-300 mb-8">
          Subscribe for the latest news, drops & collectibles
        </p>

        <form className="flex justify-center items-center max-w-md mx-auto bg-white rounded-full sm:p-1">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2 rounded-full outline-none text-black"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
          >
            Subscribe
          </button>
        </form>

        {/* Optional decorative background shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 border border-blue-500 rounded-full opacity-10 -translate-x-10 -translate-y-10" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border border-blue-500 rounded-full opacity-10 translate-x-10 translate-y-10" />
      </section>
    </div>
  );
}
