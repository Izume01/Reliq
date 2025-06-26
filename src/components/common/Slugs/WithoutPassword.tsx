"use client";
import React, { useEffect, useState } from "react";

interface WithoutPasswordProps {
    slug: string;
}

const WithoutPassword: React.FC<WithoutPasswordProps> = ({ slug }) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSlugData = async () => {
            try {
                const response = await fetch("/api/getslug", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch slug data");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchSlugData();
    }, [slug]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black px-6">
            <div className="flex flex-col items-center space-y-6 max-w-2xl">
                <h1 className="text-5xl font-bold text-white text-center">
                    Content for {slug}
                </h1>
                {loading ? (
                    <p className="text-xl text-gray-400 text-center">Loading...</p>
                ) : error ? (
                    <p className="text-xl text-red-500 text-center">Error: {error}</p>
                ) : (
                    <p className="text-xl text-gray-400 text-center">
                        {data ? data.content : "No content available for this slug."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WithoutPassword;