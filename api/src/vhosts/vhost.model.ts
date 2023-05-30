
export interface Vhost {
    id: string;
    name: string;
    body: string;
}

export type LocalVhost = Omit<Vhost, "id">;