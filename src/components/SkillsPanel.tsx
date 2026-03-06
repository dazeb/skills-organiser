import React, { useState } from 'react';
import { MarkdownFile } from '../types';
import { Box, Folder, Link } from 'lucide-react';

interface SkillsPanelProps {
  files: MarkdownFile[];
  onSelectFile: (file: MarkdownFile) => void;
}

export function SkillsPanel({ files, onSelectFile }: SkillsPanelProps) {
  const skills = files.filter(f => f.type === 'skill');
  
  const standaloneSkills = skills.filter(s => !s.directory.includes('/agents/'));
  const linkedSkills = skills.filter(s => s.directory.includes('/agents/'));

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-medium mb-1">Skills</h1>
        <p className="text-sm text-text-muted mb-8">
          Give Codex superpowers. <a href="#" className="text-primary hover:underline">Learn more</a>
        </p>

        {standaloneSkills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-text-muted mb-4 flex items-center space-x-2">
              <span>Standalone Skills</span>
              <span className="px-2 py-0.5 bg-surface text-xs rounded-md">{standaloneSkills.length}</span>
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {standaloneSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} onClick={() => onSelectFile(skill)} isStandalone={true} />
              ))}
            </div>
          </div>
        )}

        {linkedSkills.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-text-muted mb-4 flex items-center space-x-2">
              <span>Agent-Linked Skills</span>
              <span className="px-2 py-0.5 bg-surface text-xs rounded-md">{linkedSkills.length}</span>
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {linkedSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} onClick={() => onSelectFile(skill)} isStandalone={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface SkillCardProps {
  key?: React.Key;
  skill: MarkdownFile;
  onClick: () => void;
  isStandalone: boolean;
}

function SkillCard({ skill, onClick, isStandalone }: SkillCardProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div 
      onClick={onClick}
      className="border border-border p-4 flex items-center space-x-4 cursor-pointer hover:bg-surface transition-colors group bg-bg rounded-lg"
    >
      <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center border border-border bg-surface rounded-md relative">
        <Box size={18} className="text-text-muted group-hover:text-text transition-colors" />
        {!isStandalone && (
          <div className="absolute -bottom-1 -right-1 bg-bg border border-border p-0.5 rounded-sm">
            <Link size={10} className="text-primary" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-sm font-medium truncate text-text group-hover:text-text">{skill.frontmatter.name || skill.filename}</h3>
          <div className="flex items-center space-x-1 px-1.5 py-0.5 border border-border bg-surface rounded-md">
            <Folder size={10} className="text-text-muted" />
            <span className="text-xs font-mono text-text-muted truncate max-w-[100px]" title={skill.directory}>
              {skill.directory.split('/').pop()}
            </span>
          </div>
        </div>
        <p className="text-sm text-text-muted truncate">
          {skill.frontmatter.description || 'No description provided.'}
        </p>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); setEnabled(!enabled); }}
        className={`w-9 h-5 border relative flex items-center p-[1px] transition-colors rounded-full ${enabled ? 'border-primary bg-primary/20' : 'border-border bg-surface'}`}
      >
        <div className={`w-4 h-full rounded-full transition-transform ${enabled ? 'bg-primary translate-x-4' : 'bg-text-muted translate-x-0'}`}></div>
      </button>
    </div>
  );
}
