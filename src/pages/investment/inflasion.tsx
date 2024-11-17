import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import HomeWrapper from '@/components/Wrapper';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InflationCalculator = () => {
    const [formData, setFormData] = useState({
        initialAmount: 1000,
        inflationRate: 3,
        years: 10,
    });

    const [adjustedValue, setAdjustedValue] = useState<number | null>(null);
    const [chartData, setChartData] = useState<any>(null);

    const calculateInflation = () => {
        const { initialAmount, inflationRate, years } = formData;
        const inflationFactor = Math.pow(1 + inflationRate / 100, years);
        const result = initialAmount / inflationFactor;

        const yearsArray = Array.from({ length: years + 1 }, (_, i) => i);
        const initialValuesArray = yearsArray.map(() => initialAmount);
        const valuesArray = yearsArray.map((year) => initialAmount / Math.pow(1 + inflationRate / 100, year));

        setAdjustedValue(result);

        setChartData({
            labels: yearsArray.map((year) => `${year} year${year === 1 ? '' : 's'}`),
            datasets: [
                {
                    label: 'Adjusted Value (Inflation)',
                    data: valuesArray,
                    fill: true,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    tension: 0.4,
                },
            ],
        });
    };

    useEffect(() => {
        calculateInflation();
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value)
        }));
    };

    return (
        <HomeWrapper>
            <div className="container mx-auto my-5 px-4">
                <div className="flex flex-wrap row ">
                    <div className="w-full md:w-1/3 mt-5">
                        <h2 className="text-center text-2xl font-semibold mb-6">Inflation Calculator</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="initialAmount" className="block text-sm font-medium">Initial Amount</label>
                                <input
                                    type="number"
                                    id="initialAmount"
                                    name="initialAmount"
                                    value={formData.initialAmount}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter the initial amount"
                                />
                            </div>

                            <div>
                                <label htmlFor="inflationRate" className="block text-sm font-medium">Annual Inflation Rate (%)</label>
                                <input
                                    type="number"
                                    id="inflationRate"
                                    name="inflationRate"
                                    value={formData.inflationRate}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter the annual inflation rate"
                                />
                            </div>

                            <div>
                                <label htmlFor="years" className="block text-sm font-medium">Number of Years</label>
                                <input
                                    type="number"
                                    id="years"
                                    name="years"
                                    value={formData.years}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter the number of years"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={calculateInflation}
                                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                                Calculate
                            </button>
                        </form>
                    </div>

                    <div className="w-full md:w-2/3 mt-2 p-4 md:mt-0">
                        {adjustedValue !== null && (
                            <div className="mt-4">
                                <h3 className="text-center text-lg font-semibold">
                                    Adjusted Value after {formData.years} years: ${adjustedValue.toFixed(2)}
                                </h3>
                            </div>
                        )}

                        {chartData && (
                            <div className="mt-6">
                                <h3 className="text-center text-lg font-semibold mb-4">Purchasing Power Over Time</h3>
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Inflation Impact on Purchasing Power',
                                            },
                                            tooltip: {
                                                mode: 'nearest',
                                                callbacks: {
                                                    title: (tooltipItems) => `Year: ${tooltipItems[0].label}`,
                                                    label: (tooltipItem) => {
                                                        const value = tooltipItem.raw as any;
                                                        return `Adjusted Value: $${value.toFixed(2)}`;
                                                    },
                                                },
                                            },
                                        },
                                        scales: {
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Years',
                                                },
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Amount ($)',
                                                },
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HomeWrapper>
    );
};

export default InflationCalculator;
