// src/app/main/faq/page.jsx
"use client";

export default function FAQPage() {
  const faqData = [
    {
      question: "What is Ape Gang?",
      answer:
        "Ape Gang is a community curated platform for the streamer TrainwrecksTV.  A group of like-minded individuals who share a passion for live stream entertainment and all things Trainwreck."
    },
    {
      question: "How do I join the community?",
      answer:
        "To join the Ape Gang community, navigate to the Get Started page and connect your Twitch and Kick accounts. Once connected, you’re in!"
    },
    {
      question: "I don't have both a Twitch and Kick account, can I still join?",
      answer:
        "In short, No. The purpose of this community is to verify you are a fan of TrainwrecksTV and have a Twitch and Kick account. If you don't have both, you can create them for free. This ensures  a way to cross platform check for legitimacy and avoid bot accounts."
    },
    {
      question: "What kind of events does Ape Gang host?",
      answer:
        "We host gaming tournaments, community meetups, giveaways, and more. Check the events page for updates—actual events coming soon!"
    },
    {
      question: "How can I level up my verification status?",
      answer:
        "After initially connecting your Twitch and Kick accounts, you can level up by completing tasks on the verification page. The more tasks you complete, the higher your verification status will be."
    },
    {
        question: "What is the current Max Verification Level?",
        answer:
          "The current max verification level is 5. This is subject to change as the community grows and new features are added."
    },
    {
      question: "What are the benefits of being in Ape Gang?",
      answer:
        "Access to exclusive events, leaderboards, and a dope community of fellow SquadW members. Stay tuned for more perks!"
    },
    {
      question: "How do I contact support?",
      answer:
        "Use the 'Contact Us' page or join our Discord for help from the team and community."
    },
    {
      question: "Can I participate in giveaways?",
      answer:
        "Yes! Once giveaways are live, you’ll find entry details on the events page. Coming soon!"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="py-16 md:py-32">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-wide uppercase text-center">
            Frequently Asked <span className="text-apeRed">Questions</span>
          </h2>
          <p className="text-lg text-foreground-600 text-center mt-4">
            Got questions? We’ve got answers—straight from the Ape Gang!
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-foreground-700/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  <span className="text-foreground font-black mr-2 apePeriod">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="text-foreground-700">
                  <span className="text-apeRed text-xl font-black mr-2 apePeriod">
                    A
                  </span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-16 md:py-32 bg-background-400/50 text-center mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-xl">
          <p className="text-foreground-700 tracking-wider">
            Still need help? Reach out on{" "}
            <a
              href="https://discord.gg/trainwreckstv"
              className="text-apeRed hover:underline"
            >
              Discord
            </a>{" "}
            or via our{" "}
            <a href="/contact" className="text-apeRed hover:underline">
              Contact Page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
