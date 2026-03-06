import React, { useMemo } from 'react';
import { MarkdownFile } from '../types';
import { Link, Plus, Info, Copy, FolderInput } from 'lucide-react';
import { calculateTfIdfSimilarity } from '../utils/tfidf';

interface AgentConnectionsProps {
  agent: MarkdownFile;
  allFiles: MarkdownFile[];
}

export function AgentConnections({ agent, allFiles }: AgentConnectionsProps) {
  const suggestedSkills = useMemo(() => {
    const skills = allFiles.filter(f => f.type === 'skill');
    const agentText = (agent.content + ' ' + JSON.stringify(agent.frontmatter)).toLowerCase();
    
    // Create a corpus of all documents for IDF calculation
    const allDocs = allFiles.map(f => (f.content + ' ' + JSON.stringify(f.frontmatter)).toLowerCase());
    
    return skills.map(skill => {
      const skillText = (skill.content + ' ' + JSON.stringify(skill.frontmatter)).toLowerCase();
      
      // Calculate TF-IDF Cosine Similarity
      let similarity = calculateTfIdfSimilarity(agentText, skillText, allDocs);
      
      // Scale similarity to a readable score (e.g., 0-100)
      let score = Math.round(similarity * 100);
      
      // Boost score if agent explicitly mentions the skill name
      if (agentText.includes(skill.frontmatter.name.toLowerCase())) {
        score += 30; // Significant boost for explicit mention
      }

      // Check if it's standalone (in a global /skills/ folder, not inside an agent folder)
      const isStandalone = !skill.directory.includes('/agents/');

      return { skill, score, isStandalone };
    }).filter(s => s.score > 5).sort((a, b) => b.score - a.score); // Filter out very low scores
  }, [agent, allFiles]);

  const hasStandaloneMatches = suggestedSkills.some(s => s.isStandalone);

  return (
    <div className="flex flex-col h-full bg-bg p-4 overflow-y-auto space-y-6">
      <div>
        <h3 className="text-sm font-medium text-text-muted mb-2">Suggested Skills</h3>
        <p className="text-xs text-text-muted mb-4">Based on agentskills.io best practices, these skills match the agent's capabilities and should be connected.</p>
        
        {hasStandaloneMatches && (
          <div className="border border-primary/30 bg-primary/10 p-3 mb-6 flex items-start space-x-3 rounded-md">
            <Info size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-primary">Best Practice: Link Standalone Skills</h4>
              <p className="text-xs text-primary/70 mt-1">Standalone skills matching this agent should be moved or copied to the agent's local folder to ensure portability and strict scoping.</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {suggestedSkills.map(({ skill, score, isStandalone }) => (
            <div key={skill.id} className="border border-border p-3 flex flex-col bg-surface hover:bg-surface/80 transition-colors rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Link size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text">{skill.frontmatter.name || skill.filename}</span>
                  <span className="text-xs font-mono text-accent border border-accent/30 px-1.5 py-0.5 bg-accent/10 rounded-md">Match Score: {score}</span>
                  {isStandalone ? (
                    <span className="text-xs font-mono text-secondary border border-secondary/30 px-1.5 py-0.5 bg-secondary/10 rounded-md">Standalone</span>
                  ) : (
                    <span className="text-xs font-mono text-primary border border-primary/30 px-1.5 py-0.5 bg-primary/10 rounded-md">Linked</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-text-muted mb-3">{skill.frontmatter.description}</p>
              
              <div className="flex items-center space-x-2 border-t border-border pt-3 mt-auto">
                {isStandalone ? (
                  <>
                    <button className="flex items-center space-x-1 px-2 py-1.5 border border-border hover:bg-bg text-text-muted hover:text-text transition-colors rounded-md text-xs font-medium">
                      <Copy size={14} />
                      <span>Copy to Agent</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1.5 border border-border hover:bg-bg text-text-muted hover:text-text transition-colors rounded-md text-xs font-medium">
                      <FolderInput size={14} />
                      <span>Move to Agent</span>
                    </button>
                  </>
                ) : (
                  <button className="flex items-center space-x-1 px-2 py-1.5 border border-border bg-bg text-text-muted/50 cursor-not-allowed rounded-md text-xs font-medium">
                    <Plus size={14} />
                    <span>Already Linked</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {suggestedSkills.length === 0 && (
            <div className="text-center p-8 border border-border border-dashed text-text-muted text-sm rounded-md">
              No highly correlated skills found for this agent. Try adding more specific keywords to the agent's description.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
