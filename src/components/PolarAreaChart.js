import React from 'react';
import Chart from 'chart.js/auto';


function PolarAreaChart({data: apiData}) {
  const canvasRef = React.createRef();
  const data = {
    labels: apiData.map(c => c.category),
    datasets: [{
      label: 'Products',
      data: apiData.map(c => c.numberOfProducts),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ]
    }]
  };

  React.useEffect(() => {
    let chart;
    if (canvasRef.current && data) {
      chart = new Chart(canvasRef.current, {
        type: 'polarArea',
        data: data,
        options: {}
      });
    } else if (chart && !data) {
      chart.destroy();
    }
    return () => chart && chart.destroy();
  }, [canvasRef, data]);

  return (
      <div>
        <canvas ref={canvasRef} />
      </div>
  );
}

export default PolarAreaChart;

