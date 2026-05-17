const fs = require('fs');
const path = require('path');

const ids = [
  "1-w1RfGIov4", "BXqUH86F-kA", "uzEhd3Lugik", "Ptbk2af68e8", "rUTKomc2gG8", 
  "FdePtO5JSd0", "OmmJBfcMJA8", "FjT97HVT5g8", "Vbabsye7mWo", "OJgu_KCCUSY", 
  "hZG9ODUdxHo", "BP63NhITvao", "H80nCKs9c2k", "WWZX8RWLxIk", "wWnBB-mZIvY", 
  "uPFasdmZHJc", "cOdG4eACN2A", "EEStcIe8rAM", "b2K7eo5Jdj8", "UXSWgnbSHxs", 
  "f5es-PpaUI8", "3emz6rpcJyA", "5rZqYPKIwkY", "eX-lkN_Zahc", "6tyHypeY4-8", 
  "oMNbc_LFz8w", "mfHAQ-4Rspw", "5m4UhZd-Les", "XdkW62tkAgU", "mc3TKp2XzhI", 
  "vEOEZ03ZyiE", "slLoLLCd-k0", "roP93FA-NgU"
];

let htmlContent = '';
ids.forEach((id, index) => {
    const num = index + 1;
    const isTrailer = index === 0;
    const title = isTrailer ? 'Apresentação do Curso' : `Aula ${num-1}`;
    
    htmlContent += `                <a href="https://www.youtube.com/embed/${id}" target="video-frame" class="lesson-item${index === 0 ? ' active' : ''}" data-id="${num}">
                    <div class="lesson-status"><i class="fas fa-check"></i></div>
                    <div class="lesson-info">
                        <span class="lesson-title">${num}. ${title}</span>
                        <span class="lesson-duration"><i class="far fa-clock"></i> Vídeo</span>
                    </div>
                </a>\n`;
});

const htmlPath = path.join(__dirname, 'Html', 'CursoJs.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the entire block between <div class="lesson-list" id="lesson-list"> and </aside>
const startRegex = /<div class="lesson-list" id="lesson-list">/g;
const endRegex = /<\/aside>/g;

const startMatch = startRegex.exec(html);
const startIdx = startMatch.index + startMatch[0].length;
endRegex.lastIndex = startIdx;
const endMatch = endRegex.exec(html);
const endIdx = endMatch.index;

const finalHtml = html.slice(0, startIdx) + '\n' + htmlContent + '            </div>\n        ' + html.slice(endIdx);

fs.writeFileSync(htmlPath, finalHtml);
console.log("HTML updated successfully with 33 lessons.");
