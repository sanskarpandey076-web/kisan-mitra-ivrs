const { useState, useEffect, useRef } = React;

// Minimal lucide-style SVG icons (consistent 24px)
const ICONS = {
  Sprout: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
    </svg>
  ),
  Phone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  PhoneCall: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      <path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/>
    </svg>
  ),
  PhoneOff: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/>
    </svg>
  ),
  Volume2: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  )
};

function Icon({ name, size = 24, className = '' }) {
  const svg = ICONS[name];
  if (!svg) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {React.cloneElement(svg, { width: size, height: size })}
    </span>
  );
}

// Phone keypad button
function KeypadButton({ label, sub, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-16 h-16 rounded-xl bg-white shadow-md flex flex-col items-center justify-center
                 hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                 active:scale-95"
    >
      <span className="text-xl font-semibold font-heading">{label}</span>
      {sub && <span className="text-[10px] opacity-70">{sub}</span>}
    </button>
  );
}

function App() {
  // Call state: idle | ringing | connected | ended
  const [callState, setCallState] = useState('idle');
  // IVR steps: 0 language, 1 crop, 2 quantity, 3 accept/reject, 4 confirmation
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [inputBuffer, setInputBuffer] = useState('');
  const [refNumber, setRefNumber] = useState(null);
  const [createdLot, setCreatedLot] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const transcriptEndRef = useRef(null);

  const LANGUAGES = [
    { code: 'hi', label: 'Hindi' },
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'Marathi' },
    { code: 'pa', label: 'Punjabi' }
  ];

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  const speak = (text, delay = 900) => {
    return new Promise((resolve) => {
      setIsSpeaking(true);
      setTranscript((prev) => [...prev, { type: 'system', text }]);
      setTimeout(() => {
        setIsSpeaking(false);
        resolve();
      }, delay);
    });
  };

  const addFarmer = (text) => {
    setTranscript((prev) => [...prev, { type: 'farmer', text }]);
  };

  const startCall = async () => {
    setCallState('ringing');
    setTranscript([]);
    setStep(0);
    setLanguage(null);
    setSelectedCrop(null);
    setQuantity('');
    setInputBuffer('');
    setRefNumber(null);
    setCreatedLot(null);

    setTimeout(async () => {
      setCallState('connected');
      await speak('Welcome to Kisan Mitra. Press 1 for Hindi, 2 for English, 3 for Marathi, 4 for Punjabi.');
    }, 1800);
  };

  const endCall = () => {
    setCallState('ended');
    setTimeout(() => setCallState('idle'), 2800);
  };

  const handleDigit = async (digit) => {
    if (callState !== 'connected' || isSpeaking) return;

    if (step === 0) {
      const langMap = { '1': 'hi', '2': 'en', '3': 'mr', '4': 'pa' };
      if (!langMap[digit]) {
        await speak('Invalid option. Please try again. Press 1 for Hindi, 2 for English, 3 for Marathi, 4 for Punjabi.');
        return;
      }
      const lang = langMap[digit];
      setLanguage(lang);
      addFarmer(digit);
      const langName = LANGUAGES.find((l) => l.code === lang).label;
      await speak(`You selected ${langName}. Now select your crop. Press 1 for Wheat, 2 for Onion, 3 for Rice, 4 for Cotton.`);
      setStep(1);
    } else if (step === 1) {
      const cropMap = { '1': 'Wheat', '2': 'Onion', '3': 'Rice', '4': 'Cotton' };
      if (!cropMap[digit]) {
        await speak('Invalid option. Press 1 for Wheat, 2 for Onion, 3 for Rice, 4 for Cotton.');
        return;
      }
      const crop = cropMap[digit];
      setSelectedCrop(crop);
      addFarmer(digit);
      await speak(`You selected ${crop}. Please enter the quantity in quintals followed by the hash key. For example, five zero hash for 50 quintals.`);
      setStep(2);
      setInputBuffer('');
    } else if (step === 2) {
      if (digit === '#') {
        if (!inputBuffer || isNaN(parseInt(inputBuffer, 10)) || parseInt(inputBuffer, 10) <= 0) {
          await speak('Invalid quantity. Please enter a valid number followed by hash.');
          setInputBuffer('');
          return;
        }
        const qty = parseInt(inputBuffer, 10);
        setQuantity(qty);
        addFarmer(inputBuffer + ' #');
        setInputBuffer('');

        const mandis = getMandisForCrop(selectedCrop).sort((a, b) => b.price - a.price);
        const bestOffer = getBestBuyerOffer(selectedCrop);
        const alert = getActiveAlert(selectedCrop);

        let msg = `Quantity recorded: ${qty} quintals of ${selectedCrop}. `;
        msg += 'Current mandi prices: ';
        mandis.slice(0, 3).forEach((m, i) => {
          msg += `${i + 1}. ${m.name}, ${m.location}: rupees ${m.price} per quintal. `;
        });
        if (bestOffer) {
          msg += `Best buyer offer from ${bestOffer.buyer.name} (${bestOffer.buyer.type}, rating ${bestOffer.buyer.rating}): rupees ${bestOffer.offerPrice} per quintal. `;
        }
        if (alert) {
          const dir = alert.direction === 'up' ? 'increased' : 'decreased';
          const mandiName = mockData.mandis.find((m) => m.id === alert.mandiId)?.name || 'mandi';
          msg += `Price alert: ${selectedCrop} has ${dir} by ${alert.changePercent} percent at ${mandiName}. `;
        }
        msg += 'Press 1 to accept and list your lot at the best offer price. Press 2 to reject and end call.';

        await speak(msg, 1400);
        setStep(3);
      } else if (digit === '*') {
        setInputBuffer('');
        addFarmer('*');
        await speak('Input cleared. Enter quantity again followed by hash.');
      } else {
        setInputBuffer((prev) => prev + digit);
        addFarmer(digit);
      }
    } else if (step === 3) {
      addFarmer(digit);
      if (digit === '1') {
        const lotId = generateLotId();
        const newLot = {
          id: lotId,
          farmerId: 'f1',
          crop: selectedCrop,
          quantity: parseInt(quantity, 10),
          grade: 'A',
          status: 'listed'
        };
        mockData.lots.push(newLot);
        setCreatedLot(newLot);

        const ref = generateRefNumber();
        setRefNumber(ref);

        const bestOffer = getBestBuyerOffer(selectedCrop);
        let conf = `Thank you. Your lot has been listed successfully. Reference number ${ref}. `;
        conf += `${quantity} quintals of ${selectedCrop}, Grade A, status listed. `;
        if (bestOffer) {
          conf += `Matched offer price rupees ${bestOffer.offerPrice} from ${bestOffer.buyer.name}. `;
        }
        conf += 'You will receive an SMS confirmation shortly. Thank you for using Kisan Mitra. Goodbye.';
        await speak(conf, 1500);
        setStep(4);
        setTimeout(() => endCall(), 2400);
      } else if (digit === '2') {
        await speak('You have rejected the offer. No lot has been created. Thank you for calling Kisan Mitra. Goodbye.');
        setStep(4);
        setTimeout(() => endCall(), 2000);
      } else {
        await speak('Invalid option. Press 1 to accept or 2 to reject.');
      }
    }
  };

  const renderNavbar = () => (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
          <Icon name="Sprout" size={22} className="text-white" />
        </div>
        <span className="font-heading text-xl font-semibold text-textDark">Kisan Mitra</span>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium">
          Farmer
        </button>
        <button className="px-4 py-2 rounded-xl bg-white text-textDark text-sm font-medium border border-gray-200">
          Buyer
        </button>
        <button className="px-4 py-2 rounded-xl bg-white text-textDark text-sm font-medium border border-gray-200">
          Admin
        </button>
      </div>
    </nav>
  );

  const renderIdle = () => (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon name="Phone" size={40} className="text-primary" />
      </div>
      <h2 className="font-heading text-2xl font-semibold text-textDark">IVRS Simulator</h2>
      <p className="text-secondary text-center max-w-md">
        Simulate a farmer calling the Kisan Mitra Interactive Voice Response system.
        Follow the voice prompts and use the keypad.
      </p>
      <button
        onClick={startCall}
        className="mt-4 px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-md
                   hover:bg-primary/90 transition-colors flex items-center gap-2"
      >
        <Icon name="PhoneCall" size={20} className="text-white" />
        Start Call
      </button>
      <p className="text-xs text-secondary mt-8 max-w-lg text-center">
        Production version integrates with a telecom IVR gateway (Twilio/Exotel)
      </p>
    </div>
  );

  const renderRinging = () => (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-primary/20 calling-pulse absolute inset-0" />
        <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center relative z-10 text-white">
          <Icon name="Phone" size={44} className="text-white" />
        </div>
      </div>
      <h2 className="font-heading text-xl font-semibold">Calling Kisan Mitra…</h2>
      <p className="text-secondary text-sm">Connecting to IVR system</p>
    </div>
  );

  const renderEnded = () => (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
        <Icon name="PhoneOff" size={36} className="text-error" />
      </div>
      <h2 className="font-heading text-xl font-semibold">Call Ended</h2>
      {createdLot && (
        <div className="mt-4 bg-white rounded-xl shadow-md p-4 max-w-sm w-full">
          <p className="text-sm text-secondary mb-1">Lot created successfully</p>
          <p className="font-medium">ID: {createdLot.id}</p>
          <p className="text-sm">
            {createdLot.crop} · {createdLot.quantity} qtl · Grade {createdLot.grade}
          </p>
          <p className="text-sm text-primary mt-1">Status: {createdLot.status}</p>
          {refNumber && <p className="text-xs text-secondary mt-2">Ref: {refNumber}</p>}
        </div>
      )}
    </div>
  );

  const renderConnected = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 max-w-6xl mx-auto">
      {/* Transcript panel */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-4 flex flex-col h-[520px]">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">Live Call Transcript</span>
          {isSpeaking && (
            <span className="ml-auto text-xs text-primary flex items-center gap-1">
              <Icon name="Volume2" size={14} /> Speaking…
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {transcript.map((msg, i) => (
            <div
              key={i}
              className={`fade-in flex ${msg.type === 'farmer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed
                  ${
                    msg.type === 'system'
                      ? 'bg-background text-textDark rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm'
                  }`}
              >
                {msg.type === 'system' && (
                  <span className="block text-[10px] uppercase tracking-wide text-secondary mb-1">
                    Kisan Mitra IVR
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      </div>

      {/* Phone keypad panel */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-secondary">Keypad</span>
          <button
            onClick={endCall}
            className="px-3 py-1.5 rounded-xl bg-error text-white text-xs font-medium flex items-center gap-1"
          >
            <Icon name="PhoneOff" size={14} /> End
          </button>
        </div>

        <div className="w-full bg-background rounded-xl p-3 mb-5 text-center min-h-[48px] flex items-center justify-center">
          <span className="font-heading text-2xl tracking-widest text-textDark">
            {step === 2 && inputBuffer ? inputBuffer : '—'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <KeypadButton label="1" sub="ABC" onClick={() => handleDigit('1')} disabled={isSpeaking} />
          <KeypadButton label="2" sub="DEF" onClick={() => handleDigit('2')} disabled={isSpeaking} />
          <KeypadButton label="3" sub="GHI" onClick={() => handleDigit('3')} disabled={isSpeaking} />
          <KeypadButton label="4" sub="JKL" onClick={() => handleDigit('4')} disabled={isSpeaking} />
          <KeypadButton label="5" sub="MNO" onClick={() => handleDigit('5')} disabled={isSpeaking} />
          <KeypadButton label="6" sub="PQRS" onClick={() => handleDigit('6')} disabled={isSpeaking} />
          <KeypadButton label="7" sub="TUV" onClick={() => handleDigit('7')} disabled={isSpeaking} />
          <KeypadButton label="8" sub="WXYZ" onClick={() => handleDigit('8')} disabled={isSpeaking} />
          <KeypadButton label="9" onClick={() => handleDigit('9')} disabled={isSpeaking} />
          <KeypadButton label="*" onClick={() => handleDigit('*')} disabled={isSpeaking} />
          <KeypadButton label="0" onClick={() => handleDigit('0')} disabled={isSpeaking} />
          <KeypadButton label="#" onClick={() => handleDigit('#')} disabled={isSpeaking} />
        </div>

        <div className="mt-6 w-full">
          <p className="text-xs text-secondary mb-2">Current step</p>
          <div className="flex gap-1">
            {['Language', 'Crop', 'Quantity', 'Confirm'].map((label, i) => (
              <div
                key={label}
                className={`flex-1 h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <p className="text-xs text-center mt-2 font-medium text-textDark">
            {['Select Language', 'Select Crop', 'Enter Quantity', 'Accept / Reject', 'Done'][step]}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-inter">
      {renderNavbar()}
      <main>
        {callState === 'idle' && renderIdle()}
        {callState === 'ringing' && renderRinging()}
        {callState === 'connected' && renderConnected()}
        {callState === 'ended' && renderEnded()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
