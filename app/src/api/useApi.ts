import { useCallback } from "react";
import { useAuth } from "../auth/useAuth";
import { Vhost } from "../model/vhost.model";

export const useApi = () => {
    const fetchToken = useCallback(async (password: string): Promise<string> => {
        const { token } = await fetchJson<{ token: string }>("/api/auth", {
            method: "POST",
            body: { password }
        });

        return token;
    }, []);

    return { fetchToken };
};

export const useAuthenticatedApi = () => {
    const { jwt, authenticated, logout } = useAuth();

    const fetchVhosts = useCallback(async () => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts`, { jwt });
        if (response.status === 401) return logout();
        return await formatResponse<Vhost[]>(response);
    }, [authenticated, jwt, logout]);

    const fetchVhost = useCallback(async (id: string) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts/${id}`, { jwt });
        if (response.status === 401) return logout();
        return await formatResponse<Vhost[]>(response);
    }, [authenticated, jwt, logout]);

    const createVhost = useCallback(async (vhost: Omit<Vhost, "id">) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts`, { method: "POST", jwt, body: vhost });
        if (response.status === 401) return logout();
    }, [authenticated, jwt, logout]);

    const updateVhost = useCallback(async (vhost: Vhost) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts/${vhost.id}`, { method: "PUT", jwt, body: vhost });
        if (response.status === 401) return logout();
    }, [authenticated, jwt, logout]);

    const deleteVhost = useCallback(async (id: string) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts/${id}`, { method: "DELETE", jwt });
        if (response.status === 401) return logout();
    }, [authenticated, jwt, logout]);

    const secureVhost = useCallback(async (id: string) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts/${id}/secure`, { method: "POST", jwt });
        if (response.status === 401) return logout();
    }, [authenticated, jwt, logout])

    const installWordpress = useCallback(async (id: string) => {
        if (!authenticated) return [];
        const response = await rawFetch(`/api/vhosts/${id}/wordpress`, { method: "POST", jwt });
        if (response.status === 401) return logout();
    }, [authenticated, jwt, logout])

    return { fetchVhosts, fetchVhost, createVhost, updateVhost, deleteVhost, secureVhost, installWordpress }
}

interface FetchOpts {
    method?: string;
    jwt?: string | null;
    body?: Record<string, any>;
}

const fetchJson = async <T>(url: string, opts: FetchOpts = {}): Promise<T> => {
    const response = await rawFetch(url, opts);
    return await formatResponse<T>(response);
};

const rawFetch = async (url: string, { method, jwt, body }: FetchOpts = {}): Promise<Response> => {
    const headers: Record<string, string> = {};
    if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
    if (body) headers["Content-Type"] = "application/json";
    const init: RequestInit = { method: method || "GET", headers };
    if (body) init.body = JSON.stringify(body);
    const response = await fetch(url, init);
    return await response;
};

const formatResponse = async <T>(response: Response) => {
    if (response.status >= 400) throw Error(`Request failed with status: ${response.status}, ${response.statusText}`);
    return await response.json() as T;
};
