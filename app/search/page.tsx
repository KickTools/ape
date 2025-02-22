// app/search/page.tsx
'use client';

import React from 'react';
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { TwitterIcon } from '@/components/icons';
import { searchViewers, SearchResult } from '@/utils/api';
import { debounce } from '@/utils/debounce';



export default function SearchPage() {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const performSearch = React.useCallback(
        debounce(async (searchQuery: string) => {
            if (!searchQuery || searchQuery.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const searchResults = await searchViewers(searchQuery);
                setResults(searchResults);
                console.log(searchResults);
            } catch (err) {
                setError('Failed to perform search. Please try again.');
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    React.useEffect(() => {
        performSearch(query);
    }, [query, performSearch]);

    // Function to calculate star count based on verified platforms
    const getStarCount = (viewer: SearchResult) => {
        let count = 0;
        if (viewer.twitch?.verified) count++;
        if (viewer.kick?.verified) count++;
        return count;
    };

    return (
        <section className="flex flex-col items-center justify-start py-12 px-6 space-y-2 min-w-96 w-2/3 max-w-2xl mx-auto">
            <div className="w-full border-none rounded-lg relative shadow-sm">
                <div className="p-8 space-y-4 relative z-10">
                    <div className="w-full max-w-xl p-4 bg-background/20 rounded-xl">
                        <Input
                            labelPlacement="outside"
                            placeholder="Enter viewer name or username for either platform ..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                            size="lg"
                            variant="flat"
                            color="secondary"
                        />
                    </div>
                </div>

            </div>

            <div className="w-full max-w-xl space-y-4">
                {isLoading && (
                    <div className="flex justify-center p-4">
                        <Spinner size="lg" />
                    </div>
                )}

                {error && (
                    <div className="p-4 border border-red-400 bg-red-100 text-primary rounded-lg">
                        {error}
                    </div>
                )}

                {!isLoading && results.length > 0 && (
                    <div className="space-y-4">
                        {results.map((viewer) => {
                            const starCount = getStarCount(viewer);
                            return (
                                <div
                                    key={viewer.id}
                                    className="relative flex flex-row gap-8 p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/10 via-background/20 to-background/40 rounded-lg hover:bg-background/10 hover:border hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex justify-center">
                                        {viewer.twitch?.profilePic ? (
                                            <img
                                                src={viewer.twitch.profilePic}
                                                alt={`${viewer.name}'s Twitch profile`}
                                                className="w-36 h-36 rounded-full object-cover"
                                            />
                                        ) : viewer.kick ? (
                                            <div className="w-36 h-36 rounded-full bg-primary flex items-center justify-center">
                                                <span className="text-xl font-bold">{viewer.kick.username[0]}</span>
                                            </div>
                                        ) : (
                                            <div className="w-36 h-36 rounded-full bg-primary flex items-center justify-center">
                                                <span className="text-gray-500 text-sm">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex gap-2 pb-2 items-center justify-between">
                                            <div className="flex gap-4 items-center">
                                                <h3 className="text-2xl font-bold text-foreground">{viewer.name}</h3>

                                                {viewer.kick?.twitter && (
                                                    <a href={`https://x.com/${viewer.kick.twitter}`} target="_blank" rel="noopener noreferrer">
                                                        <TwitterIcon className="w-6 h-6 text-primary hover:text-primary-600" />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex space-x-1">
                                                {Array.from({ length: starCount }, (_, i) => (
                                                    <span key={i} className="text-kick text-2xl">★</span>
                                                ))}
                                                {Array.from({ length: 2 - starCount }, (_, i) => (
                                                    <span key={i} className="text-gray-300 text-lg">☆</span>
                                                ))}
                                            </div>
                                        </div>

                                        {viewer.twitch && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-foreground-100 font-black">Twitch</span>
                                                <a
                                                    href={viewer.twitch.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-foreground hover:underline"
                                                >
                                                    {viewer.twitch.username}
                                                </a>
                                            </div>
                                        )}
                                        {viewer.kick && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-foreground-100 font-black">Kick</span>
                                                <a
                                                    href={`https://kick.com/${viewer.kick.username}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-foreground hover:underline"
                                                >
                                                    {viewer.kick.username}
                                                </a>
                                            </div>
                                        )}
                                        {viewer.bitcoinAddress && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-foreground-100 font-black">Bitcoin:</span>
                                                <a href={`https://blockchair.com/bitcoin/address/${viewer.bitcoinAddress}`} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:underline">
                                                    {viewer.bitcoinAddress}
                                                </a>
                                            </div>
                                        )}
                                        {viewer.contactAddress && (
                                            <div className="flex items-center space-x-2"><p className="text-foreground-100 font-black">Contact</p><p className=""> {viewer.contactAddress}</p></div>
                                        )}

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {!isLoading && query.length >= 2 && results.length === 0 && (
                    <div className="p-4 text-center text-foreground tracking-wider">
                        No viewers found matching <span className="text-kick">"{query}"</span>
                    </div>
                )}
            </div>
        </section>
    );
}