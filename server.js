const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    // Default to serving index.html
    if (filePath === './') {
        filePath = './index.html'; 
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    // Basic MIME types
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.mp4': contentType = 'video/mp4'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT'){
                res.writeHead(404);
                res.end('File not found.');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            // --- THE MAGIC HEADERS ---
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`[SYSTEM READY] Server running at http://localhost:${PORT}/`);
    console.log(`[MEMORY UNLOCKED] Cross-Origin Isolation is ENABLED.`);
});