"use client";

import React from "react";

const WithPassword = ({ slug }: { slug: string }) => {
    const [data, setData] = React.useState<any>(null);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            const response = await fetch("/api/getslug", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setData(result);
            setIsModalOpen(false); // Close modal on successful fetch
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-gray-800 text-white max-w-md w-full p-6 rounded-lg shadow-lg">
                        <h2 className="text-center text-xl font-bold mb-4">🔒 Locked Content</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full p-3 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                            >
                                Submit
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 w-full p-3 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {data && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Content:</h3>
                    <pre className="bg-gray-800 text-white p-4 rounded">{JSON.stringify(data.content, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default WithPassword;
