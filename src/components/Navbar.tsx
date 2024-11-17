import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-primary text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link href={'/'}>
                        <h1 className="text-2xl font-bold">InvestoTools</h1>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link href="/" className="text-lg hover:text-blue-400 transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link href="#features" className="text-lg hover:text-blue-400 transition duration-300">Features</Link>
                        </li>
                        <li>
                            <Link href="#about" className="text-lg hover:text-blue-400 transition duration-300">About</Link>
                        </li>
                        <li>
                            <Link href="#contact" className="text-lg hover:text-blue-400 transition duration-300">Contact</Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden bg-secondary text-dark px-4 py-2 rounded-lg"
                        onClick={toggleMenu}
                    >
                        Menu
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
                    <Link href="/" className="block text-lg hover:text-blue-400 transition duration-300">Home</Link>
                    <Link href="#features" className="block text-lg hover:text-blue-400 transition duration-300">Features</Link>
                    <Link href="#about" className="block text-lg hover:text-blue-400 transition duration-300">About</Link>
                    <Link href="#contact" className="block text-lg hover:text-blue-400 transition duration-300">Contact</Link>
                </div>
            )}

            {/* Tabs for Tools */}
            <ToolTabs />
        </>
    );
};

export default Navbar;









const ToolTabs: React.FC = () => {
    const router = useRouter();

    const getLinkClasses = (path: string) => {
        // Determine whether the current route matches the tab's path
        const isActive = router.pathname === path;
        return `text-white py-2 px-6 rounded-md ${isActive
            ? 'bg-blue-600 font-bold' // Active tab styles
            : 'hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300`;
    };

    return (
        <div className="bg-gray-800 shadow-md">
            <div className="flex justify-evenly">
                <Link href="/investment/planner" className={getLinkClasses('/investment/planner')}>
                    Investment Planner
                </Link>
                <Link href="/investment/retirment" className={getLinkClasses('/investment/retirment')}>
                    Retirement
                </Link>
                <Link href="/investment/risk" className={getLinkClasses('/investment/risk')}>
                    Risk
                </Link>
                <Link href="/investment/spinterest" className={getLinkClasses('/investment/spinterest')}>
                    SP Interest
                </Link>
                <Link href="/investment/stock" className={getLinkClasses('/investment/stock')}>
                    Stock
                </Link>
                <Link href="/investment/calculator" className={getLinkClasses('/investment/calculator')}>
                    Calculator
                </Link>
                <Link href="/investment/diversification" className={getLinkClasses('/investment/diversification')}>
                    Diversification
                </Link>
                <Link href="/investment/housing" className={getLinkClasses('/investment/housing')}>
                    Housing
                </Link>
                <Link href="/investment/inflasion" className={getLinkClasses('/investment/inflasion')}>
                    Inflation
                </Link>
            </div>
        </div>
    );
};