import AboutSection from './sections/AboutSection';
import Footer from './components/Footer';

export default function About() {
  return (
    <div className="min-h-screen font-sans">
      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16 py-12">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
