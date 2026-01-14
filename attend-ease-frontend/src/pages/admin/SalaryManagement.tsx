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
  Calculate as CalculateIcon,
  Refresh as RefreshIcon,
  CheckCircle as ApproveIcon,
  Receipt as ReceiptIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { StatCard } from '@/components';
import { getMonthOptions } from '@/types';
import { mockLabMembers } from '@/services/mockData';

const SalaryManagement: React.FC = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const monthOptions = getMonthOptions();

  // Use mock data instead of API
  const members = { content: mockLabMembers };
  const isLoading = false;

  const handleGenerateSlips = () => {
    setSnackbar({ open: true, message: 'Salary slips generated successfully (demo mode)', severity: 'success' });
    setGenerateDialogOpen(false);
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
            Salary Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generate and manage salary slips
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
            variant="contained"
            startIcon={<CalculateIcon />}
            onClick={() => setGenerateDialogOpen(true)}
          >
            Generate Slips
          </Button>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => alert('Export feature (demo mode)')}
          >
            Export Report
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
            title="Total Payroll"
            value="₹2,50,000"
            icon={<MoneyIcon />}
            color="primary"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Approved"
            value={8}
            icon={<ApproveIcon />}
            color="success"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approval"
            value={2}
            icon={<ReceiptIcon />}
            color="warning"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Members"
            value={members?.content.length || 0}
            icon={<ReceiptIcon />}
            color="info"
            loading={isLoading}
          />
        </Grid>
      </Grid>

      {/* Salary Slips Table */}
      <Card>
        <CardHeader
          title="Salary Slips"
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
                <TableCell align="right">Base Salary</TableCell>
                <TableCell align="right">Deductions</TableCell>
                <TableCell align="right">Net Salary</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TableCell key={i}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : members?.content?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No salary slips found</Typography>
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
                    <TableCell align="right">
                      <Typography variant="body2">
                        ₹{member.baseSalary?.toLocaleString('en-IN') || '25,000'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="error.main">
                        -₹2,500
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600} color="primary.main">
                        ₹22,500
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Approved" size="small" color="success" />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Button size="small" variant="text">
                          View
                        </Button>
                        <Button size="small" variant="text" color="success">
                          Approve
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Generate Dialog */}
      <Dialog open={generateDialogOpen} onClose={() => setGenerateDialogOpen(false)}>
        <DialogTitle>Generate Salary Slips</DialogTitle>
        <DialogContent>
          <Typography>
            Generate salary slips for all members for{' '}
            <strong>
              {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </strong>
            ?
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            This will calculate salaries based on attendance records. Make sure attendance is frozen before generating slips.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleGenerateSlips}
          >
            Generate
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

export default SalaryManagement;
