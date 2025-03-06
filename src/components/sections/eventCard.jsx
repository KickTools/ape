import Link from 'next/link';
import Icons from "@/assets/icons";

export default function EventCard({ day, name, description, date, href }) {
    return (
        <div className="relative flex px-4 py-4 rounded-xl bg-foreground-700/5 border-2 border-transparent hover:border-foreground/50 transition-colors">
            <div className="flex flex-col flex-grow items-start">
                <div className="flex w-full justify-between items-center mb-4">
                    <span className="text-5xl font-black text-foreground apePeriod">{day}</span>
                    <Icons.Calendar size="2xl" color="foreground" className="relative -top-2 right-0" />
                </div>
                <Link href={href} className="block">
                    <h3 className="text-xl font-semibold mb-2 hover:underline">{name}</h3>
                </Link>
                <p className="text-foreground-700 mb-2">{description}</p>
                <p className="text-foreground-600 text-sm">{date}</p>
            </div>
        </div>
    );
}