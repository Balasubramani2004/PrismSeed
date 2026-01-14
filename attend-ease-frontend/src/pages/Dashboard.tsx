import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  WorkHistory as WorkHistoryIcon,
  AttachMoney as MoneyIcon,
  EventBusy as EventBusyIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/authStore';
import { StatCard } from '@/components';
import { getSalaryStatusColor } from '@/types';
import { 
  mockAttendanceSummary, 
  mockSalarySlips, 
  mockDashboardStats,
  mockAdminAttendanceOverview,
  mockAdminSalaryOverview,
} from '@/services/mockData';

// Lab Member Dashboard Component
const LabMemberDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Use mock data instead of API calls
  const attendance = mockAttendanceSummary;
  const salarySlips = mockSalarySlips;
  const lastSalary = salarySlips[0];
  const attendanceLoading = false;
  const salaryLoading = false;

  const handleRefresh = () => {
    // No-op for demo mode
  };

  const currentDate = new Date();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's your attendance overview for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
        </Box>
        <Tooltip title="Refresh data">
          <IconButton onClick={handleRefresh} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Working Days"
            value={attendance?.workingDays || 0}
            subtitle={`of ${attendance?.totalDays || 0} total days`}
            icon={<CalendarIcon />}
            color="primary"
            loading={attendanceLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Full Days"
            value={attendance?.fullDays || 0}
            subtitle="Present full day"
            icon={<CheckCircleIcon />}
            color="success"
            loading={attendanceLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Half Days"
            value={attendance?.halfDays || 0}
            subtitle="Half day attendance"
            icon={<AccessTimeIcon />}
            color="warning"
            loading={attendanceLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="LOP Days"
            value={attendance?.lopDays || 0}
            subtitle="Loss of pay"
            icon={<EventBusyIcon />}
            color="error"
            loading={attendanceLoading}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Attendance Progress Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Attendance Overview"
              subheader={currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              action={
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/member/attendance')}
                  size="small"
                >
                  View Details
                </Button>
              }
            />
            <CardContent>
              {attendanceLoading ? (
                <Box>
                  <Skeleton height={80} />
                  <Skeleton height={80} />
                </Box>
              ) : (
                <Box>
                  {/* Progress Bar */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Attendance Rate
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary.main">
                        {attendance?.attendancePercentage?.toFixed(1) || 0}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={attendance?.attendancePercentage || 0}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 6,
                          background: `linear-gradient(90deg, #0066CC 0%, #00ADEF 100%)`,
                        },
                      }}
                    />
                  </Box>

                  {/* Attendance Breakdown */}
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(40, 167, 69, 0.08)' }}>
                        <Typography variant="h5" fontWeight={700} color="success.main">
                          {attendance?.fullDays || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Full Days
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(255, 193, 7, 0.08)' }}>
                        <Typography variant="h5" fontWeight={700} color="warning.main">
                          {attendance?.halfDays || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Half Days
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(220, 53, 69, 0.08)' }}>
                        <Typography variant="h5" fontWeight={700} color="error.main">
                          {attendance?.lopDays || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          LOP Days
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(0, 102, 204, 0.08)' }}>
                        <Typography variant="h5" fontWeight={700} color="primary.main">
                          {attendance?.holidays || 0}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Holidays
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Freeze Status */}
                  {attendance?.isFrozen && (
                    <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(23, 162, 184, 0.08)', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="info" fontSize="small" />
                      <Typography variant="body2" color="info.main">
                        Attendance for this month has been frozen on {new Date(attendance.frozenAt!).toLocaleDateString()}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Salary Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="Latest Salary"
              subheader={lastSalary ? `${lastSalary.month}/${lastSalary.year}` : 'No salary data'}
              action={
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/member/salary-slips')}
                  size="small"
                >
                  View All
                </Button>
              }
            />
            <CardContent>
              {salaryLoading ? (
                <Box>
                  <Skeleton height={60} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </Box>
              ) : lastSalary ? (
                <Box>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h3" fontWeight={700} color="primary.main">
                      ₹{lastSalary.netSalary.toLocaleString('en-IN')}
                    </Typography>
                    <Chip
                      label={lastSalary.status}
                      size="small"
                      color={getSalaryStatusColor(lastSalary.status)}
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <List dense disablePadding>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Base Salary" secondary={`₹${lastSalary.baseSalary.toLocaleString('en-IN')}`} />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Deductions"
                        secondary={
                          <Typography variant="body2" color="error.main">
                            -₹{lastSalary.totalDeductions.toLocaleString('en-IN')}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary="Days Worked" secondary={`${lastSalary.daysWorked} / ${lastSalary.totalWorkingDays}`} />
                    </ListItem>
                  </List>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={() => alert('Download feature (demo mode)')}
                    sx={{ mt: 2 }}
                  >
                    Download Slip
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <MoneyIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    No salary slips available yet
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CalendarIcon />}
                    onClick={() => navigate('/member/attendance')}
                    sx={{ py: 2, justifyContent: 'flex-start' }}
                  >
                    View Attendance
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ReceiptIcon />}
                    onClick={() => navigate('/member/salary-slips')}
                    sx={{ py: 2, justifyContent: 'flex-start' }}
                  >
                    Salary Slips
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={() => alert('Download report feature (demo mode)')}
                    sx={{ py: 2, justifyContent: 'flex-start' }}
                  >
                    Download Report
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<WorkHistoryIcon />}
                    onClick={() => navigate('/member/profile')}
                    sx={{ py: 2, justifyContent: 'flex-start' }}
                  >
                    My Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Admin Dashboard Component
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Use mock data
  const stats = {
    totalMembers: mockAdminAttendanceOverview.totalMembers,
    activeMembers: mockAdminAttendanceOverview.presentToday,
    pendingApprovals: mockAdminSalaryOverview.pendingApprovals,
    attendanceRate: mockAdminAttendanceOverview.attendanceRate,
    monthlyPayroll: mockAdminSalaryOverview.totalPayroll,
  };
  const isLoading = false;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage lab members, attendance, and salary
          </Typography>
        </Box>
        <IconButton onClick={() => {}} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            subtitle={`${stats.activeMembers} active`}
            icon={<WorkHistoryIcon />}
            color="primary"
            loading={isLoading}
            onClick={() => navigate('/admin/members')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            subtitle="Salary slips"
            icon={<WarningIcon />}
            color="warning"
            loading={isLoading}
            onClick={() => navigate('/admin/salary')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate.toFixed(1)}%`}
            subtitle="This month"
            icon={<TrendingUpIcon />}
            color="success"
            loading={isLoading}
            onClick={() => navigate('/admin/attendance')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Payroll"
            value={`₹${stats.monthlyPayroll.toLocaleString('en-IN')}`}
            subtitle="Total estimated"
            icon={<MoneyIcon />}
            color="info"
            loading={isLoading}
            onClick={() => navigate('/admin/salary')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Super Admin Dashboard Component
const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Use mock data
  const stats = mockDashboardStats;
  const isLoading = false;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Super Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            System-wide overview and management
          </Typography>
        </Box>
        <IconButton onClick={() => {}} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Labs"
            value={stats.totalLabs || 0}
            subtitle={`${stats.activeLabs || 0} active`}
            icon={<CalendarIcon />}
            color="primary"
            loading={isLoading}
            onClick={() => navigate('/super-admin/labs')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalMembers || 0}
            subtitle={`${stats.activeMembers || 0} active`}
            icon={<WorkHistoryIcon />}
            color="secondary"
            loading={isLoading}
            onClick={() => navigate('/super-admin/users')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Payroll"
            value={`₹${(stats.totalPaidThisMonth || 0).toLocaleString('en-IN')}`}
            subtitle="All labs combined"
            icon={<MoneyIcon />}
            color="success"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Salaries"
            value={stats.pendingSalaries || 0}
            subtitle="Awaiting approval"
            icon={<WarningIcon />}
            color="warning"
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Main Dashboard Component - Role-based rendering
const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Not authenticated</Typography>
        <Typography color="text.secondary">Please log in to continue.</Typography>
      </Box>
    );
  }

  switch (user.role) {
    case 'LAB_MEMBER':
      return <LabMemberDashboard />;
    case 'LAB_ADMIN':
      return <AdminDashboard />;
    case 'SUPER_ADMIN':
      return <SuperAdminDashboard />;
    default:
      return <LabMemberDashboard />;
  }
};

export default Dashboard;
