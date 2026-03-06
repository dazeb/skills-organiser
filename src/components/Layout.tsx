import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { SkillsPanel } from './SkillsPanel';
import { SettingsPanel } from './SettingsPanel';
import { scanDirectories, loadLocalFolder } from '../lib/mockTauri';
import { DirectoryNode, MarkdownFile } from '../types';
import { FolderSearch, AlertCircle } from 'lucide-react';

export function Layout() {
  const [fileSystem, setFileSystem] = useState<DirectoryNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null);
  const [view, setView] = useState<'home' | 'settings' | 'file'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetectionPopup, setShowDetectionPopup] = useState(false);
  const [detectedFolders, setDetectedFolders] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const detectFolders = async () => {
      // Simulate a brief delay for detection script
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const detected = ['.codex', '.claude'];
      setDetectedFolders(detected);
      
      const initialSelected: Record<string, boolean> = {};
      detected.forEach(folder => {
        initialSelected[folder] = false; // Default to no
      });
      setSelectedFolders(initialSelected);
      
      setShowDetectionPopup(true);
    };
    
    detectFolders();
  }, []);

  const handleLoadFolder = async () => {
    setIsLoading(true);
    const data = await loadLocalFolder();
    setFileSystem(data);
    setIsLoading(false);
  };

  const handleConfirmDetection = async () => {
    setShowDetectionPopup(false);
    setIsLoading(true);
    
    const data = await loadLocalFolder();
    
    // Filter data based on selected folders
    const filteredData = data.filter(node => {
      return selectedFolders[node.name] === true;
    });
    
    if (filteredData.length > 0) {
      setFileSystem(filteredData);
    }
    
    setIsLoading(false);
  };

  const getAllFiles = (nodes: DirectoryNode[]): MarkdownFile[] => {
    let files: MarkdownFile[] = [];
    for (const node of nodes) {
      if (node.type === 'file' && node.file) {
        files.push(node.file);
      } else if (node.children) {
        files = files.concat(getAllFiles(node.children));
      }
    }
    return files;
  };

  const allFiles = getAllFiles(fileSystem);

  const renderDetectionPopup = () => {
    if (!showDetectionPopup) return null;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-surface border border-border p-6 rounded-lg max-w-md w-full shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-text" size={24} />
            <h3 className="text-lg font-medium">Workspace Detected</h3>
          </div>
          <p className="text-sm text-text-muted mb-6">
            Scripts and agents detected in .codex / .claude
          </p>
          
          <div className="space-y-4 mb-8">
            {detectedFolders.map(folder => (
              <div key={folder} className="flex items-center justify-between p-3 bg-bg rounded-md border border-border">
                <span className="text-sm font-medium">Do you want to work in the home {folder} folder?</span>
                <div className="flex gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => setSelectedFolders(prev => ({ ...prev, [folder]: true }))}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      selectedFolders[folder] === true 
                        ? 'bg-text text-bg border-text' 
                        : 'bg-transparent border-border text-text-muted hover:text-text hover:border-text-muted'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setSelectedFolders(prev => ({ ...prev, [folder]: false }))}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      selectedFolders[folder] === false 
                        ? 'bg-text text-bg border-text' 
                        : 'bg-transparent border-border text-text-muted hover:text-text hover:border-text-muted'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDetectionPopup(false)}
              className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleConfirmDetection}
              className="px-4 py-2 bg-text text-bg text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (fileSystem.length === 0) {
    return (
      <div className="flex h-screen w-full bg-bg text-text overflow-hidden font-sans items-center justify-center relative">
        {renderDetectionPopup()}
        <div className="max-w-md w-full border border-border p-8 bg-surface flex flex-col items-center text-center rounded-lg">
          <FolderSearch size={48} className="text-text-muted mb-6" />
          <h2 className="text-xl font-medium mb-2">No Workspace Loaded</h2>
          <p className="text-sm text-text-muted mb-8 leading-relaxed">
            Load a local folder to scan for standalone agents and skills across your environment (e.g., <code className="font-mono text-xs bg-bg px-1 py-0.5 rounded">~/.codex</code>, <code className="font-mono text-xs bg-bg px-1 py-0.5 rounded">~/.claude</code>).
          </p>
          <button 
            onClick={handleLoadFolder} 
            disabled={isLoading}
            className="px-6 py-2 bg-text text-bg text-sm font-medium hover:opacity-90 transition-opacity rounded-md disabled:opacity-50"
          >
            {isLoading ? 'Scanning...' : 'Load Folder'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-bg text-text overflow-hidden font-sans relative">
      {renderDetectionPopup()}
      <Sidebar 
        fileSystem={fileSystem} 
        onSelectFile={(f) => { setSelectedFile(f); setView('file'); }} 
        selectedFile={selectedFile} 
        onGoHome={() => { setSelectedFile(null); setView('home'); }}
        onGoSettings={() => { setView('settings'); }}
        onLoadFolder={handleLoadFolder}
        currentView={view}
      />
      <main className="flex-1 flex flex-col border-l border-border overflow-hidden">
        {view === 'settings' ? (
          <SettingsPanel />
        ) : view === 'file' && selectedFile ? (
          <Dashboard selectedFile={selectedFile} allFiles={allFiles} />
        ) : (
          <SkillsPanel files={allFiles} onSelectFile={(f) => { setSelectedFile(f); setView('file'); }} />
        )}
      </main>
    </div>
  );
}
