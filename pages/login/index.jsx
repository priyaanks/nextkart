import { Grid2 as Grid } from "@mui/material";
import Login from "@/components/login/login";

const LoginPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
