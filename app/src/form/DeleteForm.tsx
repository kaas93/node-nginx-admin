import { WarningRounded } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/joy";
import { useAuthenticatedApi } from "../api/useApi";
import { Vhost } from "../model/vhost.model";

interface DeleteFormProps {
    vhost: Vhost;
    close: () => void;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({ vhost, close }) => {
    const { deleteVhost: doDelete } = useAuthenticatedApi();

    const deleteVhost = async () => {
        await doDelete(vhost.id);
        close();
    };

    return (
        <>
            <Typography component="h2" startDecorator={<WarningRounded />} sx={{ mb: ".5em" }}>
                Confirmation
            </Typography>

            <Divider />
            <Typography textColor="text.tertiary" sx={{ mt: ".5em" }}>
                Are you sure you want to delete the vhost '{vhost.name}'?
            </Typography>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}>
                <Button variant="plain" color="neutral" onClick={close}>
                    Cancel
                </Button>
                <Button variant="solid" color="danger" onClick={deleteVhost}>
                    Delete vhost
                </Button>
            </Box>
        </>
    );
};
