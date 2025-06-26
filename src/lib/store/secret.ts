import {create} from "zustand"

interface SecretTypes  {
    notes: string;
    timetolive: number;
    password: string;
    model : boolean
    
    setNote: (note: string) => void;
    setPassword: (password: string) => void;
    setTimetolive: (timetolive: number) => void;
    setModel : (model : boolean) => void;
}

const useSecret = create<SecretTypes>((set) => ({
    notes: "",
    timetolive: 0,
    password: "",
    model : false,
    setModel : (modelval) => set({model : modelval}),
    setNote: (note) => set({ notes: note }),
    setPassword: (password) => set({ password }),
    
    setTimetolive: (timetolive) => set({timetolive}),
}));

export default useSecret;