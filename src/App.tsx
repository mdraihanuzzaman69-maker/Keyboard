/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  Type, 
  Mic, 
  Smartphone, 
  Palette, 
  Languages, 
  History, 
  Layout,
  Vibrate,
  Volume2,
  Check,
  Undo2,
  Trash2,
  Smile,
  Hash,
  Download,
  Info,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface KeyboardSettings {
  vibration: boolean;
  sound: boolean;
  voiceTyping: boolean;
  autoCorrect: boolean;
  suggestionBar: boolean;
  height: number;
  theme: 'dark' | 'light' | 'amoled' | 'gradient';
  language: 'english' | 'banglish';
  numberRow: boolean;
}

// --- Utils ---

const phonetics: Record<string, string> = {
  "ami": "আমি",
  "tumi": "তুমি",
  "bhalo": "ভালো",
  "kemon": "কেমন",
  "acho": "আছো",
  "bangla": "বাংলা",
  "desh": "দেশ",
  "dhaka": "ঢাকা",
  "shonar": "সোনার",
};

const translateToBangla = (text: string) => {
  const words = text.split(' ');
  return words.map(word => phonetics[word.toLowerCase()] || word).join(' ');
};

// --- Components ---

const Key = ({ 
  label, 
  onClick, 
  className = "", 
  variant = "default",
  active = false 
}: { 
  label: React.ReactNode; 
  onClick: () => void; 
  className?: string;
  variant?: "default" | "special" | "space" | "action";
  active?: boolean;
}) => {
  const getVariantStyles = () => {
    switch(variant) {
      case "special": return "bg-zinc-800 text-zinc-400";
      case "space": return "bg-zinc-700/50 w-full";
      case "action": return "bg-blue-600 text-white font-semibold";
      default: return "bg-zinc-700 text-white";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`h-12 flex items-center justify-center rounded-lg shadow-sm transition-colors text-sm ${getVariantStyles()} ${className} ${active ? 'ring-2 ring-blue-500' : ''}`}
      id={`key-${typeof label === 'string' ? label.toLowerCase() : 'icon'}`}
    >
      {label}
    </motion.button>
  );
};

