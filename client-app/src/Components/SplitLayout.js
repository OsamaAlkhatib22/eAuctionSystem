import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Grid, Paper, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Header from '../Components/Header';
import FreelancerIcon from '../Assets/Images/icons8-freelancer-68.png';
import ClientIcon from '../Assets/Images/icons8-rich-48.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8b0000', // Red color
    },
  },
});

const SplitLayout = () => {
  const [selectedOption, setSelectedOption] = useState('freelancer');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Container style={{ paddingTop: '20px' }}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', minHeight: '300px' }}>
                <RadioGroup
                  row
                  value={selectedOption}
                  onChange={handleOptionChange}
                  style={{ justifyContent: 'center', marginBottom: '20px' }}
                >
                  <FormControlLabel
                    value="client"
                    control={<Radio color="primary" />}
                    label="Hire Freelancers"
                  />
                  <FormControlLabel
                    value="freelancer"
                    control={<Radio color="primary" />}
                    label="Work on Projects"
                  />
                </RadioGroup>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <img
                    src={selectedOption === 'freelancer' ? FreelancerIcon : ClientIcon}
                    alt="Account Type Icon"
                    style={{ marginRight: '8px' }}
                  />
                </div>
                <Typography variant="h4" color="primary">
                  Create an Account
                </Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                  {selectedOption === 'freelancer'
                    ? 'Find jobs in our database and apply with your skills. Showcase your portfolio and gain valuable experience.'
                    : 'Post a project, select a freelancer, and manage your project in our secure platform.'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/${selectedOption}-registration`}
                  style={{ marginTop: '20px' }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SplitLayout;
