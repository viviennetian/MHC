// 从diseases.js导入疾病数据
// 假设你通过<script src="diseases.js"></script>已经将diseases加载到全局作用域
let money = Math.floor(Math.random() * (1300 - 500 + 1)) + 500; // 初始的钱
let patientDiseases = [];
let currentStoryNode = null; // 当前故事节点
let currentDepartment = null; //当前诊室
let flag = true;
//这里记忆一个逻辑 是否要死
let isDead = 100;
let medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || []; // 从 localStorage 获取病历本

const story = {
    start: {
        nodename: 'start',
        text: "Welcome to the Meme Health Center! \nThis is the lobby. \nHeard you’re not feeling well? \nbetter check your wallet before you enter the gate.",
        choices: [
            { text: "去分诊台", next: "triage" }
        ]
    },
    triage: {
        nodename: 'triage',
        text: "Here is the elevator hall.",
        choices: [
            { text: "分诊", next: "diagnosis" }
        ]
    },
    diagnosis: {
        nodename: 'diagnosis',
        text: "You’ve entered the following examination room:\n",
        choices: [
            { text: "选择科室", next: "selectDepartment" }
        ]
    },
    treatment: {
        nodename: 'treatment',
        text: "examination room.",
        choices: []
    },
    end: {
        nodename: 'end',
        text: "All diseases have been cured.\n Game over.",
        choices: [
            { text: "重新开始", next: "startGame" }
        ]
    }
};

function startNewGame() {
    patientDiseases = generateRandomDiseases();
    let money = Math.floor(Math.random() * (1300 - 500 + 1)) + 500; // 重置钱数
    currentStoryNode = story.start; // 初始化故事节点
    //这里还要改的
    //medicalRecords = []; // 重置病历本
    medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
    const record = {

    };
    medicalRecords.push(record);
    if (medicalRecords.length <= 0) {
        medicalRecords = [];
    }
    showStory(story.start);
    saveGameState(); // 保存游戏状态和病历本
}

