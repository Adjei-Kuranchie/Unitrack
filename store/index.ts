import { AttendanceStore, LocationStore } from "@/types/type";
import { create } from "zustand";

// Original location store
export const useLocationStore = create<LocationStore>((set) => {
  return {
    userAddress: null,
    userLongitude: null,
    userLatitude: null,
    destinationAddress: null,
    destinationLongitude: null,
    destinationLatitude: null,
    setUserLocation: ({
      latitude,
      longitude,
      address,
    }: {
      latitude: number;
      longitude: number;
      address: string;
    }) => {
      set(() => ({
        userLatitude: latitude,
        userLongitude: longitude,
        userAddress: address,
      }));
    },
    setDestinationLocation: ({
      latitude,
      longitude,
      address,
    }: {
      latitude: number;
      longitude: number;
      address: string;
    }) => {
      set(() => ({
        destinationLatitude: latitude,
        destinationLongitude: longitude,
        destinationAddress: address,
      }));
    },
  };
});

export const useAttendanceStore = create<AttendanceStore>((set) => {
  return {
    // Session data
    sessionActive: false,
    sessionCode: "",
    sessionClass: "",
    sessionTimestamp: 0,
    sessionLocation: { latitude: 0, longitude: 0 },

    // Attendees list
    attendees: [],

    // Actions
    startSession: (
      code: string,
      className: string,
      timestamp: number,
      location: { latitude: number; longitude: number }
    ) => {
      set(() => ({
        sessionActive: true,
        sessionCode: code,
        sessionClass: className,
        sessionTimestamp: timestamp,
        sessionLocation: location,
        // Reset attendees when starting a new session
        attendees: [],
      }));
    },

    endSession: () => {
      set(() => ({ sessionActive: false }));
    },

    // Used for mock data initially, can be replaced with real API logic later
    addAttendee: (regNo: string) => {
      set((state) => {
        // Create a new attendee with unique ID
        const newAttendee = {
          id: String(state.attendees.length + 1),
          regNo: regNo,
          timestamp: Math.floor(Date.now() / 1000),
        };

        return {
          attendees: [...state.attendees, newAttendee],
        };
      });
    },
  };
});
