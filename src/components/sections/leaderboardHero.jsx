import Image from 'next/image';
import apeKingBackground from '@/assets/images/bg-ape_king.png';
import trainLogoLight from '@/assets/images/train_logo_light.png';

const LeaderboardHero = ({
    logoSrc = trainLogoLight, // Default to imported logo
    title = 'SquadW Leaderboards',
    description = 'Check out the top performers in the SquadW community! Track your rank, compete with friends, and climb your way to the top of the leaderboard.',
}) => {
    return (
        <section className="py-24 text-center">
            <div className="w-full bg-auto bg-bottom bg-no-repeat" style={{ backgroundImage: `url(${apeKingBackground.src})`, height: '750px' }}>
                <div className="max-w-7xl mx-auto px-6 pb-48 relative" style={{ textShadow: '0 2px 2px rgba(0,0,0,0.8)' }}>
                    {/* Small centered logo */}
                    <div className="mb-6">
                        <Image
                            src={logoSrc}
                            alt="SquadW Logo"
                            width={80} // Adjustable size
                            height={80}
                            className="mx-auto"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-black mb-6 tracking-wider">
                        Squad<span className="text-apeRed">W</span> Leaderboards
                    </h1>

                    {/* Short description */}
                    <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>
            </div>

        </section>
    );
};

export default LeaderboardHero;