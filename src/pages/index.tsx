
import Features from '@/components/Features';
import HomeWrapper from '@/components/Wrapper';

export default function Home() {
  return (
    <>
      <HomeWrapper>
        <main className="bg-gray-100">
          <section className="bg-primary text-white text-center py-20">
            <div className="container mx-auto">
              <h1 className="text-5xl font-bold mb-6">Welcome to InvestoTools</h1>
              <p className="text-lg mb-6">
                Your trusted partner for free investment tools and resources.
              </p>
              <a
                href="#features"
                className="bg-secondary text-dark px-6 py-3 rounded-lg text-lg hover:bg-accent"
              >
                Explore Features
              </a>
            </div>
          </section>
          <Features />
        </main>
      </HomeWrapper>

    </>
  );
}
