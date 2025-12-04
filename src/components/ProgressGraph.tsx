import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface GraphDataPoint {
    date: string;
    value: number;
}

interface ProgressGraphProps {
    data: GraphDataPoint[];
    label: string;
    title: string;
    color?: string;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({
    data,
    label,
    title,
    color = 'rgb(75, 192, 192)'
}) => {
    const chartData = {
        labels: data.map((d) => d.date),
        datasets: [
            {
                label: label,
                data: data.map((d) => d.value),
                borderColor: color,
                backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
                tension: 0.3, // Smooth curve
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#e0e0e0', // Light text for dark mode
                }
            },
            title: {
                display: true,
                text: title,
                color: '#e0e0e0',
            },
        },
        scales: {
            x: {
                ticks: { color: '#aaaaaa' },
                grid: { color: '#333333' }
            },
            y: {
                ticks: { color: '#aaaaaa' },
                grid: { color: '#333333' }
            }
        }
    };

    return <div className="graph-container"><Line options={options} data={chartData} /></div>;
};

export default ProgressGraph;
