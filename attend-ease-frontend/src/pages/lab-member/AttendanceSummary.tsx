import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  FormControl,
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
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  alpha,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
} from "@mui/material";

import {
  Download as DownloadIcon,
  CalendarMonth as CalendarIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  RemoveCircle as HalfIcon,
  Event as EventIcon,
  Lock as LockIcon,
  TrendingUp,
  AccessTime,
  DateRange,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import {
  AttendanceRecord,
  AttendanceStatus,
  getMonthOptions,
} from "@/types";
import { generateMockAttendanceRecords } from "@/services/mockData";

/* =========================
   REUSABLE STYLES (BETTER UX)
========================= */

const GlassCard = ({ children, sx, ...props }: any) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        background: "rgba(224, 242, 254, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${alpha('#0284c7', 0.2)}`, // Using bright blue for border
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

const ModernStatCard = ({ title, value, icon, color }: any) => {
  const theme = useTheme();
  const main = (theme.palette as any)[color]?.main || theme.palette.primary.main;

  return (
    <GlassCard
      sx={{
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[12],
          "&::after": {
            animation: "shimmer 1.5s ease-in-out",
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `linear-gradient(45deg, transparent 30%, ${alpha(main, 0.2)} 50%, transparent 70%)`,
          transform: "translateX(-100%)",
        },
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            p: 1.5,
            width: 48,
            borderRadius: 2.5,
            bgcolor: alpha('#0284c7', 0.1), // Bright blue bg
            color: '#0284c7', // Bright blue icon
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: '#075985' }}>
          {value}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ color: '#334155' }}>
          {title}
        </Typography>
      </CardContent>
    </GlassCard>
  );
};

