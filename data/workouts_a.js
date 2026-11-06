// 訓練菜單資料庫 A：胸、背、腿臀、肩（各 5 套）
window.WORKOUT_DB = Object.assign(window.WORKOUT_DB || {}, {
  chest: {
    name: '胸部', emoji: '🏋️',
    tips: ['臥推時肩胛骨後收下沉、保持胸挺，眼睛位於槓正下方', '下放速度要控制，推起時手腕疊在手肘正上方', '手肘與軀幹夾角約 45–60 度，不要完全外開以保護肩關節', '胸肌恢復需 48–72 小時，同一部位一週練 1–2 次即可', '高重量臥推、上斜臥推等有壓在身上的動作請務必設定安全槓或找人保護'],
    variants: [
      {
        id: 'chest_1', name: '槓鈴力量型', level: '中階', durationMin: 60,
        equipment: ['槓鈴', '臥推架', '啞鈴', '繩索機'],
        focus: '提升最大肌力，以槓鈴臥推為核心',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '全身動態熱身（划船機或快走＋手臂繞環）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '心率微升、肩肘腕關節活動開，微微出汗即可' },
            { name: '繩索夾胸（Cable Fly）輕重量', sets: 2, reps: '15–20 下', rest: 30, load: 'RPE 5', tempo: '2-1-2', note: '感受胸肌收縮，不求重量' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與菱形肌，保護肩關節' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '伏地挺身（Push-Up）', sets: 2, reps: '12–15 下', rest: 45, load: 'RPE 6', tempo: '2-0-1', note: '身體成一直線，胸口幾乎觸地，建立胸肌神經連結' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '槓鈴臥推（Barbell Bench Press）', sets: 5, reps: '5 下', rest: 180, load: 'RPE 8／約 80–85% 1RM', tempo: '3-1-1', note: '正式組前：空槓×10、50%×5、70%×3。下放至乳頭線，腳踩穩、肩胛後收。大重量務必設安全槓或請保護者在頭側待命，不可使用大拇指同側握法。' },
            { name: '槓鈴上斜臥推（Incline Barbell Press）', sets: 4, reps: '6 下', rest: 150, load: 'RPE 8／約 75% 1RM', tempo: '3-0-1', note: '板凳 30 度，先做 1 組輕重量暖身組。槓下放至上胸，需設安全槓。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '雙槓撐體（Chest Dip）', sets: 3, reps: '8–10 下', rest: 90, load: '自體體重（可加重）', tempo: '3-0-1', note: '身體前傾約 30 度；肩膀不適請改以伏地挺身取代' },
            { name: '啞鈴仰臥飛鳥（Dumbbell Fly）', sets: 3, reps: '10–12 下', rest: 75, load: 'RPE 7', tempo: '3-1-1', note: '手肘微彎固定，下放到胸肌有拉伸感即可，勿過深' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '門框胸大肌伸展（Doorway Chest Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手肘約 90 度扶門框，身體前傾至胸前有拉感，不聳肩' },
            { name: '嬰兒式側延伸＋胸椎旋轉（Thread the Needle）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，放鬆肩頸與上背' }
          ]}
        ]
      },
      {
        id: 'chest_2', name: '啞鈴肌肥大型', level: '中階', durationMin: 55,
        equipment: ['啞鈴', '可調式板凳', '繩索機'],
        focus: '以啞鈴增加活動範圍與胸肌張力，促進肌肥大',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '全身動態熱身（划船機或快走＋手臂繞環）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '心率微升、肩肘腕關節活動開，微微出汗即可' },
            { name: '繩索夾胸（Cable Fly）輕重量', sets: 2, reps: '15–20 下', rest: 30, load: 'RPE 5', tempo: '2-1-2', note: '感受胸肌收縮，肩胛保持穩定' },
            { name: '啞鈴肩胛伏地挺身（Scapular Push-Up）', sets: 2, reps: '10 下', rest: 30, load: '自體體重', tempo: '2-1-2', note: '手臂打直只讓肩胛前後移動，活化前鋸肌' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '蝴蝶機夾胸（Pec Deck）', sets: 2, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '收縮處停 1 秒，感受胸肌充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '啞鈴臥推（Dumbbell Bench Press）', sets: 4, reps: '8–10 下', rest: 90, load: 'RPE 8', tempo: '3-1-1', note: '先做 1 組輕重量暖身組。起始與結束時用腳協助將啞鈴放上，放下時避免甩動；重量過重請找人遞啞鈴。' },
            { name: '啞鈴上斜臥推（Incline Dumbbell Press）', sets: 3, reps: '10–12 下', rest: 75, load: 'RPE 8', tempo: '3-0-1', note: '板凳 30 度，下放至胸肌拉伸、頂部不鎖死手肘' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '啞鈴窄握臥推（Dumbbell Squeeze Press）', sets: 3, reps: '12 下', rest: 60, load: 'RPE 8', tempo: '2-0-2', note: '兩顆啞鈴貼緊，全程用力向內擠壓，強化內胸' },
            { name: '高位繩索夾胸（High-to-Low Cable Fly）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '由高往低斜下方畫弧，強調下胸' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '門框胸大肌伸展（Doorway Chest Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手肘約 90 度扶門框，身體前傾至胸前有拉感，不聳肩' },
            { name: '啞鈴仰臥胸擴張（Dumbbell Pullover Stretch）', sets: 2, reps: '30 秒', rest: 0, load: '輕', tempo: '', note: '輕啞鈴躺在板凳上放鬆拉長胸肌與背闊肌' }
          ]}
        ]
      },
      {
        id: 'chest_3', name: '器械新手友善型', level: '新手', durationMin: 50,
        equipment: ['器械', 'Smith 機', '繩索機'],
        focus: '用固定軌跡器械學習胸部發力，安全上手',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '全身動態熱身（划船機或快走＋手臂繞環）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '心率微升、肩肘腕關節活動開，微微出汗即可' },
            { name: '蝴蝶機夾胸（Pec Deck）輕重量', sets: 2, reps: '15 下', rest: 30, load: 'RPE 4', tempo: '2-1-2', note: '調整座位讓手肘與肩同高，先學會胸肌發力' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與菱形肌，保護肩關節' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '跪姿或斜板伏地挺身（Incline Push-Up）', sets: 2, reps: '10–12 下', rest: 45, load: 'RPE 5', tempo: '2-0-2', note: '雙手撐在高處，降低難度，身體保持一直線' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '坐姿推胸機（Machine Chest Press）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-1-2', note: '先做 1 組輕重量暖身。座椅調到握把與胸同高，背貼緊椅背，不鎖死手肘。' },
            { name: 'Smith 機上斜臥推（Smith Incline Press）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-0-2', note: '板凳 30 度，軌道固定較安全；仍須設定安全卡榫，旋轉掛鉤確認可隨時解鎖。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '繩索交叉夾胸（Cable Crossover）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '身體微前傾、手肘微彎，雙手在胸前交會' },
            { name: '坐姿蝴蝶機夾胸（Pec Deck Fly）', sets: 2, reps: '15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '動作範圍控制舒適，不要拉過深' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '門框胸大肌伸展（Doorway Chest Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手肘約 90 度扶門框，身體前傾至胸前有拉感，不聳肩' },
            { name: '嬰兒式側延伸＋胸椎旋轉（Thread the Needle）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，放鬆肩頸與上背' }
          ]}
        ]
      },
      {
        id: 'chest_4', name: '居家徒手／彈力帶型', level: '新手', durationMin: 40,
        equipment: ['彈力帶', '瑜伽墊', '水瓶（可選）'],
        focus: '不需器材，在家也能練出胸肌',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '開合跳＋手臂繞環', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '全身升溫、活動肩關節' },
            { name: '彈力帶拉開（Band Pull-Apart）或毛巾版', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '沒有彈力帶可用毛巾雙手拉開代替' },
            { name: '肩胛伏地挺身（Scapular Push-Up）', sets: 2, reps: '10 下', rest: 30, load: '自體體重', tempo: '2-1-2', note: '手臂打直，只動肩胛' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '彈力帶站姿夾胸（Band Chest Fly）', sets: 2, reps: '15–20 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '彈力帶繞過背後，雙手在胸前交會，感受充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '伏地挺身（Push-Up）', sets: 4, reps: '8–15 下（留 2 下力竭前）', rest: 75, load: 'RPE 8', tempo: '3-0-1', note: '身體成板式、核心收緊；不夠力可降階成跪姿或斜板，下放至胸口離地一拳' },
            { name: '腳抬高伏地挺身（Decline Push-Up）', sets: 3, reps: '8–12 下', rest: 75, load: 'RPE 8', tempo: '3-0-1', note: '腳放椅子上強化上胸，腰部不可下塌' },
            { name: '彈力帶推胸（Band Chest Press）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-0-2', note: '彈力帶繞過背後，前推到手臂接近伸直' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '鑽石伏地挺身（Diamond Push-Up）', sets: 3, reps: '力竭前 2 下', rest: 60, load: 'RPE 8', tempo: '2-0-1', note: '手肘不外開，三頭與內胸同時刺激' },
            { name: '水瓶仰臥飛鳥（Water-Bottle Fly）', sets: 3, reps: '15 下', rest: 45, load: '1–2 公升水瓶', tempo: '3-1-1', note: '躺墊上，手肘微彎畫弧' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '門框胸大肌伸展（Doorway Chest Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手肘約 90 度扶門框，身體前傾至胸前有拉感，不聳肩' },
            { name: '嬰兒式側延伸＋胸椎旋轉（Thread the Needle）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，放鬆肩頸與上背' }
          ]}
        ]
      },
      {
        id: 'chest_5', name: '超級組燃脂高效型', level: '中階', durationMin: 45,
        equipment: ['啞鈴', '繩索機', '伏地挺身把手（可選）'],
        focus: '超級組短休息，提高心率與熱量消耗，45 分鐘完成',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '跳繩或高抬腿', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '快速提高心率' },
            { name: '繩索夾胸（Cable Fly）輕重量', sets: 2, reps: '15–20 下', rest: 20, load: 'RPE 5', tempo: '2-1-2', note: '輕重量暖身胸肌' },
            { name: '手臂大繞環＋肩胛畫圈', sets: 1, reps: '1 分鐘', rest: 0, load: '輕', tempo: '', note: '' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '伏地挺身（Push-Up）', sets: 2, reps: '15 下', rest: 30, load: 'RPE 6', tempo: '2-0-1', note: '快速進入胸肌充血狀態' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '【超級組 A1】啞鈴臥推（Dumbbell Bench Press）', sets: 4, reps: '10 下', rest: 0, load: 'RPE 8', tempo: '2-0-1', note: '先做 1 組輕重量暖身組。接著立即做 A2，不休息；重量過重請避免甩動。' },
            { name: '【超級組 A2】伏地挺身（Push-Up）', sets: 4, reps: '至力竭', rest: 75, load: 'RPE 9', tempo: '2-0-1', note: '做完 A2 休 75 秒再回 A1' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '【超級組 B1】啞鈴上斜臥推（Incline Dumbbell Press）', sets: 3, reps: '12 下', rest: 0, load: 'RPE 8', tempo: '2-0-1', note: '板凳 30 度' },
            { name: '【超級組 B2】繩索夾胸（Cable Fly）', sets: 3, reps: '15 下', rest: 60, load: 'RPE 8', tempo: '2-1-1', note: '做完休 60 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '門框胸大肌伸展（Doorway Chest Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手肘約 90 度扶門框，身體前傾至胸前有拉感，不聳肩' },
            { name: '嬰兒式側延伸＋胸椎旋轉（Thread the Needle）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，放鬆肩頸與上背' }
          ]}
        ]
      }
    ]
  },
  back: {
    name: '背部', emoji: '🚣',
    tips: ['每個拉的動作先想「手肘往後口袋拉」，而不是用手臂拉', '肩胛先下壓後收，再開始彎手肘，避免聳肩', '硬舉與划船保持脊椎中立，核心繃緊，不圓背', '背肌可承受較高訓練量，但下背需要充分恢復，間隔至少 48 小時', '握力是限制時可使用助力帶，但輕重量仍建議徒手握'],
    variants: [
      {
        id: 'back_1', name: '槓鈴力量型', level: '進階', durationMin: 65,
        equipment: ['槓鈴', '硬舉平台', '引體向上桿'],
        focus: '建立後側鏈與背部最大肌力，以硬舉與槓鈴划船為核心',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '划船機或快走＋貓牛式（Cat-Cow）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '全身升溫並活動脊椎' },
            { name: '彈力帶面拉（Band Face Pull）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與肩胛穩定肌' },
            { name: '空槓羅馬尼亞硬舉（Empty Bar RDL）', sets: 2, reps: '10 下', rest: 30, load: '空槓', tempo: '3-0-1', note: '練習髖鉸鏈，背打直' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '直臂下拉（Straight-Arm Pulldown）', sets: 2, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '手臂微彎不動，用背闊肌帶動，感受充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '傳統硬舉（Conventional Deadlift）', sets: 5, reps: '4 下', rest: 180, load: 'RPE 8／約 80–85% 1RM', tempo: '2-0-1', note: '正式組前：空槓×8、50%×5、70%×3。槓貼小腿、脊椎中立、先繃緊再拉，不可圓背。大重量建議使用硬舉腰帶並備好護盤，失敗時直接放掉。' },
            { name: '槓鈴俯身划船（Barbell Bent-Over Row）', sets: 4, reps: '6 下', rest: 150, load: 'RPE 8／約 75% 1RM', tempo: '2-1-1', note: '正式組前先做空槓×10。軀幹約 45 度、核心繃緊，槓拉向肚臍，避免借力甩動。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '負重引體向上（Weighted Pull-Up）', sets: 3, reps: '5–8 下', rest: 120, load: 'RPE 8', tempo: '2-0-3', note: '能做 8 下以上再加重；肩胛先下壓，下放到手臂接近伸直' },
            { name: '單臂啞鈴划船（One-Arm Dumbbell Row）', sets: 3, reps: '8–10 下', rest: 75, load: 'RPE 8', tempo: '2-1-2', note: '一手扶板凳，背部平行地面，拉向髖部' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '懸掛或站姿背闊肌伸展（Lat Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '雙手扶穩架子，臀部後坐，感受側腰到腋下拉伸' },
            { name: '嬰兒式（Child\'s Pose）', sets: 2, reps: '30 秒', rest: 0, load: '', tempo: '', note: '雙手向前延伸，深呼吸放鬆下背' }
          ]}
        ]
      },
      {
        id: 'back_2', name: '啞鈴肌肥大型', level: '中階', durationMin: 55,
        equipment: ['啞鈴', '可調式板凳', '引體向上桿'],
        focus: '以單邊啞鈴增加背肌活動範圍，促進肌肥大',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '划船機或快走＋貓牛式（Cat-Cow）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '全身升溫並活動脊椎' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒菱形肌與後三角' },
            { name: '啞鈴俯身飛鳥（Dumbbell Reverse Fly）輕重量', sets: 2, reps: '15 下', rest: 30, load: 'RPE 5', tempo: '2-1-2', note: '微屈膝、背打直' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '啞鈴仰臥拉舉（Dumbbell Pullover）', sets: 2, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '3-1-2', note: '手肘微彎，沿弧線拉伸背闊肌，不過度後仰腰椎' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '胸撐啞鈴划船（Chest-Supported Dumbbell Row）', sets: 4, reps: '8–10 下', rest: 90, load: 'RPE 8', tempo: '2-1-3', note: '趴在 30 度上斜板凳，可免除下背負擔。正式組前做 1 組輕重量暖身。' },
            { name: '單臂啞鈴划船（One-Arm Dumbbell Row）', sets: 3, reps: '10–12 下', rest: 75, load: 'RPE 8', tempo: '2-1-2', note: '一手一膝撐板凳，背平行地面，不扭轉軀幹' },
            { name: '啞鈴羅馬尼亞硬舉（Dumbbell RDL）', sets: 3, reps: '10 下', rest: 90, load: 'RPE 7', tempo: '3-0-1', note: '背打直、髖部後推、啞鈴貼腿，感受腿後與下背繃緊' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '啞鈴聳肩（Dumbbell Shrug）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '1-2-1', note: '向上聳至頂端停留 2 秒，不甩頭' },
            { name: '輔助引體向上或高位下拉（Assisted Pull-Up）', sets: 3, reps: '8–10 下', rest: 75, load: 'RPE 8', tempo: '2-0-3', note: '寬握、胸往桿靠近' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '懸掛或站姿背闊肌伸展（Lat Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '雙手扶穩架子，臀部後坐，感受側腰到腋下拉伸' },
            { name: '嬰兒式（Child\'s Pose）', sets: 2, reps: '30 秒', rest: 0, load: '', tempo: '', note: '雙手向前延伸，深呼吸放鬆下背' }
          ]}
        ]
      },
      {
        id: 'back_3', name: '器械新手友善型', level: '新手', durationMin: 50,
        equipment: ['高位下拉機', '坐姿划船機', '繩索機'],
        focus: '用器械學會背部發力，動作簡單安全',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '划船機或快走＋貓牛式（Cat-Cow）', sets: 1, reps: '4 分鐘', rest: 0, load: '輕', tempo: '', note: '全身升溫並活動脊椎' },
            { name: '彈力帶面拉（Band Face Pull）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '提升肩胛穩定' },
            { name: '輕重量高位下拉（Lat Pulldown）暖身', sets: 2, reps: '12–15 下', rest: 30, load: 'RPE 4', tempo: '2-1-2', note: '體會肩胛下壓的感覺' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '直臂下拉（Straight-Arm Pulldown）', sets: 2, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '手臂微彎，用背闊肌下壓' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '高位下拉（Lat Pulldown）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-1-2', note: '先做 1 組輕重量暖身。握距略寬於肩，拉至鎖骨，身體不後仰過多。' },
            { name: '坐姿划船機（Seated Cable Row）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-1-2', note: '挺胸、肩胛後收，不聳肩，下放時背部保持伸直' },
            { name: 'Smith 機槓鈴划船（Smith Row）', sets: 3, reps: '10 下', rest: 90, load: 'RPE 7', tempo: '2-0-2', note: '軌道固定，髖鉸鏈後背保持平直，核心收緊' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '助力引體向上機（Assisted Pull-Up）', sets: 3, reps: '8–10 下', rest: 75, load: 'RPE 7', tempo: '2-0-3', note: '選能完成 8 下的配重' },
            { name: '反向蝴蝶機（Reverse Pec Deck）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '強化上背與後三角，改善圓肩' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '懸掛或站姿背闊肌伸展（Lat Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '雙手扶穩架子，臀部後坐，感受側腰到腋下拉伸' },
            { name: '嬰兒式（Child\'s Pose）', sets: 2, reps: '30 秒', rest: 0, load: '', tempo: '', note: '雙手向前延伸，深呼吸放鬆下背' }
          ]}
        ]
      },
      {
        id: 'back_4', name: '居家徒手／彈力帶型', level: '新手', durationMin: 40,
        equipment: ['彈力帶', '瑜伽墊', '背包或水瓶', '堅固桌子（可選）'],
        focus: '不需器材，用彈力帶與自體重量練背',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '原地踏步＋貓牛式（Cat-Cow）', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '升溫並活動脊椎' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒菱形肌' },
            { name: '超人式（Superman）輕鬆版', sets: 2, reps: '10 下', rest: 30, load: '自體體重', tempo: '2-1-2', note: '舉起手腳停 2 秒，啟動下背' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '彈力帶直臂下拉（Band Straight-Arm Pulldown）', sets: 2, reps: '15–20 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '彈力帶固定於門框上方，手臂微彎下壓' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '彈力帶坐姿划船（Band Seated Row）', sets: 4, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '雙腳套彈力帶，挺胸拉向腹部，不聳肩' },
            { name: '背包俯身划船（Backpack Bent-Over Row）', sets: 4, reps: '10–12 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '背包塞書增重，髖鉸鏈、背打直、避免圓背' },
            { name: '桌下反向划船（Table Inverted Row）', sets: 3, reps: '力竭前 2 下', rest: 75, load: 'RPE 8', tempo: '2-1-2', note: '躺在堅固桌下，確認桌子穩固再拉；身體成一直線' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '彈力帶高位下拉（Band Lat Pulldown）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '彈力帶固定高處，跪姿下拉至胸前' },
            { name: '超人式（Superman）', sets: 3, reps: '12 下', rest: 45, load: '自體體重', tempo: '2-2-2', note: '頂端停 2 秒，強化下背' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '懸掛或站姿背闊肌伸展（Lat Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '雙手扶穩架子，臀部後坐，感受側腰到腋下拉伸' },
            { name: '嬰兒式（Child\'s Pose）', sets: 2, reps: '30 秒', rest: 0, load: '', tempo: '', note: '雙手向前延伸，深呼吸放鬆下背' }
          ]}
        ]
      },
      {
        id: 'back_5', name: '超級組燃脂高效型', level: '中階', durationMin: 45,
        equipment: ['啞鈴', '繩索機', '引體向上桿'],
        focus: '超級組短休息，提高心率與熱量消耗，45 分鐘完成',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '划船機或跳繩', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '快速升溫' },
            { name: '貓牛式（Cat-Cow）', sets: 1, reps: '10 下', rest: 0, load: '輕', tempo: '2-0-2', note: '活動脊椎' },
            { name: '彈力帶面拉（Band Face Pull）', sets: 2, reps: '15 下', rest: 20, load: '輕', tempo: '2-1-2', note: '喚醒後肩' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '高位下拉（Lat Pulldown）輕重量', sets: 2, reps: '15 下', rest: 30, load: 'RPE 6', tempo: '2-1-2', note: '讓背闊肌充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '【超級組 A1】胸撐啞鈴划船（Chest-Supported Dumbbell Row）', sets: 4, reps: '10 下', rest: 0, load: 'RPE 8', tempo: '2-1-2', note: '先做 1 組輕重量暖身組。做完立即接 A2。' },
            { name: '【超級組 A2】開合跳（Jumping Jack）', sets: 4, reps: '30 秒', rest: 60, load: 'RPE 7', tempo: '', note: '維持心率，做完休 60 秒' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '【超級組 B1】高位下拉（Lat Pulldown）', sets: 3, reps: '12 下', rest: 0, load: 'RPE 8', tempo: '2-1-2', note: '拉至鎖骨' },
            { name: '【超級組 B2】坐姿划船機（Seated Cable Row）', sets: 3, reps: '12 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '做完休 60 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '懸掛或站姿背闊肌伸展（Lat Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '雙手扶穩架子，臀部後坐，感受側腰到腋下拉伸' },
            { name: '嬰兒式（Child\'s Pose）', sets: 2, reps: '30 秒', rest: 0, load: '', tempo: '', note: '雙手向前延伸，深呼吸放鬆下背' }
          ]}
        ]
      }
    ]
  },
  legs: {
    name: '腿臀', emoji: '🦵',
    tips: ['深蹲時膝蓋方向與腳尖一致，不內夾；下蹲到大腿至少平行', '髖鉸鏈動作（硬舉類）用「髖部往後推」帶動，背部保持中立', '腿部是全身最大肌群，訓練後熱量消耗高，減脂期特別重要', '重量訓練務必使用安全槓或保護者，深蹲架高度設在胸口下方', '腿臀訓練後 48–72 小時才恢復，建議每週練 1–2 次'],
    variants: [
      {
        id: 'legs_1', name: '槓鈴力量型', level: '進階', durationMin: 65,
        equipment: ['槓鈴', '深蹲架', '安全槓'],
        focus: '建立下肢最大肌力，以槓鈴深蹲與硬舉變化為核心',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '腳踏車或快走', sets: 1, reps: '5 分鐘', rest: 0, load: '輕', tempo: '', note: '提升核心體溫，活動髖膝踝' },
            { name: '世界上最偉大的伸展（World\'s Greatest Stretch）', sets: 2, reps: '每側 5 下', rest: 0, load: '輕', tempo: '', note: '打開髖屈肌與胸椎，為深蹲做準備' },
            { name: '空槓深蹲（Empty Bar Squat）', sets: 2, reps: '10 下', rest: 30, load: '空槓', tempo: '3-1-1', note: '練習深度與軌跡，膝蓋對腳尖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '彈力帶側走（Banded Lateral Walk）', sets: 2, reps: '12 步每側', rest: 30, load: '輕阻力', tempo: '', note: '膝上套彈力帶，活化臀中肌，避免膝內夾' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '槓鈴背蹲（Barbell Back Squat）', sets: 5, reps: '5 下', rest: 180, load: 'RPE 8／約 80–85% 1RM', tempo: '3-1-1', note: '正式組前：空槓×10、50%×5、70%×3、80%×2。務必設安全槓高度，核心繃緊、膝對腳尖、至少蹲到大腿平行。不可獨自於無保護狀態下練極限重量。' },
            { name: '羅馬尼亞硬舉（Romanian Deadlift）', sets: 4, reps: '6–8 下', rest: 150, load: 'RPE 8／約 70% 1RM', tempo: '3-1-1', note: '槓貼腿下放到小腿中段、脊椎中立、微屈膝。建議做 1 組輕重量暖身。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '槓鈴臀推（Barbell Hip Thrust）', sets: 3, reps: '8–10 下', rest: 90, load: 'RPE 8', tempo: '2-1-1', note: '上背靠板凳、槓鈴墊護墊，頂端夾臀不過度挺腰' },
            { name: '保加利亞分腿蹲（Bulgarian Split Squat）', sets: 3, reps: '每側 8 下', rest: 90, load: 'RPE 8', tempo: '3-0-1', note: '後腳放板凳，前膝不內夾，重心穩定' },
            { name: '站姿提踵（Standing Calf Raise）', sets: 3, reps: '12–15 下', rest: 45, load: 'RPE 8', tempo: '2-2-1', note: '頂端停 2 秒，完整拉伸小腿' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '站姿股四頭肌伸展（Standing Quad Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '膝蓋併攏、骨盆微後傾，不要拱腰' },
            { name: '鴿式或仰臥 4 字伸展（Figure-4 / Pigeon Stretch）', sets: 2, reps: '每側 30–45 秒', rest: 0, load: '', tempo: '', note: '拉伸臀肌與梨狀肌，呼吸放鬆' }
          ]}
        ]
      },
      {
        id: 'legs_2', name: '啞鈴肌肥大型', level: '中階', durationMin: 55,
        equipment: ['啞鈴', '可調式板凳'],
        focus: '以啞鈴單邊與高次數刺激腿臀肌肥大',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '腳踏車或快走', sets: 1, reps: '5 分鐘', rest: 0, load: '輕', tempo: '', note: '提升核心體溫，活動髖膝踝' },
            { name: '世界上最偉大的伸展（World\'s Greatest Stretch）', sets: 2, reps: '每側 5 下', rest: 0, load: '輕', tempo: '', note: '打開髖屈肌與胸椎，為深蹲做準備' },
            { name: '徒手深蹲（Bodyweight Squat）', sets: 2, reps: '12 下', rest: 30, load: '自體體重', tempo: '3-1-1', note: '練習深度與膝蓋對位' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '彈力帶側走（Banded Lateral Walk）', sets: 2, reps: '15 步每側', rest: 30, load: '輕阻力', tempo: '', note: '活化臀中肌' },
            { name: '徒手深蹲（Bodyweight Squat）', sets: 2, reps: '20 下', rest: 30, load: '自體體重', tempo: '2-0-1', note: '節奏快一點，讓大腿充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '高腳杯深蹲（Goblet Squat）', sets: 4, reps: '10–12 下', rest: 90, load: 'RPE 8', tempo: '3-1-1', note: '雙手捧啞鈴貼胸，挺胸、下蹲到大腿平行；重量過重時請改輕，避免圓背。' },
            { name: '啞鈴羅馬尼亞硬舉（Dumbbell RDL）', sets: 4, reps: '10–12 下', rest: 90, load: 'RPE 8', tempo: '3-0-1', note: '背打直、髖部後推、啞鈴貼腿，感受腿後拉伸' },
            { name: '啞鈴弓步蹲（Dumbbell Walking Lunge）', sets: 3, reps: '每側 10 步', rest: 90, load: 'RPE 8', tempo: '2-0-1', note: '上身直立、前膝不過度內夾，步幅足夠' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '啞鈴臀橋（Dumbbell Glute Bridge）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-2-1', note: '啞鈴放髖上，頂端夾緊' },
            { name: '啞鈴站姿提踵（Dumbbell Calf Raise）', sets: 3, reps: '15 下', rest: 45, load: 'RPE 8', tempo: '2-2-1', note: '扶牆穩定，頂端停 2 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '站姿股四頭肌伸展（Standing Quad Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '膝蓋併攏、骨盆微後傾，不要拱腰' },
            { name: '鴿式或仰臥 4 字伸展（Figure-4 / Pigeon Stretch）', sets: 2, reps: '每側 30–45 秒', rest: 0, load: '', tempo: '', note: '拉伸臀肌與梨狀肌，呼吸放鬆' }
          ]}
        ]
      },
      {
        id: 'legs_3', name: '器械新手友善型', level: '新手', durationMin: 50,
        equipment: ['腿推機', '腿伸展機', '腿彎舉機', 'Smith 機'],
        focus: '用器械安全學習腿臀發力',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '腳踏車或快走', sets: 1, reps: '5 分鐘', rest: 0, load: '輕', tempo: '', note: '提升核心體溫，活動髖膝踝' },
            { name: '世界上最偉大的伸展（World\'s Greatest Stretch）', sets: 2, reps: '每側 5 下', rest: 0, load: '輕', tempo: '', note: '打開髖屈肌與胸椎，為深蹲做準備' },
            { name: '輕重量腿推（Leg Press）暖身', sets: 2, reps: '12 下', rest: 30, load: 'RPE 4', tempo: '2-1-2', note: '體會腳位與膝蓋對位' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '腿伸展機（Leg Extension）', sets: 2, reps: '15–20 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '頂端停 1 秒，感受股四頭肌充血，勿鎖死膝' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '腿推機（Leg Press）', sets: 4, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '3-1-1', note: '先做 1 組輕重量暖身。腳掌與肩同寬，下放時膝蓋不內夾、臀部不離椅背、不鎖死膝；務必確認安全卡榫就定位。' },
            { name: 'Smith 機深蹲（Smith Machine Squat）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '3-0-1', note: '腳稍微往前站，軌道固定較安全；設定安全卡榫，蹲到大腿平行' },
            { name: '坐姿腿彎舉（Seated Leg Curl）', sets: 3, reps: '12 下', rest: 75, load: 'RPE 7', tempo: '2-1-2', note: '調整座位讓膝蓋對準軸心' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '臀推機或 Smith 臀推（Machine Hip Thrust）', sets: 3, reps: '12 下', rest: 75, load: 'RPE 7', tempo: '2-1-1', note: '頂端夾臀，不過度挺腰' },
            { name: '器械提踵（Seated Calf Raise）', sets: 3, reps: '15 下', rest: 45, load: 'RPE 7', tempo: '2-2-1', note: '頂端停 2 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '站姿股四頭肌伸展（Standing Quad Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '膝蓋併攏、骨盆微後傾，不要拱腰' },
            { name: '鴿式或仰臥 4 字伸展（Figure-4 / Pigeon Stretch）', sets: 2, reps: '每側 30–45 秒', rest: 0, load: '', tempo: '', note: '拉伸臀肌與梨狀肌，呼吸放鬆' }
          ]}
        ]
      },
      {
        id: 'legs_4', name: '居家徒手／彈力帶型', level: '新手', durationMin: 40,
        equipment: ['彈力帶', '瑜伽墊', '椅子'],
        focus: '不需器材，在家練腿臀',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '原地踏步＋高抬腿', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '全身升溫' },
            { name: '世界上最偉大的伸展（World\'s Greatest Stretch）', sets: 2, reps: '每側 5 下', rest: 0, load: '輕', tempo: '', note: '打開髖屈肌與胸椎，為深蹲做準備' },
            { name: '臀橋（Glute Bridge）', sets: 2, reps: '15 下', rest: 30, load: '自體體重', tempo: '2-1-1', note: '頂端夾臀停 1 秒，啟動臀肌' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '彈力帶側走（Banded Lateral Walk）', sets: 2, reps: '15 步每側', rest: 30, load: '輕阻力', tempo: '', note: '活化臀中肌' },
            { name: '彈力帶深蹲（Banded Squat）', sets: 2, reps: '15 下', rest: 30, load: '輕阻力', tempo: '2-0-1', note: '膝上套彈力帶，主動向外撐' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '徒手深蹲（Bodyweight Squat）', sets: 4, reps: '15–20 下', rest: 60, load: 'RPE 8', tempo: '3-1-1', note: '核心收緊、膝對腳尖；做不到全蹲先蹲到椅子再站起' },
            { name: '保加利亞分腿蹲（Bulgarian Split Squat）', sets: 3, reps: '每側 10 下', rest: 75, load: 'RPE 8', tempo: '3-0-1', note: '後腳放椅子，穩定平衡再下蹲' },
            { name: '單腿臀橋（Single-Leg Glute Bridge）', sets: 3, reps: '每側 12 下', rest: 60, load: 'RPE 8', tempo: '2-1-1', note: '骨盆不歪，頂端夾臀' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '彈力帶蚌式（Banded Clamshell）', sets: 3, reps: '每側 15 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '強化臀中肌' },
            { name: '提踵（Calf Raise）', sets: 3, reps: '20 下', rest: 30, load: '自體體重', tempo: '2-2-1', note: '扶牆，單腳進階' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '站姿股四頭肌伸展（Standing Quad Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '膝蓋併攏、骨盆微後傾，不要拱腰' },
            { name: '鴿式或仰臥 4 字伸展（Figure-4 / Pigeon Stretch）', sets: 2, reps: '每側 30–45 秒', rest: 0, load: '', tempo: '', note: '拉伸臀肌與梨狀肌，呼吸放鬆' }
          ]}
        ]
      },
      {
        id: 'legs_5', name: '超級組燃脂高效型', level: '中階', durationMin: 45,
        equipment: ['啞鈴', '壺鈴', '跳箱或椅子'],
        focus: '腿部大肌群超級組，快速提升熱量消耗',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '跳繩或高抬腿', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '快速升溫' },
            { name: '世界上最偉大的伸展（World\'s Greatest Stretch）', sets: 2, reps: '每側 5 下', rest: 0, load: '輕', tempo: '', note: '打開髖屈肌與胸椎，為深蹲做準備' },
            { name: '臀橋（Glute Bridge）', sets: 2, reps: '15 下', rest: 30, load: '自體體重', tempo: '2-1-1', note: '頂端夾臀停 1 秒，啟動臀肌' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '徒手深蹲（Bodyweight Squat）', sets: 2, reps: '20 下', rest: 20, load: '自體體重', tempo: '2-0-1', note: '快速進入腿部充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '【超級組 A1】高腳杯深蹲（Goblet Squat）', sets: 4, reps: '12 下', rest: 0, load: 'RPE 8', tempo: '2-0-1', note: '挺胸，蹲到大腿平行；做完立即接 A2。' },
            { name: '【超級組 A2】深蹲跳（Jump Squat）', sets: 4, reps: '10 下', rest: 75, load: 'RPE 8', tempo: '', note: '落地輕、膝微彎緩衝；不適請改為徒手深蹲。做完休 75 秒。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '【超級組 B1】啞鈴羅馬尼亞硬舉（Dumbbell RDL）', sets: 3, reps: '12 下', rest: 0, load: 'RPE 7', tempo: '2-0-1', note: '背打直、髖部後推' },
            { name: '【超級組 B2】壺鈴擺盪（Kettlebell Swing）', sets: 3, reps: '15 下', rest: 60, load: 'RPE 8', tempo: '', note: '髖部爆發前推、背打直，不用手臂抬，做完休 60 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '站姿股四頭肌伸展（Standing Quad Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '膝蓋併攏、骨盆微後傾，不要拱腰' },
            { name: '鴿式或仰臥 4 字伸展（Figure-4 / Pigeon Stretch）', sets: 2, reps: '每側 30–45 秒', rest: 0, load: '', tempo: '', note: '拉伸臀肌與梨狀肌，呼吸放鬆' }
          ]}
        ]
      }
    ]
  },
  shoulders: {
    name: '肩膀', emoji: '🙆',
    tips: ['肩關節靈活但脆弱，熱身務必包含旋轉肌群與肩胛穩定肌', '推舉時避免過度腰椎後仰，臀與核心收緊', '側平舉與後三角用輕重量、控制好、手肘略高於手腕', '肩膀不要與胸、背同日塞過多動作，總量太大容易受傷', '有肩夾擠或疼痛時，避免頸後推舉與過深的垂直下拉'],
    variants: [
      {
        id: 'shoulders_1', name: '槓鈴力量型', level: '進階', durationMin: 60,
        equipment: ['槓鈴', '深蹲架', '啞鈴'],
        focus: '提升肩部最大肌力，以站姿槓鈴推舉為核心',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '肩關節繞環＋手臂大繞環', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '前後各繞，活動肩關節囊' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與旋轉肌群' },
            { name: '彈力帶外旋（Band External Rotation）', sets: 2, reps: '每側 12 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '手肘夾緊身側，保護旋轉肌袖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '啞鈴側平舉（Dumbbell Lateral Raise）', sets: 2, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '輕重量，手肘略彎，感受側三角充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '站姿槓鈴肩推（Standing Barbell Overhead Press）', sets: 5, reps: '5 下', rest: 180, load: 'RPE 8／約 80% 1RM', tempo: '2-1-1', note: '正式組前：空槓×10、50%×5、70%×3。臀與腹繃緊、槓路徑貼臉，頭穿過槓下，勿過度後仰腰椎；在深蹲架內可設安全槓。' },
            { name: '槓鈴推舉（Push Press）', sets: 3, reps: '5 下', rest: 150, load: 'RPE 8', tempo: '爆發', note: '利用膝微蹲帶動，核心繃緊，著重爆發力；先確認空間足夠。' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '阿諾推舉（Arnold Press）', sets: 3, reps: '8–10 下', rest: 90, load: 'RPE 8', tempo: '3-0-1', note: '旋轉動作流暢，重量不要太重' },
            { name: '槓鈴直立划船（寬握）（Wide-Grip Upright Row）', sets: 3, reps: '10 下', rest: 75, load: 'RPE 7', tempo: '2-0-2', note: '手肘不超過肩，若肩膀不適請略過' },
            { name: '俯身啞鈴飛鳥（Bent-Over Reverse Fly）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '微屈膝、背打直' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '橫跨身體肩後側伸展（Cross-Body Shoulder Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手臂橫過胸前、另一手輕壓，不聳肩' },
            { name: '頸側伸展＋上斜方肌放鬆（Upper Trap Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，不用力硬拉頭' }
          ]}
        ]
      },
      {
        id: 'shoulders_2', name: '啞鈴肌肥大型', level: '中階', durationMin: 55,
        equipment: ['啞鈴', '可調式板凳'],
        focus: '以啞鈴完整刺激前、中、後三角肌，促進肌肥大',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '肩關節繞環＋手臂大繞環', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '前後各繞，活動肩關節囊' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與旋轉肌群' },
            { name: '彈力帶外旋（Band External Rotation）', sets: 2, reps: '每側 12 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '手肘夾緊身側，保護旋轉肌袖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '啞鈴側平舉（Dumbbell Lateral Raise）', sets: 2, reps: '15–20 下', rest: 30, load: 'RPE 6', tempo: '2-1-2', note: '輕重量，讓側三角充血' },
            { name: '啞鈴前平舉（Dumbbell Front Raise）', sets: 2, reps: '15 下', rest: 30, load: 'RPE 6', tempo: '2-0-2', note: '舉至肩高即可' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '坐姿啞鈴肩推（Seated Dumbbell Shoulder Press）', sets: 4, reps: '8–10 下', rest: 90, load: 'RPE 8', tempo: '3-0-1', note: '背靠緊椅背、核心收緊，先做 1 組輕重量暖身。啞鈴放下至耳側水平，不鎖死手肘；放下重量時小心撞到頭。' },
            { name: '啞鈴側平舉（Dumbbell Lateral Raise）', sets: 4, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '手肘略高於手腕，不甩動' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '俯身啞鈴飛鳥（Bent-Over Reverse Fly）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-1-2', note: '強化後三角，改善圓肩' },
            { name: '啞鈴聳肩（Dumbbell Shrug）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '1-2-1', note: '頂端停 2 秒' },
            { name: '啞鈴 Y 字舉（Y Raise）', sets: 2, reps: '12 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '趴板凳，輕重量，強化下斜方肌' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '橫跨身體肩後側伸展（Cross-Body Shoulder Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手臂橫過胸前、另一手輕壓，不聳肩' },
            { name: '頸側伸展＋上斜方肌放鬆（Upper Trap Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，不用力硬拉頭' }
          ]}
        ]
      },
      {
        id: 'shoulders_3', name: '器械新手友善型', level: '新手', durationMin: 45,
        equipment: ['肩推機', '繩索機', '蝴蝶機'],
        focus: '用器械與繩索安全練出肩部線條',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '肩關節繞環＋手臂大繞環', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '前後各繞，活動肩關節囊' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與旋轉肌群' },
            { name: '彈力帶外旋（Band External Rotation）', sets: 2, reps: '每側 12 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '手肘夾緊身側，保護旋轉肌袖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '繩索側平舉（Cable Lateral Raise）', sets: 2, reps: '15 下', rest: 30, load: 'RPE 5', tempo: '2-1-2', note: '單手側身站，輕重量' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '肩推機（Machine Shoulder Press）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-0-2', note: '先做 1 組輕重量暖身。座椅調到握把與肩同高，背貼椅背，不鎖死手肘。' },
            { name: 'Smith 機肩推（Smith Shoulder Press）', sets: 3, reps: '10–12 下', rest: 90, load: 'RPE 7', tempo: '2-0-2', note: '軌道固定，槓下放至下巴高度；務必設安全卡榫' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '器械側平舉（Machine Lateral Raise）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '手肘主導，不聳肩' },
            { name: '反向蝴蝶機（Reverse Pec Deck）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '強化後三角' },
            { name: '繩索面拉（Cable Face Pull）', sets: 3, reps: '15 下', rest: 45, load: 'RPE 6', tempo: '2-1-2', note: '拉向臉部，手肘高於手腕' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '橫跨身體肩後側伸展（Cross-Body Shoulder Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手臂橫過胸前、另一手輕壓，不聳肩' },
            { name: '頸側伸展＋上斜方肌放鬆（Upper Trap Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，不用力硬拉頭' }
          ]}
        ]
      },
      {
        id: 'shoulders_4', name: '居家徒手／彈力帶型', level: '新手', durationMin: 40,
        equipment: ['彈力帶', '水瓶', '瑜伽墊'],
        focus: '不需健身房，用彈力帶與水瓶練肩',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '肩關節繞環＋手臂大繞環', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '前後各繞，活動肩關節囊' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與旋轉肌群' },
            { name: '彈力帶外旋（Band External Rotation）', sets: 2, reps: '每側 12 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '手肘夾緊身側，保護旋轉肌袖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '肩胛伏地挺身（Scapular Push-Up）', sets: 2, reps: '10 下', rest: 30, load: '自體體重', tempo: '2-1-2', note: '手臂打直，只動肩胛' },
            { name: '水瓶側平舉（Water-Bottle Lateral Raise）', sets: 2, reps: '15–20 下', rest: 30, load: '1 公升水瓶', tempo: '2-1-2', note: '輕重量讓側三角充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '派克伏地挺身（Pike Push-Up）', sets: 4, reps: '8–12 下', rest: 75, load: 'RPE 8', tempo: '3-0-1', note: '臀部抬高成倒 V，頭往雙手間下放，肩推式動作；頸部不適請減少深度' },
            { name: '彈力帶肩推（Band Overhead Press）', sets: 3, reps: '12–15 下', rest: 60, load: 'RPE 8', tempo: '2-0-2', note: '腳踩彈力帶，肩上推舉，核心收緊' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '彈力帶側平舉（Band Lateral Raise）', sets: 3, reps: '15 下', rest: 45, load: 'RPE 8', tempo: '2-1-2', note: '手肘微彎，舉至肩高' },
            { name: '彈力帶面拉（Band Face Pull）', sets: 3, reps: '15 下', rest: 45, load: 'RPE 7', tempo: '2-1-2', note: '拉向臉部' },
            { name: '水瓶俯身飛鳥（Water-Bottle Reverse Fly）', sets: 3, reps: '15 下', rest: 45, load: '1–2 公升水瓶', tempo: '2-1-2', note: '背打直、微屈膝' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '橫跨身體肩後側伸展（Cross-Body Shoulder Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手臂橫過胸前、另一手輕壓，不聳肩' },
            { name: '頸側伸展＋上斜方肌放鬆（Upper Trap Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，不用力硬拉頭' }
          ]}
        ]
      },
      {
        id: 'shoulders_5', name: '超級組燃脂高效型', level: '中階', durationMin: 45,
        equipment: ['啞鈴', '繩索機', '彈力帶'],
        focus: '超級組短休息，提高心率並完整刺激三角肌',
        phases: [
          { key: 'warmup', title: '熱身', items: [
            { name: '開合跳或跳繩', sets: 1, reps: '3 分鐘', rest: 0, load: '輕', tempo: '', note: '快速升溫' },
            { name: '彈力帶拉開（Band Pull-Apart）', sets: 2, reps: '15 下', rest: 30, load: '輕', tempo: '2-1-2', note: '喚醒後三角與旋轉肌群' },
            { name: '彈力帶外旋（Band External Rotation）', sets: 2, reps: '每側 12 下', rest: 30, load: '輕阻力', tempo: '2-1-2', note: '手肘夾緊身側，保護旋轉肌袖' }
          ]},
          { key: 'activation', title: '啟動充血', items: [
            { name: '啞鈴側平舉（Dumbbell Lateral Raise）', sets: 2, reps: '15–20 下', rest: 20, load: 'RPE 6', tempo: '2-1-2', note: '輕重量，讓側三角充血' }
          ]},
          { key: 'main', title: '主訓練（重量）', items: [
            { name: '【超級組 A1】站姿啞鈴肩推（Standing Dumbbell Shoulder Press）', sets: 4, reps: '10 下', rest: 0, load: 'RPE 8', tempo: '2-0-1', note: '先做 1 組輕重量暖身。核心收緊、不過度後仰；做完立即接 A2。' },
            { name: '【超級組 A2】啞鈴側平舉（Dumbbell Lateral Raise）', sets: 4, reps: '12–15 下', rest: 75, load: 'RPE 8', tempo: '2-0-2', note: '做完休 75 秒' }
          ]},
          { key: 'accessory', title: '輔助訓練', items: [
            { name: '【超級組 B1】俯身啞鈴飛鳥（Bent-Over Reverse Fly）', sets: 3, reps: '15 下', rest: 0, load: 'RPE 7', tempo: '2-1-2', note: '背打直' },
            { name: '【超級組 B2】繩索面拉（Cable Face Pull）', sets: 3, reps: '15 下', rest: 60, load: 'RPE 7', tempo: '2-1-2', note: '做完休 60 秒' }
          ]},
          { key: 'cooldown', title: '收操伸展', items: [
            { name: '橫跨身體肩後側伸展（Cross-Body Shoulder Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '手臂橫過胸前、另一手輕壓，不聳肩' },
            { name: '頸側伸展＋上斜方肌放鬆（Upper Trap Stretch）', sets: 2, reps: '每側 30 秒', rest: 0, load: '', tempo: '', note: '緩慢呼吸，不用力硬拉頭' }
          ]}
        ]
      }
    ]
  }
});
