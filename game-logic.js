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
        text: "Welcome to the Meme Health Center! This is the lobby. Heard you’re not feeling well—better check your wallet before you enter the gate.",
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
            { text: "重新开始", next: "startNewGame" }
        ]
    }
};

function startGame(newGame = false) {
    if (newGame) {
        patientDiseases = generateRandomDiseases();
        let money = Math.floor(Math.random() * (1300 - 500 + 1)) + 500; // 每次重新开始游戏时重置钱数
        currentStoryNode = story.start; // 初始化故事节点
        // 仅在开始新游戏时重置病历本
        medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
        // 重置任务栏
        diseasesTips.innerHTML = "";

        if (medicalRecords.length <= 0) {
            medicalRecords = [];
        }


        showStory(story.start);
    } else {
        loadGameState();
    }
}
//
function showStory(storyNode) {
    if (!storyNode) {
        console.error("storyNode is undefined");
        return;
    }
    console.log("Showing story node:", storyNode);
    currentStoryNode = storyNode; // 保存当前故事节点

    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");

    storyText.innerText = storyNode.text;
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

function proceedToTriage() {
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
function processDiagnosis() {
    console.log("Proceeding to diagnosis...");
    if (patientDiseases.length === 0) {
        console.error("No diseases found for the patient.");
        return;
    }
    console.log(currentDepartment);
    const found = patientDiseases.find(item => item.department === currentDepartment['department']);
    if (found) {
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
    }

    const choicesDiv = document.getElementById("choices");

    // 加载 chatRoom.html 文件的内容
    fetch('04 chatRoom.html')
        .then(response => response.text())
        .then(html => {
            // 将 chatRoom.html 的内容插入到 choicesDiv 中
            choicesDiv.innerHTML = html;

            // 显示当前科室名称
            const depDiv = document.getElementById("diagnosis-department");
            depDiv.innerHTML = currentDepartment['department'];

            // 为 go 按钮添加点击事件处理程序
            const button = document.getElementById("goButton");
            button.onclick = () => chatRoomActionDo();
        });
}

function chatRoomActionDo() {
    currentStoryNode = story.treatment;
    showStory(currentStoryNode)
}


function treatmentDo() {
    let department = currentDepartment['department'];
    const found = patientDiseases.find(item => item.department === department);
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    if (found) {
        // 加载 treatment.html 内容
        fetch('05 treatment.html')
            .then(response => response.text())
            .then(html => {
                choicesDiv.innerHTML = html;

                // 更新病历本
                console.log(found);
                medicalRecords = medicalRecords.filter(record => record.status !== 'under treatment');
                const record = {
                    status: 'under treatment',
                    department: department,
                    disease: found.disease.name,
                    symptoms: found.disease.symptoms,
                    treatment: null,
                    result: null
                };
                medicalRecords.push(record);

                saveGameState(); // 保存游戏状态和病历本

                // 绑定下一步按钮事件
                const button = document.getElementById("nextButton");
                button.onclick = () => showDisease(found);
            });
    } else {
        // 加载 wrongRoom.html 内容
        fetch('06 wrongRoom.html')
            .then(response => response.text())
            .then(html => {
                choicesDiv.innerHTML = html;

                // 绑定返回按钮事件
                const button = document.getElementById("backButton");
                button.onclick = () => backToChoice();
            });
    }
}


function backToChoice() {
    currentStoryNode = story.triage;
    showStory(currentStoryNode);
}
function showDisease(found) {
    console.log(found['disease']);

    const treatmentChoices = found['disease']['treatments'].map(treatment => {
        return {
            text: `$ ${treatment.method} - ${treatment.price}`,
            next: "treatmentComplete",
            treatment: treatment,
            department: currentDepartment,
            disease: found
        };
    });

    const treatmentOptionsDiv = document.getElementById("treatment-options");

    if (!treatmentOptionsDiv) {
        console.error("treatment-options container not found");
        return;
    }

    // 清空已有的治疗选项按钮
    treatmentOptionsDiv.innerHTML = "";

    // 动态生成并添加治疗选项按钮
    treatmentChoices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'treatment-choice';
        button.textContent = choice.text;

        // 绑定治疗选项按钮的点击事件
        button.onclick = function () {
            handleTreatmentChoice(choice);
        };

        treatmentOptionsDiv.appendChild(button);
    });
}