function startGame(newGame = false) {
    console.log('startGame function to start a newGame');
    if (newGame) {
        patientDiseases = generateRandomDiseases();

        diseasesTips.innerHTML = "";
        console.log('diseasesTips.innerHTML cleared');

        money = Math.floor(Math.random() * (1300 - 500 + 1)) + 500; // 每次重新开始游戏时重置钱数
        console.log('money set to', money);
        document.getElementById("money").innerText = money;

        currentStoryNode = story.start; // 初始化故事节点
        // 仅在开始新游戏时重置病历本
        medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
        medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
        const record = {

        };
        medicalRecords.push(record);
        if (medicalRecords.length <= 0) {
            medicalRecords = [];
        }
        saveGameState(); // 保存游戏状态和病历本
        showStory(story.start);

    } else {
        loadGameState();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('front-page-button').addEventListener('click', function () {
        window.location.href = 'index.html'; // 跳转到游戏页面
    });
    document.getElementById("new-game-button").addEventListener("click", function () {
        startGame(true); // 调用 startGame 并传入参数 true
    });
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



function showStory(storyNode) {
    if (!storyNode) {
        console.error("storyNode is undefined");
        return;
    }
    console.log("Showing story node:", storyNode);
    currentStoryNode = storyNode; // 保存当前故事节点

    // const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");

    // storyText.innerText = storyNode.text;
    choicesDiv.innerHTML = "";

    switch (storyNode.nodename) {
        case 'start':
            //输入一个问题
            proceedToStart();
            break;
        case 'triage':
            proceedToTriage();
            break;
        case 'diagnosis':
            processDiagnosis();
            break;
        case 'treatment':
            treatmentDo();
            break;
        case 'end':
            processEnd();
            break;
        default:
            break;
    }
    // 更新钱包显示
    document.getElementById("money").innerText = money;
}

function processEnd() {
    console.log('end..');
    //clear under treatment的病例
    medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
    const record = {

    };
    medicalRecords.push(record);

    saveGameState(); // 保存游戏状态和病历本
}


//proceedToStart
function proceedToStart() {
    const choicesDiv = document.getElementById("choices");
    fetch('01 reception.html')
        .then(response => response.text())
        .then(html => {
            choicesDiv.innerHTML = html;

            // 在 fetch 完成后，获取按钮元素，并设置点击事件处理程序
            const button = document.getElementById("answerButton");
            button.onclick = () => proceedToStartActionDo();
        });
}

function proceedToStartActionDo() {
    const question1 = document.getElementById('question1');
    const diseasesTips = document.getElementById('diseasesTips');
    const choicesDiv = document.getElementById("choices");
    const thisIs = document.getElementById('thisis');
    thisIs.innerHTML = "PAYMENT ROOM";
    choicesDiv.innerHTML = "";
    diseasesTips.innerHTML = "";

    if (question1.value !== '') {
        console.log(patientDiseases);
        //clear under treatment的病例

        medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
        const record = {
            status: 'under treatment',
            department: getDiseasesDepartment(),
            disease: null,
            treatment: null,
            result: null
        };
        medicalRecords.push(record);
        saveGameState(); // 保存游戏状态和病历本
        diseasesTips.innerHTML = "The triage desk recommends you go to:" + getDiseasesDepartment();

        //替换现在界面
        // 加载 payment.html 并替换内容
        fetch('02 payment.html')
            .then(response => response.text())
            .then(html => {
                choicesDiv.innerHTML = html;

                // 设置 pay 按钮的点击事件
                const button = document.getElementById("payButton");
                button.onclick = () => pay1ActionDo();
            });
    } else {
        proceedToStart();
    }
}

//付钱行为
function pay1ActionDo() {
    const pay1 = document.getElementById("pay1");
    if (pay1.value != '') {
        money = money - pay1.value;
        // 更新钱包显示
        document.getElementById("money").innerText = money;
        currentStoryNode = story.triage;
        showStory(currentStoryNode)
    }
}

function getDiseasesDepartment() {
    let department = "";
    for (let index = 0; index < patientDiseases.length; index++) {
        department += patientDiseases[index].department + "&nbsp";
    }
    return department;
}
//加载电梯页面
function proceedToTriage() {
    const thisIs = document.getElementById('thisis');
    thisIs.innerHTML = "ELEVATOR ROOM";
    const choicesDiv = document.getElementById("choices");

    // 加载 elevator.html 文件的内容
    fetch('03 elevator_scale.html')
        .then(response => response.text())
        .then(html => {
            // 将 elevator.html 的内容插入到 choicesDiv 中
            choicesDiv.innerHTML = html;

            // 查找电梯按钮的容器
            const departmentButtonsDiv = document.querySelector('.floor-container.department-buttons');

            // 获取所有已经存在的按钮元素
            const buttons = departmentButtonsDiv.querySelectorAll('.button-elevator');

            // 为每个按钮添加点击事件处理程序
            buttons.forEach((button, index) => {
                const departmentName = button.innerText.trim();
                console.log(`Department Name: ${departmentName}`);
                console.log(`Disease Data: `, diseases[departmentName]);
                const department = {
                    department: departmentName,
                    disease: diseases[departmentName]
                };

                // 添加点击事件处理程序
                button.addEventListener('click', () => proceedToTriageActionDo(department));
            });

        });
}


function proceedToTriageActionDo(department) {
    currentDepartment = department;
    showStory(story.diagnosis);
}


//医生房间，诊断部分
//在这里需要补充改变choice的css的显示空间大小。
function processDiagnosis() {
    console.log("Proceeding to diagnosis...");
    if (patientDiseases.length === 0) {
        console.error("No diseases found for the patient.");
        return;
    }
    console.log(currentDepartment);
    const thisIs = document.getElementById('thisis');
    thisIs.innerHTML = currentDepartment['department'];

    const found = patientDiseases.find(item => item.department === currentDepartment['department']);//这一行代码是核心逻辑，它通过 find 方法在 patientDiseases 列表中查找与当前科室（currentDepartment['department']）匹配的疾病项。如果找到匹配项，则将其存储在 found 变量中；否则，found 为 undefined。
    if (found) {
        // 如果找到了匹配的疾病，将 isCorrect 设置为 true，并存储疾病信息
        window.isCorrect = true;
        window.currentDisease = found;
        // 记录找到的疾病和当前部门
        console.log('Found disease:', found);
        console.log('Current department:', currentDepartment);

        medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
        const record = {
            status: 'under treatment',
            department: currentDepartment['department'],
            disease: found.disease.symptoms,
            treatment: null,
            result: null
        };
        medicalRecords.push(record);
        saveGameState(); // 保存游戏状态和病历本
        flag = true;
    } else {
        flag = false;
        // 如果没有找到匹配的疾病，将 isCorrect 设置为 false
        window.isCorrect = false;
        window.currentDisease = null;  // 如果没有找到疾病，currentDisease 设置为 null
        console.log('No matching disease found.');
    }
    // 加载 chatRoom.html 文件的内容
    fetch('./04 chatRoom.html')  // 确保路径和文件名正确
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const choicesDiv = document.getElementById("choices");
            choicesDiv.innerHTML = html;
            console.log('Loaded chatRoom.html successfully.');
            // console.log("Before calling initializeChatRoom:", currentDepartment);
            initializeChatRoom();
        });
}

