import React, { useState, useEffect } from 'react';
import { MarkdownFile, Frontmatter } from '../types';
import { Activity, CheckCircle, AlertTriangle, XCircle, Play, Info } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FrontmatterEditor } from './FrontmatterEditor';
import { ScriptsEditor } from './ScriptsEditor';
import { AgentConnections } from './AgentConnections';

interface DashboardProps {
  selectedFile: MarkdownFile | null;
  allFiles: MarkdownFile[];
}

export function Dashboard({ selectedFile: initialSelectedFile, allFiles }: DashboardProps) {
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(initialSelectedFile);
  const [activeTab, setActiveTab] = useState<'markdown' | 'scripts' | 'connections'>('markdown');

  useEffect(() => {
    setSelectedFile(initialSelectedFile);
    setActiveTab('markdown');
  }, [initialSelectedFile]);

  if (!selectedFile) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
        Select an agent or skill from the sidebar to view details.
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid/Ready': return <CheckCircle size={16} className="text-accent" />;
      case 'Needs Improvement': return <AlertTriangle size={16} className="text-secondary" />;
      case 'Critical Flaw': return <XCircle size={16} className="text-primary" />;
      default: return <Activity size={16} className="text-text-muted" />;
    }
  };

  const handleSaveFrontmatter = (updatedFrontmatter: Frontmatter) => {
    setSelectedFile({
      ...selectedFile,
      frontmatter: updatedFrontmatter
    });
    // In a real app, this would also save to the file system via Tauri
  };

  // Generate raw frontmatter string
  const rawFrontmatter = `---\n${Object.entries(selectedFile.frontmatter)
    .filter(([key]) => key !== 'scripts') // Exclude scripts from raw string for brevity
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(v => `  - ${v}`).join('\n')}`;
      }
      return `${key}: ${typeof value === 'string' && value.includes(':') ? `"${value}"` : value}`;
    })
    .join('\n')}\n---`;

  // Best Practices Checks
  const hasToolScoping = !!selectedFile.frontmatter.tools || !!selectedFile.frontmatter['allowed-tools'];
  const hasInvocationTriggers = selectedFile.frontmatter.description?.toLowerCase().includes('proactively') || 
                                selectedFile.frontmatter.description?.toLowerCase().includes('use when') ||
                                selectedFile.frontmatter.description?.toLowerCase().includes('must be used');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-medium">{selectedFile.frontmatter.name || selectedFile.filename}</h2>
          <p className="text-xs font-mono text-text-muted mt-1">{selectedFile.path}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 border border-border bg-surface rounded-md">
            {getStatusIcon(selectedFile.status)}
            <span className="text-sm font-medium">{selectedFile.status}</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-1.5 bg-text text-bg hover:opacity-90 transition-opacity rounded-md text-sm font-medium">
            <Play size={16} />
            <span>Analyze {selectedFile.type === 'agent' ? 'Agent' : 'Skill'}</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Frontmatter Editor & Validation */}
        <div className="w-1/3 min-w-[350px] border-r border-border flex flex-col overflow-hidden bg-bg">
          <div className="flex-1 overflow-hidden border-b border-border">
            <FrontmatterEditor file={selectedFile} onSave={handleSaveFrontmatter} />
          </div>
          
          <div className="p-4 bg-bg overflow-y-auto max-h-[40%]">
            <h3 className="text-sm font-medium text-text-muted mb-4">Structure Check</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-center space-x-2 text-text">
                <CheckCircle size={16} className="text-accent" />
                <span>Description Section</span>
              </li>
              <li className="flex items-center space-x-2 text-text">
                {selectedFile.content.includes('## Usage') || selectedFile.content.includes('When invoked') ? 
                  <CheckCircle size={16} className="text-accent" /> : 
                  <AlertTriangle size={16} className="text-secondary" />
                }
                <span>Usage Section</span>
              </li>
              <li className="flex items-center space-x-2 text-text">
                {selectedFile.content.includes('## Commands') || selectedFile.content.includes('checklist') ? 
                  <CheckCircle size={16} className="text-accent" /> : 
                  <XCircle size={16} className="text-primary" />
                }
                <span>Commands / Checklist</span>
              </li>
            </ul>

            <h3 className="text-sm font-medium text-text-muted mb-4 flex items-center space-x-1">
              <Info size={16} />
              <span>Best Practices</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-text">
                {hasToolScoping ? 
                  <CheckCircle size={16} className="text-accent" /> : 
                  <AlertTriangle size={16} className="text-secondary" />
                }
                <span className="flex-1">Explicit Tool Scoping</span>
              </li>
              {!hasToolScoping && (
                <p className="text-xs text-text-muted ml-6 -mt-1 mb-2">Add `tools` or `allowed-tools` to limit access for security.</p>
              )}

              <li className="flex items-center space-x-2 text-text">
                {hasInvocationTriggers ? 
                  <CheckCircle size={16} className="text-accent" /> : 
                  <AlertTriangle size={16} className="text-secondary" />
                }
                <span className="flex-1">Autonomous Invocation Triggers</span>
              </li>
              {!hasInvocationTriggers && (
                <p className="text-xs text-text-muted ml-6 -mt-1 mb-2">Include "proactively" or "Use when" in description for automatic invocation.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Right Panel: Markdown Content & Tabs */}
        <div className="flex-1 flex flex-col bg-bg">
          <div className="p-0 border-b border-border flex bg-surface">
            <button 
              onClick={() => setActiveTab('markdown')} 
              className={`px-4 py-2 text-sm font-medium border-r border-border transition-colors ${activeTab === 'markdown' ? 'bg-bg text-text' : 'text-text-muted hover:bg-bg/50'}`}
            >
              Raw Markdown
            </button>
            
            {selectedFile.type === 'skill' && (
              <button 
                onClick={() => setActiveTab('scripts')} 
                className={`px-4 py-2 text-sm font-medium border-r border-border transition-colors ${activeTab === 'scripts' ? 'bg-bg text-text' : 'text-text-muted hover:bg-bg/50'}`}
              >
                Scripts Writer
              </button>
            )}
            
            {selectedFile.type === 'agent' && (
              <button 
                onClick={() => setActiveTab('connections')} 
                className={`px-4 py-2 text-sm font-medium border-r border-border transition-colors ${activeTab === 'connections' ? 'bg-bg text-text' : 'text-text-muted hover:bg-bg/50'}`}
              >
                Connections
              </button>
            )}
            
            <div className="flex-1"></div>
            <button className="px-3 py-1 my-1 mr-1 border border-border text-sm font-medium hover:bg-bg transition-colors rounded-md">
              Elaborate
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'markdown' && (
              <div className="flex-1 overflow-y-auto bg-[#1E1E1E]">
                <SyntaxHighlighter
                  language="markdown"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {`${rawFrontmatter}\n\n${selectedFile.content}`}
                </SyntaxHighlighter>
              </div>
            )}
            
            {activeTab === 'scripts' && selectedFile.type === 'skill' && (
              <ScriptsEditor 
                file={selectedFile} 
                onSave={(scripts) => handleSaveFrontmatter({ ...selectedFile.frontmatter, scripts })} 
              />
            )}
            
            {activeTab === 'connections' && selectedFile.type === 'agent' && (
              <AgentConnections agent={selectedFile} allFiles={allFiles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
