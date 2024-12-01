import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const rawData = [120, 120, 118, 118, 118, 118, 118, 117, 117, 116, 115, 115,
        115, 112, 111, 110, 107, 103, 102, 97, 96, 63, 36, 22];
    
    const total = rawData.reduce((acc, curr) => acc + curr, 0);
    
    const data = {
        labels: [
            'IT', 'Business Dev', 'Advocate', 'Chef', 'Engineering', 
            'Accountant', 'Finance', 'Fitness', 'Aviation', 'Sales', 
            'Banking', 'Healthcare', 'Consultant', 'Construction',
            'PR', 'HR', 'Designer', 'Arts', 'Teacher', 'Apparel',
            'Digital Media', 'Agriculture', 'Automobile', 'BPO'
        ],
        datasets: [{
            data: rawData,
            backgroundColor: [
                '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
                '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
                '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
                '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
                '#000000', '#ffffff', '#800080', '#e6beff',
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                }
            },
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <>
        <div className='flex items-center justify-center mt-10'>
            <div className='relative animate-fadeIn'>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                )}
                <iframe 
                    title="Wandb Report"
                    src="https://wandb.ai/vvinayakkk-sardar-patel-institute-of-technology/huggingface/reports/Untitled-Report--VmlldzoxMDQwOTQ5MA?accessToken=jlnvsord7v1pnxz5efh4492zmhahs7u8rfofyvdpstiu7xjdfr5jayy7lsozefej"
                    onLoad={() => setIsLoading(false)}
                    className="transition-all duration-300"
                    style={{
                        border: '5px solid #121212',
                        borderRadius: '15px',
                        height: '900px',
                        width: '1200px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    }}
                />
            </div>
        </div>

        <div className='flex items-center justify-center mt-10'>
            <div className='w-[90vw] h-[80vh] max-w-[1200px] p-4 bg-white rounded-lg shadow-lg'>
                <Pie data={data} options={options} />
            </div>
        </div>
        </>
    );
};

export default Analytics;