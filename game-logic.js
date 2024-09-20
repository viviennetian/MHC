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

    // 使用 fetch 获取 01 reception.html 的内容
    fetch('01 reception.html')
        .then(response => response.text())
        .then(html => {
            // 将获取到的 HTML 内容插入到 choicesDiv 中
            choicesDiv.innerHTML = html;

            let currentDialogIndex = 0;

            // 获取 girl 对象的 dialogs 数组
            const dialogs = officeChats.girl.dialogs;
            // 加载音效文件，并设置为循环播放
            const typingSound = new Audio('./sound/mi.wav');
            typingSound.addEventListener('canplaythrough', () => {
                typingSound.loop = true;
                typingSound.play();
            });
            // 打字机效果函数
            function typeWriter(text, element, i, callback) {
                if (i === 0) { // 打字开始时播放音效
                    typingSound.currentTime = 0;
                    typingSound.play();
                }

                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    setTimeout(() => typeWriter(text, element, i + 1, callback), 20);
                } else if (callback) {
                    typingSound.pause();
                    typingSound.currentTime = 0;
                    callback();
                }
            }

            // 显示对话框
            function showDialog(index) {
                const dialogBox = document.getElementById("dialog-box-1");
                if (!dialogBox) {
                    console.error("Element with ID dialog-box-1 not found.");
                    return;
                }

                dialogBox.style.display = "block";  // 显示 dialog-box-1

                const assistentText = document.getElementById("assistentText-1");
                if (!assistentText) {
                    console.error("Element with ID assistentText-1 not found.");
                    return;
                }

                typeWriter(dialogs[index], assistentText, 0, () => {
                    const nextButton = document.getElementById("next-button-1");
                    if (nextButton) {
                        nextButton.style.display = "block"; // 显示 Next 按钮
                    } else {
                        console.error("Element with ID next-button-1 not found.");
                    }
                });
            }

            // 隐藏对话框
            function hideDialogBox1() {
                const dialogBox = document.getElementById("dialog-box-1");
                if (dialogBox) {
                    dialogBox.style.display = "none";
                }
            }

            // 显示复选框
            function showChecklist() {
                const dialogBox2 = document.getElementById("dialog-box-2");
                if (!dialogBox2) {
                    console.error("Element with ID dialog-box-2 not found.");
                    return;
                }
                dialogBox2.style.display = "block"; // 显示 dialog-box-2

                const nextButton = document.getElementById("next-button-2");
                if (nextButton) {
                    nextButton.style.display = "block"; // 显示 Confirm 按钮
                } else {
                    console.error("Element with ID next-button-2 not found.");
                }
            }

            // 初始显示第一个对话框
            showDialog(currentDialogIndex);

            // 绑定第一个对话框的 Next 按钮事件
            document.getElementById("next-button-1").onclick = () => {
                hideDialogBox1();  // 隐藏第一个对话框
                showChecklist();   // 显示复选框和 Confirm 按钮
            };

            // 处理复选框的 Confirm 按钮事件
            document.getElementById("next-button-2").onclick = () => {
                // 检查是否有选中的复选框
                const selectedStatements = [];
                for (let i = 1; i <= 5; i++) {
                    const checkbox = document.getElementById(`statement${i}`);
                    if (checkbox.checked) {
                        selectedStatements.push(checkbox.parentElement.textContent.trim());
                    }
                }

                if (selectedStatements.length > 0) {
                    // 至少有一个选项被选中，允许进入下一页
                    console.log('Selected Statements:', selectedStatements); // 在控制台输出用户的选择
                    proceedToStartActionDo();
                } else {
                    // 没有选项被选中，提示用户选择至少一个选项
                    alert("Please select at least one option before proceeding.");
                }
            };
        })
        .catch(error => {
            console.error("Error fetching HTML content:", error);
        });
}



