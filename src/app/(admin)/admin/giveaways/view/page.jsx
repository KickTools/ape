// src/app/(admin)/admin/giveaways/view/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllGiveaways } from "@/lib/giveawayAPI";
import { useGiveaway } from "@/contexts/GiveawayContext";
import { useToast } from "@/contexts/ToastContext";
import GiveawayCard from "@/components/admin/giveaways/GiveawayCard";
import GiveawayFilters from "@/components/admin/giveaways/GiveawayFilters";
import Button from "@/components/elements/Button";

export default function ViewGiveaways() {
  const router = useRouter();
  const [filteredGiveaways, setFilteredGiveaways] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    searchQuery: ""
  });
  const { activeGiveaways, setActiveGiveaways } = useGiveaway();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchGiveaways = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllGiveaways();
        setActiveGiveaways(data);
      } catch (error) {
        toast.error("Failed to load giveaways.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiveaways();
  }, [setActiveGiveaways, toast]);

  // Apply filters whenever filters or activeGiveaways change
  useEffect(() => {
    let result = [...activeGiveaways];

    // Filter by status
    if (filters.status !== "all") {
      result = result.filter((giveaway) => giveaway.status === filters.status);
    }

    // Filter by type
    if (filters.type !== "all") {
      result = result.filter((giveaway) => giveaway.type === filters.type);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((giveaway) =>
        giveaway.title.toLowerCase().includes(query)
      );
    }

    // Sort by creation date (newest first)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredGiveaways(result);
    setPage(1); // Reset to first page when filters change
  }, [filters, activeGiveaways]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredGiveaways.length / ITEMS_PER_PAGE);
  const paginatedGiveaways = filteredGiveaways.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="giveaway-container">
      <section>
        <div className="giveaway-header content-width">
          <h2 className="giveaway-title apePeriod">View Giveaways</h2>
          <div className="space-x-4">
            <Button
              onClick={() => router.push("/admin/giveaways")}
              size="small"
              color="apeRed"
            >
              Back to Giveaway HQ
            </Button>
          </div>
        </div>
      </section>

      <section className="py-4 px-8">
        <GiveawayFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apeRed"></div>
        </div>
      ) : (
        <>
          {paginatedGiveaways.length > 0 ? (
            <section className="py-4 min-h-96">
              <div className="giveaway-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-width">
                {paginatedGiveaways.map((giveaway) => (
                  <GiveawayCard key={giveaway.id} giveaway={giveaway} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-foreground-600">
                No giveaways match your filters
              </p>
            </div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <section>
              <div className="pagination flex justify-center pb-16 space-x-2">
                <Button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  radius="md"
                  size="small"
                  color="foreground-950"
                >
                  Previous
                </Button>

                <div className="flex items-center px-4">
                  Page {page} of {totalPages}
                </div>

                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  radius="md"
                  size="small"
                  color="foreground-950"
                >
                  Next
                </Button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
