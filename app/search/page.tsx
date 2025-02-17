// app/search/page.tsx
'use client';

import React from 'react';
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Image } from "@heroui/image";
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
                console.log(searchResults);
                setResults(searchResults);
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

    return (
        <section className="flex flex-col items-center justify-start py-12 px-6 space-y-8 min-w-96 w-2/3 max-w-2xl mx-auto">
            <Card isBlurred isFooterBlurred className="w-full p-2 bg-background/60 dark:bg-foreground-foreground/30 border-none relative" shadow="sm">
                <Image
                    removeWrapper
                    alt="Form Background"
                    className="z-0 w-full h-full object-cover absolute top-0 left-0"
                    src="assets/images/bg-form-train.jpg"
                    style={{ filter: 'blur(30px) opacity(.5)' }}
                />
                <CardBody className="p-8 space-y-6 relative z-10">
                    {/* Title */}
                    <h1 className="text-2xl font-bold tracking-tight">Search Viewers</h1>

                    {/* Search Input */}
                    <div className="w-full max-w-xl">
                        <Input
                            label="Search viewers"
                            labelPlacement="outside"
                            placeholder="Enter viewer name or username..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                            size="lg"
                            variant="faded"
                            color="success"
                        />
                    </div>                    
                </CardBody>
                <CardFooter><p className="px-6 text-kick text-sm">Search by viewer name, Twitch, or Kick username</p></CardFooter>
            </Card>


            {/* Results Section */}
            <div className="w-full max-w-xl space-y-4">
                {isLoading && (
                    <div className="flex justify-center p-4">
                        <Spinner size="lg" />
                    </div>
                )}

                {error && (
                    <Card>
                        <CardBody>
                            <p className="text-danger">{error}</p>
                        </CardBody>
                    </Card>
                )}

                {!isLoading && results.length > 0 && (
                    <div className="space-y-4">
                        {results.map((viewer) => (
                            <Card key={viewer.id} className="w-full hover:bg-default-100 transition-colors cursor-pointer">
                                <CardBody>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-semibold">{viewer.name}</h3>
                                        </div>

                                        <div className="flex flex-wrap gap-12">
                                            {viewer.twitch && (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-twitch font-medium">Twitch:</span>
                                                    <span>{viewer.twitch.username}</span>
                                                    {viewer.twitch.verified && (
                                                        <span className="text-success text-sm font-medium">✓ Verified</span>
                                                    )}
                                                </div>
                                            )}

                                            {viewer.kick && (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-kick font-medium">Kick:</span>
                                                    <span>{viewer.kick.username}</span>
                                                    {viewer.kick.verified && (
                                                        <span className="text-success text-sm font-medium">✓ Verified</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}

                {!isLoading && query.length >= 2 && results.length === 0 && (
                    <Card>
                        <CardBody>
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                No viewers found matching "{query}"
                            </p>
                        </CardBody>
                    </Card>
                )}
            </div>
        </section>
    );
}