// src/app/legal/tos.mjs
export default function TermsOfService() {
    return (
        <section className="flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
            <h1 className="page-title">Terms of Service</h1>
            <p className="page-timestamp">
                Last Updated: 2025-02-18 21:51:10 UTC
            </p>

            <div className="w-full space-y-8">
                <section className="section-tos">
                    <h2>Introduction</h2>
                    <p>
                        Welcome to <span className="accent text-primary-700">SquadW.online</span> (also known as <span className="accent text-primary-700">Ape Gang Community</span>), operated by <span className="accent text-secondary-600">KickTools, LLC</span>. By accessing or using our service, you agree to be bound by these Terms of Service.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Important Disclaimers</h2>
                    <p>
                        <span className="accent text-primary-700">SquadW.online</span> and <span className="accent text-primary-700">Ape Gang Community</span> are independent projects by <span className="accent text-secondary-600">KickTools, LLC</span> and are not affiliated with <span className="accent text-twitch-400">Twitch</span>, <span className="accent text-kick">Kick</span>, or Trainwreck.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Eligibility</h2>
                    <p>
                        To use this service, you must be 18 years or older, comply with both <span className="accent text-twitch-400">Twitch</span> and <span className="accent text-kick">Kick</span>'s Terms of Service, and have valid accounts on both platforms.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Account Requirements</h2>
                    <p>
                        Each <span className="accent text-twitch-400">Twitch</span> account can only be linked to one <span className="accent text-kick">Kick</span> account. Users can register only one cryptocurrency wallet address and one Twitter/X account, and all linked accounts must belong to the same individual.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Account Verification</h2>
                    <p>
                        Users must complete verification through both platforms, including OAuth-based authentication for <span className="accent text-twitch-400">Twitch</span>, a verification code system for <span className="accent text-kick">Kick</span> via <span className="accent text-secondary-600">KickTools</span> chat, cryptocurrency wallet verification, and optional Twitter/X account verification.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Prohibited Activities</h2>
                    <p>
                        The following activities will result in immediate account termination: scamming community members, botting or manipulating giveaway entries, using multiple accounts to increase chances in giveaways, using someone else's crypto wallet address, creating accounts for individuals under 18, or attempting to bypass security measures.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Gambling Disclaimer</h2>
                    <div className="warning-box">
                        <p>
                            Important Notice About Gambling: While some giveaways may be related to Trainwreck's streams, gambling is extremely risky. You will lose money gambling. It should only be considered by individuals with disposable income and should never be viewed as a way to make money. Casino odds are heavily in the house's favor.
                        </p>
                    </div>
                </section>

                <section className="section-tos">
                    <h2>Support and Contact</h2>
                    <p>
                        For support or questions, contact us through Discord at <a href="https://kicktools.app/discord" className="accent text-secondary-600" target="_blank" rel="noopener noreferrer">KickTools Discord</a> or via email at <a href="mailto:support@kicktools.app" className="accent text-secondary-600">support@kicktools.app</a>.
                    </p>
                </section>

                <section className="section-tos">
                    <h2>Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
                    </p>
                </section>
            </div>
        </section>
    );
}