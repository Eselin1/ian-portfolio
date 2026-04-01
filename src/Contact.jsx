import ContactForm from './sections/ContactForm';
import Footer from './components/Footer';

export default function Contact() {
  return (
    <div className="font-sans">
      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16 py-12">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