// 初始化 chatRoom.html 相关的逻辑
function initializeChatRoom() {
    // console.log('initializeChatRoom is loading');
    console.log("Inside initializeChatRoom, currentDepartment:", currentDepartment);

    const room = chatRooms[currentDepartment.department]; // 选择的科室对应的房间数据

    if (room) {
        const scene = isCorrect ? room.correct : room.wrong; // 选择正确或错误的房间数据

        // 动态加载背景图像
        const backgroundContainer = document.getElementById("background-container");
        backgroundContainer.innerHTML = ""; // 清空之前的内容
        scene.background.forEach(bg => {
            const bgElement = document.createElement("img");
            bgElement.src = `../image/${bg}`;
            // console.log('Loading background image from:', bgElement.src);
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
            // console.log('Loading character image from:', imgElement.src);
            imgElement.classList.add("character-img");
            // imgElement.onload = () => console.log('Character image loaded successfully:', imgElement.src);
            imgElement.onerror = () => console.error(`Failed to load character image: ${imgElement.src}`);
            characterContainer.appendChild(imgElement);
            // console.log('Character image appended to container:', imgElement);
        });
        // 动态加载前景图像
        const frontgroundContainer = document.getElementById("frontground-container");
        frontgroundContainer.innerHTML = ""; // 清空之前的内容
        if (scene.frontground && Array.isArray(scene.frontground) && scene.frontground.length > 0) {
            scene.frontground.forEach(fg => {
                const fgElement = document.createElement("img");
                fgElement.src = `../image/${fg}`;
                // console.log('Loading frontground image from:', fgElement.src);
                fgElement.classList.add("frontground-img");
                fgElement.onerror = () => console.error(`Failed to load frontground image: ${fgElement.src}`);
                frontgroundContainer.appendChild(fgElement);
            });
        } else {
            console.log('No frontground data available, skipping frontground loading.');
        }

        // 显示多个对话段落
        let currentDialogIndex = 0;
        const dialogText = document.getElementById("dialog-text");
        dialogText.innerText = scene.dialogs[currentDialogIndex];

        function showNextDialog() {
            console.log('showNextDialog called');
            currentDialogIndex++;//每调用一次这个函数，currentDialogIndex 的值就会增加1，指向下一个对话段落。
            if (currentDialogIndex < scene.dialogs.length) {
                dialogText.innerText = scene.dialogs[currentDialogIndex];//检查 currentDialogIndex 是否小于 scene.dialogs 的总长度。如果是，则更新 dialogText 的内容为下一段对话。
            } else if (scene.treatmentStep) {
                currentDepartment.disease.forEach(disease => {
                    const treatmentOptions = disease.treatments;
                    // 处理每个 treatmentOptions
                    console.log('Treatment options:', treatmentOptions);
                    loadTreatmentOptions(treatmentOptions);//对话完了加载治疗方案
                });

            } else {
                document.getElementById("goButton").style.display = "block";
            }
        }

        // 为下一步按钮绑定事件，用于切换到下一个对话段落
        document.getElementById("nextButton").onclick = showNextDialog;

        // 初始显示第一个对话段落
        document.getElementById("nextButton").style.display = "block";
    } else {
        console.log('Current department name:', currentDepartment.department);
        console.error('Room information not found for department:', currentDepartment.department);
    }

    document.getElementById("backButton").onclick = () => backToChoice();
}

//故事节点更新
function chatRoomActionDo() {
    currentStoryNode = story.treatment;
    showStory(currentStoryNode)
}


