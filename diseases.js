console.log('diseases.js script is loading');
const diseases = {
    "MEMETAG": [
        {
            name: "Tag Overload Syndrome",
            symptoms: "The patient seems to have countless tags hanging over their head, causing them to walk unsteadily. They often make a 'ding' sound, as if creating a new tag with every step. They can't stop repeating 'What tag is this?' and 'I need more tags!'. They are attacked by tags in their dreams, waking up still muttering about tag categories.",
            treatments: [
                { method: "Tag Cleaning: The doctor uses a special 'Tag Cleaner' to remove excess tags, refreshing the patient's mind.", price: 500, effect: "Cure" },
                { method: "Tag Meditation: Meditation in a 'Tag-Free Room' to relax and restore tag balance.", price: 200, effect: "Partial Relief" }
            ]
        },
        {
            name: "15-Minute Fame Syndrome",
            symptoms: "The patient suddenly emits a dazzling light that attracts everyone's attention, usually lasting 15 minutes. They often raise their phone for selfies and shout 'Look at me, look at me!'. Their behavior is exaggerated, trying to attract more attention. When the light fades, the patient falls into a brief depression until they shine again.",
            treatments: [
                { method: "Long-Lasting Glow Injection: Injecting a long-lasting glow to keep the patient shining longer.", price: 700, effect: "Cure" },
                { method: "Glow Regulator: Using a glow regulator to control the patient's glow frequency, making the glow more sustained.", price: 300, effect: "Partial Relief" }
            ]
        },
        {
            name: "Meme-Induced Personality Split",
            symptoms: "The patient instantly changes costumes, displaying different personalities and behaviors, as if becoming a different person. Their way of speaking suddenly changes, with each tag having its own unique tone and vocabulary. They often talk to themselves, as if conversing with different meme-dominated versions of themselves. Different colored halos appear around them, each representing a meme personality.",
            treatments: [
                { method: "Personality Integration Device: Using a high-tech device to integrate the patient's multiple personalities into a stable identity.", price: 600, effect: "Cure" },
                { method: "Tag Limiter: Wearing a tag limiter to prevent the patient from switching personalities at will, maintaining identity stability.", price: 300, effect: "Partial Relief" }
            ]
        }
    ],
    "DIGITAL": [
        {
            name: "Fake News Intoxication",
            symptoms: "The patient's head turns into news headlines, unable to distinguish between true and false information. They often tell absurd stories and believe these stories are real. Fake news bubbles appear on their head, increasing over time. The patient overreacts to each piece of fake news, with fluctuating emotions.",
            treatments: [
                { method: "Truth Filter: Using a truth filter to filter out fake news in the patient's mind, restoring clarity.", price: 400, effect: "Cure" },
                { method: "News Detoxifier: Injecting a news detoxifier to help the patient digest and eliminate fake news toxins.", price: 250, effect: "Partial Relief" },
                { method: "Fake News Isolation Goggles: Wearing isolation goggles to block out fake news from the outside world, protecting the purity of the patient's information.", price: 100, effect: "Partial Relief" }
            ]
        },
        {
            name: "Digital Resonance Syndrome",
            symptoms: "The patient emits a buzzing resonance sound, like a data resonator. Flickering data streams often appear, causing dizziness. The patient is extremely sensitive to data, able to perceive digital signals around them. Their emotions sync with data, fluctuating intensely with data changes.",
            treatments: [
                { method: "Data Tuner: Using a data tuner to adjust the patient's resonance frequency, restoring calm.", price: 300, effect: "Partial Relief" },
                { method: "Data Filter: Wearing a data filter to block abnormal data, protecting the patient's normal life.", price: 150, effect: "Partial Relief" }
            ]
        }
    ],
    "DATA": [
        {
            name: "Virtual Self Splitting",
            symptoms: "The patient's virtual image experiences multiple splits, with each virtual image having its own unique behavior and personality. They often get lost in the virtual world, unable to identify which is their true self. Emotional fluctuations are intense, especially during transitions between virtual images. They often talk to themselves, conversing with their virtual images.",
            treatments: [
                { method: "Virtual Disconnect Therapy: Temporarily disconnecting the patient from the virtual world, allowing them to regain self-awareness in reality.", price: 500, effect: "Cure" },
                { method: "Virtual Image Management Course: Teaching effective management and control of virtual images to reduce splitting.", price: 300, effect: "Partial Relief" }
            ]
        },
        {
            name: "DATA Dermatitis",
            symptoms: "The patient's skin develops pixelated red patches and itchy rashes, especially after prolonged use of electronic devices. The patient unconsciously scratches the itch, further damaging the skin. The red patches on the skin spread as device usage time increases.",
            treatments: [
                { method: "Digital Disconnect Therapy: Forced inpatient observation to reduce the patient's device usage time, especially avoiding prolonged use.", price: 800, effect: "Cure" },
                { method: "Pixel Cleansing Lotion: Applying a special pixel cleansing lotion to the affected area, quickly relieving red patches and itchiness.", price: 300, effect: "Cure" },
                { method: "Skin Repair Device: Using a skin repair device to restore damaged skin and reduce the appearance of pixelated red patches.", price: 200, effect: "Partial Relief" }
            ]
        }
    ],
    "SOCIAL": [
        {
            name: "Emoji Face Disorder",
            symptoms: "The patient's face constantly changes into various emoji, difficult to control. When emotions fluctuate, the corresponding emoji appear on their face. Verbal communication becomes difficult, and they can only communicate using emojis. Overuse of emojis leads to facial muscle fatigue.",
            treatments: [
                { method: "Expression Reset Device: Using an expression reset device to restore the patient's normal facial expressions.", price: 400, effect: "Cure" },
                { method: "Expression Balancer: Injecting an expression balancer to help the patient control the transformation of facial emojis.", price: 200, effect: "Partial Relief" }
            ]
        },
        {
            name: "Reality Allergy",
            symptoms: "The patient develops an allergic reaction to the real world, manifesting as sneezing, tearing, and skin swelling upon exposure to reality. The patient prefers to stay in the virtual world, avoiding reality. In severe cases, they may experience difficulty breathing and palpitations.",
            treatments: [
                { method: "Reality Desensitization Therapy: Gradually increasing the patient's exposure to the real world, allowing them to slowly adapt.", price: 400, effect: "Cure" },
                { method: "Allergy Balancer: Injecting an allergy balancer to alleviate the patient's allergic reactions to the real world.", price: 200, effect: "Partial Relief" }
            ]
        },
        {
            name: "Fear of Missing Out (FOMO)",
            symptoms: "The patient is extremely worried about missing any information, event, or opportunity, leading to constant anxiety and unease. They frequently check social media and notifications, unable to focus on other tasks. They often feel left out and believe they missed something important.",
            treatments: [
                { method: "Information Disconnect Therapy: Scheduling regular information disconnect times to help the patient reduce dependency on information.", price: 400, effect: "Near Cure" },
                { method: "Time Management Course: Teaching effective time management to reduce dependence on information.", price: 700, effect: "Cure" },
                { method: "Anxiety Balancer: Injecting an anxiety balancer to alleviate the patient's anxiety and unease.", price: 200, effect: "Partial Relief" }
            ]
        },
        {
            name: "Meme Fountain Infection",
            symptoms: "Meme fountains are hard to detect with the naked eye. Once the patient is exposed to a meme fountain, their meme system becomes severely infected, leading to madness and confused thinking. Meme fountains spread quickly in crowded places, causing panic.",
            treatments: [
                { method: "Vaccine injection, anti-meme factors.", price: 500, effect: "Near Cure" }
            ]
        }
    ],
    "VISUAL": [
        {
            name: "Hallucination Syndrome",
            symptoms: "The patient sees or hears things that don't exist, often troubled by illusory images and sounds. Unable to distinguish reality from hallucinations, emotions are unstable. They often talk to themselves, conversing with imaginary characters. In severe cases, they may engage in dangerous behaviors, believing hallucinations are real.",
            treatments: [
                { method: "Psychotherapy: Through psychotherapy, helping the patient understand and cope with hallucinations, restoring normal thinking patterns.", price: 300, effect: "Cure" },
                { method: "Hallucination Suppressant: Injecting a hallucination suppressant to alleviate the patient's hallucination symptoms.", price: 150, effect: "Partial Relief" }
            ]
        }
    ],
    "BODY": [
        {
            name: "Label Body Disorder",
            symptoms: "The patient is extremely dissatisfied with their appearance, frequently undergoing cosmetic surgery to attach labels to their body. The number of labels on their body increases, eventually becoming unrecognizable. Psychological over-focus on appearance leads to low self-esteem and social barriers.",
            treatments: [
                { method: "Label Removal Surgery: Using a special label removal device to remove excess labels from the patient's body.", price: 500, effect: "Cure" },
                { method: "Cosmetic Surgery Limiter: Wearing a cosmetic surgery limiter to prevent frequent cosmetic surgeries.", price: 300, effect: "Partial Relief" },
                { method: "Psychological Reconstruction Course: Through psychotherapy, helping the patient build a healthy self-image and reduce reliance on cosmetic surgery.", price: 300, effect: "Partial Relief" }
            ]
        },
        {
            name: "GIF Tremors",
            symptoms: "The patient's body shakes uncontrollably, like a repeating GIF animation. Unable to control their movements, daily life is severely affected. In social situations, the patient behaves like a constantly looping cartoon clip, causing confusion and attention from others.",
            treatments: [
                { method: "Neuro Regulator: Using a neuro regulator to adjust the patient's nervous system and alleviate tremor symptoms.", price: 500, effect: "Cure" },
                { method: "Movement Stabilizer: Using a movement stabilizer to reduce the patient's tremors and restore normal movement control.", price: 300, effect: "Partial Relief" },
                { method: "Social Adaptation Exercises: Helping the patient find ways to adapt in social situations, reducing discomfort caused by tremors.", price: 300, effect: "Partial Relief" }
            ]
        }
    ]
};


