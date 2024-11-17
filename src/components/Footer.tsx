import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} InvestoTools. All Rights Reserved.</p>
                <p>
                    Follow us on{' '}
                    <a href="#" className="text-accent hover:underline">LinkedIn</a>,{' '}
                    <a href="#" className="text-accent hover:underline">Twitter</a>, and{' '}
                    <a href="#" className="text-accent hover:underline">Facebook</a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
