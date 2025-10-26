import { Injectable } from '@angular/core';
import { marked, Renderer, Tokens } from 'marked';


@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  #marked = marked


  constructor() {
    const renderer = new Renderer();

    renderer.paragraph = ({ text }: Tokens.Paragraph) => {
      const processedText = this.processMathInText(text);
      return `<p>${processedText}</p>`;
    };

    renderer.strong = ({ text }: Tokens.Strong) => {
      const processedText = this.processMathInText(text);
      return `<strong>${processedText}</strong>`;
    };

    renderer.em = ({ text }: Tokens.Em) => {
      const processedText = this.processMathInText(text);
      return `<em>${processedText}</em>`;
    };

    renderer.listitem = ({ text }: Tokens.ListItem) => {
      const processedText = this.processMathInText(text);
      return `<li>${processedText}</li>\n`;
    };

    renderer.codespan = ({ text }: Tokens.Codespan) => {
      return `<code>${text}</code>`;
    };

    renderer.br = () => {
      return '<br>';
    };

    renderer.hr = () => {
      return '<hr>';
    };

    renderer.heading = ({ text, depth }: Tokens.Heading) => {
      const processedText = this.processMathInText(text);
      return `<h${depth}>${processedText}</h${depth}>`;
    };

    renderer.code = ({ text, lang }: Tokens.Code) => {
      if (lang === 'math') {
        const processedMath = this.processMathBlock(text);
        return `<div class="math-block">${processedMath}</div>`;
      }

      const langClass = lang ? ` class="language-${lang}"` : '';
      return `<pre><code${langClass}>${text}</code></pre>`;
    };

    renderer.link = ({ href, title, text }: Tokens.Link) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    };

    renderer.image = ({ href, title, text }: Tokens.Image) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<img src="${href}" alt="${text}"${titleAttr}>`;
    };

    renderer.text = ({ text }: Tokens.Text) => {
      return this.processMathInText(text);
    };

    this.#marked.setOptions({
      breaks: true,
      gfm: true,
      renderer: renderer,
    });
  }

  private processMathInText(text: string): string {
    return text.replace(/\$(.*?)\$/g, (match, mathContent) => {
      const processed = this.processMathContent(mathContent);
      return `<span class="math-inline">${processed}</span>`;
    });
  }

  private processMathBlock(mathText: string): string {
    const processed = this.processMathContent(mathText);
    return processed;
  }

  private processMathContent(mathText: string): string {
    return mathText
      .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
      .replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, '<sup>$1</sup>√$2')
      .replace(/\\approx/g, '≈')
      .replace(/\\sim/g, '∼')
      .replace(/\\text\{([^}]*)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="math-frac"><sup>$1</sup><sub>$2</sub></span>')
      .replace(/\\rightarrow/g, '→')
      .replace(/\\leftarrow/g, '←')
      .replace(/\\Rightarrow/g, '⇒')
      .replace(/\\Leftarrow/g, '⇐')
      .replace(/\\leftrightarrow/g, '↔')
      .replace(/\\Leftrightarrow/g, '⇔')
      .replace(/\\times/g, '×')
      .replace(/\\cdot/g, '·')
      .replace(/\\div/g, '÷')
      .replace(/\\pm/g, '±')
      .replace(/\\mp/g, '∓')
      .replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈')
      .replace(/\\leq/g, '≤')
      .replace(/\\geq/g, '≥')
      .replace(/\\infty/g, '∞')
      .replace(/_(\d+)/g, '<sub>$1</sub>')
      .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
      .replace(/\\parallel/g, '∥')
      .replace(/\\angle/g, '∠')
      .replace(/\\perp/g, '⊥')
      .replace(/\\cong/g, '≅')
      .replace(/\\sim/g, '∼')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\epsilon/g, 'ε')
      .replace(/\\theta/g, 'θ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\pi/g, 'π')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\phi/g, 'φ')
      .replace(/\\omega/g, 'ω')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']')
      .replace(/\\\{/g, '{')
      .replace(/\\\}/g, '}')
      .replace(/\\\\/g, '\\')
      .replace(/\\\$/g, '$')
      .trim();
  }

  parse(markdown: string): string {
    if (!markdown) return '';


    let processedMarkdown = markdown.replace(/\$\$(.*?)\$\$/gs, (match, mathContent) => {
      return '```math\n' + mathContent.trim() + '\n```';
    });


    processedMarkdown = processedMarkdown.replace(/```math\n([\s\S]*?)```/g, (match, mathContent) => {
      const processedMath = this.processMathContent(mathContent.trim());
      return `<div class="math-block">${processedMath}</div>`;
    });

    processedMarkdown = processedMarkdown.replace(/\$(.*?)\$/g, (match, mathContent) => {
      const processed = this.processMathContent(mathContent);
      return `<span class="math-inline">${processed}</span>`;
    });

    return this.#marked.parse(processedMarkdown) as string;
  }
}
