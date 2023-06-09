import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useApi } from "../api/useApi";

const initialValue = "INITIAL";

const jwtAtom = atomWithStorage<string | null>("token", initialValue);

export const useAuth = () => {
    const { fetchToken } = useApi();
    const [jwt, setJwt] = useAtom(jwtAtom);

    const initialized = jwt !== initialValue;

    const credentials = initialized && jwt ? jwtDecode(jwt) : null;
    const authenticated = !!credentials;
    const logout = useCallback(() => setJwt(null), [setJwt]);
    const login = useCallback(async (password: string) => {
        const token = await fetchToken(password);
        setJwt(token);
    }, [fetchToken, setJwt]);

    return { jwt, login, logout, initialized, credentials, authenticated };
};