'use client';

import React, { useState } from 'react';
import { Check, Copy, FileCode2, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: 'typescript' | 'javascript' | 'json' | 'bash' | 'php' | 'text';
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  illustrativeLabel?: string;
  className?: string;
}

function tokenizeLine(line: string, language: string): React.ReactNode[] {
  if (language === 'text') {
    return [line];
  }

  if (language === 'bash') {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('#')) {
      return [<span key="comment" className="text-zinc-500 dark:text-zinc-500 italic">{line}</span>];
    }
    const parts = line.split(/(\s+)/);
    return parts.map((part, idx) => {
      if (idx === 0 && /^(npm|pnpm|yarn|bun|npx|node|curl|export)$/.test(part)) {
        return <span key={idx} className="text-emerald-600 dark:text-emerald-400 font-medium">{part}</span>;
      }
      if (/^(install|add|run|init|dev|start|-D|--save-dev)$/.test(part)) {
        return <span key={idx} className="text-sky-600 dark:text-teal-300">{part}</span>;
      }
      return <span key={idx}>{part}</span>;
    });
  }

  // Lightweight deterministic syntax highlighting for TS/JS/JSON/PHP
  const commentIndex = language !== 'json' ? line.indexOf('//') : -1;
  const codePart = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
  const commentPart = commentIndex >= 0 ? line.slice(commentIndex) : '';

  const tokenRegex =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|export|from|const|let|var|async|await|function|return|new|type|interface|class|implements|extends|if|else|try|catch|throw|true|false|null|undefined|public|private|readonly|namespace|use)\b|\b\d+(?:_\d+)*(?:\.\d+)?\b)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(codePart.slice(lastIndex, match.index));
    }
    const token = match[0];
    const afterChar = codePart.slice(match.index + token.length).trimStart()[0];

    if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      if (language === 'json' && afterChar === ':') {
        nodes.push(
          <span key={match.index} className="text-sky-700 dark:text-teal-300">
            {token}
          </span>
        );
      } else {
        nodes.push(
          <span key={match.index} className="text-emerald-700 dark:text-emerald-400">
            {token}
          </span>
        );
      }
    } else if (/^\d/.test(token)) {
      nodes.push(
        <span key={match.index} className="text-amber-700 dark:text-amber-300 tabular-nums">
          {token}
        </span>
      );
    } else if (/^(true|false|null|undefined)$/.test(token)) {
      nodes.push(
        <span key={match.index} className="text-amber-700 dark:text-amber-300">
          {token}
        </span>
      );
    } else {
      nodes.push(
        <span key={match.index} className="text-violet-700 dark:text-sky-400 font-medium">
          {token}
        </span>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < codePart.length) {
    nodes.push(codePart.slice(lastIndex));
  }

  if (commentPart) {
    nodes.push(
      <span key="line-comment" className="text-zinc-400 dark:text-zinc-500 italic">
        {commentPart}
      </span>
    );
  }

  return nodes;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  highlightLines = [],
  illustrativeLabel,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmedCode = code.trim();
  const lines = trimmedCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement('textarea');
      textarea.value = trimmedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-100/80 px-4 py-2.5 dark:border-[#27272A] dark:bg-[#18181B]/70">
        <div className="flex items-center gap-2.5 min-w-0">
          {language === 'bash' ? (
            <Terminal className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          ) : (
            <FileCode2 className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          )}
          {filename ? (
            <span className="truncate font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {filename}
            </span>
          ) : (
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {language}
            </span>
          )}
          {illustrativeLabel && (
            <>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                ·
              </span>
              <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {illustrativeLabel}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {filename && (
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
              {language}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto py-3.5 text-[13px] leading-6">
        <pre className="font-mono text-zinc-800 dark:text-zinc-200 min-w-full">
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);
              return (
                <div
                  key={lineNumber}
                  className={`flex px-4 ${
                    isHighlighted
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15'
                      : ''
                  }`}
                >
                  {showLineNumbers && (
                    <span
                      aria-hidden="true"
                      className="mr-4 inline-block w-6 select-none text-right text-xs leading-6 text-zinc-400 dark:text-zinc-600 tabular-nums shrink-0"
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre">
                    {line.length === 0 ? ' ' : tokenizeLine(line, language)}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
