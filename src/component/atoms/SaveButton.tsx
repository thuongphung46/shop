import { Colors } from "common/color";
import CustomButton from "component/atoms/CustomButton";
import { FaSave } from "react-icons/fa";

const SaveButton = () => {
  return (
    <CustomButton
      sx={{
        background: Colors.buttonSave,
        ["&:hover"]: { backgroundColor: Colors.buttonSave },
      }}
      startIcon={<FaSave />}
      variant="contained">
      Save
    </CustomButton>
  );
};

export default SaveButton;
