const diseases = {
    "模因标签科": [
        {
            name: "Tag Overload Syndrome / 标签超载症",
            symptoms: "患者的头上仿佛挂满了无数标签，导致走路摇摇晃晃。经常发出“叮”的声音，好像每走一步都在创建新标签。无法停止地重复“这个是什么标签？”和“我需要更多标签！”。在梦中被标签围攻，醒来时仍然念叨着标签分类。",
            treatments: [
                { method: "标签清理术：医生使用特制的“标签清理器”清除多余标签，让患者脑袋清爽。", price: 500, effect: "治愈" },
                { method: "标签冥想：在“无标签室”中进行冥想，放松心情，恢复标签平衡。", price: 200, effect: "部分缓解" }
            ]
        },
        {
            name: "15-Minute Fame Syndrome / 15分钟名人综合症",
            symptoms: "患者突然冒出一束耀眼的光芒，吸引所有人的目光，这道光芒往往持续15分钟。经常举起手机自拍，并大喊“看我，看我！”。患者的言行夸张，试图吸引更多的关注。当光芒消失后，患者陷入短暂的低落，直到再次发光。",
            treatments: [
                { method: "长效光芒剂：注射长效光芒剂，让患者在更长时间内保持光芒四射。", price: 700, effect: "治愈" },
                { method: "光芒调节器：使用光芒调节器，控制患者的发光频率，让光芒更加持久。", price: 300, effect: "部分缓解" }
            ]
        },
        {
            name: "Meme-Induced Personality Split / 标签诱发人格分裂",
            symptoms: "患者会瞬间变装，展现出不同的个性和行为，仿佛换了一个人。说话方式突然改变，每个标签都有独特的语调和词汇。经常自言自语，像是在与不同模因主导下的自己对话。身上出现不同颜色的光环，每个光环代表一种模因人格。",
            treatments: [
                { method: "人格整合仪：通过高科技仪器，将患者的多重人格整合成一个稳定的身份。", price: 600, effect: "治愈" },
                { method: "标签限制器：佩戴标签限制器，防止患者随意转换人格，保持身份稳定。", price: 300, effect: "部分缓解" }
            ]
        }
    ],
    "数据科": [
        {
            name: "Fake News Intoxication / 假新闻中毒",
            symptoms: "患者脑袋头顶变成新闻标题，无法辨别真伪的信息。他们口中经常讲述荒诞的故事，并坚信这些故事是真实的。患者的脑袋上会冒出假新闻气泡，随着时间增多。患者对每个假新闻反应过度，情绪起伏不定。",
            treatments: [
                { method: "真相滤清器：使用真相滤清器，过滤掉患者脑中的假新闻，让其恢复清醒。", price: 400, effect: "治愈" },
                { method: "新闻解毒剂：注射新闻解毒剂，帮助患者消化和排除假新闻毒素。", price: 250, effect: "部分缓解" },
                { method: "假新闻隔离眼罩：佩戴隔离眼罩，阻断外界假新闻的侵入，保护患者的信息纯净。", price: 100, effect: "部分缓解" }
            ]
        },
        {
            name: "Data Resonance Syndrome / 数据共振症",
            symptoms: "患者身上发出嗡嗡的共振声，像是一台数据共振器。经常出现闪烁的数据流影像，令人目眩。患者对数据异常敏感，能感知到周围的数字信号。情绪与数据同步，数据波动时情绪剧烈波动。",
            treatments: [
                { method: "数据调谐器：使用数据调谐器，调节患者的共振频率，让其恢复平静。", price: 300, effect: "部分缓解" },
                { method: "数据过滤器：佩戴数据过滤器，过滤掉异常数据，保护患者的正常生活。", price: 150, effect: "部分缓解" }
            ]
        }
    ],
    "数字科": [
        {
            name: "Virtual Self Splitting / 虚拟自我分裂",
            symptoms: " 患者的虚拟形象出现了多重分裂，每个虚拟形象都有自己独特的行为和个性。经常在虚拟世界中迷失自我，无法辨别哪个是真实的自己。情绪波动剧烈，尤其在虚拟形象之间转换时。经常自言自语，与自己的虚拟形象对话。",
            treatments: [
                { method: "虚拟断网疗法：暂时切断患者与虚拟世界的连接，让其恢复现实中的自我认知。。", price: 500, effect: "治愈" },
                { method: "虚拟形象管理课程：教授如何有效管理和控制自己的虚拟形象，减少分裂。", price: 300, effect: "部分缓解" }
            ]
        },
        {
            name: "Digital Dermatitis / 数字皮炎",
            symptoms: "  患者的皮肤上出现了像素化的红斑和痒痒的疹子，特别是在长时间使用电子设备后。患者会不自觉地用手挠痒，导致皮肤进一步损伤。皮肤上的红斑会随着设备使用时间的增加而扩散。",
            treatments: [
                { method: "数字断网疗法：强制留院观察，减少患者使用电子设备的时间，特别是避免长时间使用。", price: 800, effect: "治愈" },
                { method: "像素清洗液：使用特制的像素清洗液，涂抹在患处，迅速缓解红斑和痒感。", price: 300, effect: "治愈" },
                { method: "皮肤修复仪：通过皮肤修复仪，恢复受损的皮肤，减少像素化红斑的出现。", price: 200, effect: "部分缓解" }

            ]
        }
    ],
    "社交科": [
        {
            name: "Emoji Face Disorder / 表情符号面部障碍",
            symptoms: "患者的脸部不停变换各种表情符号，难以控制。每当情绪波动时，脸上会浮现对应的表情符号。语言表达困难，只能用表情符号来沟通。过度使用表情符号，导致面部肌肉疲劳。",
            treatments: [
                { method: "表情重置仪：使用表情重置仪，恢复患者的正常面部表情。", price: 400, effect: "治愈" },
                { method: "表情平衡剂：注射表情平衡剂，帮助患者控制面部表情符号的变换。", price: 200, effect: "部分缓解" }
            ]
        },
        {
            name: "Reality Allergy / 现实过敏症",
            symptoms: "患者对现实世界产生过敏反应，表现为一旦暴露在现实环境中，就会出现打喷嚏、流泪、皮肤红肿等过敏症状。患者更愿意待在虚拟世界中，逃避现实。严重时，会出现呼吸困难和心悸。",
            treatments: [
                { method: "现实脱敏疗法：通过逐步增加患者接触现实世界的时间，让其慢慢适应。", price: 400, effect: "治愈" },
                { method: "过敏平衡剂：注射过敏平衡剂，缓解患者对现实世界的过敏反应。", price: 200, effect: "部分缓解" }
            ]
        },
        {
            name: "Fear of Missing Out (FOMO) / 错失恐惧症",
            symptoms: "患者极度担心错过任何信息、活动或机会，导致持续的焦虑和不安。频繁检查社交媒体和消息通知，无法集中注意力做其他事情。经常感觉自己被排除在外，错过了重要的事情。",
            treatments: [
                { method: "信息断网疗法：定期安排信息断网时间，帮助患者减轻对信息的依赖。", price: 400, effect: "几乎治愈" },
                { method: "时间管理课程：教授如何有效管理时间，减少对信息的过度依赖。", price: 700, effect: "治愈" },
                { method: "焦虑平衡剂：注射焦虑平衡剂，缓解患者的焦虑和不安。", price: 200, effect: "部分缓解" }
            ]
        },
        {
            name: "Meme Fountain Infect /模因喷泉感染",
            symptoms: "模因喷泉很难被肉眼发现，患者在一但接触到模因喷泉，自我模因群会被严重感染，出现发疯、思维混乱症状。模因喷泉会人多的地点快速传播，引发恐慌。",
            treatments: [
                { method: "注射疫苗，抗模因素。", price: 500, effect: "几乎治愈" }
            ]
        }
    ],
    "视觉科": [
        {
            name: "Hallucination Syndrome / 幻觉综合症",
            symptoms: "患者会看到或听到不存在的东西，常常被虚幻的影像和声音困扰。无法区分现实与幻觉，情绪不稳定。经常自言自语，与幻觉中的人物对话。严重时，会做出危险的行为，认为幻觉是真实存在的。",
            treatments: [
                { method: "心理疗法：通过心理治疗，帮助患者理解并应对幻觉，恢复正常的思维模式。", price: 300, effect: "治愈" },
                { method: "幻觉抑制剂：注射幻觉抑制剂，减轻患者的幻觉症状。", price: 150, effect: "部分缓解" }
            ]
        }
    ],
    "身体科": [
        {
            name: "Label Body Disorder / 标签体障碍",
            symptoms: "患者对自己的外貌极度不满意，频繁进行整容手术，为自己的身体装上标签。身体上的标签越来越多，最终变得面目全非。心理上对外貌的过度关注，导致自尊心低落和社交障碍。",
            treatments: [
                { method: "标签清除术：使用特制的标签清除仪，移除患者身体上的过多标签。", price: 500, effect: "治愈" },
                { method: "整容限制器：佩戴整容限制器，防止患者频繁进行整容手术。", price: 300, effect: "部分缓解" },
                { method: "心理重建课程：通过心理治疗，帮助患者建立健康的自我形象，减少对整容的依赖。", price: 300, effect: "部分缓解" }
            ]
        },
        {
            name: "GIF Tremors / GIF颤抖症",
            symptoms: "患者的身体不由自主地抖动，就像GIF动画一样重复运动。无法控制自己的动作，导致日常生活受到严重影响。患者在社交场合中表现得像一个不断重复的动画片段，引起他人的困惑和关注。",
            treatments: [
                { method: "神经调节仪：通过神经调节仪，调节患者的神经系统，缓解抖动症状。", price: 500, effect: "治愈" },
                { method: "动作平稳器：使用动作平稳器，减少患者的抖动，让其恢复正常的动作控制。", price: 300, effect: "部分缓解" },
                { method: "社交适应练习：帮助患者在社交场合中找到适应的方法，减少因抖动引起的困扰。", price: 300, effect: "部分缓解" }
            ]
        }
    ]
};
