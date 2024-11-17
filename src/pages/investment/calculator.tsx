import { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import HomeWrapper from "@/components/Wrapper";

Chart.register(...registerables);

type ResultData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    }[];
};

type FormData = {
    initialDeposit: number;
    contribution: number;
    frequency: "Monthly" | "Annually";
    years: number;
    rate: number;
    compoundFrequency: "Annually" | "Monthly";
};

const InvestmentCalculator = () => {
    const [formData, setFormData] = useState<FormData>({
        initialDeposit: 4000,
        contribution: 100,
        frequency: "Monthly",
        years: 30,
        rate: 6,
        compoundFrequency: "Annually",
    });

    const [result, setResult] = useState<ResultData | null>(null);

    useEffect(() => {
        const defaultResult = calculateDefaultInvestment();
        setResult(defaultResult);
    }, []);

    const calculateDefaultInvestment = (): ResultData => {
        const initialDeposit = 4000;
        const contribution = 100;
        const frequency = "Monthly";
        const years = 30;
        const rate = 6;
        const compoundFrequency = "Annually";

        let n = compoundFrequency === "Annually" ? 1 : 12;
        let totalValue = initialDeposit;
        let totalPrincipal = initialDeposit;
        let totalInterest = 0;

        const balancePoints: number[] = [];
        const principalPoints: number[] = [];
        const interestPoints: number[] = [];

        for (let i = 1; i <= years; i++) {
            totalValue = totalValue * Math.pow(1 + rate / (100 * n), n);
            if (frequency === "Monthly") {
                totalValue += contribution * 12;
                totalPrincipal += contribution * 12;
            } else {
                totalValue += contribution;
                totalPrincipal += contribution;
            }
            totalInterest = totalValue - totalPrincipal;

            balancePoints.push(totalValue);
            principalPoints.push(totalPrincipal);
            interestPoints.push(totalInterest);
        }

        return {
            labels: Array.from({ length: years }, (_, i) =>
                (new Date().getFullYear() + i).toString()
            ),
            datasets: [
                {
                    label: "Total Balance",
                    data: balancePoints,
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
                    fill: true,
                },
                {
                    label: "Total Principal",
                    data: principalPoints,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    fill: true,
                },
                {
                    label: "Total Interest",
                    data: interestPoints,
                    borderColor: "#ffc107",
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    fill: true,
                },
            ],
        };
    };

    const calculateInvestment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { initialDeposit, contribution, frequency, years, rate, compoundFrequency } = formData;
        let n = compoundFrequency === "Annually" ? 1 : 12;
        let totalValue = initialDeposit;
        let totalPrincipal = initialDeposit;
        let totalInterest = 0;

        const balancePoints: number[] = [];
        const principalPoints: number[] = [];
        const interestPoints: number[] = [];

        for (let i = 1; i <= years; i++) {
            totalValue = totalValue * Math.pow(1 + rate / (100 * n), n);
            if (frequency === "Monthly") {
                totalValue += contribution * 12;
                totalPrincipal += contribution * 12;
            } else {
                totalValue += contribution;
                totalPrincipal += contribution;
            }
            totalInterest = totalValue - totalPrincipal;

            balancePoints.push(totalValue);
            principalPoints.push(totalPrincipal);
            interestPoints.push(totalInterest);
        }

        setResult({
            labels: Array.from({ length: years }, (_, i) =>
                (new Date().getFullYear() + i).toString()
            ),
            datasets: [
                {
                    label: "Total Balance",
                    data: balancePoints,
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
                    fill: true,
                },
                {
                    label: "Total Principal",
                    data: principalPoints,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    fill: true,
                },
                {
                    label: "Total Interest",
                    data: interestPoints,
                    borderColor: "#ffc107",
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    fill: true,
                },
            ],
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: type === "number" ? Number(value) : value,
        }));
    };

    return (
        <HomeWrapper>


            <div className="container mx-auto mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-center mb-4">AI Investment Calculator</h2>
                        <form onSubmit={calculateInvestment}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700">
                                        Initial Deposit
                                    </label>
                                    <input
                                        type="number"
                                        id="initialDeposit"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.initialDeposit}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">
                                        Contribution Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="contribution"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.contribution}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contribution Frequency
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Monthly"
                                            checked={formData.frequency === "Monthly"}
                                            onChange={() => setFormData((prev) => ({ ...prev, frequency: "Monthly" }))}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Monthly</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Annually"
                                            checked={formData.frequency === "Annually"}
                                            onChange={() => setFormData((prev) => ({ ...prev, frequency: "Annually" }))}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Annually</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </HomeWrapper>
    );
};



export default InvestmentCalculator