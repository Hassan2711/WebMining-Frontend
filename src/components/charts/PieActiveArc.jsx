import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, mobileAndDesktopOS, mobileOS, valueFormatter } from './WebUsageStats';

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: '#2e3940' },
          valueFormatter,
        },
      ]}
      height={300}
    />
  );
}