//付钱页
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
        // 清除 under treatment 的病例
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
        diseasesTips.innerHTML = "The triage desk recommends you go to: " + getDiseasesDepartment();

        // 加载 payment.html 并替换内容
        fetch('02 payment.html')
            .then(response => response.text())
            .then(html => {
                choicesDiv.innerHTML = html;

                // 处理动态生成的内容
                let currentDialogIndex = 0;

                const dialogs = [
                    "This is Payment counter. Please enter how much you'd like to pay us.",
                    "Remember, your actions will be recorded in your credit file."
                ];

                // 加载音效文件，并设置为循环播放
                const typingSound = new Audio('./sound/re.wav'); // 请确保此路径正确指向你的音效文件
                typingSound.loop = true;

                // 打字机效果函数
                function typeWriter(text, element, i, callback) {
                    if (i === 0) {
                        typingSound.currentTime = 0; // 重置音效到开头
                        typingSound.play(); // 开始播放音效
                    }

                    if (i < text.length) {
                        element.innerHTML = text.substring(0, i + 1); // 逐字符更新内容
                        i++;
                        setTimeout(() => typeWriter(text, element, i, callback), 20);
                    } else if (callback) {
                        typingSound.pause(); // 打字结束时暂停音效
                        typingSound.currentTime = 0; // 重置音效时间
                        callback();
                    }
                }

                // 显示对话框
                function showDialog(index) {
                    const dialogBox = document.getElementById("text");
                    if (!dialogBox) {
                        console.error("Element with ID text not found.");
                        return;
                    }

                    dialogBox.innerHTML = "";  // 清空对话框内容
                    typeWriter(dialogs[index], dialogBox, 0, () => {
                        const nextButton = document.getElementById("payButton");
                        if (nextButton) {
                            nextButton.style.display = "block"; // 显示按钮
                        } else {
                            console.error("Element with ID payButton not found.");
                        }
                    });
                }

                // 初始显示第一个对话框
                showDialog(currentDialogIndex);

                // 绑定 pay 按钮的点击事件
                document.getElementById("payButton").onclick = () => {
                    // 检查对话是否还有下一段
                    if (currentDialogIndex < dialogs.length - 1) {
                        currentDialogIndex++;
                        showDialog(currentDialogIndex); // 显示下一个对话框
                    } else {
                        document.getElementById("pay1").style.display = "block"; // 显示支付输入框  
                        document.getElementById("payButton").style.display = "block"; // 显示确认按钮  
                        pay1ActionDo(); // 当对话完成后，执行支付逻辑
                    }
                };
            });
    } else {
        proceedToStart(); // 如果 question1 为空，返回初始页面
    }
}


