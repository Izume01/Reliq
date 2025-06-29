import {create} from "zustand"

interface SecretData {
    slug: string;
    expiresIn: number;
}

interface SecretTypes  {
    notes: string;
    timetolive: number;
    password: string;
    model: boolean;
    data: SecretData | null;
    
    setNote: (note: string) => void;
    setPassword: (password: string) => void;
    setTimetolive: (timetolive: number) => void;
    setModel: (model: boolean) => void;
    setData: (data: SecretData | null) => void;
}

const useSecret = create<SecretTypes>((set) => ({
    notes: "",
    timetolive: 0,
    password: "",
    model: false,
    data: null,
    setModel: (modelval) => set({model: modelval}),
    setNote: (note) => set({ notes: note }),
    setPassword: (password) => set({ password }),
    setData: (data) => set({ data }),
    setTimetolive: (timetolive) => set({timetolive}),
}));

export default useSecret;