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
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-serif mb-2">Reserva tu Oasis</h3>
                  <p className="text-gray-500 mb-8">Completa tus datos para acceder a la Suite Al-Amin.</p>
                  
                  <form onSubmit={handleBooking} className="space-y-6">
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
                      Confirmar Pago 2.999€
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
                  <p className="text-gray-500 mb-8">Bienvenido a la élite, {formData.name.split(' ')[0]}.</p>
                  
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
            src="https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=2000" 
            alt="Sahara Desert" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-desert-dark/40 via-transparent to-desert-dark/80"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-desert-orange/90 rounded-full text-xs uppercase tracking-[0.3em] font-bold mb-6">
              Experiencia Exclusiva
            </span>
            <h1 className="text-6xl md:text-9xl font-serif mb-6 leading-tight">
              Sahara <br /> <span className="italic">Majestic</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-widest mb-12 max-w-2xl mx-auto italic">
              "Donde las estrellas del fútbol descansan"
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="glass-card p-6 rounded-2xl text-desert-dark min-w-[280px]">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Desde</p>
                <p className="text-4xl font-serif font-bold">2.999€</p>
                <p className="text-sm font-semibold mt-2">Todo Incluido • 7 Días</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('booking')}
                className="bg-white text-desert-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl"
              >
                Descubrir el Lujo <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 opacity-60"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Detalles del Viaje</span>
          <div className="w-px h-12 bg-white/40"></div>
        </motion.div>
      </section>

      {/* Details Section - The Poster Back */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: The Story */}
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                  Suite Presidencial <br /> <span className="text-desert-orange italic">Hotel Al-Amin</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Sigue los pasos de la élite mundial. Alójate en la misma suite donde <strong>Cristiano Ronaldo</strong> encontró su oasis de paz. Una experiencia diseñada solo para quienes buscan lo extraordinario.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureItem 
                  icon={<Hotel className="text-desert-orange" />}
                  title="Alojamiento Real"
                  items={[
                    "7 noches en la Suite Presidencial",
                    "Terraza privada con vistas al desierto",
                    "Jacuzzi privado",
                    "Servicio 24h personalizado"
                  ]}
                />
                <FeatureItem 
                  icon={<Utensils className="text-desert-orange" />}
                  title="Gastronomía Gourmet"
                  items={[
                    "Desayuno buffet internacional",
                    "Almuerzo gourmet diario",
                    "Cena temática bajo las estrellas",
                    "Bebidas premium incluidas"
                  ]}
                />
                <FeatureItem 
                  icon={<Compass className="text-desert-orange" />}
                  title="Aventura Sahara"
                  items={[
                    "Paseo en camello al atardecer",
                    "Cena tradicional en jaima",
                    "Excursión en 4x4 por las dunas",
                    "Observación de estrellas con guía"
                  ]}
                />
                <FeatureItem 
                  icon={<Plane className="text-desert-orange" />}
                  title="Transporte VIP"
                  items={[
                    "Vuelos ida y vuelta incluidos",
                    "Traslado privado Aeropuerto–Hotel",
                    "Recepción VIP exclusiva",
                    "Spa y masaje relajante"
                  ]}
                />
              </div>
            </div>

            {/* Right Column: Visual & Extras */}
            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Luxury Desert Suite" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-desert-dark/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                  <p className="text-sm uppercase tracking-widest mb-2">Vistas desde la Suite</p>
                  <h3 className="text-3xl font-serif italic">"La experiencia VIP que estabas esperando"</h3>
                </div>
              </div>

              <div className="bg-desert-pink/30 p-8 rounded-3xl border border-desert-pink">
                <h4 className="flex items-center gap-2 text-xl font-serif mb-6">
                  <Sparkles className="text-desert-orange" /> Extras Exclusivos
                </h4>
                <ul className="space-y-4">
                  <ExtraItem icon={<Star className="w-4 h-4" />} text="Certificado 'Experiencia de Estrella'" />
                  <ExtraItem icon={<Camera className="w-4 h-4" />} text="Fotografía profesional en el desierto" />
                  <ExtraItem icon={<Gift className="w-4 h-4" />} text="Regalo sorpresa de bienvenida" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Desert Walk Section */}
      <section className="py-24 bg-desert-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-desert-orange font-bold tracking-[0.3em] uppercase text-xs">Servicio Adicional</span>
              <h2 className="text-5xl md:text-6xl font-serif mt-4 mb-8">Paseo Premium <br /> por el Desierto</h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Una inmersión profunda en el Sahara. Ruta privada por las dunas del Sahara con guía experto local. Atardecer y amanecer en pleno desierto, paradas para fotografías profesionales.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="text-desert-orange" />
                  </div>
                  <div>
                    <p className="font-bold">3 Días Incluidos</p>
                    <p className="text-sm text-white/50">Posibilidad de ampliar (¡tú eliges!)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Waves className="text-desert-orange" />
                  </div>
                  <div>
                    <p className="font-bold">Noche Opcional</p>
                    <p className="text-sm text-white/50">En jaima de lujo bajo el firmamento</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveModal('booking')}
                className="mt-12 border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-desert-dark transition-all uppercase tracking-widest text-sm font-bold"
              >
                Personalizar mi Ruta
              </button>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=500" className="rounded-2xl h-64 w-full object-cover" alt="Desert 1" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1445262102387-5fbb30a5e59d?auto=format&fit=crop&q=80&w=500" className="rounded-2xl h-64 w-full object-cover mt-8" alt="Desert 2" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1501535033-a59812adab1c?auto=format&fit=crop&q=80&w=500" className="rounded-2xl h-64 w-full object-cover -mt-8" alt="Desert 3" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=500" className="rounded-2xl h-64 w-full object-cover" alt="Desert 4" referrerPolicy="no-referrer" />
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
