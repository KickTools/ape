// src/components/sections/exploreSection.jsx
import Icons from "@/assets/icons";

export default function ExploreSection({ exploreLinks }) {
  return (
    <div className="flex flex-col space-y-16 max-w-5xl mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
        Explore <span className="text-apeRed">.</span>
      </h2>
      <p className="text-lg text-foreground-700">
        Discover exclusive content, participate in community events, and connect
        with other members. We're excited to have you here!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-32 px-8">
        {exploreLinks.map(({ title, href, icon, description }, index) => {
          const IconComponent = Icons[icon] || Icons.HelpCircle; // Default to HelpCircle if icon not found

          return (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Hover effect only on this section */}
              <a
                href={href}
                className="group flex flex-col items-center justify-center hover:bg-apeRed-500/10 hover:no-underline py-6 px-4 rounded-xl cursor-pointer"
              >
                <IconComponent size="7xl" color="foreground" />
                <h3 className="text-2xl font-black mt-4 group-hover:text-apeRed">
                  {title}
                </h3>
              </a>
              {/* Description placed outside the hoverable area */}
              <p className="text-md text-foreground-800 mt-8">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
