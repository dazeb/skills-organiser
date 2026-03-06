import React, { useState } from 'react';
import { DirectoryNode, MarkdownFile } from '../types';
import { Folder, File, ChevronRight, ChevronDown, LayoutGrid, Settings, FolderSearch } from 'lucide-react';

interface SidebarProps {
  fileSystem: DirectoryNode[];
  onSelectFile: (file: MarkdownFile) => void;
  selectedFile: MarkdownFile | null;
  onGoHome: () => void;
  onGoSettings: () => void;
  onLoadFolder: () => void;
  currentView: 'home' | 'settings' | 'file';
}

export function Sidebar({ fileSystem, onSelectFile, selectedFile, onGoHome, onGoSettings, onLoadFolder, currentView }: SidebarProps) {
  return (
    <aside className="w-64 h-full flex flex-col border-r border-border bg-bg">
      <div className="p-4 border-b border-border flex flex-col gap-2">
        <h1 className="text-sm font-medium text-text-muted mb-2">Local Agents</h1>
        <button 
          onClick={onGoHome}
          className={`flex items-center space-x-2 px-2 py-1.5 w-full text-left text-sm transition-colors rounded-md ${currentView === 'home' ? 'bg-surface text-text' : 'text-text-muted hover:bg-surface hover:text-text'}`}
        >
          <LayoutGrid size={16} />
          <span>All Skills</span>
        </button>
        <button 
          onClick={onGoSettings}
          className={`flex items-center space-x-2 px-2 py-1.5 w-full text-left text-sm transition-colors rounded-md ${currentView === 'settings' ? 'bg-surface text-text' : 'text-text-muted hover:bg-surface hover:text-text'}`}
        >
          <Settings size={16} />
          <span>Providers & Settings</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {fileSystem.map((node, i) => (
          <TreeNode 
            key={i} 
            node={node} 
            onSelectFile={onSelectFile} 
            selectedFile={currentView === 'file' ? selectedFile : null} 
          />
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button 
          onClick={onLoadFolder}
          className="flex items-center justify-center space-x-2 px-2 py-2 w-full border border-border text-sm text-text-muted hover:bg-surface hover:text-text transition-colors rounded-md"
        >
          <FolderSearch size={16} />
          <span>Load Folder</span>
        </button>
      </div>
    </aside>
  );
}

interface TreeNodeProps {
  key?: React.Key;
  node: DirectoryNode;
  onSelectFile: (file: MarkdownFile) => void;
  selectedFile: MarkdownFile | null;
  depth?: number;
}

function TreeNode({ node, onSelectFile, selectedFile, depth = 0 }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedFile?.id === node.file?.id;

  if (node.type === 'directory') {
    return (
      <div className="flex flex-col">
        <div 
          className="flex items-center py-1.5 px-2 cursor-pointer hover:bg-surface rounded-md text-text-muted hover:text-text"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
          <Folder size={16} className="mr-2" />
          <span className="text-sm">{node.name}</span>
        </div>
        {isOpen && node.children?.map((child, i) => (
          <TreeNode 
            key={i} 
            node={child} 
            onSelectFile={onSelectFile} 
            selectedFile={selectedFile} 
            depth={depth + 1} 
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center py-1.5 px-2 cursor-pointer rounded-md text-sm ${isSelected ? 'bg-surface text-text' : 'text-text-muted hover:bg-surface hover:text-text'}`}
      style={{ paddingLeft: `${depth * 12 + 24}px` }}
      onClick={() => node.file && onSelectFile(node.file)}
    >
      <File size={16} className="mr-2" />
      <span className="truncate">{node.name}</span>
    </div>
  );
}
