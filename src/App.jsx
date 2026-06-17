import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Select, MenuItem, InputLabel, FormControl, Pagination, CircularProgress } from '@mui/material';

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        let url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;
        if (type) url += `&notification_type=${type}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setNotifications(data.notifications || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [page, type]);

  return (
    <Container maxWidth="md" style={{ marginTop: '24px' }}>
      <Typography variant="h4" gutterBottom>Notifications</Typography>
      
      <FormControl fullWidth style={{ marginBottom: '24px' }}>
        <InputLabel>Filter</InputLabel>
        <Select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      {loading ? <CircularProgress /> : (
        <Grid container spacing={2}>
          {notifications.map((notif) => (
            <Grid item xs={12} key={notif.ID}>
              <Card variant="outlined" style={{ borderLeft: `6px solid ${notif.Type === 'Placement' ? '#d32f2f' : notif.Type === 'Result' ? '#1976d2' : '#2e7d32'}` }}>
                <CardContent>
                  <Typography variant="h6">{notif.Type}</Typography>
                  <Typography variant="body1">{notif.Message}</Typography>
                  <Typography variant="caption">{notif.Timestamp}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Grid container justifyContent="center" style={{ marginTop: '32px' }}>
        <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} color="primary" />
      </Grid>
    </Container>
  );
}