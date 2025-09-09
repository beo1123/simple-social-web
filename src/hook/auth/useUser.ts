import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const useUser = () => useSelector((state: RootState) => state.auth.user);