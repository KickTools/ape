// src/components/admin/giveaways/StartGiveawaySection.jsx
import Icons from "@/assets/icons";

const giveawayTypes = [
  {
    id: "rain",
    title: "Banana Blitz",
    description: "Quick random giveaways with instant winner selection. Make it rain, but bananas! 🍌",
    icon: "BananaBunch", // Just using an emoji as placeholder, replace with your custom icon
    color: "apeYellow"
  },
  {
    id: "ticket",
    title: "Primal Raffle",
    description: "Scheduled raffles with entry period and drawing",
    icon: "Ticket",
    color: "apeRed"
  },
  {
    id: "chat",
    title: "SquadW Chat",
    description:
      "Keyword-based chat giveaways with customizable qualifications",
    icon: "Ape",
    color: "apeBlue"
  },
  {
    id: "coinflip",
    title: "Ape Flip",
    description:
      "A simple heads or tails coin flip game for quick decisions",
    icon: "Coin",
    color: "apeGreen"
  }
];

export default function StartGiveawaySection( {setActiveModal} ) {
  return (
    <section className="section-spacing section-bg">
    <div className="flex flex-col items-center text-center space-y-16 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
        Start <span className="text-apeRed">A</span> Giveaway
        <span className="text-apeRed">.</span>
      </h2>
      <p className="text-lg text-foreground-700">
        Launch your own giveaway, engage the community, and share the
        excitement!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-32 px-2 md:px-8">
        {giveawayTypes.map((type, index) => {
          const IconComponent = Icons[type.icon] || Icons.Ape; // Default to HelpCircle if icon not found

          return (
            <div
              key={type.id}
              className="flex flex-col items-center text-center"
            >
              {/* Hover effect matching ExploreSection */}
              <button
                onClick={() => setActiveModal(type.id)}
                className="group flex flex-col items-center justify-center hover:bg-apeRed-500/10 hover:no-underline py-6 px-4 rounded-xl cursor-pointer"
              >
                <IconComponent size="7xl" color="foreground" />
                <h3 className="text-2xl font-black mt-4 group-hover:text-apeRed">
                  {type.title}
                </h3>
              </button>
              {/* Description outside hoverable area */}
              <p className="text-md text-foreground-800 mt-8">
                {type.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
    </section>

  );
}
