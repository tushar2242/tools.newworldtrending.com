
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function HomeWrapper({ children }: any) {
    return (
        <>
            <Navbar />
            <div className='wrapper-outer'>


                {children}
            </div>
            <Footer />
        </>
    );
}
