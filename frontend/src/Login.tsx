import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { loginSuccess } from "./store/authSlice";

const theme = createTheme({
  palette: {
    primary: { main: "#0d28f0" },
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("superadmin");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate is the programmatic navigation API in RRv6 [web:12]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      dispatch(loginSuccess(role as "superadmin" | "admin" | "employee"));
      navigate(`/${role}/dashboard`);
      setLoading(false);
    }, 800);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#f0f2f5",
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            borderRadius: 3,
            overflow: "hidden",
            maxWidth: 900,
            width: "100%",
            minHeight: 500,
          }}
        >
          {/* LEFT IMAGE PANEL */}
          <Box
            sx={{
              position: "relative",
              display: { xs: "none", md: "block" },
              width: "45%",
              minHeight: 500,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 24,
                left: 24,
                zIndex: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                <span style={{ color: "#00a9e0" }}></span>
              </Typography>
            </Box>

            <Box
              component="img"
              src="/image.png"
              alt="SEED Login"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
                zIndex: 1,
              }}
            />
          </Box>

          {/* RIGHT LOGIN PANEL */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 350 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LoginIcon sx={{ fontSize: 32, color: "#0d28f0", ml: 10 }} /> Sign
                In
              </Typography>

              {/* Role Selector */}
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {[
                  { value: "superadmin", label: "Super Admin" },
                  { value: "admin", label: "Admin" },
                  { value: "employee", label: "Employee" },
                ].map((item) => (
                  <Button
                    key={item.value}
                    variant={role === item.value ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setRole(item.value)}
                    sx={{
                      borderRadius: 5,
                      textTransform: "none",
                      px: 2,
                      py: 0.5,
                      fontSize: "0.8rem",
                      fontWeight: role === item.value ? 600 : 400,
                      borderColor: role === item.value ? "primary.main" : "#ccc",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Email"
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 1.5 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Password"
                  type="password"
                  margin="dense"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 1.5 }}
                />

                {/* Remember Me + Forgot Password */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2">Remember Me</Typography>}
                  />

                  {/* IMPORTANT: use RouterLink via component+to (no href="#") [web:12] */}
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "text.secondary" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    py: 1.2,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(13, 40, 240, 0.4)",
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "SUBMIT"
                  )}
                </Button>
              </Box>

              {/* Create Account */}
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  New to Samsung SEED?{" "}
                  {/* IMPORTANT: use RouterLink via component+to [web:12] */}
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      textDecoration: "none",
                      color: "#00a9e0",
                      fontWeight: 500,
                    }}
                  >
                    Create an Account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
