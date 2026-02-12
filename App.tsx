import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import LiveCounter from './components/LiveCounter';
import WistiaPlayer from './components/WistiaPlayer';
import DelayedCta from './components/DelayedCta';
import Footer from './components/Footer';

const App: React.FC = () => {
  // CONFIGURATION: Set your Wistia Video ID here
  const WISTIA_VIDEO_ID = "xp7xapsblr"; 

  // CONFIGURATION: Set the checkout URL here
  const CHECKOUT_URL = "https://pay.cakto.com.br/gyoufzw_751112";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Top Red Bar with Live Counter */}
      <div className="w-full bg-[#880b0b] text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center">
          <LiveCounter />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {/* Headline Section */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading leading-tight text-gray-900">
            <span className="underline decoration-[#f7ff00] decoration-4 underline-offset-4">
              Alto Clero Surpresos:
            </span>
            <br className="hidden md:block" />
            <span className="block mt-2">
              Essa <span className="text-[#ff3131]">Prece de 7 Minutos</span> Está Trazendo Milagres Financeiros e de Saúde
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            (Veja o vídeo abaixo)
          </p>
        </div>

        {/* Video Player Container */}
        <div className="w-full relative bg-black shadow-2xl rounded-lg overflow-hidden border-4 border-white ring-1 ring-gray-200">
          <div className="aspect-video w-full">
            <WistiaPlayer videoId={WISTIA_VIDEO_ID} />
          </div>
        </div>

        {/* Sound Warning */}
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          <Volume2 className="w-5 h-5 text-[#880b0b]" />
          <span className="text-sm md:text-base font-semibold">
            Por favor, verifique se o som está ligado.
          </span>
        </div>

        {/* Delayed Call to Action Button */}
        {/* 37 minutes * 60 = 2220 + 40 seconds = 2260 seconds */}
        <DelayedCta 
          checkoutUrl={CHECKOUT_URL} 
          delaySeconds={2260} 
        />

        {/* Apoio Section */}
        <div className="mt-16 w-full">
          <h3 className="text-center text-gray-500 font-medium text-xl md:text-2xl mb-8">
            Apoio
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center transition-all duration-300">
             
             {/* CNBB */}
             <div className="flex flex-col items-center justify-center h-20 w-32">
                <img 
                  src="https://media.atomicatpages.net/u/WyDAZ593TogaOOCEsEZFaqFdgoC3/Pictures/RoHftM3342723.png?quality=88#240943" 
                  alt="CNBB" 
                  className="max-h-full max-w-full object-contain"
                />
             </div>

             {/* TV Aparecida */}
             <div className="flex flex-col items-center justify-center h-20 w-32">
                <img 
                  src="https://media.atomicatpages.net/u/WyDAZ593TogaOOCEsEZFaqFdgoC3/Pictures/CSEdFI3342723.png?quality=87#529424" 
                  alt="TV Aparecida" 
                  className="max-h-full max-w-full object-contain"
                />
             </div>

             {/* Rede Vida */}
             <div className="flex flex-col items-center justify-center h-20 w-32">
                <img 
                  src="https://media.atomicatpages.net/u/WyDAZ593TogaOOCEsEZFaqFdgoC3/Pictures/tyJjlJ3342723.png?quality=81#397190" 
                  alt="Rede Vida" 
                  className="max-h-full max-w-full object-contain"
                />
             </div>

             {/* Canção Nova */}
             <div className="flex flex-col items-center justify-center h-20 w-32">
                <img 
                  src="https://media.atomicatpages.net/u/WyDAZ593TogaOOCEsEZFaqFdgoC3/Pictures/KpfPCe3983658.png?quality=86#33657" 
                  alt="Canção Nova" 
                  className="max-h-full max-w-full object-contain"
                />
             </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default App;