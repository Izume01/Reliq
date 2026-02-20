import { create } from "zustand";
import {
  DEFAULT_MAX_FAILED_ATTEMPTS,
  DEFAULT_TTL,
  DEFAULT_MAX_VIEWS,
} from "@/lib/security/options";

interface SecretData {
  slug: string;
  expiresIn: number;
}

interface SecretTypes {
  notes: string;
  timetolive: number;
  password: string;
  maxFailedAttempts: number;
  maxViews: number;
  model: boolean;
  data: SecretData | null;

  setNote: (note: string) => void;
  setPassword: (password: string) => void;
  setTimetolive: (timetolive: number) => void;
  setMaxFailedAttempts: (maxFailedAttempts: number) => void;
  setMaxViews: (maxViews: number) => void;
  setModel: (model: boolean) => void;
  setData: (data: SecretData | null) => void;
}

const useSecret = create<SecretTypes>((set) => ({
  notes: "",
  timetolive: DEFAULT_TTL,
  password: "",
  maxFailedAttempts: DEFAULT_MAX_FAILED_ATTEMPTS,
  maxViews: DEFAULT_MAX_VIEWS,
  model: false,
  data: null,
  setModel: (modelval) => set({ model: modelval }),
  setNote: (note) => set({ notes: note }),
  setPassword: (password) => set({ password }),
  setData: (data) => set({ data }),
  setTimetolive: (timetolive) => set({ timetolive }),
  setMaxFailedAttempts: (maxFailedAttempts) => set({ maxFailedAttempts }),
  setMaxViews: (maxViews) => set({ maxViews }),
}));

export default useSecret;
