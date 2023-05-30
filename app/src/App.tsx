import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./auth/useAuth";
import { Login } from "./login/Login";
import { Overview } from "./overview/Overview";

const App: React.FC = () => {
    return (
        <CssVarsProvider defaultMode="dark">
            <CssBaseline />
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={<Authenticate element={withLayout(<Overview />)} />}
                    ></Route>
                    <Route path="/login" element={withLayout(<Login />)}></Route>
                </Routes>
            </div>
        </CssVarsProvider>
    );
};

const header = <header></header>;
const footer = <footer></footer>;

const withLayout = (element: React.ReactNode) => {
    return (
        <div className="route">
            {header}
            <div className="page">{element}</div>
            {footer}
        </div>
    );
};

interface AuthenticateProps {
    element: ReactNode;
}

const Authenticate: React.FC<AuthenticateProps> = ({ element }) => {
    const { authenticated } = useAuth();
    if (!authenticated) return <Navigate to="/login" />;
    return <>{element}</>;
};

export default App;
