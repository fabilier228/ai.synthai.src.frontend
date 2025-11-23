'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowDown, Sparkles, Zap, Shield, Globe, Check } from 'lucide-react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DescriptionIcon from '@mui/icons-material/Description';

export default function AudioAnalyzerFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const audioTypes = [
    {
      id: 'song',
      title: 'Piosenka',
      icon: MusicNoteIcon,
      color: 'var(--primary)',
      bgColor: 'var(--primary_muted)',
      results: ['Tytuł i wykonawca', 'Emocje i tematyka', 'Interpretacja']
    },
    {
      id: 'conversation',
      title: 'Rozmowa',
      icon: ChatBubbleOutlineIcon,
      color: 'var(--secondary)',
      bgColor: 'var(--secondary)',
      results: ['Uczestnicy', 'Ton rozmowy', 'Kluczowe cytaty']
    },
    {
      id: 'lecture',
      title: 'Wykład',
      icon: SchoolIcon,
      color: 'var(--success)',
      bgColor: 'var(--success)',
      results: ['Kluczowe koncepty', 'Struktura', 'Główna teza']
    },
    {
      id: 'audiobook',
      title: 'Audiobook',
      icon: MenuBookIcon,
      color: 'var(--warning)',
      bgColor: 'var(--warning)',
      results: ['Streszczenie', 'Postacie', 'Motywy literackie']
    }
  ];

  const mainSteps = [
    {
      number: '1',
      title: 'Wybór typu audio',
      icon: CloudUploadIcon,
      description: 'Użytkownik wybiera kategorię: piosenka, rozmowa, wykład lub audiobook',
      color: 'var(--primary)',
      bgColor: 'var(--primary_muted)'
    },
    {
      number: '2',
      title: 'Upload & Transkrypcja',
      icon: RecordVoiceOverIcon,
      description: 'System automatycznie transkrybuje audio z rozpoznaniem języka',
      color: 'var(--secondary)',
      bgColor: 'var(--secondary)'
    },
    {
      number: '3',
      title: 'Analiza AI',
      icon: PsychologyIcon,
      description: 'GPT-4 analizuje treść i wyciąga kluczowe informacje',
      color: 'var(--success)',
      bgColor: 'var(--success)'
    },
    {
      number: '4',
      title: 'Podsumowanie',
      icon: DescriptionIcon,
      description: 'Spersonalizowany raport w formacie JSON gotowy do użycia',
      color: 'var(--warning)',
      bgColor: 'var(--warning)'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[var(--primary)]" />
            <h1 className="text-5xl font-bold text-[var(--text)]">
              Jak działamy?
            </h1>
          </div>
          <p className="text-[var(--muted)] text-xl max-w-3xl mx-auto leading-relaxed">
            Nasza aplikacja wykorzystuje najnowsze modele AI do automatycznej transkrypcji 
            i głębokiej analizy różnych typów materiałów audio
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
          {[
            { value: '10,000+', label: 'Analiz', color: 'var(--primary)' },
            { value: '50+', label: 'Języków', color: 'var(--secondary)' },
            { value: '2-5 min', label: 'Średni czas', color: 'var(--success)' },
            { value: '95%+', label: 'Dokładność', color: 'var(--warning)' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-[var(--surface)] rounded-2xl p-6 text-center transition-transform hover:scale-105 border border-[var(--outline)]"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm text-[var(--muted)] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Flow Diagram */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-[var(--text)] mb-12">
            Proces analizy audio
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {mainSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              
              return (
                <div key={idx}>
                  <div
                    className={`relative bg-[var(--surface)] rounded-2xl p-4 md:p-6 shadow border-2 transition-all duration-300 ${
                      isActive ? 'md:border-[var(--primary)] md:shadow-2xl md:scale-105' : 'border-[var(--outline)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-6">
                      {/* Group: number + icon side-by-side */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-lg md:text-2xl font-bold shadow ${
                            isActive ? 'md:animate-pulse' : ''
                          }`}
                          style={{ backgroundColor: step.color }}
                        >
                          {step.number}
                        </div>

                        <div
                          className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-transform ${
                            isActive ? 'md:scale-110' : ''
                          }`}
                          style={{ backgroundColor: step.color }}
                        >
                          <StepIcon sx={{ fontSize: 18 }} style={{ color: 'white' }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-xl font-bold text-[var(--text)] mb-1 truncate">{step.title}</h3>
                        <p className="text-[var(--muted)] text-sm md:text-base leading-snug line-clamp-3">{step.description}</p>
                      </div>

                      {/* Active Indicator (only on md+) */}
                      {isActive && (
                        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 bg-[var(--primary)] rounded-full md:animate-ping opacity-75"></div>
                          <div className="w-5 h-5 bg-[var(--primary)] rounded-full absolute top-0"></div>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar (small on mobile) */}
                    {isActive && (
                      <div className="mt-3 md:mt-4 h-1 md:h-2 bg-[var(--outline)] rounded-full overflow-hidden">
                        <div className="h-full animate-[progress_5s_linear]" style={{ width: '100%', backgroundColor: step.color }} />
                      </div>
                    )}
                  </div>

                  {idx < mainSteps.length - 1 && (
                    <div className="flex justify-center py-2 md:py-4">
                      <ArrowDown
                        className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isActive ? 'md:animate-bounce' : ''}`}
                        style={{ color: isActive ? step.color : 'var(--outline)' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Types Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-[var(--text)] mb-4">
            Obsługiwane typy audio
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 text-lg">
            Każdy typ audio otrzymuje spersonalizowaną analizę
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {audioTypes.map((type, idx) => {
              const TypeIcon = type.icon;
              return (
                <div 
                  key={type.id}
                  className="bg-[var(--surface)] rounded-2xl p-6 border-2 border-[var(--outline)] hover:border-[var(--primary)] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: type.color }}
                  >
                    <TypeIcon sx={{ fontSize: 32, color: 'white' }} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] text-center mb-4">{type.title}</h3>
                  <div className="space-y-2">
                    {type.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: type.color }} />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-20 bg-[var(--surface)] border border-[var(--outline)] rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center text-[var(--text)] mb-4">
            Wykorzystywana technologia
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 text-lg">
            Używamy najlepszych narzędzi AI na rynku
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Azure AI', desc: 'Transkrypcja wielojęzyczna', color: 'var(--primary)' },
              { icon: Sparkles, title: 'GPT-4', desc: 'Zaawansowana analiza', color: 'var(--secondary)' },
              { icon: Globe, title: 'Shazam API', desc: 'Rozpoznawanie muzyki', color: 'var(--success)' },
              { icon: Zap, title: 'Własne algo', desc: 'Optymalizacja wyników', color: 'var(--warning)' }
            ].map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[var(--background)] rounded-xl p-6 text-center hover:scale-105 transition-all group border-2 border-[var(--outline)]"
                >
                  <TechIcon className="w-10 h-10 mx-auto mb-3 transition-colors" style={{ color: tech.color }} />
                  <h4 className="font-bold mb-2 text-[var(--text)]">{tech.title}</h4>
                  <p className="text-sm text-[var(--muted)]">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[var(--primary)] rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Gotowy, żeby spróbować?</h2>
            <p className="text-xl mb-8 opacity-90">
              Zacznij analizować swoje audio już teraz – pierwsze 3 analizy za darmo!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-10 py-4 bg-white text-[var(--primary)] rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Rozpocznij teraz
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Zobacz demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}