const ProgressStatCard = ({ title, value, icon, color, percentage }: any) => {
  const theme = useTheme();
  const main = (theme.palette as any)[color]?.main || theme.palette.primary.main;
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <GlassCard
      sx={{
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[12],
          "&::after": {
            animation: "shimmer 1.5s ease-in-out",
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `linear-gradient(45deg, transparent 30%, ${alpha(main, 0.2)} 50%, transparent 70%)`,
          transform: "translateX(-100%)",
        },
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Box
              sx={{
                p: 1.5,
                width: 48,
                borderRadius: 2.5,
                bgcolor: alpha('#0284c7', 0.1),
                color: '#0284c7',
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: '#075985' }}>
              {value}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: '#334155' }}>
              {title}
            </Typography>
          </Box>

          <Box position="relative" display="inline-flex">
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={alpha(main, 0.1)}
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={main}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" fontWeight={700} color={main}>
                {percentage}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

/* =========================
   MAIN COMPONENT (ADVANCED)
========================= */

const AttendanceSummary: React.FC = () => {
  const theme = useTheme();

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [transition, setTransition] = useState(false);

  const monthOptions = getMonthOptions();

  // Memoized data
  const attendance = useMemo(
    () => generateMockAttendanceRecords(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  // Calculate attendance streak
  const attendanceStreak = useMemo(() => {
    const sorted = [...attendance.records]
      .filter(r => r.status === "FULL")
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));

    let streak = 0;
    for (const record of sorted) {
      const date = new Date(record.date);
      const expected = new Date(today);
      expected.setDate(today.getDate() - streak);
      if (date.toDateString() === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [attendance, today]);

  const handleMonthChange = useCallback((value: string) => {
    setTransition(true);
    setTimeout(() => {
      const [y, m] = value.split("-").map(Number);
      setSelectedYear(y);
      setSelectedMonth(m);
      setTransition(false);
    }, 150);
  }, []);

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setTransition(true);
    setTimeout(() => {
      if (direction === "prev") {
        if (selectedMonth === 1) {
          setSelectedMonth(12);
          setSelectedYear(selectedYear - 1);
        } else {
          setSelectedMonth(selectedMonth - 1);
        }
      } else {
        if (selectedMonth === 12) {
          setSelectedMonth(1);
          setSelectedYear(selectedYear + 1);
        } else {
          setSelectedMonth(selectedMonth + 1);
        }
      }
      setTransition(false);
    }, 150);
  }, [selectedMonth, selectedYear]);

  const getStatusConfig = (status: AttendanceStatus) => {
    const map: any = {
      FULL: { icon: <CheckIcon fontSize="small" />, label: "Full Day", color: "success", bgColor: alpha(theme.palette.success.main, 0.12) },
      HALF: { icon: <HalfIcon fontSize="small" />, label: "Half Day", color: "warning", bgColor: alpha(theme.palette.warning.main, 0.12) },
      LOP: { icon: <CancelIcon fontSize="small" />, label: "Loss of Pay", color: "error", bgColor: alpha(theme.palette.error.main, 0.12) },
      HOLIDAY: { icon: <EventIcon fontSize="small" />, label: "Holiday", color: "info", bgColor: alpha(theme.palette.info.main, 0.12) },
      WEEKEND: { icon: <EventIcon fontSize="small" />, label: "Weekend", color: "grey", bgColor: "transparent" },
    };
    return map[status] || map.HOLIDAY;
  };

  // Calendar generator
  const calendarDays = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDay = new Date(selectedYear, selectedMonth, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const grid: (AttendanceRecord | null)[] = Array(startDay).fill(null);

    for (let d = 1; d <= totalDays; d++) {
      const date = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      const record =
        attendance.records.find((r) => r.date === date) ||
        ({
          id: 0,
          labMemberId: 0,
          date,
          status:
            new Date(date).getDay() === 0 || new Date(date).getDay() === 6
              ? "WEEKEND"
              : "LOP",
          createdAt: "",
          updatedAt: "",
        } as AttendanceRecord);

      grid.push(record);
    }
    return grid;
  }, [attendance, selectedMonth, selectedYear]);

  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDayClick = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setDetailsOpen(true);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Box sx={{ position: "relative", maxWidth: 1600, mx: "auto", p: { xs: 2, md: 4 } }}>
      {/* ADVANCED ANIMATED BACKGROUND */}

      {/* HEADER TOOLBAR */}
      <GlassCard sx={{ mb: 4, p: 2 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#0284c7",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DateRange />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#075985' }}>
                My Attendance
              </Typography>
              <Typography variant="body2" sx={{ color: '#334155' }}>
                Monthly performance & availability
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            {attendanceStreak > 0 && (
              <Chip
                icon={<TrendingUp />}
                label={`${attendanceStreak} day streak! 🔥`}
                color="success"
                variant="filled"
                sx={{ fontWeight: 700 }}
              />
            )}

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton size="small" onClick={() => navigateMonth("prev")} sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
                <ChevronLeft />
              </IconButton>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={`${selectedYear}-${selectedMonth}`}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  sx={{ borderRadius: 2.5, boxShadow: 1 }}
                >
                  {monthOptions.map((o) => (
                    <MenuItem key={`${o.year}-${o.month}`} value={`${o.year}-${o.month}`}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <IconButton size="small" onClick={() => navigateMonth("next")} sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
                <ChevronRight />
              </IconButton>
            </Box>

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, v) => v && setViewMode(v)}
              size="small"
            >
              <ToggleButton value="calendar">
                <GridIcon sx={{ mr: 1 }} /> Grid
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon sx={{ mr: 1 }} /> List
              </ToggleButton>
            </ToggleButtonGroup>

            <IconButton onClick={() => alert("Exporting...")} sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
              <DownloadIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </GlassCard>

      {/* HERO STATS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <ModernStatCard
            title="Working Days"
            value={attendance.summary.workingDays}
            icon={<CalendarIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <ModernStatCard
            title="Present"
            value={attendance.summary.fullDays}
            icon={<CheckIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <ModernStatCard
            title="Half Days"
            value={attendance.summary.halfDays}
            icon={<HalfIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <ModernStatCard
            title="Leaves / LOP"
            value={attendance.summary.lopDays}
            icon={<CancelIcon />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <ProgressStatCard
            title="Attendance"
            value={`${attendance.summary.attendancePercentage.toFixed(0)}%`}
            percentage={attendance.summary.attendancePercentage}
            icon={<TrendingUp />}
            color="secondary"
          />
        </Grid>
      </Grid>

      <Fade in>
        <Box>
          {viewMode === "calendar" ? (
            <GlassCard sx={{ p: 4 }}>
              {attendance.summary.isFrozen && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.08),
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <LockIcon color="info" />
                  <Typography variant="subtitle2" color="info.main">
                    Attendance Frozen on{" "}
                    {new Date(attendance.summary.frozenAt!).toLocaleDateString()}
                  </Typography>
                </Box>
              )}

              <Grid container sx={{ mb: 2 }}>
                {weekDays.map((day) => (
                  <Grid item xs={12 / 7} key={day} textAlign="center">
                    <Typography variant="caption" fontWeight={700}>
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              <Fade in={!transition} timeout={300}>
                <Grid container spacing={2}>
                  {calendarDays.map((record, i) => {
                    if (!record) return <Grid item xs={12 / 7} key={i} />;

                    const cfg = getStatusConfig(record.status);
                    const isToday = record.date === today.toISOString().split("T")[0];

                    return (
                      <Grid item xs={12 / 7} key={i}>
                        <Tooltip title={`${cfg.label} - ${new Date(record.date).toDateString()}`} arrow placement="top">
                          <Paper
                            onClick={() => handleDayClick(record)}
                            elevation={isToday ? 4 : 0}
                            sx={{
                              height: { xs: 90, sm: 130 },
                              p: 2,
                              borderRadius: 3,
                              border: "2px solid",
                              borderColor: isToday ? "primary.main" : alpha(cfg.color === 'grey' ? theme.palette.grey[400] : theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.main || theme.palette.primary.main, 0.2),
                              background: record.status === "WEEKEND"
                                ? `linear-gradient(135deg, ${alpha(theme.palette.grey[400], 0.03)} 0%, ${alpha(theme.palette.grey[300], 0.05)} 100%)`
                                : `linear-gradient(135deg, 
                                    ${alpha(theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.light || theme.palette.primary.light, 0.1)} 0%, 
                                    ${alpha(theme.palette.background.paper, 0.95)} 50%,
                                    ${alpha(theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.main || theme.palette.primary.main, 0.05)} 100%)`,
                              backdropFilter: "blur(10px)",
                              cursor: "pointer",
                              position: "relative",
                              overflow: "hidden",
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                transform: record.status !== "WEEKEND" ? "translateY(-6px) scale(1.02)" : "none",
                                boxShadow: record.status !== "WEEKEND" ? 10 : 0,
                                borderColor: record.status !== "WEEKEND" ? `${cfg.color}.main` : "divider",
                                background: record.status !== "WEEKEND"
                                  ? `linear-gradient(135deg, 
                                      ${alpha(theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.main || theme.palette.primary.main, 0.2)} 0%, 
                                      ${alpha(theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.light || theme.palette.primary.light, 0.15)} 100%)`
                                  : undefined,
                                "& .day-number": { color: `${cfg.color}.main` },
                                "&::before": record.status !== "WEEKEND" ? {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: `radial-gradient(circle, ${alpha(theme.palette[cfg.color as 'success' | 'warning' | 'error' | 'info']?.main || theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                                  opacity: 0,
                                  animation: "ripple 0.6s ease-out",
                                } : {},
                              },
                              "@keyframes ripple": {
                                "0%": { opacity: 1, transform: "scale(0)" },
                                "100%": { opacity: 0, transform: "scale(2.5)" },
                              },
                            }}
                          >
                            {isToday && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  bgcolor: "primary.main",
                                  color: "white",
                                  fontSize: "0.6rem",
                                  px: 1,
                                  py: 0.3,
                                  borderRadius: "0 0 0 8px",
                                  fontWeight: 700,
                                }}
                              >
                                TODAY
                              </Box>
                            )}

                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                              <Typography
                                className="day-number"
                                variant="h6"
                                fontWeight={700}
                                sx={{
                                  color: record.status === "WEEKEND" ? "text.disabled" : "text.primary",
                                  transition: "color 0.2s",
                                }}
                              >
                                {new Date(record.date).getDate()}
                              </Typography>
                              <Box sx={{ color: `${cfg.color}.main` }}>
                                {cfg.icon}
                              </Box>
                            </Box>

                            {record.status !== "WEEKEND" && (
                              <Box mt="auto">
                                <Chip
                                  label={cfg.label}
                                  size="small"
                                  color={cfg.color as any}
                                  sx={{
                                    width: "100%",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    height: 22,
                                  }}
                                />
                              </Box>
                            )}
                          </Paper>
                        </Tooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Fade>
            </GlassCard>
          ) : (
            <GlassCard>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Logged By</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {attendance.records
                      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
                      .map((r) => {
                        const cfg = getStatusConfig(r.status);
                        return (
                          <TableRow key={r.id}>
                            <TableCell>
                              {new Date(r.date).toDateString()}
                            </TableCell>
                            <TableCell>
                              <Chip label={cfg.label} color={cfg.color as any} />
                            </TableCell>
                            <TableCell>{r.remarks || "—"}</TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={1}>
                                <AccessTime fontSize="small" />
                                {r.markedByName || "System"}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </GlassCard>
          )}
        </Box>
      </Fade>

      {/* ATTENDANCE DETAILS DIALOG */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            backdropFilter: "blur(20px)",
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.default, 0.95)})`,
          }
        }}
        TransitionComponent={Fade}
        transitionDuration={400}
      >
        {selectedRecord && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  {new Date(selectedRecord.date).toLocaleDateString(undefined, { weekday: 'long' })}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {new Date(selectedRecord.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
              <Chip
                label={getStatusConfig(selectedRecord.status).label}
                color={getStatusConfig(selectedRecord.status).color as any}
                variant="filled"
                sx={{ fontWeight: 700, borderRadius: 2 }}
              />
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {selectedRecord.status === 'FULL' || selectedRecord.status === 'HALF' ? (
                  <>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3, bgcolor: alpha(theme.palette.success.main, 0.08), border: `1px solid ${alpha(theme.palette.success.main, 0.1)}` }}>
                        <Box sx={{ color: 'success.main', mb: 1 }}>
                          <AccessTime fontSize="large" color="inherit" />
                        </Box>
                        <Typography variant="body2" color="text.secondary">Check In</Typography>
                        <Typography variant="h6" fontWeight={700}>{selectedRecord.entryTime || '--:--'}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3, bgcolor: alpha(theme.palette.error.main, 0.08), border: `1px solid ${alpha(theme.palette.error.main, 0.1)}` }}>
                        <Box sx={{ color: 'error.main', mb: 1 }}>
                          <AccessTime fontSize="large" color="inherit" sx={{ transform: 'scaleX(-1)' }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">Check Out</Typography>
                        <Typography variant="h6" fontWeight={700}>{selectedRecord.exitTime || '--:--'}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.04), border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}` }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          WORK LOG
                        </Typography>
                        <Typography variant="body1" fontWeight={500} color="text.primary">
                          {selectedRecord.workDescription || "No specific work log recorded for this day."}
                        </Typography>
                      </Paper>
                    </Grid>
                    {selectedRecord.totalHours && (
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor={alpha(theme.palette.primary.main, 0.05)} p={2} borderRadius={2}>
                          <Typography variant="subtitle2" fontWeight={600}>Total Hours</Typography>
                          <Typography variant="h6" fontWeight={800} color="primary.main">{selectedRecord.totalHours.toFixed(1)} Hrs</Typography>
                        </Box>
                      </Grid>
                    )}
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 4, opacity: 0.7 }}>
                      <EventIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        {selectedRecord.status === 'WEEKEND' ? 'It\'s the Weekend!' : selectedRecord.status === 'HOLIDAY' ? 'Public Holiday' : 'No records found for this day.'}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setDetailsOpen(false)} fullWidth variant="contained" size="large" sx={{ borderRadius: 3 }}>
                Close Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AttendanceSummary;
