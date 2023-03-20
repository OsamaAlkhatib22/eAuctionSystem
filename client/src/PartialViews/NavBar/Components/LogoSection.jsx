import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import config from "../../../Data/config";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={config.defaultPath}
    ></ButtonBase>
  );
};

export default LogoSection;
