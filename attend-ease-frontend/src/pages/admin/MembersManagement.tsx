import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataTable, Column } from '@/components';
import { LabMember, UserStatus } from '@/types';
import { mockLabMembers } from '@/services/mockData';

const MembersManagement: React.FC = () => {
  const navigate = useNavigate();

  // Use mock data instead of API
  const members = mockLabMembers;
  const isLoading = false;

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'default';
      case 'SUSPENDED':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: Column<LabMember>[] = [
    {
      id: 'name',
      label: 'Member',
      format: (_, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            {row.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {row.id}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'email',
      label: 'Contact',
      format: (_, row) => (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="body2">{row.email}</Typography>
          </Box>
          {row.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {row.phone}
              </Typography>
            </Box>
          )}
        </Box>
      ),
    },
    {
      id: 'joinDate',
      label: 'Join Date',
      format: (value) => (
        <Typography variant="body2">
          {new Date(value as string).toLocaleDateString('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
      ),
    },
    {
      id: 'baseSalary',
      label: 'Base Salary',
      align: 'right',
      format: (value) => (
        <Typography variant="body2" fontWeight={500}>
          ₹{Number(value).toLocaleString('en-IN')}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      format: (value) => (
        <Chip
          label={value as string}
          size="small"
          color={getStatusColor(value as UserStatus)}
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      sortable: false,
      format: (_, row) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => navigate(`/admin/members/${row.id}`)}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Member">
            <IconButton
              size="small"
              onClick={() => navigate(`/admin/members/${row.id}/edit`)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

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
            Lab Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage lab members and their information
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Member
          </Button>
          <Tooltip title="Refresh">
            <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Members Table */}
      <DataTable
        columns={columns}
        data={members}
        loading={isLoading}
        title="All Members"
        subtitle={`${members.length} total members`}
        searchable={true}
        searchPlaceholder="Search by name or email..."
        pagination={true}
        defaultRowsPerPage={10}
        getRowId={(row) => row.id}
        onRowClick={(row) => navigate(`/admin/members/${row.id}`)}
      />
    </Box>
  );
};

export default MembersManagement;
