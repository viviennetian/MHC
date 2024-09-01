
console.log('04 chatroom script is loading');
// 房间数据，存储图片和对话内容，但不再定义 treatments
const chatRooms = {

    "BODY": {
        correct: {
            character: ["body_character.svg"], // 加载两个图像
            background: ["body_1_bg.svg", "body_2_bg.svg"],// 加载背景图像
            dialogs: [
                "Welcome to the body department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["body_character.svg"], // 加载两个图像
            background: ["body_1_bg.svg", "body_2_bg.svg"],// 加载背景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    // 其他部门...
};
window.addEventListener('load', function () {
    console.log('window.onload event triggered');

    const isCorrect = window.isCorrect;  // 获取全局变量 isCorrect
    const found = window.currentDisease;// 获取全局变量 currentDisease，用户的身上有的疾病列表
    const currentDepartment = window.currentDepartment || { department: "Unknown" };//现在选择的科室
    console.log('isCorrect:', isCorrect);
    console.log('currentDisease:', found);
    console.log('currentDepartment:', currentDepartment);

    const room = chatRooms[currentDepartment.department];// 选择的科室对应的房间数据

    if (room) {
        const scene = isCorrect ? room.correct : room.wrong;// 选择正确或错误的房间数据

        // 动态加载背景图像
        const backgroundContainer = document.getElementById("background-container");
        backgroundContainer.innerHTML = ""; // 清空之前的内容
        scene.background.forEach(bg => {
            const bgElement = document.createElement("img");
            bgElement.src = `../image/${bg}`;
            console.log('Loading background image from:', bgElement.src);
            bgElement.classList.add("background-img");
            bgElement.onerror = () => console.error(`Failed to load background image: ${bgElement.src}`);
            backgroundContainer.appendChild(bgElement);
        });

        // 动态加载角色图像
        const characterContainer = document.getElementById("character-container");
        characterContainer.innerHTML = ""; // 清空之前的内容
        scene.character.forEach(character => {
            const imgElement = document.createElement("img");
            imgElement.src = `../image/${character}`;
            console.log('Loading character image from:', imgElement.src);
            imgElement.classList.add("character-img");
            imgElement.onerror = () => console.error(`Failed to load character image: ${imgElement.src}`);
            characterContainer.appendChild(imgElement);
        });

        // 显示多个对话段落
        let currentDialogIndex = 0;
        const dialogText = document.getElementById("dialog-text");
        dialogText.innerText = scene.dialogs[currentDialogIndex];

        function showNextDialog() {
            currentDialogIndex++;
            if (currentDialogIndex < scene.dialogs.length) {
                dialogText.innerText = scene.dialogs[currentDialogIndex];
            } else if (scene.treatmentStep) {
                const treatmentOptions = diseases[currentDepartment.department].treatments;
                loadTreatmentOptions(treatmentOptions);
            } else {
                document.getElementById("goButton").style.display = "block";
            }
        }

        // 为下一步按钮绑定事件，用于切换到下一个对话段落
        document.getElementById("nextButton").onclick = showNextDialog;

        // 初始显示第一个对话段落
        document.getElementById("nextButton").style.display = "block";
    } else {
        console.error('Room information not found for department:', currentDepartment.department);
    }

    document.getElementById("backButton").onclick = () => backToChoice();
});

function loadTreatmentOptions(options) {
    const treatmentOptionsDiv = document.getElementById("treatment-options");
    treatmentOptionsDiv.innerHTML = ""; // 清空已有的治疗选项

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = `$${option.method} - ${option.price}`;
        button.onclick = function () {
            handleTreatmentChoice(option);
        };
        treatmentOptionsDiv.appendChild(button);
    });

    document.getElementById("nextButton").style.display = "block"; // 显示“Next”按钮
}

function handleTreatmentChoice(choice) {
    console.log("Selected treatment:", choice.method, "at", choice.price);
    // 处理治疗选择的逻辑
    saveGameState(); // 保存选择后的游戏状态
}

function backToChoice() {
    // 返回到选择房间的逻辑
    console.log("Returning to room selection");
}

