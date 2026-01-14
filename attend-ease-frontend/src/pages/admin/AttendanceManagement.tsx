import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Skeleton,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Lock as LockIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { StatCard } from '@/components';
import { getMonthOptions } from '@/types';
import { mockLabMembers } from '@/services/mockData';

const AttendanceManagement: React.FC = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [freezeDialogOpen, setFreezeDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const monthOptions = getMonthOptions();

  // Use mock data instead of API
  const members = { content: mockLabMembers };
  const isLoading = false;

  const handleFreezeMonth = () => {
    setSnackbar({ open: true, message: 'Month frozen successfully (demo mode)', severity: 'success' });
    setFreezeDialogOpen(false);
  };

  const handleMonthChange = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Attendance Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage lab member attendance
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={`${selectedYear}-${selectedMonth}`}
              label="Month"
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              {monthOptions.map((option) => (
                <MenuItem key={`${option.year}-${option.month}`} value={`${option.year}-${option.month}`}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => setFreezeDialogOpen(true)}
          >
            Freeze Month
          </Button>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => alert('Export feature (demo mode)')}
          >
            Export
          </Button>

          <Tooltip title="Refresh">
            <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Members"
            value={members?.content.length || 0}
            icon={<CheckIcon />}
            color="primary"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Attendance Marked"
            value={members?.content?.length || 0}
            icon={<CheckIcon />}
            color="success"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={0}
            icon={<WarningIcon />}
            color="warning"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Status"
            value="Open"
            icon={<LockIcon />}
            color="info"
            loading={isLoading}
          />
        </Grid>
      </Grid>

      {/* Members Attendance Table */}
      <Card>
        <CardHeader
          title="Member Attendance"
          subheader={new Date(selectedYear, selectedMonth - 1).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell align="center">Full Days</TableCell>
                <TableCell align="center">Half Days</TableCell>
                <TableCell align="center">LOP</TableCell>
                <TableCell align="center">Attendance %</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : members?.content?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No members found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                members?.content?.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {member.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="20" size="small" color="success" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="2" size="small" color="warning" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="0" size="small" color="error" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        95%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Complete" size="small" color="success" />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="text">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Freeze Dialog */}
      <Dialog open={freezeDialogOpen} onClose={() => setFreezeDialogOpen(false)}>
        <DialogTitle>Freeze Attendance</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to freeze attendance for{' '}
            <strong>
              {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </strong>
            ?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action will lock all attendance records for this month. Changes will require admin approval to modify.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFreezeDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFreezeMonth}
          >
            Freeze Month
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceManagement;
