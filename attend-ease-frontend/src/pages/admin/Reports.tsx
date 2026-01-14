import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from '@mui/material';
import {
  Download as DownloadIcon,
  CalendarMonth as CalendarIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

interface ReportItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  formats: readonly string[];
}

const Reports: React.FC = () => {
  const handleDownload = (reportTitle: string, format: string) => {
    alert(`Downloading ${reportTitle} in ${format.toUpperCase()} format (demo mode)`);
  };

  const reports: ReportItem[] = [
    {
      title: 'Monthly Attendance Report',
      description: 'Complete attendance summary for all lab members',
      icon: <CalendarIcon />,
      formats: ['xlsx', 'pdf', 'csv'],
    },
    {
      title: 'Salary Report',
      description: 'Detailed salary breakdown and payroll summary',
      icon: <ReceiptIcon />,
      formats: ['xlsx', 'pdf'],
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Download attendance and salary reports
        </Typography>
      </Box>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                    }}
                  >
                    {report.icon}
                  </Box>
                }
                title={report.title}
                subheader={report.description}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Download Format
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {report.formats.map((format) => (
                    <Button
                      key={format}
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(report.title, format)}
                    >
                      {format.toUpperCase()}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
