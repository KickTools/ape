// src/components/admin/giveaways/GiveawayTypeCard.jsx
export default function GiveawayTypeCard({ title, description, icon, color, onClick }) {
    return (
      <div 
        className={`giveaway-type-card p-6 rounded-lg bg-foreground-800/5 hover:bg-foreground-800/10 cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center mb-3">
          <div className={`text-3xl mr-3 text-${color}`}>{icon}</div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-foreground-600">{description}</p>
      </div>
    );
  }