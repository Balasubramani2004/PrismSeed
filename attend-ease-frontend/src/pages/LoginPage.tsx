import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  } from '@mui/material';
import {
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as SuperAdminIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('LAB_MEMBER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getDefaultRoute = (role: UserRole) => {
    switch (role) {
      case 'LAB_MEMBER':
        return '/member/dashboard';
      case 'LAB_ADMIN':
        return '/admin/dashboard';
      case 'SUPER_ADMIN':
        return '/super-admin/dashboard';
      default:
        return '/member/dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await login(email, password, selectedRole);
    navigate(getDefaultRoute(selectedRole), { replace: true });
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
      }}
    >
      {/* Left Side - Hero Section (Hidden on Mobile) */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #0066CC 0%, #00ADEF 50%, #0066CC 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                               radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
            }}
          />

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 500 }}>
            {/* Logo */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4,
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 800 }}>
                AE
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Attend Ease
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Automated Invoice Billing Calculator
              <br />
              for Samsung SEED Labs
            </Typography>

            <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)', width: '60%', mx: 'auto' }} />

            {/* Features */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              {[
                'Daily Attendance Tracking',
                'Pro-rata Salary Calculation',
                'PDF/Excel Reports',
                'Complete Audit Trail',
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#00ADEF',
                      boxShadow: '0 0 10px rgba(0, 173, 239, 0.5)',
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Powered by Samsung PRISM • © 2026 SEED Labs
            </Typography>
          </Box>
        </Box>
      )}

      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: isMobile ? 1 : '0 0 500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile Logo */}
          {isMobile && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #0066CC 0%, #00ADEF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>
                  AE
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Attend Ease
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Samsung SEED Labs Portal
              </Typography>
            </Box>
          )}

          {/* Login Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #0066CC 0%, #00ADEF 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <LoginIcon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to access your dashboard
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your email"
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter your password"
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedRole}
                    label="Role"
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    startAdornment={
                      <InputAdornment position="start">
                        <BusinessIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="LAB_MEMBER">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" />
                        Lab Member
                      </Box>
                    </MenuItem>
                    <MenuItem value="LAB_ADMIN">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AdminIcon fontSize="small" />
                        Lab Admin
                      </Box>
                    </MenuItem>
                    <MenuItem value="SUPER_ADMIN">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SuperAdminIcon fontSize="small" />
                        Super Admin
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ textAlign: 'right', mb: 2 }}>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    underline="hover"
                    sx={{ color: 'primary.main' }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #0066CC 0%, #00ADEF 100%)',
                    boxShadow: '0 4px 14px rgba(0, 102, 204, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #005bb5 0%, #0099d6 100%)',
                      boxShadow: '0 6px 20px rgba(0, 102, 204, 0.5)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Don't have an account?
                </Typography>
              </Divider>

              <Button
                component={RouterLink}
                to="/register"
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.light',
                  },
                }}
              >
                Create Account
              </Button>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              By signing in, you agree to our{' '}
              <Link href="#" underline="hover">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" underline="hover">Privacy Policy</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