function loadTreatmentOptions(treatmentOptions) {
    const treatmentOptionsDiv = document.getElementById("treatment-options");
    document.getElementById("treatment-options").style.display = "block"; // 显示治疗选项按钮
    treatmentOptionsDiv.innerHTML = ""; // 清空已有的治疗选项
    // 动态生成并添加治疗选项按钮
    if (treatmentOptions && Array.isArray(treatmentOptions)) {
        treatmentOptions.forEach(treatment => {
            const button = document.createElement("button");
            button.textContent = `$${treatment.method} - ${treatment.price}`;
            button.onclick = function () {
                console.log('Selected treatment:', treatment);
                handleTreatmentChoice({
                    treatment: treatment, // 传递治疗选项
                    department: currentDepartment, // 传递当前科室信息
                    disease: currentDepartment.disease // 传递当前疾病信息
                });
            };
            treatmentOptionsDiv.appendChild(button);
            console.log('Button added:', button.textContent); // 输出每个按钮的文本
        });

    } else {
        console.error('Treatment options are undefined or not an array');
    }

    // document.getElementById("nextButton").style.display = "block"; // 显示“Next”按钮
}

// 处理治疗选择的函数（示例）  
function handleTreatmentChoice(choice) {
    const selectedDisease = choice.disease[0]; // 使用第一个疾病对象
    console.log('Selected treatment:', choice.treatment.method, 'at', choice.treatment.price);

    // 更新病历本
    const record = {
        status: '历史记录',
        department: choice.department.department,
        disease: selectedDisease.name, // 使用疾病的名字
        symptoms: selectedDisease.symptoms, // 使用疾病的症状
        treatment: choice.treatment.method,
        result: choice.treatment.effect
    };
    medicalRecords.push(record);

    treatmentComplete(choice);
    saveGameState(); // 保存游戏状态和病历本
}

//治疗选择之后的结果
function treatmentComplete(choice) {
    console.log("Treatment complete with treatment:", choice);

    if (money >= choice.treatment.price) {
        money -= choice.treatment.price;
        alert(`选择的治疗方法是：${choice.treatment.method}。效果：${choice.treatment.effect}`);

        if (choice.treatment.effect === '部分缓解') {
            isDead -= 30;  // 这是一个概率
        }

        // 找到并移除对应的疾病
        for (let i = patientDiseases.length - 1; i >= 0; i--) {
            if (patientDiseases[i].department === choice.department.department) {
                patientDiseases.splice(i, 1);
                break;  // 移除后立即退出循环，确保只移除一个疾病
            }
        }

        // 更新病历本
        const record = {
            status: 'history',
            department: choice.department.department,
            disease: choice.disease.disease.name,
            symptoms: choice.disease.disease.symptoms,
            treatment: choice.treatment.method,
            result: choice.treatment.effect
        };
        medicalRecords.push(record);

        saveGameState(); // 保存游戏状态和病历本

        document.getElementById("diseasesTips").innerHTML = "The triage desk recommends you go to:" + getDiseasesDepartment();
        if (patientDiseases.length > 0) {
            // 如果还有剩余疾病，继续选择下一个科室
            showStory(story.triage); // 继续分诊
        } else {
            // 没有剩余疾病了，进入结算页
            showEndPage();
        }
    } else {
        alert("You don't have enough money!");
    }
}


// function treatmentDo() {
//     let department = currentDepartment['department'];
//     const found = patientDiseases.find(item => item.department === department);

//     const choicesDiv = document.getElementById("choices");
//     choicesDiv.innerHTML = "";
//     if (found) {
//         console.log('department match');
//         // 加载 treatment.html 内容
//         fetch('05 treatment.html')
//             .then(response => response.text())
//             .then(html => {
//                 choicesDiv.innerHTML = html;

//                 // 更新病历本
//                 console.log(found);
//                 medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
//                 const record = {
//                     status: 'under treatment',
//                     department: department,
//                     disease: found.disease.name,
//                     symptoms: found.disease.symptoms,
//                     treatment: null,
//                     result: null
//                 };
//                 medicalRecords.push(record);

//                 saveGameState(); // 保存游戏状态和病历本

//                 // 绑定下一步按钮事件
//                 const button = document.getElementById("nextButton");
//                 button.onclick = () => showDisease(found);
//             });
//     } else {
//         // 加载 wrongRoom.html 内容
//         fetch('06 wrongRoom.html')
//             .then(response => response.text())
//             .then(html => {
//                 choicesDiv.innerHTML = html;

//                 // 绑定返回按钮事件
//                 const button = document.getElementById("backButton");
//                 button.onclick = () => backToChoice();
//             });
//     }
// }

//节点
function backToChoice() {
    currentStoryNode = story.triage;
    showStory(currentStoryNode);
}


