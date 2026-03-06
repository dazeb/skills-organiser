export interface ScriptDef {
  name: string;
  language: string;
  content: string;
}

export interface Frontmatter {
  name: string;
  description: string;
  version?: string;
  author?: string;
  scripts?: ScriptDef[];
  tools?: string | string[];
  'allowed-tools'?: string | string[];
  [key: string]: unknown;
}

export interface MarkdownFile {
  id: string;
  path: string;
  filename: string;
  directory: string;
  content: string;
  frontmatter: Frontmatter;
  status: 'Valid/Ready' | 'Needs Improvement' | 'Critical Flaw' | 'Unscanned';
  type: 'agent' | 'skill';
}

export interface MarkdownAgent extends MarkdownFile {
  type: 'agent';
}

export interface MarkdownSkill extends MarkdownFile {
  type: 'skill';
}

export interface DirectoryNode {
  name: string;
  path: string;
  type: 'directory' | 'file';
  children?: DirectoryNode[];
  file?: MarkdownFile;
}
