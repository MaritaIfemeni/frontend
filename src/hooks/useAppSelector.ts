import { useSelector, TypedUseSelectorHook } from "react-redux";
import { GlobalState } from "../redux/store";

const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;

export default useAppSelector;
