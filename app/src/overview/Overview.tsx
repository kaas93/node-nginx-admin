import { Table } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuthenticatedApi } from "../api/useApi";
import { Loading } from "../loading/Loading";
import { Vhost } from "../model/vhost.model";

export const Overview: React.FC = () => {
    const { fetchVhosts } = useAuthenticatedApi();
    const [vhosts, setVhosts] = useState<Vhost[] | void>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const vhosts = await fetchVhosts();
            setVhosts(vhosts);
            setLoading(false);
        })();
    }, []);

    if (loading) return <Loading />;
    if (!vhosts) return <p>Kapot.</p>;
    return (
        <Table stickyHeader stripe="odd">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vhosts.map((vhost, index) => {
                    return (
                        <tr key={index}>
                            <td>{vhost.id}</td>
                            <td>{vhost.name}</td>
                            <td>Actions</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
