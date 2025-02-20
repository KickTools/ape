// app/leaderboard/page.tsx
'use client';

import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from '@heroui/table';
import { Pagination } from '@heroui/pagination';
import { Spinner } from '@heroui/spinner';
import useSWR from 'swr';
import { useLeaderboard, LeaderboardEntry, LeaderboardResponse } from '@/api/handleLeaderboard';

const fetcher = async ([page, limit, sortBy, sortOrder]: [number, number, string, string]) => {
    const { fetchLeaderboard } = useLeaderboard();
    return fetchLeaderboard(page, limit, sortBy, sortOrder);
};

export default function LeaderboardPage() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 15;

    const { data, error, isLoading } = useSWR<LeaderboardResponse>(
        [page, rowsPerPage, 'rank', 'asc'],
        fetcher,
        { keepPreviousData: true }
    );

    const pages = React.useMemo(() => {
        return data?.pagination.totalItems
            ? Math.ceil(data.pagination.totalItems / rowsPerPage)
            : 0;
    }, [data?.pagination.totalItems]);

    const loadingState = isLoading || !data?.data.length ? 'loading' : 'idle';

    return (
        <div className="mt-16 mx-auto flex flex-col min-w-96 md:w-3/4 lg:w-[800px]">
            <h1 className="text-2xl font-bold mb-4">Top Chatters</h1>
            <Table
                className="text-xl"
                color="primary"
                selectionMode="single"
                aria-label="Leaderboard table with pagination"
                bottomContent={
                    pages > 0 ? (
                        <div className="py-2 px-2 flex justify-center items-center">
                            <Pagination
                                showControls
                                isCompact
                                showShadow
                                boundaries={1}
                                color="primary"
                                page={page}
                                total={pages}
                                variant="flat"
                                onChange={setPage}
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn key="rank">Rank</TableColumn>
                    <TableColumn key="username">Username</TableColumn>
                    <TableColumn key="stats.total_messages" className="text-right">
                        Total Messages
                    </TableColumn>
                    <TableColumn key="stats.streams_participated" className="text-right">
                        Streams
                    </TableColumn>
                </TableHeader>
                <TableBody
                    items={data?.data ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                >
                    {(item: LeaderboardEntry) => (
                        <TableRow key={item.user_id}>
                            {(columnKey) => {
                                // Custom handling for nested fields
                                if (columnKey === 'stats.total_messages') {
                                    return <TableCell className="text-right">{item.stats.total_messages}</TableCell>;
                                  }
                                  if (columnKey === 'stats.streams_participated') {
                                    return <TableCell className="text-right">{item.stats.streams_participated}</TableCell>;
                                  }
                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {error && <p className="text-red-500 mt-4">Failed to load leaderboard: {error.message}</p>}
        </div>
    );
}