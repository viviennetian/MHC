document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("new-game-button").addEventListener("click", startNewGame);
    const modal = document.getElementById('medical-records-container');
    document.getElementById('medical-records-button').addEventListener("click", function () {
        loadMedicalRecords();
        modal.style.display = "block"; // 显示模态窗口  
        console.log(modal);
    });
    // 为关闭按钮添加点击事件监听器  
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener("click", function () {
        modal.style.display = "none"; // 隐藏模态窗口  
    });

});

window.onload = () => startGame(true); // 强制从头开始游戏