// 处理治疗选择的函数（示例）  
function handleTreatmentChoice(choice) {
    console.log('Selected treatment:', choice.treatment.method, 'at', choice.treatment.price, 'yuan');

    // 更新金钱和病历
    money -= choice.treatment.price;
    const record = {
        status: '历史记录',
        department: choice.department.department,
        disease: choice.disease.disease.name,
        symptoms: choice.disease.disease.symptoms,
        treatment: choice.treatment.method,
        result: choice.treatment.effect
    };
    medicalRecords.push(record);

    treatmentComplete(choice);
    saveGameState(); // 保存游戏状态和病历本
}


// function showEndPage() {
//     const choicesDiv = document.getElementById("choices");

//     // 加载 end.html 文件的内容
//     fetch('07 end.html')
//         .then(response => response.text())
//         .then(html => {
//             // 将 end.html 的内容插入到 choicesDiv 中
//             choicesDiv.innerHTML = html;

//             // 显示结算信息
//             const summaryDiv = document.getElementById("summary");
//             summaryDiv.innerHTML = `
//                 剩余金钱: ${gameState.money}元<br>
//                 你已治疗的疾病: ${gameState.medicalRecords.length}例
//             `;

//             // 绑定重新开始按钮事件
//             const restartButton = document.getElementById("restartButton");
//             restartButton.onclick = () => startGame(true);
//         });
// }


// function viewMedicalRecords() {
//     saveGameState(); // 进入病例本前保存当前游戏状态
//     window.location.href = 'medical-records.html';
// }

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


function proceedToSelectDepartment() {
    const departmentChoices = patientDiseases.map(disease => {
        return { text: `${disease.department}`, next: "treatment", department: disease.department, disease: disease.disease };
    });

    const selectDepartmentNode = {
        text: "选择你要去的科室：",
        choices: departmentChoices,
        nodename: 'diagnosis',
    };
    story.selectDepartment = selectDepartmentNode;
}


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

        document.getElementById("diseasesTips").innerHTML = getDiseasesDepartment();

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



function generateRandomDiseases() {
    const selectedDiseases = [];
    const diseaseDepartments = Object.keys(diseases);
    const numberOfDiseases = Math.floor(Math.random() * 3) + 1; // 随机1-3种病
    for (let i = 0; i < numberOfDiseases; i++) {
        const randomDepartment = diseaseDepartments[Math.floor(Math.random() * diseaseDepartments.length)];
        const randomDisease = diseases[randomDepartment][Math.floor(Math.random() * diseases[randomDepartment].length)];
        selectedDiseases.push({ department: randomDepartment, disease: randomDisease });
    }
    return selectedDiseases;
}

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

/**
 * 加载病历
 */
function loadMedicalRecords() {
    const medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    const currentTreatmentRecordsDiv = document.getElementById('current-treatment-records');
    const historyTreatmentRecordsDiv = document.getElementById('history-treatment-records');

    const currentTreatmentRecords = medicalRecords.filter(record => record.status === 'under treatment');
    const historyRecords = medicalRecords.filter(record => record.status === 'history');

    if (currentTreatmentRecords.length === 0) {
        currentTreatmentRecordsDiv.innerText = "No ongoing treatment records.";
    } else {
        if (flag) {
            currentTreatmentRecordsDiv.innerHTML = currentTreatmentRecords.map(record =>
                `<div>
                    <strong>department</strong> ${record.department}<br>
                    <strong>disease:</strong> ${record.disease}<br>
                    <strong>symptoms:</strong> ${record.symptoms || 'unknown'}<br>
                    <strong>treatment:</strong> ${record.treatment || 'untreated'}<br>
                    <strong>result:</strong> ${record.result || 'unknown'}
                </div>`
            ).join('<br><br>');
        } else {
            currentTreatmentRecordsDiv.innerHTML = currentTreatmentRecords.map(record =>
                `<div>
                    <strong>部门:</strong> ${record.department}<br>
                  
                </div>`
            ).join('<br><br>');
        }

    }

    if (historyRecords.length === 0) {
        historyTreatmentRecordsDiv.innerText = "No history records available.";
    } else {
        historyTreatmentRecordsDiv.innerHTML = historyRecords.map(record =>
            `<div>
                  <strong>department</strong> ${record.department}<br>
                    <strong>disease:</strong> ${record.disease}<br>
                    <strong>symptoms:</strong> ${record.symptoms || 'unknown'}<br>
                    <strong>treatment:</strong> ${record.treatment || 'untreated'}<br>
                    <strong>result:</strong> ${record.result || 'unknown'}
            </div>`
        ).join('<br><br>');
    }
}