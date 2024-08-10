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

function startGame(newGame = false) {
    if (newGame) {
        patientDiseases = generateRandomDiseases();
        let money = Math.floor(Math.random() * (1300 - 500 + 1)) + 500; // 每次重新开始游戏时重置钱数
        currentStoryNode = story.start; // 初始化故事节点
        // 仅在开始新游戏时重置病历本
        medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];

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
    //clear 正在治疗的病例
    medicalRecords = medicalRecords.filter(record => record.status !== '正在治疗');
    const record = {

    };
    medicalRecords.push(record);

    saveGameState(); // 保存游戏状态和病历本
}
//proceedToStart
function proceedToStart() {
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "请问你哪里不舒服";
    choicesDiv.innerHTML += "<input  id='question1' value=''/>";

    const button = document.createElement("button");
    button.className = "choice";
    button.innerText = 'answer';
    button.onclick = () => proceedToStartActionDo();
    choicesDiv.appendChild(button);
}

function proceedToStartActionDo() {
    const question1 = document.getElementById('question1');
    const diseasesTips = document.getElementById('diseasesTips');
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    diseasesTips.innerHTML = "";
    if (question1.value !== '') {
        console.log(patientDiseases);
        //clear 正在治疗的病例

        medicalRecords = medicalRecords.filter(record => record.status !== '正在治疗');
        const record = {
            status: '正在治疗',
            department: getDiseasesDepartment(),
            disease: null,
            treatment: null,
            result: null
        };
        medicalRecords.push(record);
        saveGameState(); // 保存游戏状态和病历本
        diseasesTips.innerHTML = getDiseasesDepartment();
        //替换现在界面
        choicesDiv.innerHTML += "<Br>付款台，请输入你想给我们多少钱，请记住，你的行为会放入你的信用档案。";
        choicesDiv.innerHTML += "<input  id=pay1 type=number value=''/>";
        const button = document.createElement("button");
        button.className = "choice";
        button.innerText = 'pay';
        button.onclick = () => pay1ActionDo();
        choicesDiv.appendChild(button);
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
        department += patientDiseases[index].department + ",";
    }
    return department;
}

//proceedToTriage
function proceedToTriage() {
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "这里是电梯厅，请选择你要去的科室。";
    proceedToSelectDepartment();
    const diseaseDepartments = Object.keys(diseases);
    for (let i = 0; i < diseaseDepartments.length; i++) {
        let department = { department: diseaseDepartments[i], disease: diseases[diseaseDepartments[i]] };
        const button = document.createElement("button");
        button.className = "choice";
        button.innerText = diseaseDepartments[i];
        button.onclick = () => proceedToTriageActionDo(department);
        choicesDiv.appendChild(button);
    }
}

function proceedToTriageActionDo(department) {
    currentDepartment = department;
    showStory(story.diagnosis);
}

