import { Box } from "@mui/material";
import { ForbiddenImgStyle, UseForbiddenStyle } from "../styles/pages/403-Forbidden.styles";


const ForbiddenPage = () => {
  const ForbiddenStyle = UseForbiddenStyle();

  return (
    <Box sx={ForbiddenStyle}>
      <Box component="h1">Access Denied</Box>
      <Box
        component="img"
        src="/403-Forbidden.png"
        alt="403 Forbidden"
        sx={ForbiddenImgStyle}
        draggable={false}
      />
    </Box>
  );
};

export default ForbiddenPage;