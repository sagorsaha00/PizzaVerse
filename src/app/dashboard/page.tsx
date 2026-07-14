'use client';

import { useSession } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Image from 'next/image';

// Typescript interfaces mapping directly to your MongoDB payload shape
interface Drink {
  id: string;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
}

interface PizzaSize {
  size: string;
  inches: number;
  price: number;
}

interface ReservationItem {
  _id: string;
  name: string;
  email: string;
  pizzaName: string;
  image: string;
  price: number;
  size: PizzaSize;
  tableName: string;
  chairs: number;
  drinks: Drink[];
}

export default function DashBoard() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { data: reserveData, isLoading, error } = useQuery<ReservationItem[]>({
    queryKey: ['reserveBooks', email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/getReserveBook?email=${encodeURIComponent(email!)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to pull reservation records.");
      }

      const result = await response.json();
      return result.data;
    },
    enabled: !!email,
  });

  useEffect(() => {
    if (reserveData) {
      console.log("Automatically fetched reserve data:", reserveData);
    }
  }, [reserveData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Header section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Orders & Reservations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Logged in as: <span className="font-medium text-gray-700">{email || "Fetching session..."}</span>
          </p>
        </header>

        {/* State 1: Loading */}
        {isLoading && email && (
          <div className="flex items-center space-x-2 text-amber-600 animate-pulse bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
            <p className="font-medium">Loading your dining experiences...</p>
          </div>
        )}

        {/* State 2: Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm opacity-90">{(error as Error).message}</p>
          </div>
        )}

        {/* State 3: Empty Array */}
        {reserveData && reserveData.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-2xl bg-white">
            <p className="text-gray-400 text-lg">No active reservations found for this account.</p>
            <p className="text-sm text-gray-400 mt-1">Ready for lunch? Book a table to get started.</p>
          </div>
        )}

        {/* State 4: Active Data Render */}
        {reserveData && reserveData.length > 0 && (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {reserveData.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
              >
                {/* Main Pizza Card Banner */}
                <div>
                  <div className="relative h-48 w-full bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.pizzaName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                      {item.size.size} ({item.size.inches}")
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{item.pizzaName}</h3>
                      <span className="text-xl font-black text-amber-600">৳{item.price}</span>
                    </div>

                    {/* Table Meta Details */}
                    <div className="mt-4 grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 text-sm">
                      <div>
                        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Assigned Space</span>
                        <span className="font-semibold text-gray-800">{item.tableName}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Seating Capacity</span>
                        <span className="font-semibold text-gray-800">{item.chairs} Chairs</span>
                      </div>
                    </div>

                    {/* Drinks Section */}
                    {item.drinks && item.drinks.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Complementary Drinks</h4>
                        <div className="space-y-2">
                          {item.drinks.map((drink) => (
                            <div key={drink.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-2 pr-4 shadow-2xs">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={drink.image}
                                  alt={drink.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-50"
                                />
                                <span className="text-sm font-medium text-gray-700">{drink.name}</span>
                              </div>
                              <span className="text-xs font-semibold text-gray-500">৳{drink.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Reservation metadata summary */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Guest: {item.name}</span>
                  <span className="font-mono text-gray-400 selection:bg-amber-100">ID: {item._id.slice(-6)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}