function processDiagnosis() {
    console.log("Proceeding to diagnosis...");
    if (patientDiseases.length === 0) {
        console.error("No diseases found for the patient.");
        return;
    }
    console.log(currentDepartment);
    const found = patientDiseases.find(item => item.department === currentDepartment['department']);
    if (found) {
        medicalRecords = medicalRecords.filter(record => record.status !== '正在治疗');
        const record = {
            status: '正在治疗',
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

    const department = currentDepartment;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    const depDiv = document.createElement("div");
    depDiv.innerHTML = department['department'];

    choicesDiv.appendChild(depDiv);
    const div = document.createElement("div");
    div.innerHTML = "chat room";
    choicesDiv.appendChild(div);
    const button = document.createElement("button");
    button.className = "choice";
    button.innerText = 'go';
    button.onclick = () => chatRoomActionDo();
    choicesDiv.appendChild(button);
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

        choicesDiv.innerHTML = "医生下诊断，诊断将会写入你的病历本";
        const button = document.createElement("button");
        // 更新病历本
        console.log(found);
        //clear 正在治疗的病例
        medicalRecords = medicalRecords.filter(record => record.status !== '正在治疗');
        const record = {
            status: '正在治疗',
            department: department,
            disease: found.disease.name,
            symptoms: found.disease.symptoms,
            treatment: null,
            result: null
        };
        medicalRecords.push(record);

        saveGameState(); // 保存游戏状态和病历本

        button.className = "choice";
        button.innerText = '下一步';
        button.onclick = () => showDisease(found);
        choicesDiv.appendChild(button);
    } else {
        choicesDiv.innerHTML = "这不是你需要来的地方，请回电梯厅";
        const button = document.createElement("button");
        button.className = "choice";
        button.innerText = '返回';
        button.onclick = () => backToChoice();
        choicesDiv.appendChild(button);
    }

}

function backToChoice() {
    currentStoryNode = story.triage;
    showStory(currentStoryNode);
}

function showDisease(found) {
    console.log(found['disease']);
    const treatmentChoices = found['disease']['treatments'].map(treatment => {
        return { text: `${treatment.method} - ${treatment.price}元`, next: "treatmentComplete", treatment: treatment, department: currentDepartment, disease: found };
    });
    // 遍历treatmentChoices数组  
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    treatmentChoices.forEach(choice => {
        // 为每个治疗选项创建一个新的按钮  
        const button = document.createElement('button');
        button.className = 'treatment-choice'; // 可以给按钮添加一个类名以便样式化  
        button.textContent = choice.text; // 设置按钮的文本内容  

        // 如果需要，给按钮添加点击事件处理函数  
        button.onclick = function () {
            // 这里可以执行一些操作，比如跳转到治疗完成的页面或显示更多信息  
            // 注意：这里的this指向的是被点击的按钮，你可以通过this访问到与按钮相关联的数据  
            // 例如：console.log(this.dataset.treatmentId); 如果你在创建按钮时设置了data属性  

            // 假设有一个函数来处理治疗选择  
            handleTreatmentChoice(choice);
        };

        // 如果需要，可以将与按钮相关的数据存储在data属性中  
        // button.dataset.treatmentId = choice.treatment.id; // 假设每个treatment都有一个唯一的id  

        // 将按钮添加到容器中  
        choicesDiv.appendChild(button);
    });

}

// 处理治疗选择的函数（示例）  
function handleTreatmentChoice(choice) {
    console.log('Selected treatment:', choice.treatment.method, 'at', choice.treatment.price, 'yuan');
    // 这里可以添加更多逻辑，比如更新页面内容、发送请求到服务器等  
    treatmentComplete(choice);
}



function viewMedicalRecords() {
    saveGameState(); // 进入病例本前保存当前游戏状态
    window.location.href = 'medical-records.html';
}

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

const story = {
    start: {
        nodename: 'start',
        text: "欢迎来到模因健康中心，这里是大厅。听说您身体不适，请检查您的钱包，是否要进入大门。",
        choices: [
            { text: "去分诊台", next: "triage" }
        ]
    },
    triage: {
        nodename: 'triage',
        text: "电梯厅。",
        choices: [
            { text: "分诊", next: "diagnosis" }
        ]
    },
    diagnosis: {
        nodename: 'diagnosis',
        text: "你被分诊到以下科室：\n",
        choices: [
            { text: "选择科室", next: "selectDepartment" }
        ]
    },
    treatment: {
        nodename: 'treatment',
        text: "医生房间。",
        choices: []
    },
    end: {
        nodename: 'end',
        text: "所有疾病已治愈，游戏结束。",
        choices: [
            { text: "重新开始", next: "startNewGame" }
        ]
    }
};


// function proceedToDiagnosis() {
//     console.log("Proceeding to diagnosis...");
//     if (patientDiseases.length === 0) {
//         console.error("No diseases found for the patient.");
//         return;
//     }
//     showStory(story.diagnosis);
// }

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


function treatmentComplete(treatment) {
    console.log("Treatment complete with treatment:", treatment);
    if (money >= treatment.treatment.price) {
        money -= treatment.treatment.price;
        alert(`选择的治疗方法是：${treatment.treatment.method}。效果：${treatment.treatment.effect}`);
        //
        if (treatment.treatment.effect == '部分缓解') {
            isDead = isDead - 30;  //这是一个概率
        }
        //治疗后去掉该病
        for (let i = patientDiseases.length - 1; i >= 0; i--) {
            if (patientDiseases[i]['department'] === treatment.department.department) {
                patientDiseases.splice(i, 1);
            }
        }
        // 更新病历本
        const record = {
            status: '历史记录',
            department: treatment.department.department,
            disease: treatment.disease.disease.name,
            symptoms: treatment.disease.disease.symptoms,
            treatment: treatment.treatment.method,
            result: treatment.treatment.effect
        };
        medicalRecords.push(record);

        saveGameState(); // 保存游戏状态和病历本

        document.getElementById("diseasesTips").innerHTML = getDiseasesDepartment();
        // 如果还有剩余疾病，继续选择下一个科室
        if (patientDiseases.length > 0) {
            showStory(story.triage);
        } else {
            showStory(story.end);
        }
    } else {
        alert("你的钱不够！");
    }
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
    medicalRecords = medicalRecords.filter(record => record.status !== '正在治疗');
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

    const currentTreatmentRecords = medicalRecords.filter(record => record.status === '正在治疗');
    const historyRecords = medicalRecords.filter(record => record.status === '历史记录');

    if (currentTreatmentRecords.length === 0) {
        currentTreatmentRecordsDiv.innerText = "暂无正在治疗的记录。";
    } else {
        if (flag) {
            currentTreatmentRecordsDiv.innerHTML = currentTreatmentRecords.map(record =>
                `<div>
                    <strong>部门:</strong> ${record.department}<br>
                    <strong>疾病:</strong> ${record.disease}<br>
                    <strong>症状:</strong> ${record.symptoms || '未知'}<br>
                    <strong>治疗:</strong> ${record.treatment || '未治疗'}<br>
                    <strong>结果:</strong> ${record.result || '未知'}
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
        historyTreatmentRecordsDiv.innerText = "暂无历史记录。";
    } else {
        historyTreatmentRecordsDiv.innerHTML = historyRecords.map(record =>
            `<div>
                <strong>部门:</strong> ${record.department}<br>
                <strong>疾病:</strong> ${record.disease}<br>
                <strong>症状:</strong> ${record.symptoms || '未知'}<br>
                <strong>治疗:</strong> ${record.treatment || '未治疗'}<br>
                <strong>结果:</strong> ${record.result || '未知'}
            </div>`
        ).join('<br><br>');
    }
}