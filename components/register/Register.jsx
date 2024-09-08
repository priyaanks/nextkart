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

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await axios.post("/api/auth/register", { name, email, password });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <Paper className={style.paperContainer}>
      <Container component='main' maxWidth='xs'>
        <Typography variant='h5'>Register</Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            id='password'
            label='Password'
            name='password'
            type='password'
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='confirmPassword'
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Register
          </Button>

          <Grid
            container
            justifyContent='flex-start'
            style={{ marginTop: "1rem" }}
          >
            <Grid item>
              Already have an account?
              <Button onClick={handleLoginRedirect} color='secondary'>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}
