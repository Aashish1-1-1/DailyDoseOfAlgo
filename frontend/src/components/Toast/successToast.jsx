import { toast } from "react-toastify";
const successToast = (msg) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className: " font-poppins",
    style: {fontFamily: "Poppins", fontWeight: "500", top: "70px"}
  });
};

export default successToast;
