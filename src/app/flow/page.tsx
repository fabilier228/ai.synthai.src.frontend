'use client';

import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Zap, Shield, Globe, Check } from 'lucide-react';
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
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const audioTypes = [
    {
      id: 'song',
      title: 'Song',
      icon: MusicNoteIcon,
      color: 'primary',
      bgColor: 'primary_muted',
      results: ['Title & Artist', 'Emotions & Themes', 'Interpretation']
    },
    {
      id: 'conversation',
      title: 'Conversation',
      icon: ChatBubbleOutlineIcon,
      color: 'secondary',
      bgColor: 'secondary',
      results: ['Participants', 'Conversation Tone', 'Key Quotes']
    },
    {
      id: 'lecture',
      title: 'Lecture',
      icon: SchoolIcon,
      color: 'success',
      bgColor: 'success',
      results: ['Key Concepts', 'Structure', 'Main Thesis']
    },
    {
      id: 'audiobook',
      title: 'Audiobook',
      icon: MenuBookIcon,
      color: 'tertiary',
      bgColor: 'tertiary',
      results: ['Summary', 'Characters', 'Literary Themes']
    }
  ];

  const mainSteps = [
    {
      number: '1',
      title: 'Select audio type',
      icon: CloudUploadIcon,
      description: 'User selects a category: song, conversation, lecture, or audiobook',
      color: 'primary',
      bgColor: 'primary_muted'
    },
    {
      number: '2',
      title: 'Upload & Transcription',
      icon: RecordVoiceOverIcon,
      description: 'The system automatically transcribes audio and detects the language',
      color: 'secondary',
      bgColor: 'secondary'
    },
    {
      number: '3',
      title: 'AI Analysis',
      icon: PsychologyIcon,
      description: 'GPT-4 analyzes the content and extracts key insights',
      color: 'tertiary',
      bgColor: 'tertiary'
    },
    {
      number: '4',
      title: 'Summary',
      icon: DescriptionIcon,
      description: 'Personalized JSON report ready for use',
      color: 'success',
      bgColor: 'success'
    }
  ];

  return (
    <div className="mx-auto p-4 rounded-lg  flex flex-col mt-20 md:mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center my-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-h2 md:text-h1 font-styled text-text">
              How it works
            </h1>
          </div>
          <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Our app uses state-of-the-art AI models for automatic transcription
            and deep analysis of various audio types.
          </p>
        </div>


        <div className="mb-20">
          <h2 className="text-h3  sm:text-h2 font-styled text-center text-text mb-8 md:mb-12 px-4">
            Audio Analysis Process
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {mainSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              
              return (
                <div key={idx}>
                  <div
                    className={`relative bg-surface rounded-2xl p-4 md:p-6 shadow border-2 transition-all duration-300 ${
                      isActive ? 'border-primary md:shadow-2xl md:scale-105' : 'border-outline'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-lg md:text-2xl font-bold shadow ${
                            isActive ? 'md:animate-pulse' : ''
                          }`}
                          style={{ backgroundColor: step.color && step.color.startsWith ? (step.color.startsWith('var(') ? step.color : `var(--${step.color})`) : step.color }}
                        >
                          {step.number}
                        </div>

                        <div
                          className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-transform ${
                            isActive ? 'md:scale-110' : ''
                          }`}
                          style={{ backgroundColor: step.color && step.color.startsWith ? (step.color.startsWith('var(') ? step.color : `var(--${step.color})`) : step.color }}
                        >
                          <StepIcon sx={{ fontSize: 18 }} style={{ color: 'white' }} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-h4 md:text-h3 font-heading text-text mb-1 truncate">{step.title}</h3>
                        <p className="text-muted text-body_sm md:text-body_md leading-snug line-clamp-3">{step.description}</p>
                      </div>

                      {isActive && (
                        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 bg-primary rounded-full md:animate-ping opacity-75"></div>
                          <div className="w-5 h-5 bg-primary rounded-full absolute top-0"></div>
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <div className="mt-3 md:mt-4 h-1 md:h-2 bg-outline rounded-full overflow-hidden">
                        <div className="h-full animate-[progress_8s_linear]" style={{ width: '100%', backgroundColor: step.color && step.color.startsWith ? (step.color.startsWith('var(') ? step.color : `var(--${step.color})`) : step.color }} />
                      </div>
                    )}
                  </div>

                  {idx < mainSteps.length - 1 && (
                    <div className="flex justify-center py-2 md:py-4">
                      <ArrowDown
                        className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isActive ? 'md:animate-bounce' : ''}`}
                        style={{ color: isActive ? (step.color && step.color.startsWith ? (step.color.startsWith('var(') ? step.color : `var(--${step.color})`) : step.color) : 'var(--outline)' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Types Section */}
        <div className="mb-20 px-4">
          <h2 className="text-h3  sm:text-h2 font-styled text-center text-text mb-4">
            Supported audio types
          </h2>
          <p className="text-center text-muted mb-8 md:mb-12 text-base md:text-lg">
            Each audio type receives a tailored analysis
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {audioTypes.map((type, idx) => {
              const TypeIcon = type.icon;
              return (
                <div 
                  key={type.id}
                  className="bg-surface rounded-2xl p-4 md:p-6 border-2 border-outline hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: type.color && type.color.startsWith ? (type.color.startsWith('var(') ? type.color : `var(--${type.color})`) : type.color }}
                  >
                    <TypeIcon sx={{ fontSize: 32, color: 'white' }} />
                  </div>
                  <h3 className="text-h5 md:text-h4 font-heading text-text text-center mb-4">{type.title}</h3>
                  <div className="space-y-2">
                    {type.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-body_md text-muted">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: type.color && type.color.startsWith ? (type.color.startsWith('var(') ? type.color : `var(--${type.color})`) : type.color }} />
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
        <div className="mb-20 bg-surface border border-outline rounded-3xl p-6 md:p-12">
          <h2 className="text-h3  sm:text-h2 font-styled text-center text-text mb-4">
            Technologies
          </h2>
         

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Azure AI', desc: 'Multilingual transcription', color: 'primary' },
              { icon: Sparkles, title: 'GPT-4', desc: 'Advanced analysis', color: 'secondary' },
              { icon: Globe, title: 'Shazam API', desc: 'Music recognition', color: 'success' },
              { icon: Zap, title: 'Custom algorithms', desc: 'Result optimization', color: 'warning' }
            ].map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-background rounded-xl p-6 text-center hover:scale-105 transition-all group border-2 border-outline"
                >
                  <TechIcon className="w-10 h-10 mx-auto mb-3 transition-colors" style={{ color: tech.color && tech.color.startsWith ? (tech.color.startsWith('var(') ? tech.color : `var(--${tech.color})`) : tech.color }} />
                  <h4 className="font-heading text-h5 mb-2 text-text">{tech.title}</h4>
                  <p className="text-body_md text-muted">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <div className="bg-gradient-to-r from-primary via-tertiary to-secondary rounded-3xl p-6 md:p-12 text-white max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-h3  md:text-h2 font-heading mb-4">Ready to try?</h2>
            <p className="text-body_md  md:text-body_lg mb-6 md:mb-8 opacity-90">
              Start analyzing your audio now — first 3 analyses free!
            </p>
              <button className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-primary rounded-xl font-bold text-btn_b_sm lg:text-btn_b_md md:text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Start now
              </button>
           
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