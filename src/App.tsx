/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Hotel, 
  Utensils, 
  Compass, 
  Plane, 
  Star, 
  MapPin, 
  Clock, 
  Camera, 
  Gift, 
  Waves,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  CheckCircle2,
  Calendar,
  User,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ModalType = 'booking' | 'about' | 'destinations' | 'experiences' | 'success' | null;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [formData, setFormData] = useState({ name: '', email: '', card: '' });
  const [bookingDetails, setBookingDetails] = useState({ flightDate: '', flightTime: '', gate: '' });
  
  const [selectedRoute, setSelectedRoute] = useState({
    id: 'reyes',
    name: 'Ruta de los Reyes',
    price: 2999,
    description: 'La experiencia clásica en la Suite Al-Amin.'
  });
  
  const [vipTier, setVipTier] = useState({
    id: 'standard',
    name: 'Standard VIP',
    price: 0
  });

  const [extraDays, setExtraDays] = useState(0);

  const totalPrice = selectedRoute.price + vipTier.price + (extraDays * 450);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking logic
    const dates = ['12 de Mayo, 2026', '15 de Junio, 2026', '02 de Julio, 2026'];
    const times = ['08:30 AM', '14:15 PM', '22:00 PM'];
    setBookingDetails({
      flightDate: dates[Math.floor(Math.random() * dates.length)],
      flightTime: times[Math.floor(Math.random() * times.length)],
      gate: 'B' + Math.floor(Math.random() * 20 + 1)
    });
    setActiveModal('success');
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen selection:bg-desert-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 luxury-gradient rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">GE</div>
          <span className="font-serif text-xl tracking-widest uppercase font-bold">Global Experience</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold">
          <button onClick={() => setActiveModal('destinations')} className="hover:text-desert-orange transition-colors">Destinos</button>
          <button onClick={() => setActiveModal('experiences')} className="hover:text-desert-orange transition-colors">Experiencias</button>
          <button onClick={() => setActiveModal('about')} className="hover:text-desert-orange transition-colors">Sobre Nosotros</button>
          <button 
            onClick={() => setActiveModal('booking')}
            className="bg-desert-dark text-white px-6 py-2 rounded-full hover:bg-desert-deep transition-all shadow-lg hover:shadow-desert-deep/20"
          >
            Reservar VIP
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 text-2xl font-serif"
          >
            <button className="text-left" onClick={() => { setIsMenuOpen(false); setActiveModal('destinations'); }}>Destinos</button>
            <button className="text-left" onClick={() => { setIsMenuOpen(false); setActiveModal('experiences'); }}>Experiencias</button>
            <button className="text-left" onClick={() => { setIsMenuOpen(false); setActiveModal('about'); }}>Sobre Nosotros</button>
            <button 
              onClick={() => { setIsMenuOpen(false); setActiveModal('booking'); }}
              className="bg-desert-dark text-white py-4 rounded-xl"
            >
              Reservar VIP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-desert-dark/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>

              {activeModal === 'booking' && (
                <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-3xl font-serif mb-2">Reserva tu Oasis</h3>
                  <p className="text-gray-500 mb-8">Personaliza tu experiencia de lujo absoluta.</p>
                  
                  <form onSubmit={handleBooking} className="space-y-6">
                    {/* Summary Box */}
                    <div className="bg-desert-pink/20 p-4 rounded-2xl border border-desert-pink/40 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-desert-dark">{selectedRoute.name}</span>
                        <span className="text-sm font-serif">{selectedRoute.price}€</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">{vipTier.name}</span>
                        <span className="text-xs text-gray-500">+{vipTier.price}€</span>
                      </div>
                      {extraDays > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">+{extraDays} Días Extra</span>
                          <span className="text-xs text-gray-500">+{extraDays * 450}€</span>
                        </div>
                      )}
                      <div className="border-t border-desert-pink/40 mt-2 pt-2 flex justify-between items-center">
                        <span className="font-bold uppercase tracking-widest text-xs">Total</span>
                        <span className="text-xl font-serif font-bold text-desert-orange">{totalPrice}€</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                          <User className="w-3 h-3" /> Nombre Completo
                        </label>
                        <input 
                          required
                          type="text" 
                          placeholder="Ej: Mohamed Amine"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-desert-orange focus:ring-1 focus:ring-desert-orange outline-none transition-all"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Correo Electrónico
                        </label>
                        <input 
                          required
                          type="email" 
                          placeholder="vip@globalexperience.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-desert-orange focus:ring-1 focus:ring-desert-orange outline-none transition-all"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Nivel de Exclusividad (VIP Tier)</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'standard', name: 'Standard', price: 0 },
                          { id: 'royal', name: 'Royal', price: 999 },
                          { id: 'imperial', name: 'Imperial', price: 1999 }
                        ].map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setVipTier(tier)}
                            className={`p-3 rounded-xl border text-center transition-all ${vipTier.id === tier.id ? 'border-desert-orange bg-desert-orange/10 text-desert-orange' : 'border-gray-100 hover:border-gray-300'}`}
                          >
                            <p className="text-xs font-bold">{tier.name}</p>
                            <p className="text-[10px] opacity-60">+{tier.price}€</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                        <CreditCard className="w-3 h-3" /> Método de Pago (Simulado)
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-desert-orange focus:ring-1 focus:ring-desert-orange outline-none transition-all"
                        value={formData.card}
                        onChange={e => setFormData({...formData, card: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full luxury-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-transform"
                    >
                      Confirmar Pago {totalPrice}€
                    </button>
                    <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Transacción segura y encriptada
                    </p>
                  </form>
                </div>
              )}

              {activeModal === 'success' && (
                <div className="p-8 md:p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif mb-2">¡Pago Completado!</h3>
                  <p className="text-gray-500 mb-4">Bienvenido a la élite, {formData.name.split(' ')[0]}.</p>
                  
                  <div className="bg-desert-orange/5 border border-desert-orange/10 rounded-2xl p-4 mb-6 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-desert-orange font-bold mb-1">Tu Selección</p>
                    <p className="font-serif text-lg">{selectedRoute.name} • <span className="italic">{vipTier.name}</span></p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Vuelo Confirmado</span>
                      <Plane className="w-4 h-4 text-desert-orange" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Fecha</p>
                        <p className="font-bold">{bookingDetails.flightDate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Hora</p>
                        <p className="font-bold">{bookingDetails.flightTime}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Puerta</p>
                        <p className="font-bold">{bookingDetails.gate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Asiento</p>
                        <p className="font-bold italic">VIP 01A</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={closeModal}
                    className="w-full bg-desert-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest"
                  >
                    Descargar Itinerario
                  </button>
                </div>
              )}

              {activeModal === 'about' && (
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-serif mb-6">Sobre Nosotros</h3>
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p className="bg-desert-pink/20 p-6 rounded-2xl border-l-4 border-desert-orange italic font-serif text-xl text-desert-dark">
                      "Esta página ha sido creada por <strong>Mohamed Amine</strong> para callarles la boca a Pablo y a Héctor, traicioneros."
                    </p>
                    <p>
                      Global Experience no es solo una agencia; es una declaración de intenciones. Fundada por Mohamed Amine, nos dedicamos a ofrecer lo que otros solo pueden soñar.
                    </p>
                    <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 luxury-gradient rounded-full"></div>
                      <div>
                        <p className="font-bold text-desert-dark">Mohamed Amine</p>
                        <p className="text-xs uppercase tracking-widest text-gray-400">CEO & Fundador</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(activeModal === 'destinations' || activeModal === 'experiences') && (
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-serif mb-6 capitalize">{activeModal}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {['Sahara Majestic', 'Dubai Skyline', 'Maldivas Crystal', 'Santorini Sunset'].map((dest, i) => (
                      <div key={i} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-desert-orange transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl group-hover:bg-desert-pink/30 transition-colors"></div>
                          <span className="font-bold text-gray-700">{dest}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-desert-orange transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section - The Poster Front */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=2000" 
            alt="Majestic Sahara Desert" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-desert-dark/60 via-desert-dark/20 to-desert-dark/95"></div>
          <div className="absolute inset-0 sand-overlay"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2 gold-gradient rounded-full text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-desert-dark shadow-xl">
              The Gold Standard of Travel
            </span>
            <h1 className="text-7xl md:text-[10rem] font-display mb-6 leading-none gold-text drop-shadow-2xl">
              SAHARA
            </h1>
            <p className="text-2xl md:text-3xl font-serif mb-12 max-w-2xl mx-auto italic tracking-widest opacity-90">
              "Donde las estrellas del fútbol descansan"
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="glass-card p-8 rounded-[2rem] text-white min-w-[300px] border-desert-gold/30">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">Exclusive Access From</p>
                <p className="text-5xl font-serif font-bold gold-text">2.999€</p>
                <div className="w-12 h-px bg-desert-gold/50 mx-auto my-4"></div>
                <p className="text-xs font-semibold uppercase tracking-widest">Todo Incluido • 7 Días de Gloria</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('booking')}
                className="gold-gradient text-desert-dark px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl text-sm"
              >
                Reservar Mi Oasis <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-3 opacity-50"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold gold-text">Explore The Sands</span>
          <div className="w-px h-16 bg-gradient-to-b from-desert-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* Details Section - The Poster Back */}
      <section className="py-32 px-6 md:px-12 bg-desert-sand relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-desert-dark to-transparent opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* Left Column: The Story */}
            <div className="space-y-16">
              <div className="relative">
                <div className="absolute -left-8 top-0 w-1 h-24 gold-gradient"></div>
                <h2 className="text-6xl md:text-8xl font-serif mb-10 leading-tight text-desert-dark">
                  Suite <span className="gold-text italic">Imperial</span> <br /> Hotel Al-Amin
                </h2>
                <p className="text-2xl text-gray-700 leading-relaxed font-light italic border-l-4 border-desert-gold/20 pl-8">
                  "Sigue los pasos de la élite mundial. Alójate en la misma suite donde <strong>Cristiano Ronaldo</strong> encontró su oasis de paz."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <FeatureItem 
                  icon={<Hotel className="text-desert-gold w-8 h-8" />}
                  title="Alojamiento Real"
                  items={[
                    "7 noches en la Suite Presidencial",
                    "Terraza privada con vistas al desierto",
                    "Jacuzzi privado de mármol",
                    "Servicio 24h de mayordomía"
                  ]}
                />
                <FeatureItem 
                  icon={<Utensils className="text-desert-gold w-8 h-8" />}
                  title="Gastronomía de Oro"
                  items={[
                    "Desayuno buffet internacional",
                    "Almuerzo gourmet de autor",
                    "Cena temática bajo el firmamento",
                    "Cava y bebidas premium ilimitadas"
                  ]}
                />
                <FeatureItem 
                  icon={<Compass className="text-desert-gold w-8 h-8" />}
                  title="Expediciones Privadas"
                  items={[
                    "Paseo en camello al atardecer",
                    "Cena tradicional en jaima real",
                    "Safari en 4x4 por dunas vírgenes",
                    "Astronomía con guía experto"
                  ]}
                />
                <FeatureItem 
                  icon={<Plane className="text-desert-gold w-8 h-8" />}
                  title="Logística VIP"
                  items={[
                    "Vuelos en Business Class",
                    "Traslado en Mercedes-Benz Clase G",
                    "Recepción VIP en pista",
                    "Acceso ilimitado al Spa Real"
                  ]}
                />
              </div>
            </div>

            {/* Right Column: Visual & Extras */}
            <div className="space-y-12">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
                <img 
                  src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Luxury Desert Suite" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-desert-dark/90 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
                  <span className="text-xs uppercase tracking-[0.4em] gold-text mb-4 font-bold">The View From Above</span>
                  <h3 className="text-4xl font-serif italic leading-tight">"La experiencia VIP que <br /> estabas esperando"</h3>
                </div>
              </div>

              <div className="desert-card p-10 rounded-[2.5rem] border-desert-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-10 blur-3xl -mr-16 -mt-16"></div>
                <h4 className="flex items-center gap-3 text-2xl font-serif mb-8 text-desert-dark">
                  <Sparkles className="text-desert-gold" /> Detalles de Distinción
                </h4>
                <ul className="space-y-6">
                  <ExtraItem icon={<Star className="w-5 h-5 text-desert-gold" />} text="Certificado 'Experiencia de Estrella'" />
                  <ExtraItem icon={<Camera className="w-5 h-5 text-desert-gold" />} text="Sesión fotográfica privada en las dunas" />
                  <ExtraItem icon={<Gift className="w-5 h-5 text-desert-gold" />} text="Cofre de bienvenida con sedas locales" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Selection Section */}
      <section className="py-32 px-6 bg-desert-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://www.transparenttextures.com/patterns/sandpaper.png" className="w-full h-full object-repeat" alt="texture" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="gold-text font-bold tracking-[0.5em] uppercase text-xs">Curated Journeys</span>
            <h2 className="text-6xl md:text-7xl font-serif mt-6 mb-8 text-white">Elige tu <span className="italic gold-text">Legado</span></h2>
            <div className="w-24 h-px gold-gradient mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                id: 'reyes',
                name: 'Ruta de los Reyes',
                price: 2999,
                description: 'La experiencia clásica en la Suite Al-Amin con paseos tradicionales.',
                image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=600'
              },
              {
                id: 'oro',
                name: 'Dunas de Oro',
                price: 3499,
                description: 'Exploración profunda en 4x4 y noches en jaimas de cristal exclusivas.',
                image: 'https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=600'
              },
              {
                id: 'cristal',
                name: 'Oasis de Cristal',
                price: 3199,
                description: 'Enfoque en bienestar, spa en el desierto y meditación bajo las estrellas.',
                image: 'https://images.unsplash.com/photo-1501535033-a59812adab1c?auto=format&fit=crop&q=80&w=600'
              }
            ].map((route) => (
              <motion.div 
                key={route.id}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedRoute(route)}
                className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer border-2 transition-all duration-500 ${selectedRoute.id === route.id ? 'border-desert-gold shadow-[0_0_50px_rgba(212,175,55,0.3)]' : 'border-white/5 shadow-2xl'}`}
              >
                <div className="aspect-[3/4] relative">
                  <img src={route.image} alt={route.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-desert-dark via-desert-dark/20 to-transparent"></div>
                  <div className="absolute bottom-0 p-10 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] gold-text mb-3 font-bold">{route.price}€</p>
                    <h3 className="text-3xl font-serif mb-4">{route.name}</h3>
                    <p className="text-sm opacity-60 leading-relaxed line-clamp-3">{route.description}</p>
                    {selectedRoute.id === route.id && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-6 flex items-center gap-3 text-desert-gold font-bold text-xs uppercase tracking-[0.2em]"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Itinerario Seleccionado
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Desert Walk Section */}
      <section className="py-32 bg-desert-sand relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale" alt="desert-bg" referrerPolicy="no-referrer" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <span className="gold-text font-bold tracking-[0.5em] uppercase text-xs">The Ultimate Journey</span>
              <h2 className="text-6xl md:text-8xl font-serif mt-6 mb-10 text-desert-dark leading-tight">Paseo <span className="italic gold-text">Premium</span> <br /> del Sahara</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                Una inmersión profunda en el alma del Sahara. Ruta privada por las dunas vírgenes con guías expertos locales. Atardecer y amanecer en pleno desierto, paradas para capturar momentos eternos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center shadow-xl">
                    <Clock className="text-desert-dark w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-desert-dark text-lg">3 Días Base</p>
                    <p className="text-sm text-gray-500">Inmersión total incluida</p>
                  </div>
                </div>
                
                <div className="desert-card p-6 rounded-2xl flex items-center justify-between border-desert-gold/20">
                  <span className="text-xs uppercase tracking-widest font-bold text-desert-dark">Días Extra</span>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setExtraDays(Math.max(0, extraDays - 1))}
                      className="w-10 h-10 rounded-full border border-desert-gold/30 flex items-center justify-center hover:gold-gradient hover:text-desert-dark transition-all text-desert-gold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-serif font-bold w-6 text-center text-desert-dark">{extraDays}</span>
                    <button 
                      onClick={() => setExtraDays(extraDays + 1)}
                      className="w-10 h-10 rounded-full border border-desert-gold/30 flex items-center justify-center hover:gold-gradient hover:text-desert-dark transition-all text-desert-gold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveModal('booking')}
                className="mt-16 gold-gradient text-desert-dark px-12 py-6 rounded-full hover:scale-105 transition-all uppercase tracking-[0.3em] text-xs font-bold shadow-2xl"
              >
                Personalizar Mi Ruta Real
              </button>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 gold-gradient opacity-20 blur-3xl rounded-full"></div>
              <div className="grid grid-cols-2 gap-6 relative">
                <img src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=600" className="rounded-[2rem] h-80 w-full object-cover shadow-2xl" alt="Desert 1" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1445262102387-5fbb30a5e59d?auto=format&fit=crop&q=80&w=600" className="rounded-[2rem] h-80 w-full object-cover mt-12 shadow-2xl" alt="Desert 2" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1501535033-a59812adab1c?auto=format&fit=crop&q=80&w=600" className="rounded-[2rem] h-80 w-full object-cover -mt-12 shadow-2xl" alt="Desert 3" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=600" className="rounded-[2rem] h-80 w-full object-cover shadow-2xl" alt="Desert 4" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Legal */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 luxury-gradient rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">GE</div>
            <span className="font-serif text-lg tracking-widest uppercase font-bold">Global Experience</span>
          </div>
          
          <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center md:text-left">
            Plazas limitadas. Oferta sujeta a disponibilidad. © 2026 Global Experience Luxury Travel Agency.
          </p>

          <div className="flex gap-6">
            <button onClick={() => setActiveModal('about')} className="text-gray-400 hover:text-desert-orange transition-colors"><Star className="w-5 h-5" /></button>
            <button onClick={() => setActiveModal('destinations')} className="text-gray-400 hover:text-desert-orange transition-colors"><MapPin className="w-5 h-5" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-desert-pink/20 rounded-lg">
          {icon}
        </div>
        <h4 className="font-serif text-xl">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
            <div className="w-1 h-1 bg-desert-orange rounded-full"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExtraItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm font-medium">
      <div className="text-desert-orange">{icon}</div>
      {text}
    </li>
  );
}
