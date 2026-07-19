import React from 'react';
import { PhoneIcon, EnvelopeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function Leadership() {
  const leaders = [
    {
      id: 1,
      name: 'Sujeet Kumar Sah',
      role: 'Co-Founder',
      title: "Co-Founder's Vision",
      quote: "Our mission is to bridge the gap between complex government regulations and seamless business execution.",
      bio: "With extensive experience in civil engineering and government tendering, Sujeet leads the strategic vision for CARD Technocrats. He specializes in driving large-scale infrastructure bidding, regulatory compliance, and project estimations.",
      image: '/sujeet_sah.jpg',
      phone: '+91 7529993812',
      email: 'ctellp@gmail.com',
      projects: [
        'CPWD & PWD Registration Consulting',
        'High-Value Government Tender Filing',
        'Infrastructure Cost Estimations (SOR)'
      ]
    }
  ];

  return (
    <section className="space-y-12 max-w-5xl mx-auto py-16 px-4">
      <div className="text-center">
        <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-2">Leadership Spotlight</h2>
        <h3 className="text-3xl md:text-4xl font-black text-white">Meet Our Founders</h3>
      </div>

      <div className="space-y-12">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl p-8 md:p-12 shadow-2xl">
            {/* Decorative Glow */}
            <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none`} />
            
            <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              
              {/* Left/Right: Large Headshot */}
              <div className={`lg:col-span-5 flex flex-col items-center text-center space-y-4 ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-30 group-hover:opacity-60 transition duration-500 blur-[3px]" />
                  <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-dark-900 flex items-center justify-center">
                    {leader.image ? (
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-white text-4xl font-bold">' + leader.name.split(' ').map(n=>n[0]).join('') + '</div>';
                        }}
                        className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-white/40 text-4xl font-bold flex flex-col items-center gap-2">
                        <span>TBA</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">{leader.name}</h4>
                  <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">{leader.role}</div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5">CARD Technocrats & Engineers LLP</div>
                </div>
              </div>

              {/* Details & Quotes */}
              <div className={`lg:col-span-7 space-y-6 ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-7xl font-serif text-blue-500/20 select-none">“</span>
                  <p className="text-sm md:text-base text-gray-200 font-medium italic leading-relaxed relative z-10">
                    {leader.quote}
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {leader.bio}
                  </p>

                  {leader.projects && leader.projects.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <div className="text-xs font-bold text-gray-300 flex items-center gap-2">
                        <BriefcaseIcon className="w-4 h-4 text-blue-400" />
                        Notable Projects:
                      </div>
                      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 ml-1">
                        {leader.projects.map((proj, idx) => (
                          <li key={idx}>{proj}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    {leader.phone && (
                      <a 
                        href={`tel:${leader.phone}`} 
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
                      >
                        <PhoneIcon className="w-4 h-4 text-blue-400" />
                        Call: {leader.phone}
                      </a>
                    )}
                    {leader.email && (
                      <a 
                        href={`mailto:${leader.email}`} 
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
                      >
                        <EnvelopeIcon className="w-4 h-4 text-blue-400" />
                        Email: {leader.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
