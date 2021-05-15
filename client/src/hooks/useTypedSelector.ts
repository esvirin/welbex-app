import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appStateType} from "../redux/store";

export const useTypedSelector: TypedUseSelectorHook<appStateType> = useSelector