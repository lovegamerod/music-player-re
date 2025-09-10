// 获取文件夹列表
fetch('/data/folders.json')
    .then(res => res.json())
    .then(folders => {
        console.log('文件夹列表:', folders);
        // 动态加载每个文件夹的歌曲
        folders.forEach(folder => {
            fetch(`/data/${folder}.json`)
                .then(res => res.json())
                .then(songs => {
                    console.log(`歌曲列表 (${folder}):`, songs);
                });
        });
    });

// 获取歌词（示例）
function getLyrics(folder, songName) {
    const baseName = songName.replace(/\.\w+$/, '');
    const possiblePaths = [
        `/lyrics/${folder}/${baseName}.lrc`,
        `/lyrics/${baseName}.lrc`
    ];
    for (const path of possiblePaths) {
        fetch(path)
            .then(res => {
                if (res.ok) return res.text();
                throw new Error('未找到歌词文件');
            })
            .then(text => {
                console.log('歌词内容:', text);
            })
            .catch(err => console.error(err));
    }
}