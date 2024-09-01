// 声明全局变量
let isTyping = false;
let currentDialogIndex = 0; // 追踪当前对话框索引
const dialogs = document.querySelectorAll('.dialog-box'); // 获取所有对话框

// 显示对话框
function showDialog(index) {
    dialogs[index].style.display = 'block';
}

// 隐藏对话框
function hideDialog(index) {
    dialogs[index].style.display = 'none';
}

// 在文档加载完成后，添加全局点击事件监听器
document.addEventListener('DOMContentLoaded', function () {

    // 在页面加载时显示第一个对话框
    showDialog(currentDialogIndex);

    // 定义打字机效果的函数
    function typeWriter(element, text, speed, callback) {
        let i = 0;

        // 加载音效文件，并设置为循环播放
        const typingSound = new Audio('../sound/typing.wav'); // 请确保此路径正确指向你的音效文件
        typingSound.loop = true;
        typingSound.play(); // 开始播放音效

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);

                // 播放音效
                if (text.charAt(i) !== ' ') {
                    if (typingSound.paused) {
                        typingSound.play();
                    }
                }

                i++;
                setTimeout(type, speed);
            } else {
                typingSound.pause();
                typingSound.currentTime = 0;
                if (callback) callback(); // 打字完成后执行回调函数
            }
        }

        type(); // 开始打字机效果
    }

    // 开始第一个对话框的打字效果
    const firstTextElement = document.getElementById('typing-text-1');
    const firstText = firstTextElement.getAttribute('data-text');
    typeWriter(firstTextElement, firstText, 25, function () {
        // 打字完成后显示按钮
        document.getElementById('next-button-1').style.display = 'block';
    });

    // 给第一个对话框的按钮添加事件监听器
    document.getElementById('next-button-1').addEventListener('click', function () {
        hideDialog(currentDialogIndex); // 隐藏第一个对话框
        currentDialogIndex++; // 移动到第二个对话框
        showDialog(currentDialogIndex); // 显示第二个对话框

        // 开始第二个对话框的打字效果
        const secondTextElement = document.getElementById('typing-text-2');
        const secondText = secondTextElement.getAttribute('data-text');
        typeWriter(secondTextElement, secondText, 25, function () {
            // 打字完成后显示确认按钮
            document.getElementById('next-button-2').style.display = 'block';
        });
    });

    // 给第二个对话框的按钮添加事件监听器
    document.getElementById('next-button-2').addEventListener('click', function () {
        // 收集用户的选择
        const selectedStatements = [];
        for (let i = 1; i <= 5; i++) {
            const checkbox = document.getElementById(`statement${i}`);
            if (checkbox.checked) {
                selectedStatements.push(checkbox.parentElement.textContent.trim());
            }
        }

        console.log('Selected Statements:', selectedStatements); // 在控制台输出用户的选择

        hideDialog(currentDialogIndex); // 隐藏第二个对话框
        // 此处可以添加更多逻辑，比如结束对话或跳转到其他页面
        console.log('Finished');
    });

});
