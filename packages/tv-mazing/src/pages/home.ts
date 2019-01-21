import { Page } from '@tv-mazing/types';
import MarkdownIt = require('markdown-it');

export default class Homepage implements Page {
  private markdownParser: MarkdownIt;
  private head: string;
  private bottom: string

  constructor() {
    this.markdownParser = new MarkdownIt();
    this.head = `<html>

    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css">
    
      <style>
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }
    
        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
      </style>
    </head>
    
    <body>
      <article class="markdown-body">`;


    this.bottom =
      `</article>
    </body>
    
    </html>`;
  }

  private getContent() {
    return `# Tv Mazing api

> Mama always said ‘Life was like a box of chocolates, you never know what you’re gonna get.’
>
> — Friedrich Nietzsche, The Shawshank Redemption, documentary.

## Welcome  
Welcome to the tv mazing api. Here you can find series and the cast playing in them. Feel free to look around but no touching.

### index
URL: /

This page

### Series
URL: /series?page=:num


The first 50 series in the database,
the cast will be ordered from old to young (unknown age first). 

To get the next 50 series request ?page=1 and so on. By default page=0 is server 
`
  }

  render() {
    return `${this.head}${this.markdownParser.render(this.getContent())}${this.bottom}`;
  }
}