// 付钱行为
function pay1ActionDo() {
    const pay1 = document.getElementById("pay1");
    if (pay1.value != '') {
        money = money - pay1.value;
        // 更新钱包显示
        document.getElementById("money").innerText = money;
        currentStoryNode = story.triage;
        showStory(currentStoryNode);
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
                // console.log(`Department Name: ${departmentName}`);
                // console.log(`Disease Data: `, diseases[departmentName]);
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
            disease: found.disease.name,
            symptoms: found.disease.symptoms,
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
    console.log("Inside initializeChatRoom, currentDepartment:", currentDepartment);

    const room = chatRooms[currentDepartment.department]; // 选择的科室对应的房间数据

    if (room) {
        const scene = isCorrect ? room.correct : room.wrong; // 选择正确或错误的房间数据

        // 只有在正确的房间中才显示症状信息
        if (isCorrect) {
            const currentDisease = currentDepartment.disease[0]; // 假设当前处理第一个疾病
            const symptoms = currentDisease.symptoms || "No symptoms available."; // 获取症状信息
            scene.dialogs.splice(2, 0, `Symptoms: ${symptoms}`); // 插入症状信息
        }

        const backgroundContainer = document.getElementById("background-container");
        backgroundContainer.innerHTML = "";
        scene.background.forEach(bg => {
            const bgElement = document.createElement("img");
            bgElement.src = `./image/${bg}`;
            bgElement.classList.add("background-img");
            backgroundContainer.appendChild(bgElement);
        });

        const characterContainer = document.getElementById("character-container");
        characterContainer.innerHTML = "";
        scene.character.forEach(character => {
            const imgElement = document.createElement("img");
            imgElement.src = `./image/${character}`;
            imgElement.classList.add("character-img");
            characterContainer.appendChild(imgElement);
        });

        const frontgroundContainer = document.getElementById("frontground-container");
        frontgroundContainer.innerHTML = "";
        if (scene.frontground && Array.isArray(scene.frontground) && scene.frontground.length > 0) {
            scene.frontground.forEach(fg => {
                const fgElement = document.createElement("img");
                fgElement.src = `./image/${fg}`;
                fgElement.classList.add("frontground-img");
                frontgroundContainer.appendChild(fgElement);
            });
        }

        let currentDialogIndex = 0;
        const dialogText = document.getElementById("dialog-text");

        const typingSound = new Audio('./sound/dada.wav'); // 加载音效文件
        typingSound.loop = true;

        // 打字机效果函数
        function typeWriter(text, i, callback) {
            if (i === 0) {
                typingSound.currentTime = 0; // 重置音效到开头
                typingSound.play(); // 每次开始新对话时播放音效
            }

            if (i < text.length) {
                dialogText.innerHTML += text.charAt(i);
                i++;
                setTimeout(() => typeWriter(text, i, callback), 10); // 调整打字速度
            } else if (callback) {
                typingSound.pause(); // 打字结束时暂停音效
                typingSound.currentTime = 0;
                callback(); // 完成打字后执行回调
            }
        }

        function showNextDialog() {
            currentDialogIndex++;
            if (currentDialogIndex < scene.dialogs.length) {
                dialogText.innerHTML = "";
                document.getElementById("nextButton").style.display = "none";
                typeWriter(scene.dialogs[currentDialogIndex], 0, () => {
                    document.getElementById("nextButton").style.display = "block";
                });
            } else if (scene.treatmentStep) {
                document.getElementById("nextButton").style.display = "none";
                currentDepartment.disease.forEach(disease => {
                    const treatmentOptions = disease.treatments;
                    loadTreatmentOptions(treatmentOptions);
                });
            } else {
                document.getElementById("nextButton").style.display = "none";
                document.getElementById("backButton").style.display = "block";
                document.getElementById("backButton").onclick = proceedToTriage;
            }
        }

        // 为 nextButton 绑定事件，用于切换到下一个对话段落
        document.getElementById("nextButton").onclick = showNextDialog;

        // 初始显示第一个对话段落，带打字机效果
        document.getElementById("nextButton").style.display = "none";
        typeWriter(scene.dialogs[currentDialogIndex], 0, () => {
            document.getElementById("nextButton").style.display = "block";
        });
    } else {
        console.log('Current department name:', currentDepartment.department);
        console.error('Room information not found for department:', currentDepartment.department);
    }

    document.getElementById("backButton").onclick = () => backToChoice();
}







// 加载治疗方案的按钮
function loadTreatmentOptions(treatmentOptions) {
    const treatmentOptionsDiv = document.getElementById("treatment-options");
    document.getElementById("pleaseChoose").style.display = "block"; // 显示治疗选项按钮
    document.getElementById("treatment-options").style.display = "block"; // 显示治疗选项按钮
    treatmentOptionsDiv.innerHTML = ""; // 清空已有的治疗选项

    // 动态生成并添加治疗选项按钮
    if (treatmentOptions && Array.isArray(treatmentOptions)) {
        treatmentOptions.forEach(treatment => {
            const button = document.createElement("button");
            // 设置相同的 id
            button.id = "treatment-button";
            button.textContent = `${treatment.method} - $${treatment.price}`;
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
}

// 处理治疗选择的函数
function handleTreatmentChoice(choice) {
    console.log("Received choice:", choice); // 输出完整的 choice 对象
    const selectedDisease = choice.disease[0]; // 使用第一个疾病对象
    console.log("Selected disease:", selectedDisease); // 输出选中的疾病对象
    treatmentComplete(choice);
    saveGameState(); // 保存游戏状态和病历本
}

//治疗选择之后的结果
function treatmentComplete(choice) {
    console.log("Treatment complete with choice:", choice); // 输出完整的 choice 对象

    if (money >= choice.treatment.price) {
        money -= choice.treatment.price;
        alert(`选择的治疗方法是：${choice.treatment.method}。效果：${choice.treatment.effect}`);

        if (choice.treatment.effect === '部分缓解') {
            isDead -= 30;  // 这是一个概率
        }

        // 找到并移除对应的疾病
        for (let i = patientDiseases.length - 1; i >= 0; i--) {
            if (patientDiseases[i].department === choice.department.department) {
                console.log("Removing disease:", patientDiseases[i]); // 输出即将移除的疾病

                patientDiseases.splice(i, 1);
                break;  // 移除后立即退出循环，确保只移除一个疾病
            }
        }
        console.log("Updated patientDiseases after removal:", patientDiseases); // 输出移除疾病后的 patientDiseases

        //这里的病历本真的需要遍历吗
        if (choice.disease && Array.isArray(choice.disease) && choice.disease.length > 0) {
            choice.disease.forEach(disease => {
                if (disease.name && disease.symptoms) {
                    const record = {
                        status: 'history',
                        //在治疗选择之后更新病历本的record，这里应该全部显示
                        department: choice.department.department,
                        disease: disease.name,        // 使用疾病的名字
                        symptoms: disease.symptoms,    // 使用疾病的症状
                        treatment: choice.treatment.method,
                        result: choice.treatment.effect
                    };
                    console.log("New treatment record:", record); // 输出新的治疗记录
                    medicalRecords.push(record);
                } else {
                    console.error("Invalid disease structure:", disease);
                }
            });
            console.log("Updated medical records after treatment:", medicalRecords); // 输出治疗后更新的病历本
        } else {
            console.error("Invalid disease array or structure:", choice.disease);
        }


        saveGameState(); // 保存游戏状态和病历本

        document.getElementById("diseasesTips").innerHTML = "The triage desk recommends you go to:" + getDiseasesDepartment();
        console.log("Remaining patient diseases:", patientDiseases); // 输出剩余的 patientDiseases

        if (patientDiseases.length > 0) {
            // 如果还有剩余疾病，继续选择下一个科室
            showStory(story.triage); // 继续分诊
            console.log("Proceeding to triage...");
        } else {
            // 没有剩余疾病了，进入结算页
            showEndPage();
        }
    } else {
        alert("You don't have enough money!");
    }
}



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
 * 根据病历信息获取图片链接
 * @param {Object} record 病历记录
 * @param {Object} disease 疾病对象
 * @returns {string} 图片链接
 */
function getImageForRecord(record, disease) {



    const diseaseName = disease;  // 使用疾病对象的 name 属性

    console.log(`Checking for diseaseName: ${diseaseName}`);

    const matchedImage = imageLinks.find(link =>
        link.diseaseName === diseaseName
    );

    return matchedImage ? matchedImage.imgSrc : './image/record-logo/default.png';
}

function loadMedicalRecords() {
    const medicalRecords = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    const currentTreatmentRecordsDiv = document.getElementById('current-treatment-text');
    const historyTreatmentRecordsDiv = document.getElementById('history-treatment-text');
    const gridContainer = document.getElementById('grid-container');

    const currentTreatmentRecords = medicalRecords.filter(record => record.status === 'under treatment');
    const historyRecords = medicalRecords.filter(record => record.status === 'history');

    // 对历史记录进行逆序排列，确保最新的记录显示在最上面
    historyRecords.reverse();

    if (currentTreatmentRecords.length === 0) {
        currentTreatmentRecordsDiv.innerHTML = '<span style=" font-size: 18px; font-weight: 300; padding: 10px; display: block;">No ongoing treatment records.</span>';
    } else {
        currentTreatmentRecordsDiv.innerHTML = currentTreatmentRecords.map(record => {
            const diseaseName = record.disease && record.disease.name ? record.disease.name : 'unknown';
            const symptoms = record.disease && record.disease.symptoms ? record.disease.symptoms : 'unknown';
            const treatments = Array.isArray(record.disease?.treatments)
                ? record.disease.treatments.map(t => t.method).join(', ')
                : 'untreated';

            return `<div>
                <strong>department:</strong> ${record.department}<br>
                <strong>disease:</strong> ${diseaseName}<br>
                <strong>symptoms:</strong> ${symptoms}<br>
                <strong>treatment:</strong> ${treatments}<br>
                <strong>result:</strong> ${record.result || 'unknown'}
            </div>`;
        }).join('<br><br>');
    }

    if (historyRecords.length === 0) {
        historyTreatmentRecordsDiv.innerHTML = '<span style="font-size: 18px; font-weight: 300; padding: 10px; display: block;">No history records available.</span>';
    } else {
        historyTreatmentRecordsDiv.innerHTML = '';  // 清空历史记录的文字部分
        gridContainer.innerHTML = '';  // 清空grid容器

        // 仅显示历史记录中与该记录相关的疾病，而不是整个 department 的疾病
        historyRecords.forEach(record => {
            if (record.disease) {
                // 如果 record.disease 是数组，处理每个疾病
                if (Array.isArray(record.disease)) {
                    record.disease.forEach(disease => {
                        displayDisease(record, disease, gridContainer);
                    });
                } else {
                    // 否则只处理单个疾病
                    displayDisease(record, record.disease, gridContainer);
                }
            }
        });
    }

}

function displayDisease(record, disease, container) {
    const recordDiv = document.createElement('div');
    const recordImg = document.createElement('img');

    console.log(record);
    console.log(disease);

    // 获取图片链接
    recordImg.src = getImageForRecord(record, disease);
    recordImg.style.width = '40%';

    // 添加自定义的悬浮提示框
    const tooltip = document.createElement('div');
    tooltip.classList.add('custom-tooltip');
    tooltip.innerHTML = `Department: ${record.department}<br>Disease: ${record.disease}<br>Symptoms: ${record.symptoms || 'unknown'}<br>Result: ${record.result || 'unknown'}`;
    tooltip.style.display = 'none'; // 初始状态隐藏
    tooltip.style.position = 'absolute';

    // 显示 tooltip
    recordImg.addEventListener('mouseover', function (event) {
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
    });

    // 隐藏 tooltip
    recordImg.addEventListener('mouseout', function () {
        tooltip.style.display = 'none';
    });

    recordDiv.appendChild(recordImg);
    container.appendChild(recordDiv);
    container.appendChild(tooltip); // 将 tooltip 添加到容器中
}

// 在页面加载时检查是否存在关闭标记
if (localStorage.getItem('pageClosed') === 'true') {
    localStorage.clear();
    localStorage.removeItem('pageClosed'); // 清除标记
}

// 在页面卸载之前设置关闭标记
window.addEventListener('beforeunload', function () {
    localStorage.setItem('pageClosed', 'true');
});
