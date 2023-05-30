import { CircularProgress } from "@mui/joy";
import "./Loading.scss";

export const Loading: React.FC = () => {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    );
};
