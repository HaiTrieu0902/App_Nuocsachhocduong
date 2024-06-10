import { COLOR_SYSTEM } from '@/constants/Colors';
import { Platform } from 'react-native';
export function replaceHead(html: string, newHeadContent: string): string {
  // Regular expression to match the head section
  const headRegex = /<head[^>]*>[\s\S]*<\/head>/i;

  // Construct the new head section
  const newHead = `<head>${newHeadContent}</head>`;

  // Replace the existing head section with the new one
  const updatedHtml = html.replace(headRegex, newHead);

  return updatedHtml;
}

const fontUrl = Platform.select({
  ios: 'Nunito-Regular.ttf',
  android: 'file:///android_asset/fonts/Nunito-Regular.ttf',
});

const htmlStyles = `
    @media print { * { -webkit-print-color-adjust: exact !important; } }

    @font-face {
      font-family: 'Nunito-Regular'; 
      src: url('${fontUrl}') format('truetype')
   }

    * {
        font-family: 'Nunito-Regular';
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${COLOR_SYSTEM.white};
        padding: 1rem;
    }

    img {
      width: 100% !important;
      height: auto;
      margin: 16px 0;
    }

    .image {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    div, p, ol, ul, li, table, tr, td, th, tbody, thead, tfoot {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #353535;
        text-align: justify;
    }
`;

export const createHtmlTemplate = (html: string = '') => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8">
          <title>Html content</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              ${htmlStyles}
          </style>
      </head>
      <body>
          ${html}
      </body>
  </html>
`;
};

export const formatContent = (content: string) => {
  return replaceHead(
    content,
    `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <meta charset="utf-8">
    <title>
    </title>
    <style>
        @media print { * { -webkit-print-color-adjust: exact !important; } }

        @font-face {
          font-family: 'Nunito-Regular';
          src: url('${fontUrl}') format('opentype')
        }

        body {
          line-height: 108%;
          font-size: 14px;
          padding: 0.5rem;
          font-family: 'Nunito-Regular';
          background-color: ${COLOR_SYSTEM.white};
        }

        h1, h2, h3, h4, h5, h6 {
          line-height: normal;
        }

        h1 {
          font-size: 40px;
        }

        h2 {
          font-size: 24px;
        }

        p {
          font-size: 16px;
          font-weight: 400;
          margin: 0pt 0pt 8pt;
          line-height: normal;
        }

        img {
          width: 100% !important;
          height: auto;
          margin: 16px 0;
        }

        iframe {
          width: 100% !important;
        }

        .image {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        span.Hyperlink {
          text-decoration: underline;
          color: #0563c1;
        }

        figure {
          margin: 0;
          padding: 0;
        }

        .table table {
          display: table;
          width: 100%;
          border: 1px double #b3b3b3;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .table table td,
        .table table th {
            border: 1px solid #bfbfbf;
        }
        .table td,
        .table th {
            position: relative;
            overflow-wrap: break-word;
        }
    </style>
  </head>
  `,
  );
};
