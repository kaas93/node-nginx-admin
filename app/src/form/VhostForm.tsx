import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@mui/joy";
import { useState } from "react";
import { useAuthenticatedApi } from "../api/useApi";
import { Vhost } from "../model/vhost.model";

interface UpdateFormProps {
    vhost: Vhost;
    close: () => void;
}

export const VhostForm: React.FC<UpdateFormProps> = ({ vhost, close }) => {
    const { createVhost, updateVhost } = useAuthenticatedApi();

    const [name, setName] = useState(vhost.name);
    const [body, setBody] = useState(vhost.body);

    const saveVhost = async () => {
        const updatedVhost = Object.assign({}, vhost, { name, body });
        if (vhost.id) {
            await updateVhost(updatedVhost);
        } else {
            await createVhost(updatedVhost);
        }
        close();
    };

    return (
        <>
            <FormControl>
                <FormLabel>Domain name</FormLabel>
                <Input
                    type="text"
                    value={name}
                    placeholder="Domain name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Vhost definition</FormLabel>
                <Textarea
                    minRows={2}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                />
            </FormControl>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}>
                <Button variant="plain" color="neutral" onClick={close}>
                    Cancel
                </Button>
                <Button variant="solid" color="danger" onClick={saveVhost}>
                    {vhost.id ? "Update" : "Create"} vhost
                </Button>
            </Box>
        </>
    );
};
