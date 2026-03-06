import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function SettingsPanel() {
  const [keys, setKeys] = useState({
    deepseek: '',
    opencodeZen: '',
    openrouter: ''
  });

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium mb-1">Model Providers</h1>
        <p className="text-sm text-text-muted mb-8">Configure your API keys for various LLM providers to power the AI Elaboration Studio.</p>

        <div className="space-y-6">
          <ProviderInput 
            name="DeepSeek API Key" 
            value={keys.deepseek} 
            onChange={(v: string) => setKeys({...keys, deepseek: v})} 
          />
          <ProviderInput 
            name="Opencode Zen API Key" 
            value={keys.opencodeZen} 
            onChange={(v: string) => setKeys({...keys, opencodeZen: v})} 
          />
          <ProviderInput 
            name="OpenRouter API Key" 
            value={keys.openrouter} 
            onChange={(v: string) => setKeys({...keys, openrouter: v})} 
          />
        </div>
        
        <button className="mt-8 flex items-center space-x-2 px-4 py-2 bg-text text-bg hover:opacity-90 transition-opacity rounded-md text-sm font-medium">
          <Save size={16} />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
}

function ProviderInput({ name, value, onChange }: { name: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="border border-border p-4 bg-surface rounded-md">
      <label className="block text-sm font-medium text-text-muted mb-2">{name}</label>
      <input 
        type="password" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full bg-bg border border-border p-2 text-sm font-mono text-text focus:outline-none focus:border-primary rounded-md" 
        placeholder="sk-..." 
      />
    </div>
  );
}
