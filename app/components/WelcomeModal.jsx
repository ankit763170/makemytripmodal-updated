'use client';
    
import { useState, useEffect } from 'react';

// Slides for Personal Account
const slidesSetPersonal = [
  {
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Weekend Getaway Deals',
    description: 'Escape the city with up to 30% OFF on stays & activities.',
    tnc: '*T&C Apply. Limited period offer.',
  },
  {
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Adventure Awaits!',
    description: 'Explore thrilling destinations. Book your adventure today.',
    tnc: '',
  },
  {
    image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Family Vacation Packages',
    description: 'Create memories with our all-inclusive family deals.',
    tnc: '*Kids stay free at select hotels.',
  },
  {
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'International Flights Sale',
    description: 'Fly to your dream destination with fares starting $299.',
    tnc: '*Prices are per person, round trip.',
  },
  {
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Luxury Hotel Collection',
    description: 'Indulge in 5-star stays with exclusive benefits.',
    tnc: '',
  },
];

// Slides for MyBiz Account
const slidesSetMyBiz = [
  {
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Business Travel Simplified',
    description: 'Manage corporate bookings with ease and save big.',
    tnc: '*Corporate rates available.',
  },
  {
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Exclusive Corporate Rates',
    description: 'Unlock special fares on flights and hotels for your team.',
    tnc: '',
  },
  {
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Team Offsite Packages',
    description: 'Boost morale with our curated corporate offsite deals.',
    tnc: '*Customizable packages.',
  },
  {
    image: 'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Priority Support for MyBiz',
    description: 'Dedicated 24/7 support for all your business travel needs.',
    tnc: '',
  },
  {
    image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Expense Management Tools',
    description: 'Streamline your travel expenses with our integrated solutions.',
    tnc: '*Free trial available.',
  },
];

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [currentSlidePersonal, setCurrentSlidePersonal] = useState(0);
  const [currentSlideMyBiz, setCurrentSlideMyBiz] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [progress, setProgress] = useState(0);

  const activeSlides = activeTab === 'personal' ? slidesSetPersonal : slidesSetMyBiz;
  const currentSlide = activeTab === 'personal' ? currentSlidePersonal : currentSlideMyBiz;
  const setCurrentSlideForActiveTab =
    activeTab === 'personal' ? setCurrentSlidePersonal : setCurrentSlideMyBiz;

  // Auto-slide effect with progress bar
  useEffect(() => {
    if (!isOpen) return;
    
    const slideInterval = 5000; // 5 seconds
    const progressInterval = 50; // Update progress every 50ms
    const progressStep = (progressInterval / slideInterval) * 100;
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlideForActiveTab((prev) => (prev + 1) % activeSlides.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, progressInterval);

    return () => {
      clearInterval(progressTimer);
    };
  }, [isOpen, activeTab, activeSlides.length, setCurrentSlideForActiveTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col sm:flex-row w-full max-w-4xl relative overflow-hidden" style={{maxHeight: '90vh'}}>
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full p-2 text-2xl leading-none transition-all duration-300"
          aria-label="Close"
        >
          ×
        </button>

        {/* Left: Slider */}
        <div className="w-full sm:w-1/2 bg-gray-100 flex flex-col justify-between relative">
          <div className="relative w-full h-64 sm:h-full" style={{minHeight: '400px'}}>
            {activeSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-600 transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="relative bg-white/95 p-6 text-center">
            <div className="text-2xl font-bold mb-2 text-gray-800">{activeSlides[currentSlide].title}</div>
            <div className="text-base font-medium mb-2 text-gray-700">{activeSlides[currentSlide].description}</div>
            {activeSlides[currentSlide].tnc && (
              <div className="text-sm text-gray-500">{activeSlides[currentSlide].tnc}</div>
            )}
          </div>

          {/* Dots */}
          <div className="relative bg-white/95 pb-6 pt-3 flex justify-center gap-3">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlideForActiveTab(idx);
                  setProgress(0);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full sm:w-1/2 bg-white p-8 flex flex-col justify-center">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-full overflow-hidden">
            <button
              className={`flex-1 py-4 px-4 text-center text-base font-semibold transition-all duration-300 focus:outline-none ${
                activeTab === 'personal' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              PERSONAL ACCOUNT
            </button>
            <button
              className={`flex-1 py-4 px-4 text-center text-base font-semibold transition-all duration-300 focus:outline-none ${
                activeTab === 'business' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('business')}
            >
              MYBIZ ACCOUNT
            </button>
          </div>

          {/* Input */}
          <label className="block text-gray-700 text-base font-medium mb-3" htmlFor="mobile">
            Mobile Number
          </label>
          <div className="flex items-center border-2 rounded-xl px-4 py-3 mb-6 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <span className="flex items-center mr-3 pointer-events-none">
              <span className="text-2xl">🇮🇳</span>
              <span className="ml-2 text-gray-700 font-semibold">+91</span>
            </span>
            <input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              placeholder="Enter Mobile Number"
              className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
              maxLength={10}
            />
          </div>

          {/* Continue Button */}
          <button
            className={`w-full py-4 rounded-xl text-lg font-semibold mb-6 transition-all duration-300 ${
              mobileNumber.length === 10 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={mobileNumber.length !== 10}
          >
            CONTINUE
          </button>

          {/* Or Login/Signup With */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or Login/Signup With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <button className="p-3 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300" aria-label="Login with Google">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button className="p-3 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300" aria-label="Login with Email">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center mt-auto">
            By proceeding, you agree to MakeMyTrip's{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">Privacy Policy</a>,{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">User Agreement</a> and{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">T&Cs</a>
          </div>
        </div>
      </div>
    </div>
  );
}