import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const ResultsStep = ({ data }) => {
  const { results } = data;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Your Financial Future
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wealth Projection
            </Typography>
            <LineChart
              width={600}
              height={300}
              data={results.chartData.current}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currentPath" stroke="#8884d8" name="Current Path" />
              <Line type="monotone" dataKey="newPath" stroke="#82ca9d" name="New Path" />
            </LineChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Key Insights
            </Typography>
            <Typography variant="body1" paragraph>
              In 1 year: ₹{results.year1.toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph>
              In 5 years: ₹{results.year5.toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph>
              In 10 years: ₹{results.year10.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            {results.recommendations.map((rec, index) => (
              <Typography key={index} variant="body2" paragraph>
                • {rec}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResultsStep;
