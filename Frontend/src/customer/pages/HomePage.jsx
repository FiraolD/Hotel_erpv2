import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage({ onBookNow }) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d22156-67da-4136-a9a7-aa09a2a3ae72/hotel-hero-3ad7cfca-1773037283056.webp" 
            className="w-full h-full object-cover scale-105"
            alt="Luxury Resort"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest mb-6">
              Voted Best Resort of 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Escape to Your <br />
              <span className="text-blue-400 italic">Personal Paradise</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience unparalleled luxury and personalized service at our world-class resort. From ocean views to Michelin-star dining.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-4 text-slate-900"
          >
            <div className="flex-1 w-full text-left border-r border-slate-100 pr-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Check In - Out</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-sm">May 20 - May 25</span>
              </div>
            </div>
            <div className="flex-1 w-full text-left border-r border-slate-100 pr-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Guests</label>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-sm">2 Adults, 1 Child</span>
              </div>
            </div>
            <button 
              onClick={onBookNow}
              className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
            >
              Search Availability
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Why Stay with Us?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">Every detail of your stay is curated to perfection, ensuring a memorable experience from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Sparkles, title: "Luxury Amenities", desc: "Premium bath products, high-speed WiFi, and 24/7 concierge service." },
              { icon: ShieldCheck, title: "Safe & Secure", desc: "Top-tier security and health protocols for your peace of mind." },
              { icon: Clock, title: "Flexible Check-in", desc: "Arrive on your schedule with our digital check-in system." },
            ].map((feature, i) => (
              <div key={i} className="text-center group p-8 rounded-3xl hover:bg-slate-50 transition-colors">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Room */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d22156-67da-4136-a9a7-aa09a2a3ae72/luxury-suite-9d8351b4-1773037283478.webp" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Presidential Suite"
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg">
              Featured Room
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              <span className="text-slate-400 ml-2 font-medium">(250+ Reviews)</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">The Presidential Ocean Suite</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our crown jewel offers 180-degree panoramic ocean views, a private infinity pool, and dedicated butler service. Experience the height of coastal elegance.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                2,500 sq ft of indoor-outdoor living space
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Private chef upon request
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Smart home automation system
              </li>
            </ul>
            <button 
              onClick={onBookNow}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Book for $850/night
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}