const fs = require('fs');
const path = require('path');

const musicDir = 'music/';
const outputDir = 'data/';

// 1. 生成文件夹列表
const folders = fs.readdirSync(musicDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
fs.writeFileSync(path.join(outputDir, 'folders.json'), JSON.stringify(folders, null, 2));

// 2. 为每个文件夹生成歌曲列表
folders.forEach(folder => {
    const folderPath = path.join(musicDir, folder);
    const files = fs.readdirSync(folderPath)
        .filter(file => !['.', '..'].includes(file))
        .filter(file => {
            const ext = path.extname(file).toLowerCase().slice(1);
            return ['mp3', 'm4a', 'aac', 'wav', 'ogg', 'flac'].includes(ext);
        })
        .sort();
    fs.writeFileSync(path.join(outputDir, `${folder}.json`), JSON.stringify(files, null, 2));
});

// 3. 生成歌词映射（可选）
// 此处可遍历所有 `.lrc` 文件，建立歌曲名到歌词路径的映射