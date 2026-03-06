import React, { useState } from 'react';
import { MarkdownFile, ScriptDef } from '../types';
import { Plus, Trash2, Code } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

interface ScriptsEditorProps {
  file: MarkdownFile;
  onSave: (scripts: ScriptDef[]) => void;
}

export function ScriptsEditor({ file, onSave }: ScriptsEditorProps) {
  const [scripts, setScripts] = useState<ScriptDef[]>(
    (file.frontmatter.scripts as ScriptDef[]) || []
  );

  const addScript = () => {
    const newScripts = [...scripts, { name: 'new_script', language: 'bash', content: '#!/bin/bash\n' }];
    setScripts(newScripts);
    onSave(newScripts);
  };

  const updateScript = (index: number, field: keyof ScriptDef, value: string) => {
    const newScripts = [...scripts];
    newScripts[index] = { ...newScripts[index], [field]: value };
    setScripts(newScripts);
    onSave(newScripts);
  };

  const removeScript = (index: number) => {
    const newScripts = scripts.filter((_, i) => i !== index);
    setScripts(newScripts);
    onSave(newScripts);
  };

  return (
    <div className="flex flex-col h-full bg-bg p-4 overflow-y-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-text-muted">Skill Scripts Writer</h3>
          <p className="text-xs text-text-muted mt-1">Write executable scripts attached to this skill (agentskills.io spec).</p>
        </div>
        <button onClick={addScript} className="flex items-center space-x-2 px-3 py-1.5 border border-border hover:bg-surface transition-colors rounded-md text-sm font-medium text-text">
          <Plus size={16} />
          <span>Add Script</span>
        </button>
      </div>

      {scripts.map((script, i) => (
        <div key={i} className="border border-border bg-surface flex flex-col rounded-md overflow-hidden">
          <div className="flex items-center p-2 border-b border-border space-x-2 bg-bg">
            <Code size={16} className="text-text-muted" />
            <input 
              type="text" 
              value={script.name} 
              onChange={e => updateScript(i, 'name', e.target.value)} 
              className="bg-transparent border-none focus:outline-none text-sm font-mono text-text flex-1" 
              placeholder="Script Name" 
            />
            <select 
              value={script.language} 
              onChange={e => updateScript(i, 'language', e.target.value)} 
              className="bg-surface border border-border text-sm font-mono text-text-muted p-1 rounded-md focus:outline-none focus:border-primary"
            >
              <option value="bash">Bash</option>
              <option value="python">Python</option>
              <option value="node">Node.js</option>
            </select>
            <button onClick={() => removeScript(i)} className="p-1.5 text-text-muted hover:text-primary transition-colors rounded-md hover:bg-surface">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="w-full h-48 bg-[#1d1f21] overflow-y-auto border-t border-border">
            <Editor
              value={script.content}
              onValueChange={code => updateScript(i, 'content', code)}
              highlight={code => {
                const lang = script.language === 'node' ? 'javascript' : script.language;
                return Prism.highlight(
                  code,
                  Prism.languages[lang] || Prism.languages.javascript,
                  lang
                );
              }}
              padding={16}
              className="text-sm font-mono text-[#c5c8c6]"
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                minHeight: '100%',
              }}
              textareaClassName="focus:outline-none"
            />
          </div>
        </div>
      ))}
      {scripts.length === 0 && (
        <div className="text-center p-8 border border-border border-dashed text-text-muted text-sm rounded-md">
          No scripts attached to this skill. Scripts allow skills to execute local commands.
        </div>
      )}
    </div>
  );
}
