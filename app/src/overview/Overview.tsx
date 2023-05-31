import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Modal, ModalDialog, Table, Tooltip } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuthenticatedApi } from "../api/useApi";
import { DeleteForm } from "../form/DeleteForm";
import { VhostForm } from "../form/VhostForm";
import { Loading } from "../loading/Loading";
import { Vhost } from "../model/vhost.model";

type Mode = "add" | "edit" | "delete";

const NEW_VHOST: Vhost = {
    id: "",
    name: "",
    body: "",
};

export const Overview: React.FC = () => {
    const { fetchVhosts } = useAuthenticatedApi();
    const [vhosts, setVhosts] = useState<Vhost[] | void>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState<boolean>(false);
    const [editVhost, setVhost] = useState<Vhost>(NEW_VHOST);
    const [mode, setMode] = useState<Mode>("add");

    useEffect(() => {
        (async () => {
            const vhosts = await fetchVhosts();
            setVhosts(vhosts);
            setLoading(false);
        })();
    }, [fetchVhosts]);

    if (loading) return <Loading />;
    if (!vhosts) return <p>Kapot.</p>;

    const openModal = (mode: Mode, vhost: Vhost) => {
        setOpen(true);
        setMode(mode);
        setVhost(vhost);
    };

    const closeModal = () => {
        setOpen(false);
        setVhost(NEW_VHOST);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box color="Menu" sx={{ display: "flex", justifyContent: "flex-end", mb: "1em" }}>
                <Tooltip arrow title="Add vhost">
                    <IconButton variant="solid" onClick={() => openModal("add", NEW_VHOST)}>
                        <Add />
                    </IconButton>
                </Tooltip>
            </Box>
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
                                <td>
                                    <Box sx={{ display: "flex", gap: ".5em" }}>
                                        <Tooltip arrow title="Edit vhost">
                                            <IconButton onClick={() => openModal("edit", vhost)}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow title="Delete vhost">
                                            <IconButton
                                                color="danger"
                                                onClick={() => openModal("delete", vhost)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Modal open={open} onClose={closeModal}>
                <ModalDialog variant="outlined">
                    {mode === "delete" ? (
                        <DeleteForm vhost={editVhost} close={closeModal} />
                    ) : (
                        <VhostForm vhost={editVhost} close={closeModal} />
                    )}
                </ModalDialog>
            </Modal>
        </Box>
    );
};
