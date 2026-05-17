const fs = require('fs');
const path = require('path');

async function generateCoursePage(playlistId, courseId, courseTitle, outputFilename) {
    console.log(`Fetching playlist ${playlistId} for ${courseTitle}...`);
    
    // Fetch playlist
    const res = await fetch(`https://www.youtube.com/playlist?list=${playlistId}`);
    const html = await res.text();
    
    // Extract video IDs
    const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
    const uniqueIds = [...new Set(matches)];
    
    console.log(`Found ${uniqueIds.length} videos.`);
    if (uniqueIds.length === 0) {
        console.error("Failed to extract videos. Check playlist ID.");
        return;
    }
    
    // Build lesson list HTML
    let htmlContent = '';
    uniqueIds.forEach((id, index) => {
        const num = index + 1;
        const isTrailer = index === 0;
        const titleText = isTrailer ? 'Apresentação do Curso' : `Aula ${num-1}`;
        
        htmlContent += `                <a href="https://www.youtube.com/embed/${id}" target="video-frame" class="lesson-item${index === 0 ? ' active' : ''}" data-id="${num}">
                    <div class="lesson-status"><i class="fas fa-check"></i></div>
                    <div class="lesson-info">
                        <span class="lesson-title">${num}. ${titleText}</span>
                        <span class="lesson-duration"><i class="far fa-clock"></i> Vídeo</span>
                    </div>
                </a>\n`;
    });

    // Read template (CursoJs.html)
    const templatePath = path.join(__dirname, 'Html', 'CursoJs.html');
    let templateHtml = fs.readFileSync(templatePath, 'utf8');
    
    // Replace course title
    templateHtml = templateHtml.replace(/<span class="course-title">JavaScript<\/span>/g, `<span class="course-title">${courseTitle}</span>`);
    
    // Replace data-course
    templateHtml = templateHtml.replace(/<body data-course="js">/g, `<body data-course="${courseId}">`);
    
    // Replace default iframe src
    templateHtml = templateHtml.replace(/<iframe id="video-frame" name="video-frame" src="https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9_-]{11}"/g, `<iframe id="video-frame" name="video-frame" src="https://www.youtube.com/embed/${uniqueIds[0]}"`);

    // Replace the entire lesson list block
    const startRegex = /<div class="lesson-list" id="lesson-list">/g;
    const endRegex = /<\/aside>/g;

    const startMatch = startRegex.exec(templateHtml);
    const startIdx = startMatch.index + startMatch[0].length;
    endRegex.lastIndex = startIdx;
    const endMatch = endRegex.exec(templateHtml);
    const endIdx = endMatch.index;

    const finalHtml = templateHtml.slice(0, startIdx) + '\n' + htmlContent + '            </div>\n        ' + templateHtml.slice(endIdx);
    
    // Save output
    const outputPath = path.join(__dirname, 'Html', outputFilename);
    fs.writeFileSync(outputPath, finalHtml);
    
    console.log(`Saved ${outputFilename} successfully!`);
}

async function run() {
    // Generate React.js
    await generateCoursePage('PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO', 'react', 'React.js', 'CursoReact.html');
}

run();
