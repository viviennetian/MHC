document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio('../sound/click.wav');
    audio.volume = 1.0;  // 音量设定
    audio.muted = false; // 确保音频未被静音

    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('clickable')) {
            audio.currentTime = 0; // 从头开始播放音效
            audio.play();

            // 检查是否有 data-href 属性用于页面跳转
            const targetUrl = event.target.getAttribute('data-href');
            if (targetUrl) {
                // 添加延迟，确保音效播放
                setTimeout(function () {
                    window.location.href = targetUrl;
                }, 200); // 200ms 延迟，可根据需要调整
            }
        }
    });
});