export default function App() {
  const [displayText, setDisplayText] = useState("");
  const [activeTab, setActiveTab] = useState<'preview' | 'settings' | 'guide'>('preview');
  const [settings, setSettings] = useState<KeyboardSettings>({
    vibration: true,
    sound: true,
    voiceTyping: true,
    autoCorrect: true,
    suggestionBar: true,
    height: 250,
    theme: 'dark',
    language: 'banglish',
    numberRow: true,
  });
  const [isShift, setIsShift] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [clipboard, setClipboard] = useState<string[]>([]);

  // Simulation Logic
  const handleKey = (key: string) => {
    if (key === 'SHIFT') {
      setIsShift(!isShift);
    } else if (key === 'DEL') {
      setDisplayText(prev => prev.slice(0, -1));
      setCurrentWord(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      if (settings.language === 'banglish' && currentWord) {
        const translated = translateToBangla(currentWord);
        setDisplayText(prev => prev.slice(0, -currentWord.length) + translated + " ");
      } else {
        setDisplayText(prev => prev + " ");
      }
      setCurrentWord("");
    } else if (key === 'ENTER') {
      setDisplayText(prev => prev + "\n");
      setCurrentWord("");
    } else {
      const char = isShift ? key.toUpperCase() : key.toLowerCase();
      setDisplayText(prev => prev + char);
      setCurrentWord(prev => prev + char);
    }
  };

  const rows = [
    settings.numberRow ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] : [],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
    ["123", "LANG", "SPACE", "VOICE", "ENTER"]
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 border-bottom border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Smartphone className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Elite Premium</h1>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Android Keyboard Pro
            </p>
          </div>
        </div>
        <nav className="flex bg-zinc-800/50 p-1 rounded-full border border-zinc-700/50">
          {[
            { id: 'preview', label: 'Simulator', icon: Monitor },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'guide', label: 'Guide', icon: Download },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-2xl flex flex-col gap-8"
            >
              {/* Output Display */}
              <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative group">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setDisplayText("")} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-zinc-500 mb-2 uppercase tracking-widest font-bold font-mono">Simulated Input Field</div>
                <div className="min-h-[120px] text-xl font-medium text-zinc-200 outline-none whitespace-pre-wrap break-words">
                  {displayText || <span className="text-zinc-700 italic">Type something... (e.g. "ami bhalo")</span>}
                  <span className="w-0.5 h-6 bg-blue-500 inline-block align-middle ml-1 animate-pulse" />
                </div>
              </div>

              {/* Keyboard Simulator */}
              <div className="bg-zinc-900 rounded-3xl p-3 border border-zinc-800 shadow-2xl w-full">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/50 mb-3">
                  <div className="flex gap-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${settings.language === 'banglish' ? 'text-blue-400' : 'text-zinc-500'}`}>
                      {settings.language === 'banglish' ? 'Banglish Mode' : 'English Mode'}
                    </span>
                    {isShift && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Caps Lock</span>}
                  </div>
                  <div className="flex gap-2">
                    {settings.voiceTyping && <Mic className="w-3 h-3 text-zinc-600" />}
                    <Vibrate className={`w-3 h-3 ${settings.vibration ? 'text-blue-500' : 'text-zinc-700'}`} />
                  </div>
                </div>

                {/* Suggestion Bar */}
                {settings.suggestionBar && (
                  <div className="h-10 flex gap-4 px-2 mb-2 overflow-x-auto no-scrollbar items-center border-b border-zinc-800/30">
                    {currentWord ? (
                      <>
                        <button className="text-sm px-3 py-1 bg-zinc-800 rounded text-blue-400 font-medium whitespace-nowrap">
                          {translateToBangla(currentWord)}
                        </button>
                        <button className="text-sm px-3 py-1 text-zinc-400 whitespace-nowrap">{currentWord.toLowerCase()}</button>
                        <button className="text-sm px-3 py-1 text-zinc-400 whitespace-nowrap">{currentWord.toUpperCase()}</button>
                      </>
                    ) : (
                      <div className="flex gap-4 opacity-30 text-xs uppercase tracking-tighter font-bold">
                        <span>Predictive</span>
                        <span>Suggestions</span>
                        <span>Appear</span>
                        <span>Here</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rows */}
                <div className="flex flex-col gap-1.5">
                  {rows.map((row, i) => (
                    <div key={i} className="flex gap-1.5 justify-center">
                      {row.map((key) => {
                        let content: React.ReactNode = key;
                        let variant: "default" | "special" | "space" | "action" = "default";
                        let className = "flex-1";

                        if (key === "SHIFT") {
                          content = <Layout className={`w-4 h-4 ${isShift ? 'text-blue-400 fill-blue-400/20' : ''}`} />;
                          variant = "special";
                        } else if (key === "DEL") {
                          content = <Undo2 className="w-4 h-4" />;
                          variant = "special";
                        } else if (key === "SPACE") {
                          content = settings.language === 'banglish' ? 'Bengali' : 'Space';
                          variant = "space";
                          className = "flex-[4]";
                        } else if (key === "VOICE") {
                          content = <Mic className="w-4 h-4" />;
                          variant = "special";
                        } else if (key === "123") {
                          content = "?123";
                          variant = "special";
                        } else if (key === "LANG") {
                          content = <Languages className="w-4 h-4 text-zinc-500" />;
                          variant = "special";
                        } else if (key === "ENTER") {
                          content = <ChevronRight className="w-5 h-5" />;
                          variant = "action";
                        }

                        return (
                          <Key 
                            key={key} 
                            label={content} 
                            variant={variant}
                            className={className}
                            onClick={() => handleKey(key)}
                            active={key === 'SHIFT' && isShift}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-xl"
            >
              <div className="space-y-6">
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Typing & Feedback
                  </h3>
                  <div className="grid gap-3">
                    <ToggleItem 
                      icon={Vibrate} 
                      label="Key Haptic Vibration" 
                      description="Provides tactile feedback on touch"
                      enabled={settings.vibration} 
                      onToggle={() => setSettings(s => ({ ...s, vibration: !s.vibration }))} 
                    />
                    <ToggleItem 
                      icon={Volume2} 
                      label="Keypress Sound" 
                      description="Play audio feedback when typing"
                      enabled={settings.sound} 
                      onToggle={() => setSettings(s => ({ ...s, sound: !s.sound }))} 
                    />
                    <ToggleItem 
                      icon={Languages} 
                      label="Phonetic Banglish Mode" 
                      description="Translate 'ami' to 'আমি' automatically"
                      enabled={settings.language === 'banglish'} 
                      onToggle={() => setSettings(s => ({ ...s, language: s.language === 'banglish' ? 'english' : 'banglish' }))} 
                    />
                  </div>
                </section>

                <div className="h-px bg-zinc-800" />

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 mb-6 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Interface Design
                  </h3>
                  <div className="grid gap-3">
                    <ToggleItem 
                      icon={Hash} 
                      label="Always Show Number Row" 
                      description="Display numbers above alphabetical keys"
                      enabled={settings.numberRow} 
                      onToggle={() => setSettings(s => ({ ...s, numberRow: !s.numberRow }))} 
                    />
                    <ToggleItem 
                      icon={Layout} 
                      label="Real-time Suggestions" 
                      description="Show prediction bar above keyboard"
                      enabled={settings.suggestionBar} 
                      onToggle={() => setSettings(s => ({ ...s, suggestionBar: !s.suggestionBar }))} 
                    />
                  </div>
                </section>

                <div className="pt-6 flex gap-4">
                  <button 
                    onClick={() => setSettings({
                      vibration: true,
                      sound: true,
                      voiceTyping: true,
                      autoCorrect: true,
                      suggestionBar: true,
                      height: 250,
                      theme: 'dark',
                      language: 'banglish',
                      numberRow: true,
                    })}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Reset Defaults
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div 
              key="guide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-2xl space-y-8"
            >
              <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl flex items-start gap-4">
                <Info className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-400">Pro Developer View</h3>
                  <p className="text-sm text-blue-100/70 leading-relaxed mt-1">
                    The Android source code has been scaffolded in the <code>/android</code> directory. You can download the project and open it in Android Studio.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Download className="text-emerald-400" /> Installation Guide
                  </h3>
                  <ol className="space-y-4 text-sm text-zinc-400 list-decimal pl-4">
                    <li>Open <strong>Android Studio</strong></li>
                    <li>Import the project from the <code>/android</code> folder</li>
                    <li>Ensure <strong>Gradle 8.1+</strong> is installed</li>
                    <li>Connect your Android device or Emulator</li>
                    <li>Click <strong>Run (Shift + F10)</strong></li>
                  </ol>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Smartphone className="text-blue-400" /> Enable Keyboard
                  </h3>
                  <ul className="space-y-4 text-sm text-zinc-400 list-disc pl-4">
                    <li>Go to Android <strong>Settings</strong></li>
                    <li>Search for <strong>"Manage Keyboards"</strong></li>
                    <li>Enable <strong>Elite Premium Keyboard</strong></li>
                    <li>Tap on any input field and switch to your new keyboard!</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="p-4 text-center text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
        Elite Premium Keyboard Engine &copy; 2026 • Production Ready
      </footer>
    </div>
  );
}

// --- Helper UI Components ---

function ToggleItem({ 
  icon: Icon, 
  label, 
  description, 
  enabled, 
  onToggle 
}: { 
  icon: any, 
  label: string, 
  description: string, 
  enabled: boolean, 
  onToggle: () => void 
}) {
  return (
    <div 
      onClick={onToggle}
      className="flex items-center justify-between p-4 bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-800 rounded-2xl cursor-pointer transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl transition-colors ${enabled ? 'bg-blue-600/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{label}</div>
          <div className="text-xs text-zinc-500">{description}</div>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${enabled ? 'bg-blue-600' : 'bg-zinc-700'}`}>
        <motion.div 
          animate={{ x: enabled ? 24 : 0 }}
          className="w-4 h-4 bg-white rounded-full shadow-sm" 
        />
      </div>
    </div>
  );
}