// 房间数据，存储图片和对话内容，但不再定义 treatments
const chatRooms = {
    "BODY": {
        correct: {
            character: ["body_character.svg"],
            background: ["body_1_bg.svg"], // 加载背景图像
            frontground: ["body_2_fg.svg"], // 加载背景图像
            dialogs: [
                "Welcome to the body department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["body_character.svg"],
            background: ["body_1_bg.svg"], // 加载背景图像
            frontground: ["body_2_fg.svg"], // 加载背景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    "DATA": {
        correct: {
            character: ["data_character.svg"],
            background: ["data_bg.svg"], // 加载背景图像
            dialogs: [
                "Welcome to the data department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["data_character.svg"],
            background: ["data_bg.svg"], // 加载背景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    "SOCIAL": {
        correct: {
            character: ["social_1_character.svg", "social_2_character.svg"],
            background: ["social_bg.svg"], // 加载背景图像
            frontground: ["social_fg.svg"], // 加载前景图像
            dialogs: [
                "Welcome to the social department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["social_1_character.svg", "social_2_character.svg"],
            background: ["social_bg.svg"], // 加载背景图像
            frontground: ["social_fg.svg"], // 加载前景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    "VISUAL": {
        correct: {
            character: ["visual_character.svg"],
            background: ["visual_bg.svg"], // 加载背景图像
            frontground: ["visual_fg.svg"], // 加载前景图像
            dialogs: [
                "Welcome to the visual department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["visual_character.svg"],
            background: ["visual_bg.svg"], // 加载背景图像
            frontground: ["visual_fg.svg"], // 加载前景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    "MEMETAG": {
        correct: {
            character: ["memetag_character.svg"],
            background: ["memetag_bg.svg"], // 加载背景图像
            dialogs: [
                "Welcome to the memetag department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["memetag_character.svg"],
            background: ["memetag_bg.svg"], // 加载背景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    "DIGITAL": {
        correct: {
            character: ["digital_character.svg"],
            background: ["digital_bg.svg"], // 加载背景图像
            frontground: ["digital_fg.svg"], // 加载前景图像
            dialogs: [
                "Welcome to the digital department. Let's begin the diagnosis.",
                "Here is some important information about your condition."
            ],
            treatmentStep: true // 在对话后展示治疗选项
        },
        wrong: {
            character: ["digital_character.svg"],
            background: ["digital_bg.svg"], // 加载背景图像
            frontground: ["digital_fg.svg"], // 加载前景图像
            dialogs: [
                "This isn't where you need to be. Please return to the elevator room."
            ],
            treatmentStep: false // 不展示治疗选项
        }
    },
    // 其他部门...
};