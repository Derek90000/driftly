import { create } from 'zustand';

interface ItineraryState {
  itinerary: string | null;
  isLoading: boolean;
  error: string | null;
  setItinerary: (itinerary: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  itinerary: null,
  isLoading: false,
  error: null,
  setItinerary: (itinerary) => set({ itinerary }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ itinerary: null, isLoading: false, error: null }),
}));