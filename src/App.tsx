import { useState, useEffect } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import styled from 'styled-components';

interface ClockProps {
  timezone: string;
  cityName: string;
}

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const ClockFace = styled.div`
  width: 200px;
  height: 200px;
  border: 10px solid #1976d2;
  border-radius: 50%;
  position: relative;
  margin: 20px auto;
  background: white;
`;

const ClockHand = styled.div<{ rotation: number; length: number; width: number }>`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
  background: #333;
  height: ${props => props.length}%;
  width: ${props => props.width}px;
  border-radius: 4px;
`;

const ClockCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #1976d2;
  border-radius: 50%;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
`;

const AnalogClock = ({ timezone, cityName }: ClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = () => {
    return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  };

  const localTime = getTimeInTimezone();
  const hours = localTime.getHours() % 12;
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  const hourRotation = (hours * 30) + (minutes / 2);
  const minuteRotation = minutes * 6;
  const secondRotation = seconds * 6;

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        {cityName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {localTime.toLocaleTimeString()}
      </Typography>
      <ClockFace>
        <ClockHand rotation={hourRotation} length={30} width={4} />
        <ClockHand rotation={minuteRotation} length={40} width={3} />
        <ClockHand rotation={secondRotation} length={45} width={2} />
        <ClockCenter />
      </ClockFace>
    </StyledPaper>
  );
};

const App = () => {
  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        World Clock
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <AnalogClock timezone="Europe/Moscow" cityName="Moscow" />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalogClock timezone="America/New_York" cityName="New York" />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalogClock timezone="Asia/Tokyo" cityName="Tokyo" />
        </Grid>
      </Grid>
    </AppContainer>
  );
};

export default App;
