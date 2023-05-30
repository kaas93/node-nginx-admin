import { Button, Card, Input } from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const Login: React.FC = () => {
    const [password, setPassword] = useState("");
    const { login: doLogin } = useAuth();
    const navigate = useNavigate();

    const login = async () => {
        await doLogin(password);
        navigate("/");
    };

    return (
        <Card variant="outlined" sx={{ width: 320 }}>
            <Input
                placeholder="Password"
                required
                onChange={(event) => setPassword(event.target.value)}
                sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
            />
            <Button onClick={login} type="submit">
                Login
            </Button>
        </Card>
    );
};
