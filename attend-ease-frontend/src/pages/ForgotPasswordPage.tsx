import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  InputAdornment,
} from '@mui/material';
import {
  Email as EmailIcon,
  LockReset as LockResetIcon,
  ArrowBack as ArrowBackIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/authStore';

const ForgotPasswordPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { forgotPassword } = useAuthStore();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await forgotPassword(email);
    setEmailSent(true);
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
              Password Recovery
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
              Don't worry, it happens to the best of us.
              <br />
              We'll help you get back in.
            </Typography>

            <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)', width: '60%', mx: 'auto' }} />

            {/* Steps */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              {[
                'Enter your email address',
                'Check your inbox for the reset link',
                'Create a new secure password',
                'Login with your new password',
              ].map((step, index) => (
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
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {step}
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

      {/* Right Side - Forgot Password Form */}
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
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Samsung SEED Labs Portal
              </Typography>
            </Box>
          )}

          {/* Forgot Password Card */}
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
              {!emailSent ? (
                <>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #0066CC 0%, #00ADEF 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <LockResetIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      Forgot Password?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter your email address and we'll send you
                      <br />
                      instructions to reset your password.
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Enter your registered email"
                    />

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
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <MarkEmailReadIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Check Your Email
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    We've sent password reset instructions to:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}
                  >
                    {email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Didn't receive the email? Check your spam folder or{' '}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => setEmailSent(false)}
                      sx={{ cursor: 'pointer' }}
                    >
                      try another email address
                    </Link>
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Remember your password?
                </Typography>
              </Divider>

              <Button
                component={RouterLink}
                to="/login"
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
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
                Back to Sign In
              </Button>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Need help?{' '}
              <Link href="#" underline="hover">Contact Support</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
