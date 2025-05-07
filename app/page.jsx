import WelcomeModal from './components/WelcomeModal';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Travel Booking Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-sky-700/40 to-sky-200/40" />
      </div>

      {/* Welcome Text */}
      <div className="z-10 text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-md mb-4">
          Welcome to MakeMyTrip
        </h1>
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-sm">
          Crafted with ❤️ by Ankit
        </p>
      </div>

      {/* Onboarding Modal */}
      <WelcomeModal />
    </main>
  );
}
