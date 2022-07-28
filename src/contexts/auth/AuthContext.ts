import { createContext, useContext } from "react";

export const AuthContext = createContext(null as any);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("Fora do AuthProvider");
    }
    return context;
}