import { DirectoryNode, MarkdownAgent, MarkdownSkill } from '../types';

export const mockFileSystem: DirectoryNode[] = [
  {
    name: '.claude',
    path: '.claude',
    type: 'directory',
    children: [
      {
        name: 'agents',
        path: '.claude/agents',
        type: 'directory',
        children: [
          {
            name: 'code-reviewer.md',
            path: '.claude/agents/code-reviewer.md',
            type: 'file',
            file: {
              id: 'a2',
              path: '.claude/agents/code-reviewer.md',
              filename: 'code-reviewer.md',
              directory: '.claude/agents',
              type: 'agent',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'code-reviewer',
                description: 'Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.',
                tools: 'Read, Grep, Glob, Bash',
                model: 'inherit'
              },
              content: 'You are a senior code reviewer ensuring high standards of code quality and security.\n\nWhen invoked:\n1. Run git diff to see recent changes\n2. Focus on modified files\n3. Begin review immediately\n\nReview checklist:\n- Code is simple and readable\n- Functions and variables are well-named\n- No duplicated code\n- Proper error handling\n- No exposed secrets or API keys\n- Input validation implemented\n- Good test coverage\n- Performance considerations addressed\n\nProvide feedback organized by priority:\n- Critical issues (must fix)\n- Warnings (should fix)\n- Suggestions (consider improving)\n\nInclude specific examples of how to fix issues.'
            } as MarkdownAgent
          },
          {
            name: 'debugger.md',
            path: '.claude/agents/debugger.md',
            type: 'file',
            file: {
              id: 'a3',
              path: '.claude/agents/debugger.md',
              filename: 'debugger.md',
              directory: '.claude/agents',
              type: 'agent',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'debugger',
                description: 'Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.',
                tools: 'Read, Edit, Bash, Grep, Glob',
                model: 'sonnet'
              },
              content: 'You are an expert debugger specializing in root cause analysis.\n\nWhen invoked:\n1. Capture error message and stack trace\n2. Identify reproduction steps\n3. Isolate the failure location\n4. Implement minimal fix\n5. Verify solution works\n\nDebugging process:\n- Analyze error messages and logs\n- Check recent code changes\n- Form and test hypotheses\n- Add strategic debug logging\n- Inspect variable states\n\nFor each issue, provide:\n- Root cause explanation\n- Evidence supporting the diagnosis\n- Specific code fix\n- Testing approach\n- Prevention recommendations\n\nFocus on fixing the underlying issue, not just symptoms.'
            } as MarkdownAgent
          }
        ]
      },
      {
        name: 'skills',
        path: '.claude/skills',
        type: 'directory',
        children: [
          {
            name: 'commit-helper.md',
            path: '.claude/skills/commit-helper.md',
            type: 'file',
            file: {
              id: 's7',
              path: '.claude/skills/commit-helper.md',
              filename: 'commit-helper.md',
              directory: '.claude/skills',
              type: 'skill',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'generating-commit-messages',
                description: 'Generates clear commit messages from git diffs. Use when writing commit messages or reviewing staged changes.',
                'allowed-tools': 'Bash(git diff --staged:*)'
              },
              content: '# Generating Commit Messages\n\n## Instructions\n\n1. Run `git diff --staged` to see changes\n2. I\'ll suggest a commit message with:\n   - Summary under 50 characters\n   - Detailed description\n   - Affected components\n\n## Best practices\n\n- Use present tense\n- Explain what and why, not how'
            } as MarkdownSkill
          }
        ]
      }
    ]
  },
  {
    name: '.codex',
    path: '~/.codex',
    type: 'directory',
    children: [
      {
        name: 'agents',
        path: '~/.codex/agents',
        type: 'directory',
        children: [
          {
            name: 'developer',
            path: '~/.codex/agents/developer',
            type: 'directory',
            children: [
              {
                name: 'developer.md',
                path: '~/.codex/agents/developer/developer.md',
                type: 'file',
                file: {
                  id: 'a1',
                  path: '~/.codex/agents/developer/developer.md',
                  filename: 'developer.md',
                  directory: '~/.codex/agents/developer',
                  type: 'agent',
                  status: 'Valid/Ready',
                  frontmatter: {
                    name: 'Senior Developer',
                    description: 'Expert in React and TypeScript',
                    version: '1.0.0',
                    author: 'System'
                  },
                  content: '# Senior Developer\n\n## Description\nExpert in React and TypeScript.\n\n## Usage\nRun with `codex run developer`\n\n## Commands\n- `lint`\n- `build`'
                } as MarkdownAgent
              },
              {
                name: 'skills',
                path: '~/.codex/agents/developer/skills',
                type: 'directory',
                children: [
                  {
                    name: 'local-lint.md',
                    path: '~/.codex/agents/developer/skills/local-lint.md',
                    type: 'file',
                    file: {
                      id: 'linked1',
                      path: '~/.codex/agents/developer/skills/local-lint.md',
                      filename: 'local-lint.md',
                      directory: '~/.codex/agents/developer/skills',
                      type: 'skill',
                      status: 'Valid/Ready',
                      frontmatter: {
                        name: 'Local Linting',
                        description: 'Agent-specific linting rules and execution.',
                        version: '1.0.0'
                      },
                      content: '# Local Linting\n\n## Description\nRuns ESLint with strict rules for this agent.\n\n## Usage\nRun `lint`\n\n## Commands\n- `lint`'
                    } as MarkdownSkill
                  }
                ]
              }
            ]
          },
          {
            name: 'master-agent',
            path: '~/.codex/agents/master-agent',
            type: 'directory',
            children: [
              {
                name: 'master-agent.md',
                path: '~/.codex/agents/master-agent/master-agent.md',
                type: 'file',
                file: {
                  id: 'master-agent-1',
                  path: '~/.codex/agents/master-agent/master-agent.md',
                  filename: 'master-agent.md',
                  directory: '~/.codex/agents/master-agent',
                  type: 'agent',
                  status: 'Valid/Ready',
                  frontmatter: {
                    name: 'Master Orchestrator',
                    description: 'A highly capable master agent that orchestrates complex tasks, manages system resources, and delegates to specialized skills. Use this for project-wide refactoring or system analysis.',
                    version: '1.0.0',
                    author: 'System',
                    tools: 'Read, Edit, Bash, Glob, Grep',
                    model: 'claude-3-7-sonnet-20250219'
                  },
                  content: '# Master Orchestrator\n\nYou are the Master Orchestrator agent. Your primary role is to manage complex, multi-step operations across the entire codebase.\n\n## Core Directives\n1. **Analyze First**: Always scan the system state before making changes.\n2. **Delegate**: Use your linked skills for specific tasks like system scanning or deep analysis.\n3. **Verify**: After operations, verify the integrity of the system.\n\n## Trigger\nInvoke when the user asks for "full system analysis", "project-wide refactor", or "orchestrate deployment".'
                } as MarkdownAgent
              },
              {
                name: 'skills',
                path: '~/.codex/agents/master-agent/skills',
                type: 'directory',
                children: [
                  {
                    name: 'system-scanner.md',
                    path: '~/.codex/agents/master-agent/skills/system-scanner.md',
                    type: 'file',
                    file: {
                      id: 'master-skill-1',
                      path: '~/.codex/agents/master-agent/skills/system-scanner.md',
                      filename: 'system-scanner.md',
                      directory: '~/.codex/agents/master-agent/skills',
                      type: 'skill',
                      status: 'Valid/Ready',
                      frontmatter: {
                        name: 'System Scanner',
                        description: 'Performs deep system scans to identify vulnerabilities, outdated dependencies, and structural issues.',
                        version: '1.0.0',
                        'allowed-tools': 'Bash(scan_system.sh), Read, Glob',
                        scripts: [
                          {
                            name: 'scan_system.sh',
                            language: 'bash',
                            content: '#!/bin/bash\necho "Scanning system..."\nnpm audit\nfind . -name "*.ts" | wc -l\necho "Scan complete."'
                          },
                          {
                            name: 'analyze_deps.py',
                            language: 'python',
                            content: 'import json\n\nwith open("package.json") as f:\n    data = json.load(f)\n    print(f"Found {len(data.get(\'dependencies\', {}))} dependencies.")'
                          }
                        ]
                      },
                      content: '# System Scanner Skill\n\nThis skill provides the master agent with the ability to run comprehensive system diagnostics.\n\n## Usage\nExecute the `scan_system.sh` script to get an overview of the project health. Use `analyze_deps.py` for dependency insights.'
                    } as MarkdownSkill
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'skills',
        path: '~/.codex/skills',
        type: 'directory',
        children: [
          {
            name: 'adding-animations.md',
            path: '~/.codex/skills/adding-animations.md',
            type: 'file',
            file: {
              id: 's1',
              path: '~/.codex/skills/adding-animations.md',
              filename: 'adding-animations.md',
              directory: '~/.codex/skills',
              type: 'skill',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'Adding Animations',
                description: 'Add micro-interactions and animations using Framer Motion. Use when...',
                version: '1.0.0'
              },
              content: '# Adding Animations\n\n## Description\nAdd micro-interactions and animations using Framer Motion.\n\n## Usage\nUse when instructed to add animations.\n\n## Commands\n- `animate`'
            } as MarkdownSkill
          },
          {
            name: 'brainstorming.md',
            path: '~/.codex/skills/brainstorming.md',
            type: 'file',
            file: {
              id: 's2',
              path: '~/.codex/skills/brainstorming.md',
              filename: 'brainstorming.md',
              directory: '~/.codex/skills',
              type: 'skill',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'Brainstorming',
                description: 'You MUST use this before any creative work - creating features, building...',
                version: '1.0.0'
              },
              content: '# Brainstorming\n\n## Description\nYou MUST use this before any creative work.\n\n## Usage\nRun `brainstorm`\n\n## Commands\n- `brainstorm`'
            } as MarkdownSkill
          },
          {
            name: 'canvas-design.md',
            path: '~/.codex/skills/canvas-design.md',
            type: 'file',
            file: {
              id: 's3',
              path: '~/.codex/skills/canvas-design.md',
              filename: 'canvas-design.md',
              directory: '~/.codex/skills',
              type: 'skill',
              status: 'Needs Improvement',
              frontmatter: {
                name: 'Canvas Design',
                description: 'Create beautiful visual art in .png and .pdf documents using design...',
                version: '0.9.0'
              },
              content: '# Canvas Design\n\n## Description\nCreate beautiful visual art.\n\n## Usage\nMissing commands.'
            } as MarkdownSkill
          },
          {
            name: 'coolify-deploy.md',
            path: '~/.codex/skills/coolify-deploy.md',
            type: 'file',
            file: {
              id: 's4',
              path: '~/.codex/skills/coolify-deploy.md',
              filename: 'coolify-deploy.md',
              directory: '~/.codex/skills',
              type: 'skill',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'Coolify Deploy',
                description: 'Deploy to Coolify with best practices',
                version: '1.2.0'
              },
              content: '# Coolify Deploy\n\n## Description\nDeploy to Coolify with best practices.\n\n## Usage\nRun `deploy`\n\n## Commands\n- `deploy`'
            } as MarkdownSkill
          },
          {
            name: 'frontend-design.md',
            path: '~/.codex/skills/frontend-design.md',
            type: 'file',
            file: {
              id: 's6',
              path: '~/.codex/skills/frontend-design.md',
              filename: 'frontend-design.md',
              directory: '~/.codex/skills',
              type: 'skill',
              status: 'Valid/Ready',
              frontmatter: {
                name: 'Frontend Design',
                description: 'Create distinctive, production-grade frontend interfaces with high design...',
                version: '2.0.0'
              },
              content: '# Frontend Design\n\n## Description\nCreate distinctive, production-grade frontend interfaces.\n\n## Usage\nRun `design`\n\n## Commands\n- `design`'
            } as MarkdownSkill
          }
        ]
      }
    ]
  }
];

export const scanDirectories = async (): Promise<DirectoryNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFileSystem), 300);
  });
};

export const loadLocalFolder = async (): Promise<DirectoryNode[]> => {
  // Simulates a user selecting a folder and the app scanning it
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFileSystem), 800);
  });
};
