import React from 'react';

const Features: React.FC = () => {
    return (
        <section id="features" className="bg-gray-100 py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Why Choose InvestoTools?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Free Investment Tools</h3>
                        <p className="text-gray-700">
                            Access our powerful tools to analyze stocks, mutual funds, and cryptocurrencies without any cost.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Real-Time Data</h3>
                        <p className="text-gray-700">
                            Stay updated with live market data, charts, and insights to make informed decisions.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                        <p className="text-gray-700">
                            Our intuitive design ensures seamless navigation, whether you're a beginner or an expert.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
