import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Volume2, ShoppingCart, ArrowRight } from 'lucide-react';

// --- COMPONENTS ---

// 1. Live Counter Component
const LiveCounter: React.FC = () => {
  const [count, setCount] = useState(49598);
  const [dateString, setDateString] = useState('');

  // Setup the date string on mount (Automatic date)
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setDateString(formattedDate);
  }, []);

  // Fake live counter logic
  useEffect(() => {
    const minCount = 49000;
    const maxCount = 63000;

    const interval = setInterval(() => {
      setCount((prevCount) => {
        // Random increment between -3 and 8 to simulate fluctuation
        const change = Math.floor(Math.random() * 12) - 3; 
        let newCount = prevCount + change;

        if (newCount > maxCount) return minCount + (newCount - maxCount);
        if (newCount < minCount) return minCount;
        
        return newCount;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm md:text-base leading-relaxed font-sans">
      <span className="font-bold underline decoration-white decoration-2 underline-offset-2 text-yellow-300">
        {count.toLocaleString('pt-BR')}
      </span>
      <span className="mx-1">pessoas ao vivo.</span>
      <span className="hidden sm:inline">Devido ao grande número de acessos, essa live ficará disponível apenas até: </span>
      <span className="sm:hidden">Disponível até: </span>
      <span className="font-bold text-yellow-300">{dateString}</span>.
    </div>
  );
};

// 2. Wistia Player Component
interface WistiaPlayerProps {
  videoId: string;
}

const WistiaPlayer: React.FC<WistiaPlayerProps> = ({ videoId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logic to ensure Wistia processes the video
    if ((window as any)._wistia_responsive_padding_wrapper) {
       // Wistia logic handled by external script
    }
  }, [videoId]);

  if (!videoId || videoId === "wistia_id_here") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-10 text-center">
        <div>
          <h3 className="text-xl font-bold mb-2">Vídeo Wistia Não Configurado</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div 
          className={`wistia_embed wistia_async_${videoId} videoFoam=true`} 
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
            <img 
              src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`} 
              style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} 
              alt="" 
              aria-hidden="true" 
              onLoad={(e) => { (e.currentTarget.parentNode as HTMLDivElement).style.opacity = '1'; }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Delayed CTA Component
interface DelayedCtaProps {
  delaySeconds: number;
  checkoutUrl: string;
}

const DelayedCta: React.FC<DelayedCtaProps> = ({ delaySeconds, checkoutUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  if (!isVisible) {
    return (
      <div className="mt-8 h-24 w-full flex items-center justify-center">
        {/* Placeholder invisible */}
      </div>
    );
  }

  return (
    <div className="w-full mt-8 animate-fade-in-up px-2">
      <div className="flex flex-col items-center">
        
        {/* Urgency Text */}
        <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-3 animate-pulse">
          Oferta Disponível Por Tempo Limitado
        </p>

        {/* Main Button */}
        <a 
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-lg bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 active:border-b-0 active:mt-1 transition-all duration-150 rounded-lg p-4 md:p-6 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
        >
          {/* Shine effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          
          <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          
          <div className="flex flex-col items-start text-left">
            <span className="uppercase text-xs md:text-sm font-semibold opacity-90">
              Passo 1 de 2: Pagamento Seguro
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold font-button leading-none">
              QUERO OBTER A ORAÇÃO
            </span>
          </div>

          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Guarantee Text */}
        <p className="mt-4 text-gray-500 text-xs md:text-sm flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          Garantia de 30 dias ou seu dinheiro de volta
        </p>
      </div>

      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 1s;
        }
      `}</style>
    </div>
  );
};

// 4. Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#021622] text-[#cfcfcf] py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        
        {/* Copyright */}
        <div>
          <p className="text-sm md:text-base">
            © {currentYear} – Todos os direitos reservados
          </p>
        </div>

        {/* Links */}
        <div className="text-xs md:text-sm flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition-colors underline decoration-dotted">
            Política de Privacidade
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors underline decoration-dotted">
            Termos de Uso
          </a>
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto border-t border-gray-800 pt-6 mt-6">
          <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 text-justify md:text-center">
            Aviso: A Oração Sagrada de São Bento é prática espiritual, com efeitos variáveis. 
            Não é tratamento nem promessa de resultado. Conteúdo educativo, não substitui 
            aconselhamento profissional. Depoimentos são individuais; alguns podem ser dramatizados. 
            Proibida a cópia de imagens e textos; sanções legais se descumprido.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  // CONFIGURATION
  const WISTIA_VIDEO_ID = "xp7xapsblr"; 
  const CHECKOUT_URL = "https://pay.cakto.com.br/gyoufzw_751112";
  
  // 37 minutes and 40 seconds = 2260 seconds
  const DELAY_SECONDS = 2260; 

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
        <DelayedCta 
          checkoutUrl={CHECKOUT_URL} 
          delaySeconds={DELAY_SECONDS} 
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

// --- MOUNTING ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
