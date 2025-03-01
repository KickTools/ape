// src/app/legal/privacy.mjs
export default function PrivacyPolicy() {
    return (
        <section className="flex flex-col items-center justify-center py-12 px-6 max-w-4xl mx-auto">
            <h1 className="page-title">Privacy Policy</h1>
            <p className="page-timestamp">
                Last Updated: 2025-02-18 21:51:10 UTC
            </p>

            <div className="w-full space-y-8">
                <section className="section-privacy">
                    <h2>Information We Collect</h2>
                    <p>
                        We collect information through authorized API access from <span className="accent text-twitch-400">Twitch</span> and <span className="accent text-kick">Kick</span>. This includes Twitch account details such as username, email, and ID, as well as Kick account verification status. We also securely store Twitch OAuth tokens, cryptocurrency wallet addresses, and Twitter/X account information if enabled by the user.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>How We Use Your Information</h2>
                    <p>
                        <span className="accent text-primary-700">SquadW.online</span> and <span className="accent text-primary-700">Ape Gang Community</span> use your information for account verification across platforms, managing giveaway participation, enhancing security and fraud prevention, and improving our services.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Data Retention and Deletion</h2>
                    <p>
                        We retain your data until you disconnect your account through the settings page at <span className="accent text-primary-700">SquadW.online</span>. Once disconnected, all entries and personal information are permanently deleted from our database.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Security Measures</h2>
                    <p>
                        To protect your data, we implement secure OAuth authentication for <span className="accent text-twitch-400">Twitch</span>, verification codes for <span className="accent text-kick">Kick</span>, CAPTCHA to prevent spam, rate limiting, JWT and secure cookie systems, strict CORS policies, and encryption for sensitive information.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Analytics</h2>
                    <p>
                        We use Umami Analytics (cloud.umami.is) to analyze website usage patterns while maintaining user privacy. This ensures a privacy-focused approach to understanding how users interact with our platform.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Age Restrictions</h2>
                    <p>
                        Our service is intended for users 18 and older. If we discover an account belonging to a user under 18, we will immediately suspend the account, remove all associated data, and block the IP address if repeated violations occur.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Data Sharing</h2>
                    <p>
                        We do not share your personal information with third parties. All collected data is used solely for the operation and improvement of our services.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Contact Information</h2>
                    <p>
                        For privacy-related concerns or questions, you can contact us through Discord at <a href="https://kicktools.app/discord" className="accent text-secondary-600" target="_blank" rel="noopener noreferrer">KickTools Discord</a> or via email at <a href="mailto:support@kicktools.app" className="accent text-secondary-600">support@kicktools.app</a>.
                    </p>
                </section>

                <section className="section-privacy">
                    <h2>Changes to Privacy Policy</h2>
                    <p>
                        We reserve the right to update this privacy policy at any time. Any significant changes will be communicated through our website or email notifications.
                    </p>
                </section>
            </div>
        </section>
    );
}