import { Grid2 as Grid } from "@mui/material";
import Register from "@/components/register/Register";

const RegisterPage = () => {
return (
<Grid container spacing={2}>
  <Grid size={12}>
    <Register />
  </Grid>
</Grid>
);
};

export default RegisterPage;