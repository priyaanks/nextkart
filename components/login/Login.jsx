import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Grid2 as Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import style from "@/styles/authentication.module.css";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await axios.post("/api/auth/login", { email, password });
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <Paper className={style.paperContainer}>
      <Container component='main' maxWidth='xs'>
        <Typography variant='h5'>Login</Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            type='email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type='submit'
            sx={{ marginTop: "1rem" }}
            fullWidth
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </form>

        <Grid
          container
          justifyContent='flex-start'
          style={{ marginTop: "1rem" }}
        >
          <Grid>
            Don't have an account?
            <Button onClick={handleRegisterRedirect} color='secondary'>
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}
