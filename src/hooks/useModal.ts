import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal, openModal } from "../redux/reducers/modalReducer";

const useModal = () => {
  const isOpen = useAppSelector((state) => state.modalReducer.isOpen);
  const dispatch = useAppDispatch();

  const toggle = () => {
    if (isOpen) {
      dispatch(closeModal());
    } else {
      dispatch(openModal());
    }
  };
  return { toggle, isOpen };
};

export default useModal;
