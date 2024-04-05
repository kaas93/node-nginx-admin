import { Box, Button, FormControl, FormLabel, Input, Option, Select, Textarea } from "@mui/joy";
import { useState } from "react";
import { useAuthenticatedApi } from "../api/useApi";
import { Vhost } from "../model/vhost.model";
import { VhostType, phpTemplate, reverseProxyTemplate } from "./vhost-templates";

interface UpdateFormProps {
    vhost: Vhost;
    close: () => void;
}

export const VhostForm: React.FC<UpdateFormProps> = ({ vhost, close }) => {
    const { createVhost, updateVhost } = useAuthenticatedApi();

    const [name, setName] = useState(vhost.name);
    const [body, setBody] = useState(vhost.body);
    const [type, setType] = useState<VhostType>("php");
    const [port, setPort] = useState<number>(1);
    const [phpVersion] = useState<string>("8.1");

    const switchType = (value: VhostType) => {
        if (value === "php") setBody(phpTemplate);
        if (value === "reverse-proxy") setBody(reverseProxyTemplate);
        setType(value);
    };

    const replacePlaceholders = () => {
        return body
            .replaceAll("{{siteName}}", name)
            .replaceAll("{{port}}", port?.toString() ?? "1337")
            .replaceAll("{{phpVersion}}", phpVersion ?? "8.1");
    };

    const saveVhost = async () => {
        const updatedVhost = { ...vhost, name, body: replacePlaceholders() };
        if (vhost.id) {
            await updateVhost(updatedVhost);
        } else {
            await createVhost(updatedVhost);
        }
        close();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                width: "50vw",
                minWidth: "800px",
            }}
        >
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
            {!vhost.id && (
                <Select
                    placeholder="Vhost type"
                    onChange={(_, value) => switchType(value as VhostType)}
                >
                    <Option value="php">PHP</Option>
                    <Option value="reverse-proxy">Reverse proxy</Option>
                </Select>
            )}
            {!vhost.id && type === "reverse-proxy" && (
                <>
                    <FormControl>
                        <FormLabel>Port</FormLabel>
                        <Input
                            type="number"
                            value={port}
                            slotProps={{
                                root: { step: "1", min: "1", max: "65536" },
                            }}
                            placeholder="Port"
                            onChange={(event) => {
                                setPort(parseInt(event.target.value));
                            }}
                        />
                    </FormControl>
                </>
            )}

            <FormControl>
                <FormLabel>Vhost definition</FormLabel>
                <Textarea
                    minRows={2}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                />
            </FormControl>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button variant="plain" color="neutral" onClick={close}>
                    Cancel
                </Button>
                <Button variant="solid" color="danger" onClick={saveVhost}>
                    {vhost.id ? "Update" : "Create"} vhost
                </Button>
            </Box>
        </Box>
    );
};
