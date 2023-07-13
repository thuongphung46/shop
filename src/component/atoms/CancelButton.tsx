import { Colors } from "@common/color";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "@component/atoms/CustomButton";
import { useNavigate } from "react-router-dom";

const CancelButton = () => {
  const navigate = useNavigate();

  return (
    <CustomButton
      sx={{
        background: Colors.buttonCancel,
        color: "black",
        ["&:hover"]: { backgroundColor: Colors.buttonCancel },
      }}
      onClick={() => navigate(-1)}
      startIcon={<AiOutlineClose />}
      variant="contained"
    >
      Cancel
    </CustomButton>
  );
};

export default CancelButton;
