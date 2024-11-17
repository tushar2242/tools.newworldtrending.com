import HomeWrapper from "@/components/Wrapper";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Housing: React.FC = () => {
    const [formData, setFormData] = useState({
        homePrice: 300000,
        downPayment: 60000,
        loanTerm: 30,
        interestRate: 5,
        taxRate: 1.2,
        insuranceRate: 0.5
    });

    const { homePrice, downPayment, loanTerm, interestRate, taxRate, insuranceRate } = formData;

    const loanAmount = homePrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    const principalPayment =
        (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments)) /
        (Math.pow(1 + monthlyInterest, totalPayments) - 1);

    const monthlyTaxes = (homePrice * (taxRate / 100)) / 12;
    const monthlyInsurance = (homePrice * (insuranceRate / 100)) / 12;

    const handleInputChange = (key: string, value: number) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    return (
        <HomeWrapper>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-center text-3xl font-semibold mb-6">Housing Price Calculator</h1>
                <div className="flex flex-wrap justify-between ">
                    <div className="w-full md:w-1/4">
                        <InputField label="Home Price ($)" value={homePrice} onChange={(value) => handleInputChange('homePrice', value)} />
                        <InputField label="Down Payment ($)" value={downPayment} onChange={(value) => handleInputChange('downPayment', value)} />
                        <InputField label="Loan Term (Years)" value={loanTerm} onChange={(value) => handleInputChange('loanTerm', value)} />
                        <InputField label="Interest Rate (%)" value={interestRate} onChange={(value) => handleInputChange('interestRate', value)} />
                        <InputField label="Property Tax Rate (%)" value={taxRate} onChange={(value) => handleInputChange('taxRate', value)} />
                        <InputField label="Insurance Rate (%)" value={insuranceRate} onChange={(value) => handleInputChange('insuranceRate', value)} />
                    </div>
                    <div className="w-full md:w-3/4">
                        <ResultDisplay
                            principal={principalPayment}
                            taxes={monthlyTaxes}
                            insurance={monthlyInsurance}
                        />
                    </div>
                </div>
            </div>
        </HomeWrapper>
    );
};

export default Housing;

interface InputFieldProps {
    label: string;
    value: number | string;
    onChange: (value: number) => void;
    type?: "text" | "number";
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "number" }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type={type}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
        />
    </div>
);

interface ResultDisplayProps {
    principal: number;
    taxes: number;
    insurance: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ principal, taxes, insurance }) => {
    const data = {
        labels: ["Principal + Interest", "Taxes", "Insurance"],
        datasets: [
            {
                data: [principal, taxes, insurance],
                backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
                hoverBackgroundColor: ["#0077DD", "#00B36F", "#FFA726"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) =>
                        `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`,
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-center mb-4">Payment Breakdown</h3>
            <div className="w-full h-80 mb-4">
                <Pie data={data} options={options} />
            </div>
            <div className="text-center">
                <h5 className="text-lg text-blue-600">
                    Monthly Payment: ${((principal + taxes + insurance).toFixed(2))}
                </h5>
            </div>
        </div>
    );
};