//病历本
function saveGameState() {
    const gameState = {
        patientDiseases,
        currentStoryNode,
        currentDepartment,
        money,
        medicalRecords // 保存病历本
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords)); // 保存病历本到 localStorage
}
//节点
function loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState && gameState.currentStoryNode) {
        patientDiseases = gameState.patientDiseases;
        money = gameState.money;
        currentStoryNode = gameState.currentStoryNode;
        medicalRecords = gameState.medicalRecords || [];
        showStory(currentStoryNode);
    } else {
        startGame(true);
    }
}



//结算页
function showEndPage() {
    currentStoryNode = story.end;
    showStory(currentStoryNode)
    const choicesDiv = document.getElementById("choices");

    // 加载 end.html 文件的内容
    fetch('07 end.html')
        .then(response => response.text())
        .then(html => {
            // 将 end.html 的内容插入到 choicesDiv 中
            choicesDiv.innerHTML = html;

            // 显示结算信息
            const summaryDiv = document.getElementById("summary");
            summaryDiv.innerHTML = `
                Remaining money: $ ${money}<br>
                Diseases you have treated: ${medicalRecords.length} cases
            `;

            // 绑定重新开始按钮事件
            const restartButton = document.getElementById("restartButton");
            restartButton.onclick = () => {
                startGame(true); // 保持原有的逻辑
                document.getElementById("money").innerText = money; // 更新钱包显示
            };
        });
}

//生成随机的疾病
function generateRandomDiseases() {
    const selectedDiseases = [];
    const diseaseDepartments = Object.keys(diseases);
    const numberOfDiseases = Math.min(Math.floor(Math.random() * 3) + 1, diseaseDepartments.length); // 随机生成1-3个疾病，且数量不超过部门的数量

    let availableDepartments = [...diseaseDepartments]; // 创建一个可用部门的副本

    for (let i = 0; i < numberOfDiseases; i++) {
        const randomIndex = Math.floor(Math.random() * availableDepartments.length);
        const randomDepartment = availableDepartments[randomIndex];
        const randomDisease = diseases[randomDepartment][Math.floor(Math.random() * diseases[randomDepartment].length)];
        selectedDiseases.push({ department: randomDepartment, disease: randomDisease });

        // 从可用部门中移除已选择的部门，确保不会重复选择相同的部门
        availableDepartments.splice(randomIndex, 1);
    }

    return selectedDiseases;
}



/**
 * 加载病历
 */
function loadMedicalRecords() {
    const medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    const currentTreatmentRecordsDiv = document.getElementById('current-treatment-text');
    const historyTreatmentRecordsDiv = document.getElementById('history-treatment-text');

    const currentTreatmentRecords = medicalRecords.filter(record => record.status === 'under treatment');
    const historyRecords = medicalRecords.filter(record => record.status === 'history');

    // 对历史记录进行逆序排列，确保最新的记录显示在最上面
    historyRecords.reverse();

    if (currentTreatmentRecords.length === 0) {
        currentTreatmentRecordsDiv.innerHTML = '<span style=" font-size: 18px; font-weight: 300; padding: 10px; display: block;">No ongoing treatment records.</span>';


    } else {
        currentTreatmentRecordsDiv.innerHTML = currentTreatmentRecords.map(record =>
            `<div>
                <strong>department:</strong> ${record.department}<br>
                <strong>disease:</strong> ${record.disease}<br>
                <strong>symptoms:</strong> ${record.symptoms || 'unknown'}<br>
                <strong>treatment:</strong> ${record.treatment || 'untreated'}<br>
                <strong>result:</strong> ${record.result || 'unknown'}
            </div>`
        ).join('<br><br>');
    }

    if (historyRecords.length === 0) {
        currentTreatmentRecordsDiv.innerHTML = '<span style=" font-size: 18px; font-weight: 300; padding: 10px; display: block;">No history records available.</span>';
    } else {
        historyTreatmentRecordsDiv.style.fontSize = '18px';
        historyTreatmentRecordsDiv.style.padding = '10px';
        historyTreatmentRecordsDiv.innerHTML = historyRecords.map(record =>
            `<div>
                <strong>department:</strong> ${record.department}<br>
                <strong>disease:</strong> ${record.disease}<br>
                <strong>symptoms:</strong> ${record.symptoms || 'unknown'}<br>
                <strong>treatment:</strong> ${record.treatment || 'untreated'}<br>
                <strong>result:</strong> ${record.result || 'unknown'}
            </div>`
        ).join('<br><br>');
    }
}

