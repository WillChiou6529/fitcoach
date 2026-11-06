// 訓練菜單資料庫 B：手臂、核心、全身燃脂、有氧（各 5 套）
window.WORKOUT_DB = Object.assign(window.WORKOUT_DB || {}, {
  "arms": {
    "name": "手臂",
    "emoji": "💪",
    "tips": [
      "彎舉時手肘固定在身體兩側，不要前後擺動",
      "下壓與伸展三頭時手肘朝前、不外開",
      "下放（離心）要慢，約 2–3 秒，肌肉成長多半在這段",
      "不要借腰力甩，必要時背靠牆或坐姿做",
      "手臂是小肌群，每週 2 次、每次 8–16 組即可，別每天練"
    ],
    "variants": [
      {
        "id": "arms_1",
        "name": "槓鈴力量型",
        "level": "中階",
        "durationMin": 50,
        "equipment": [
          "槓鈴",
          "EZ 槓",
          "繩索機",
          "平板椅"
        ],
        "focus": "以槓鈴複合式動作累積二三頭最大力量，低次數、長休息。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "手腕與手肘繞環",
                "sets": 1,
                "reps": "各方向 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "先活動關節液，動作放慢。"
              },
              {
                "name": "肩關節繞環與擴胸（Arm Circles）",
                "sets": 1,
                "reps": "前後各 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "大幅度繞環，感覺肩膀微熱。"
              },
              {
                "name": "繩索下壓（Cable Pushdown）輕重量",
                "sets": 2,
                "reps": "15–20 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "2-0-2",
                "note": "手肘夾緊，只動前臂。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "EZ 槓彎舉（EZ-Bar Curl）",
                "sets": 2,
                "reps": "15 下",
                "rest": 45,
                "load": "約 40% 1RM / RPE 6",
                "tempo": "2-0-2",
                "note": "輕重量把血液泵進二頭，感受肌肉發熱。"
              },
              {
                "name": "繩索三頭下壓（Rope Pushdown）",
                "sets": 2,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "底部把繩索向外撥開，充分擠壓三頭。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "槓鈴彎舉（Barbell Curl）",
                "sets": 4,
                "reps": "6–8 下",
                "rest": 120,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "正式組前先做輕重量 ×10、中重量 ×5。不要借腰力甩。"
              },
              {
                "name": "窄握槓鈴臥推（Close-Grip Bench Press）",
                "sets": 4,
                "reps": "6–8 下",
                "rest": 150,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "握距約與肩同寬，手肘貼近身體。需有保護者或在安全架內做；肩膀不適可改窄握伏地挺身加重。"
              },
              {
                "name": "仰臥 EZ 槓三頭伸展（Skull Crusher）",
                "sets": 3,
                "reps": "8–10 下",
                "rest": 90,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "槓往額頭後方放，手肘不外開。手肘不適改繩索過頭伸展。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "槓鈴牧師椅彎舉（Preacher Curl）",
                "sets": 3,
                "reps": "10–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "底部不要完全鎖死手肘，避免二頭肌肌腱受傷。"
              },
              {
                "name": "雙槓撐體（Dips）三頭版",
                "sets": 3,
                "reps": "8–12 下",
                "rest": 90,
                "load": "體重 / RPE 8",
                "tempo": "2-0-1",
                "note": "身體保持直立、手肘向後。肩膀不適改長凳撐體（Bench Dip）。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "二頭肌牆壁伸展（Biceps Wall Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              },
              {
                "name": "過頭三頭肌伸展（Overhead Triceps Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "arms_2",
        "name": "啞鈴肌肥大型",
        "level": "中階",
        "durationMin": 45,
        "equipment": [
          "啞鈴",
          "可調式椅"
        ],
        "focus": "全部用啞鈴，中等次數、中等休息，追求肌肥大與泵感。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "手腕與手肘繞環",
                "sets": 1,
                "reps": "各方向 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "先活動關節液，動作放慢。"
              },
              {
                "name": "肩關節繞環與擴胸（Arm Circles）",
                "sets": 1,
                "reps": "前後各 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "大幅度繞環，感覺肩膀微熱。"
              },
              {
                "name": "輕啞鈴錘式彎舉（Hammer Curl）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "1–2 公斤 / RPE 4",
                "tempo": "2-0-2",
                "note": ""
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "啞鈴交替彎舉（Alternating DB Curl）",
                "sets": 2,
                "reps": "每側 15 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "中等重量，高次數充血。"
              },
              {
                "name": "啞鈴俯身後踢（DB Kickback）",
                "sets": 2,
                "reps": "每側 15 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-1-2",
                "note": "上臂固定與地面平行，頂點停 1 秒。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "斜板啞鈴彎舉（Incline DB Curl）",
                "sets": 4,
                "reps": "10–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "椅背 45–60 度，手臂自然下垂，拉長二頭。肩膀前側不適改坐姿啞鈴彎舉。"
              },
              {
                "name": "啞鈴過頭三頭伸展（Overhead DB Triceps Extension）",
                "sets": 4,
                "reps": "10–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "手肘朝前、不外開，腰部不過度反弓。"
              },
              {
                "name": "啞鈴錘式彎舉（Hammer Curl）",
                "sets": 3,
                "reps": "10–12 下",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "拇指朝上，同時練肱橈肌，讓手臂更粗。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "啞鈴俯臥撐背伸展（Tate Press）",
                "sets": 3,
                "reps": "12–15 下",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "2-0-2",
                "note": "手肘往外、啞鈴落在胸口，專攻三頭外側。"
              },
              {
                "name": "集中彎舉（Concentration Curl）",
                "sets": 3,
                "reps": "每側 12–15 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "2-1-2",
                "note": "手肘頂住大腿內側，頂點用力擠壓 1 秒。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "二頭肌牆壁伸展（Biceps Wall Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              },
              {
                "name": "過頭三頭肌伸展（Overhead Triceps Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "arms_3",
        "name": "繩索器械新手型",
        "level": "新手",
        "durationMin": 40,
        "equipment": [
          "滑輪繩索機",
          "器械彎舉機",
          "器械三頭下壓機"
        ],
        "focus": "繩索與器械軌道固定、穩定好上手，先建立動作模式與肌肉感覺。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地踏步＋擺臂",
                "sets": 1,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "讓心率微升、身體暖起來。"
              },
              {
                "name": "手腕與手肘繞環",
                "sets": 1,
                "reps": "各方向 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "先活動關節液，動作放慢。"
              },
              {
                "name": "繩索彎舉（Cable Curl）極輕重量",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "RPE 4",
                "tempo": "2-0-2",
                "note": "先抓肌肉的感覺，不求重量。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "器械彎舉（Machine Curl）",
                "sets": 2,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 5",
                "tempo": "2-0-2",
                "note": "座椅高度調到手肘對準轉軸。"
              },
              {
                "name": "繩索三頭下壓（Cable Pushdown）",
                "sets": 2,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 5",
                "tempo": "2-0-2",
                "note": "手肘夾緊身體，上半身略前傾。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "繩索直槓彎舉（Cable Bar Curl）",
                "sets": 3,
                "reps": "12 下",
                "rest": 75,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "站距與肩同寬，膝蓋微彎，不甩身體。"
              },
              {
                "name": "繩索三頭下壓（Rope Pushdown）",
                "sets": 3,
                "reps": "12 下",
                "rest": 75,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "最後 2 下可能略吃力，但仍要維持標準姿勢。"
              },
              {
                "name": "器械撐體（Assisted Dip Machine）",
                "sets": 3,
                "reps": "10 下",
                "rest": 90,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "用配重輔助，手肘向後、肩膀下沉不聳肩。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "繩索錘式彎舉（Cable Rope Hammer Curl）",
                "sets": 2,
                "reps": "12–15 下",
                "rest": 60,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "拇指朝上，手腕保持中立。"
              },
              {
                "name": "繩索過頭三頭伸展（Cable Overhead Extension）",
                "sets": 2,
                "reps": "12–15 下",
                "rest": 60,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "弓箭步站姿穩住下盤，手肘不外開。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "二頭肌牆壁伸展（Biceps Wall Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              },
              {
                "name": "過頭三頭肌伸展（Overhead Triceps Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "arms_4",
        "name": "居家徒手／彈力帶型",
        "level": "新手",
        "durationMin": 35,
        "equipment": [
          "彈力帶",
          "椅子",
          "水瓶（可選）"
        ],
        "focus": "不用去健身房，用彈力帶與自身體重練手臂。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "手腕與手肘繞環",
                "sets": 1,
                "reps": "各方向 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              },
              {
                "name": "開合跳或原地高抬腿（Jumping Jack / High Knees）",
                "sets": 1,
                "reps": "45 秒",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "膝蓋不適改原地踏步。"
              },
              {
                "name": "彈力帶輕彎舉（Band Curl）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "最輕彈力帶",
                "tempo": "2-0-2",
                "note": ""
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "彈力帶彎舉（Resistance Band Curl）",
                "sets": 2,
                "reps": "20 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "腳踩彈力帶，手肘固定。"
              },
              {
                "name": "彈力帶三頭下壓（Band Pushdown）",
                "sets": 2,
                "reps": "20 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "彈力帶固定在門框上方，手肘夾緊。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "鑽石伏地挺身（Diamond Push-Up）",
                "sets": 4,
                "reps": "8–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "雙手拇指食指成菱形。太吃力改膝蓋著地或手撐在椅面。"
              },
              {
                "name": "椅子撐體（Bench Dip）",
                "sets": 3,
                "reps": "10–15 下",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "手肘向後、不外開，肩膀不聳。肩膀不適改伏地挺身。"
              },
              {
                "name": "彈力帶錘式彎舉（Band Hammer Curl）",
                "sets": 3,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "2-0-2",
                "note": ""
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "彈力帶過頭三頭伸展（Band Overhead Extension）",
                "sets": 3,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "2-0-2",
                "note": "手肘朝前，頂點完全伸直。"
              },
              {
                "name": "毛巾二頭等長收縮（Towel Isometric Curl）",
                "sets": 3,
                "reps": "20 秒",
                "rest": 30,
                "load": "RPE 8",
                "tempo": "",
                "note": "雙手各拉毛巾一端對抗，感受二頭用力。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "二頭肌牆壁伸展（Biceps Wall Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              },
              {
                "name": "過頭三頭肌伸展（Overhead Triceps Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "arms_5",
        "name": "二三頭超級組高效型",
        "level": "進階",
        "durationMin": 40,
        "equipment": [
          "啞鈴",
          "EZ 槓",
          "繩索機"
        ],
        "focus": "二頭與三頭拮抗肌超級組，不休息輪流做，省時又極度充血。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "手腕與手肘繞環",
                "sets": 1,
                "reps": "各方向 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "先活動關節液，動作放慢。"
              },
              {
                "name": "肩關節繞環與擴胸（Arm Circles）",
                "sets": 1,
                "reps": "前後各 15 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "大幅度繞環，感覺肩膀微熱。"
              },
              {
                "name": "繩索下壓＋彎舉輕重量（Cable Pushdown / Curl）",
                "sets": 2,
                "reps": "各 15 下",
                "rest": 30,
                "load": "RPE 4",
                "tempo": "2-0-2",
                "note": ""
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "伏地挺身（Push-Up）＋彈力帶彎舉（Band Curl）",
                "sets": 2,
                "reps": "各 15 下",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "",
                "note": "【超級組 A1/A2】先伏地挺身再彈力帶彎舉，做完休息。太吃力伏地挺身改膝蓋著地。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "EZ 槓彎舉（EZ-Bar Curl）",
                "sets": 4,
                "reps": "8–10 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "【超級組 A1】做完直接換 A2，不休息。"
              },
              {
                "name": "仰臥 EZ 槓三頭伸展（Skull Crusher）",
                "sets": 4,
                "reps": "8–10 下",
                "rest": 90,
                "load": "RPE 8",
                "tempo": "2-0-1",
                "note": "【超級組 A2】兩動作做完才休息 90 秒。手肘不適改繩索下壓。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "斜板啞鈴彎舉（Incline DB Curl）",
                "sets": 3,
                "reps": "10–12 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "【超級組 B1】"
              },
              {
                "name": "啞鈴過頭三頭伸展（Overhead DB Extension）",
                "sets": 3,
                "reps": "10–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "【超級組 B2】最後一組可做到接近力竭。"
              },
              {
                "name": "啞鈴腕彎舉（Wrist Curl）",
                "sets": 2,
                "reps": "15–20 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "強化前臂，避免握力成為手臂訓練瓶頸。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "二頭肌牆壁伸展（Biceps Wall Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              },
              {
                "name": "過頭三頭肌伸展（Overhead Triceps Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      }
    ]
  },
  "core": {
    "name": "核心腹部",
    "emoji": "🧱",
    "tips": [
      "核心訓練的重點是「穩定」，不是只做仰臥起坐",
      "練習時保持正常呼吸，不要憋氣到臉紅",
      "下背不要過度拱起，骨盆微後傾、肋骨下壓",
      "局部減脂不存在，腹肌要看得見靠整體體脂下降",
      "品質優先：做不穩就縮短時間，不要硬撐"
    ],
    "variants": [
      {
        "id": "core_1",
        "name": "抗伸展／抗旋轉穩定型",
        "level": "中階",
        "durationMin": 40,
        "equipment": [
          "地墊",
          "繩索機或彈力帶"
        ],
        "focus": "訓練核心「抵抗動作」的能力，保護下背、提升所有大重量動作的穩定度。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "貓牛式（Cat-Cow）",
                "sets": 1,
                "reps": "10 次",
                "rest": 0,
                "load": "",
                "tempo": "2-0-2",
                "note": "配合呼吸，脊椎逐節活動。"
              },
              {
                "name": "世界最偉大伸展（World's Greatest Stretch）",
                "sets": 1,
                "reps": "每側 5 次",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "打開髖部與胸椎。"
              },
              {
                "name": "鳥狗式（Bird Dog）",
                "sets": 2,
                "reps": "每側 8 下",
                "rest": 20,
                "load": "",
                "tempo": "2-2-2",
                "note": "骨盆不晃動，像背上放一杯水。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "臀橋（Glute Bridge）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "體重",
                "tempo": "2-1-2",
                "note": "先啟動臀部，減少下背代償。"
              },
              {
                "name": "側棒式（Side Plank）",
                "sets": 2,
                "reps": "每側 20 秒",
                "rest": 20,
                "load": "",
                "tempo": "",
                "note": "身體一直線，髖部不下垂。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "棒式（Plank）",
                "sets": 4,
                "reps": "40–60 秒",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "",
                "note": "肋骨下壓、臀部夾緊，不塌腰。做不到改跪姿棒式。"
              },
              {
                "name": "死蟲式（Dead Bug）",
                "sets": 3,
                "reps": "每側 10 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "3-0-3",
                "note": "下背貼地不離開，離不開就縮小動作幅度。"
              },
              {
                "name": "Pallof 推（Pallof Press）",
                "sets": 3,
                "reps": "每側 12 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "2-1-2",
                "note": "側向站在繩索機旁，推出時抵抗身體被拉轉。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "側棒式抬腿（Side Plank Leg Raise）",
                "sets": 3,
                "reps": "每側 10 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "",
                "note": "髖部穩住不掉。做不到改膝蓋著地側棒式。"
              },
              {
                "name": "農夫走路（Farmer Carry）",
                "sets": 3,
                "reps": "30 公尺",
                "rest": 60,
                "load": "單手 10–20 公斤",
                "tempo": "",
                "note": "抬頭挺胸、肋骨不外翻，單手版本抗側彎更強。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆下背與闊背肌。"
              },
              {
                "name": "眼鏡蛇式（Cobra Stretch）",
                "sets": 1,
                "reps": "30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "輕柔伸展腹部，不要痛才撐。"
              }
            ]
          }
        ]
      },
      {
        "id": "core_2",
        "name": "負重腹肌型",
        "level": "中階",
        "durationMin": 40,
        "equipment": [
          "啞鈴",
          "繩索機",
          "健身球"
        ],
        "focus": "用負重做腹直肌與腹斜肌的肌肥大。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "貓牛式（Cat-Cow）",
                "sets": 1,
                "reps": "10 次",
                "rest": 0,
                "load": "",
                "tempo": "2-0-2",
                "note": "配合呼吸，脊椎逐節活動。"
              },
              {
                "name": "世界最偉大伸展（World's Greatest Stretch）",
                "sets": 1,
                "reps": "每側 5 次",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "打開髖部與胸椎。"
              },
              {
                "name": "仰臥捲腹（Crunch）輕做",
                "sets": 2,
                "reps": "12 下",
                "rest": 20,
                "load": "體重",
                "tempo": "2-0-2",
                "note": "只抬肩胛骨離地。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "死蟲式（Dead Bug）",
                "sets": 2,
                "reps": "每側 10 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "3-0-3",
                "note": "啟動深層腹橫肌。"
              },
              {
                "name": "平板屈膝捲腹（Floor Crunch）",
                "sets": 2,
                "reps": "20 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-1-2",
                "note": "頂點擠壓 1 秒。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "繩索跪姿捲腹（Cable Crunch）",
                "sets": 4,
                "reps": "10–12 下",
                "rest": 75,
                "load": "RPE 8",
                "tempo": "2-1-2",
                "note": "用腹部把脊椎捲起，不是用手拉。髖部不動。"
              },
              {
                "name": "負重仰臥舉腿（Weighted Leg Raise）",
                "sets": 3,
                "reps": "10–12 下",
                "rest": 75,
                "load": "腳夾小啞鈴 / RPE 8",
                "tempo": "2-0-3",
                "note": "下背貼地，不能就不負重。"
              },
              {
                "name": "啞鈴側彎（DB Side Bend）",
                "sets": 3,
                "reps": "每側 12–15 下",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "2-0-2",
                "note": "單手握啞鈴，不要過重避免腰部粗壯。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "俄羅斯轉體（Russian Twist）",
                "sets": 3,
                "reps": "每側 15 下",
                "rest": 45,
                "load": "啞鈴 4–8 公斤",
                "tempo": "",
                "note": "雙腳可著地簡化，腰部不能痛。"
              },
              {
                "name": "健身球捲腹（Stability Ball Crunch）",
                "sets": 3,
                "reps": "15 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "2-1-2",
                "note": "球放在腰窩處，延展更大幅度。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "眼鏡蛇式（Cobra Stretch）",
                "sets": 1,
                "reps": "30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "輕柔伸展腹部。"
              },
              {
                "name": "側彎伸展（Standing Side Bend）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "core_3",
        "name": "新手入門地墊型",
        "level": "新手",
        "durationMin": 30,
        "equipment": [
          "地墊"
        ],
        "focus": "不需器材，從基礎核心動作開始建立腹部感覺與正確呼吸。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "貓牛式（Cat-Cow）",
                "sets": 1,
                "reps": "10 次",
                "rest": 0,
                "load": "",
                "tempo": "2-0-2",
                "note": "配合呼吸，脊椎逐節活動。"
              },
              {
                "name": "原地踏步＋擺臂",
                "sets": 1,
                "reps": "1 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "讓身體微熱。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "腹式呼吸（Diaphragmatic Breathing）",
                "sets": 2,
                "reps": "10 下",
                "rest": 15,
                "load": "",
                "tempo": "4-0-6",
                "note": "仰臥屈膝，吐氣時肋骨下壓、肚臍往脊椎收。"
              },
              {
                "name": "臀橋（Glute Bridge）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "體重",
                "tempo": "2-1-2",
                "note": ""
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "跪姿棒式（Kneeling Plank）",
                "sets": 3,
                "reps": "20–30 秒",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "",
                "note": "身體成一直線，能穩住再進階到標準棒式。"
              },
              {
                "name": "死蟲式（Dead Bug）簡化版",
                "sets": 3,
                "reps": "每側 8 下",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "3-0-3",
                "note": "只動手或只動腳也可以，下背不離地。"
              },
              {
                "name": "仰臥捲腹（Crunch）",
                "sets": 3,
                "reps": "12–15 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "2-0-2",
                "note": "手放胸前，不拉脖子。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "鳥狗式（Bird Dog）",
                "sets": 3,
                "reps": "每側 8 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-2-2",
                "note": "骨盆保持水平。"
              },
              {
                "name": "仰臥單腳踏步（Reverse Crunch Marching）",
                "sets": 3,
                "reps": "每側 10 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "下背貼地，不能就縮小幅度。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆下背。"
              },
              {
                "name": "眼鏡蛇式（Cobra Stretch）",
                "sets": 1,
                "reps": "30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "輕柔伸展腹部。"
              }
            ]
          }
        ]
      },
      {
        "id": "core_4",
        "name": "懸吊／進階型",
        "level": "進階",
        "durationMin": 45,
        "equipment": [
          "單槓",
          "健腹輪",
          "地墊"
        ],
        "focus": "用懸吊與長槓桿動作挑戰腹肌極限，需具備基礎核心穩定度。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "貓牛式（Cat-Cow）",
                "sets": 1,
                "reps": "10 次",
                "rest": 0,
                "load": "",
                "tempo": "2-0-2",
                "note": "配合呼吸，脊椎逐節活動。"
              },
              {
                "name": "世界最偉大伸展（World's Greatest Stretch）",
                "sets": 1,
                "reps": "每側 5 次",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "打開髖部與胸椎。"
              },
              {
                "name": "懸垂（Dead Hang）",
                "sets": 2,
                "reps": "20 秒",
                "rest": 20,
                "load": "",
                "tempo": "",
                "note": "活動肩胛，放鬆握力。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "死蟲式（Dead Bug）",
                "sets": 2,
                "reps": "每側 10 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "3-0-3",
                "note": "先啟動深層核心再練進階動作。"
              },
              {
                "name": "懸垂屈膝抬腿（Hanging Knee Raise）",
                "sets": 2,
                "reps": "10 下",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "2-0-2",
                "note": "不晃盪，骨盆後傾。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "懸垂舉腿（Hanging Leg Raise）",
                "sets": 4,
                "reps": "8–12 下",
                "rest": 90,
                "load": "RPE 8",
                "tempo": "2-1-3",
                "note": "腿伸直舉到水平以上，不借擺盪。握力不足用握力帶；做不到改屈膝版。"
              },
              {
                "name": "健腹輪（Ab Wheel Rollout）",
                "sets": 4,
                "reps": "8–10 下",
                "rest": 90,
                "load": "RPE 8",
                "tempo": "3-0-1",
                "note": "骨盆後傾、不塌腰。下背痛或做不穩改跪姿短幅度，或改棒式身體鋸（Plank Saw）。"
              },
              {
                "name": "龍旗進階：負重棒式（Weighted Plank）",
                "sets": 3,
                "reps": "30–45 秒",
                "rest": 60,
                "load": "+10 公斤 / RPE 8",
                "tempo": "",
                "note": "需有人協助放置重量片，姿勢跑掉立即停。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "懸垂扭轉抬膝（Hanging Knee Twist）",
                "sets": 3,
                "reps": "每側 10 下",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "2-0-2",
                "note": "膝蓋往側邊斜上抬，練腹斜肌。"
              },
              {
                "name": "側棒式髖下壓（Side Plank Hip Dip）",
                "sets": 3,
                "reps": "每側 12 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "2-1-2",
                "note": "肩膀正下方撐住，不聳肩。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆下背與闊背肌。"
              },
              {
                "name": "腹部拉伸（眼鏡蛇式 / Cobra）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留，呼吸放慢，不彈震。"
              }
            ]
          }
        ]
      },
      {
        "id": "core_5",
        "name": "核心循環燃脂型",
        "level": "中階",
        "durationMin": 35,
        "equipment": [
          "地墊",
          "啞鈴（可選）"
        ],
        "focus": "核心動作串成循環，兼顧腹肌與熱量消耗。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "開合跳（Jumping Jack）",
                "sets": 1,
                "reps": "45 秒",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "膝蓋不適改原地踏步。"
              },
              {
                "name": "貓牛式（Cat-Cow）",
                "sets": 1,
                "reps": "10 次",
                "rest": 0,
                "load": "",
                "tempo": "2-0-2",
                "note": "配合呼吸，脊椎逐節活動。"
              },
              {
                "name": "世界最偉大伸展（World's Greatest Stretch）",
                "sets": 1,
                "reps": "每側 5 次",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "打開髖部與胸椎。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "登山者（Mountain Climber）慢速版",
                "sets": 2,
                "reps": "30 秒",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "",
                "note": "慢速踏步版，重點在髖部穩定。膝蓋不適改棒式交替抬腿。"
              },
              {
                "name": "臀橋（Glute Bridge）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "體重",
                "tempo": "2-1-2",
                "note": ""
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "登山者（Mountain Climber）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 1/4】每輪 3 動作，輪間休息 60 秒。登山者改慢速踏步可降階。"
              },
              {
                "name": "仰臥單車（Bicycle Crunch）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 2/4】肩膀離地、肘碰對側膝，不拉脖子。"
              },
              {
                "name": "棒式開合腿（Plank Jack）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 3/4】輪間休息 60 秒。改慢速踏出版本降階。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "V 字起身（V-Up）",
                "sets": 3,
                "reps": "12 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "",
                "note": "做不到改屈膝收腹（Tuck-Up）。"
              },
              {
                "name": "側棒式（Side Plank）",
                "sets": 2,
                "reps": "每側 30 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆下背。"
              },
              {
                "name": "眼鏡蛇式（Cobra Stretch）",
                "sets": 1,
                "reps": "30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "輕柔伸展腹部。"
              }
            ]
          }
        ]
      }
    ]
  },
  "hiit": {
    "name": "全身燃脂",
    "emoji": "🔥",
    "tips": [
      "HIIT 前一定要充分熱身，並預留收操時間",
      "每週 HIIT 2–3 次、隔天做，肌肉與關節需要恢復",
      "動作品質優先於速度，姿勢跑掉就降階或休息",
      "膝蓋不好或體重大者請選低衝擊版本",
      "訓練中不舒服、頭暈、胸悶立即停止並補水"
    ],
    "variants": [
      {
        "id": "hiit_1",
        "name": "Tabata 徒手型",
        "level": "中階",
        "durationMin": 30,
        "equipment": [
          "地墊"
        ],
        "focus": "20 秒全力／10 秒休息 × 8 輪，4 分鐘一個 Tabata，共 3 個，無需器材。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地慢跑＋擺臂",
                "sets": 1,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "循序提升心率，膝蓋不適改原地踏步。"
              },
              {
                "name": "動態伸展：深蹲到站（Inchworm / Squat to Stand）",
                "sets": 1,
                "reps": "10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖、膝、踝與腿後側。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "開合跳（Jumping Jack）",
                "sets": 2,
                "reps": "30 秒",
                "rest": 15,
                "load": "RPE 6",
                "tempo": "",
                "note": "提升心率，膝蓋不適改原地踏步。"
              },
              {
                "name": "徒手深蹲（Bodyweight Squat）",
                "sets": 2,
                "reps": "15 下",
                "rest": 20,
                "load": "RPE 6",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "Tabata A：波比跳（Burpee）",
                "sets": 8,
                "reps": "20 秒",
                "rest": 10,
                "load": "RPE 9",
                "tempo": "",
                "note": "【Tabata 1/3】20 秒做/10 秒休 × 8，之後休息 60 秒。衝擊太大改不跳版（走出去伏地、走回站起）。"
              },
              {
                "name": "Tabata B：登山者（Mountain Climber）",
                "sets": 8,
                "reps": "20 秒",
                "rest": 10,
                "load": "RPE 9",
                "tempo": "",
                "note": "【Tabata 2/3】休息 10 秒，結束後休息 60 秒。膝蓋不適改棒式交替抬腿。"
              },
              {
                "name": "Tabata C：深蹲跳（Squat Jump）",
                "sets": 8,
                "reps": "20 秒",
                "rest": 10,
                "load": "RPE 9",
                "tempo": "",
                "note": "【Tabata 3/3】落地輕、膝蓋對準腳尖。膝蓋不適改徒手快速深蹲。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "伏地挺身（Push-Up）",
                "sets": 3,
                "reps": "10–15 下",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "",
                "note": "做不到改膝蓋著地。"
              },
              {
                "name": "棒式（Plank）",
                "sets": 2,
                "reps": "40 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "站姿股四頭肌伸展（Quad Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靠牆或扶椅保持平衡。"
              },
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆呼吸，讓心率降下來。"
              }
            ]
          }
        ]
      },
      {
        "id": "hiit_2",
        "name": "壺鈴循環",
        "level": "中階",
        "durationMin": 40,
        "equipment": [
          "壺鈴 8–16 公斤",
          "地墊"
        ],
        "focus": "壺鈴爆發型動作串聯成循環，後側鏈與心肺同時燃燒。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地慢跑＋擺臂",
                "sets": 1,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "循序提升心率，膝蓋不適改原地踏步。"
              },
              {
                "name": "動態伸展：深蹲到站（Inchworm / Squat to Stand）",
                "sets": 1,
                "reps": "10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖、膝、踝與腿後側。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "壺鈴高腳杯深蹲（Goblet Squat）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "輕壺鈴 / RPE 5",
                "tempo": "3-0-1",
                "note": "熟悉髖關節動作。"
              },
              {
                "name": "壺鈴硬舉（KB Deadlift）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "2-0-1",
                "note": "背保持平直，用髖鉸鏈。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "壺鈴擺盪（Kettlebell Swing）",
                "sets": 5,
                "reps": "15 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 1/5】靠髖部爆發，不是用手拉。需先學好硬舉再做。腰痛者改硬舉。"
              },
              {
                "name": "高腳杯深蹲（Goblet Squat）",
                "sets": 5,
                "reps": "12 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 2/5】"
              },
              {
                "name": "壺鈴單手推舉（KB Press）",
                "sets": 5,
                "reps": "每側 8 下",
                "rest": 90,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 3/5】輪間休息 90 秒，共 5 輪。肩膀不適改啞鈴推舉。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "壺鈴土耳其起立（Turkish Get-Up）",
                "sets": 3,
                "reps": "每側 3 下",
                "rest": 60,
                "load": "RPE 7",
                "tempo": "",
                "note": "動作慢，眼睛盯著壺鈴。不熟先用空手或鞋子練。"
              },
              {
                "name": "壺鈴農夫走路（Farmer Carry）",
                "sets": 3,
                "reps": "30 公尺",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "鴿式伸展（Pigeon Stretch）",
                "sets": 1,
                "reps": "每側 40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆臀部與髖。"
              },
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "放鬆呼吸。"
              }
            ]
          }
        ]
      },
      {
        "id": "hiit_3",
        "name": "啞鈴複合循環",
        "level": "進階",
        "durationMin": 40,
        "equipment": [
          "啞鈴 2 支",
          "地墊"
        ],
        "focus": "將多個動作用同一對啞鈴連續完成（Complex），不放下啞鈴，高強度全身。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地慢跑＋擺臂",
                "sets": 1,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "循序提升心率，膝蓋不適改原地踏步。"
              },
              {
                "name": "動態伸展：深蹲到站（Inchworm / Squat to Stand）",
                "sets": 1,
                "reps": "10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖、膝、踝與腿後側。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "啞鈴高腳杯深蹲（DB Goblet Squat）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "3-0-1",
                "note": ""
              },
              {
                "name": "啞鈴羅馬尼亞硬舉（DB RDL）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "2-0-1",
                "note": "背平直，不駝背。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "啞鈴划船（DB Bent-Over Row）",
                "sets": 4,
                "reps": "8 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 1/3】Complex：同一對啞鈴連續 3 動作，不放下。背平直。"
              },
              {
                "name": "啞鈴懸垂抓舉（DB Hang Clean）",
                "sets": 4,
                "reps": "8 下",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 2/3】動作熟練再做，不熟改啞鈴聳肩上拉。"
              },
              {
                "name": "啞鈴深蹲推舉（DB Thruster）",
                "sets": 4,
                "reps": "8 下",
                "rest": 120,
                "load": "RPE 8",
                "tempo": "",
                "note": "【循環 3/3】一輪完成後休息 120 秒，共 4 輪。肩膀不適改深蹲＋側平舉。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "啞鈴農夫走路（Farmer Carry）",
                "sets": 3,
                "reps": "30 公尺",
                "rest": 45,
                "load": "RPE 8",
                "tempo": "",
                "note": ""
              },
              {
                "name": "棒式（Plank）",
                "sets": 2,
                "reps": "45 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "鴿式伸展（Pigeon Stretch）",
                "sets": 1,
                "reps": "每側 40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              },
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          }
        ]
      },
      {
        "id": "hiit_4",
        "name": "低衝擊型",
        "level": "新手",
        "durationMin": 35,
        "equipment": [
          "地墊",
          "輕啞鈴（可選）"
        ],
        "focus": "全程不跳躍，適合體重大、膝蓋或腳踝不好者，同樣能有效拉高心率。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地踏步＋擺臂",
                "sets": 1,
                "reps": "3 分鐘",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "全程不跳。"
              },
              {
                "name": "髖關節繞圈與擴胸",
                "sets": 1,
                "reps": "10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "原地高抬膝（慢速）（Slow High Knees）",
                "sets": 2,
                "reps": "30 秒",
                "rest": 20,
                "load": "RPE 5",
                "tempo": "",
                "note": "不跳，腳輪流抬起。"
              },
              {
                "name": "徒手深蹲（Bodyweight Squat）",
                "sets": 2,
                "reps": "12 下",
                "rest": 20,
                "load": "RPE 5",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "原地踏步＋擺臂（Marching）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 0,
                "load": "RPE 7",
                "tempo": "",
                "note": "【循環 1/3】每動作 40 秒，共 4 輪，輪間休息 60 秒。"
              },
              {
                "name": "側向跨步深蹲（Squat Step-Out）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 0,
                "load": "RPE 7",
                "tempo": "",
                "note": "【循環 2/3】左右跨步下蹲，不跳。"
              },
              {
                "name": "拳擊直拳＋閃躲（Shadow Boxing）",
                "sets": 4,
                "reps": "40 秒",
                "rest": 60,
                "load": "RPE 7",
                "tempo": "",
                "note": "【循環 3/3】雙腳不離地，用上半身帶動心率。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "牆壁伏地挺身（Wall Push-Up）",
                "sets": 3,
                "reps": "12 下",
                "rest": 45,
                "load": "RPE 6",
                "tempo": "",
                "note": "提高難度改斜板伏地挺身。"
              },
              {
                "name": "臀橋（Glute Bridge）",
                "sets": 3,
                "reps": "15 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "2-1-2",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "腿後側伸展（Hamstring Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              },
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          }
        ]
      },
      {
        "id": "hiit_5",
        "name": "EMOM／AMRAP 型",
        "level": "進階",
        "durationMin": 40,
        "equipment": [
          "啞鈴",
          "壺鈴",
          "地墊"
        ],
        "focus": "用 EMOM（每分鐘開始做固定量）與 AMRAP（時間內盡量多輪）控制強度與節奏。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地慢跑＋擺臂",
                "sets": 1,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "RPE 4",
                "tempo": "",
                "note": "循序提升心率，膝蓋不適改原地踏步。"
              },
              {
                "name": "動態伸展：深蹲到站（Inchworm / Squat to Stand）",
                "sets": 1,
                "reps": "10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖、膝、踝與腿後側。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "啞鈴高腳杯深蹲（Goblet Squat）",
                "sets": 2,
                "reps": "12 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "",
                "note": ""
              },
              {
                "name": "伏地挺身（Push-Up）",
                "sets": 2,
                "reps": "8 下",
                "rest": 30,
                "load": "RPE 5",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "EMOM 12 分：奇數分鐘波比跳 10 下 / 偶數分鐘壺鈴擺盪 15 下（Burpee / KB Swing）",
                "sets": 1,
                "reps": "12 分鐘",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "每分鐘開始做，做完剩餘時間就是休息。波比跳可改不跳版，腰痛改啞鈴硬舉。"
              },
              {
                "name": "休息",
                "sets": 1,
                "reps": "3 分鐘",
                "rest": 180,
                "load": "",
                "tempo": "",
                "note": "補水、讓心率回到 RPE 4 以下。"
              },
              {
                "name": "AMRAP 10 分：啞鈴深蹲 10 + 伏地挺身 8 + 登山者 20 下（DB Squat / Push-Up / Mountain Climber）",
                "sets": 1,
                "reps": "10 分鐘",
                "rest": 0,
                "load": "RPE 8",
                "tempo": "",
                "note": "盡量多完成輪數，姿勢跑掉就先休息再繼續。記錄輪數下次挑戰。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "啞鈴划船（DB Row）",
                "sets": 3,
                "reps": "每側 10 下",
                "rest": 45,
                "load": "RPE 7",
                "tempo": "2-0-1",
                "note": ""
              },
              {
                "name": "棒式（Plank）",
                "sets": 2,
                "reps": "45 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "鴿式伸展（Pigeon Stretch）",
                "sets": 1,
                "reps": "每側 40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              },
              {
                "name": "嬰兒式（Child's Pose）",
                "sets": 1,
                "reps": "40 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          }
        ]
      }
    ]
  },
  "cardio": {
    "name": "有氧心肺",
    "emoji": "🏃",
    "tips": [
      "Zone 2 的感覺：能完整說話但不能唱歌",
      "最大心率粗估：220 − 年齡，Zone 2 約 60–70%",
      "循序漸進，每週時間或強度只增加約 10%",
      "運動前後各補水，高強度時間長要補充電解質",
      "有膝蓋或心血管疑慮者，開始前先諮詢醫師"
    ],
    "variants": [
      {
        "id": "cardio_1",
        "name": "Zone 2 穩態有氧",
        "level": "新手",
        "durationMin": 55,
        "equipment": [
          "跑步機、橢圓機或健身車"
        ],
        "focus": "長時間低強度穩態，提升基礎有氧能力與脂肪代謝，最適合新手與恢復日。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "動態伸展：腿擺盪與髖繞圈（Leg Swings / Hip Circles）",
                "sets": 1,
                "reps": "每側 10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖與膝。"
              },
              {
                "name": "跑步機或橢圓機輕鬆熱身（Easy Warm-Up）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "從很輕鬆開始逐漸加快，心率慢慢升高。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "快走暖身（Brisk Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "心率 50–60% 最大心率 / RPE 4",
                "tempo": "",
                "note": "慢慢加速，心率進入 Zone 2 邊緣。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "Zone 2 穩態：跑步機快走或慢跑（Steady State）",
                "sets": 1,
                "reps": "25 分鐘",
                "rest": 0,
                "load": "心率 60–70% 最大心率 / RPE 5",
                "tempo": "",
                "note": "能完整說話。心率過高就放慢，膝蓋不適改橢圓機。"
              },
              {
                "name": "Zone 2 穩態：橢圓機或健身車（Elliptical / Bike）",
                "sets": 1,
                "reps": "15 分鐘",
                "rest": 0,
                "load": "心率 60–70% 最大心率 / RPE 5",
                "tempo": "",
                "note": "換器材降低單一部位疲勞，維持同樣心率區間。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "逐步降速（Cool Down Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "心率降至 50% 以下 / RPE 3",
                "tempo": "",
                "note": "不要突然停下。"
              },
              {
                "name": "髖屈肌伸展（Hip Flexor Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "久站後放鬆髖部。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "小腿伸展（Calf Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留。"
              },
              {
                "name": "股四頭肌伸展（Quad Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "扶牆保持平衡。"
              }
            ]
          }
        ]
      },
      {
        "id": "cardio_2",
        "name": "跑步機間歇（HIIT）",
        "level": "進階",
        "durationMin": 40,
        "equipment": [
          "跑步機"
        ],
        "focus": "衝刺與慢走交替，短時間高效燃脂。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "動態伸展：腿擺盪與髖繞圈（Leg Swings / Hip Circles）",
                "sets": 1,
                "reps": "每側 10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖與膝。"
              },
              {
                "name": "跑步機輕鬆慢跑（Easy Jog）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "從很輕鬆開始逐漸加快，心率慢慢升高。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "漸進加速跑（Strides）",
                "sets": 3,
                "reps": "30 秒",
                "rest": 30,
                "load": "RPE 6–7",
                "tempo": "",
                "note": "逐漸加快到接近衝刺速度。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "間歇跑（Sprint Intervals）：30 秒衝刺 / 90 秒慢走",
                "sets": 8,
                "reps": "30 秒衝刺＋90 秒慢走",
                "rest": 0,
                "load": "衝刺 RPE 9 / 慢走 RPE 3，心率 85–95% 最大心率",
                "tempo": "",
                "note": "衝刺速度約 10–14 km/h，慢走約 4–5 km/h，共 8 輪（約 16 分鐘）。腳踝膝蓋不適改坡度快走衝刺。"
              },
              {
                "name": "坡度跑（Hill Repeats）",
                "sets": 3,
                "reps": "2 分鐘",
                "rest": 60,
                "load": "坡度 6% / 速度 8 km/h / RPE 8",
                "tempo": "",
                "note": "間歇跑後再做。身體略前傾、步幅小。體能不足改坡度快走。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "慢走恢復（Recovery Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "讓心率逐漸下降。"
              },
              {
                "name": "核心：棒式（Plank）",
                "sets": 2,
                "reps": "40 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "小腿伸展（Calf Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留。"
              },
              {
                "name": "股四頭肌伸展（Quad Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "扶牆保持平衡。"
              }
            ]
          }
        ]
      },
      {
        "id": "cardio_3",
        "name": "坡度快走（低衝擊減脂）",
        "level": "新手",
        "durationMin": 45,
        "equipment": [
          "跑步機"
        ],
        "focus": "用坡度拉高消耗、膝蓋壓力小，適合體重大或新手。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "動態伸展：腿擺盪與髖繞圈（Leg Swings / Hip Circles）",
                "sets": 1,
                "reps": "每側 10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖與膝。"
              },
              {
                "name": "平地快走（Easy Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "從很輕鬆開始逐漸加快，心率慢慢升高。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "坡度漸進快走（Progressive Incline Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "坡度 3% → 8% / 速度 4.5 km/h / RPE 4",
                "tempo": "",
                "note": "每分鐘增加約 1% 坡度。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "坡度快走（Incline Walk）",
                "sets": 1,
                "reps": "20 分鐘",
                "rest": 0,
                "load": "坡度 12% / 速度 5 km/h / 心率 65–75% / RPE 6",
                "tempo": "",
                "note": "不要扶扶手，身體自然前傾。若小腿或下背吃力降到 8–10%。"
              },
              {
                "name": "變坡快走（Hill Intervals Walk）",
                "sets": 5,
                "reps": "2 分鐘",
                "rest": 0,
                "load": "坡度 5% ↔ 12% 交替 / 速度 5 km/h / RPE 6–7",
                "tempo": "",
                "note": "每 2 分鐘切換坡度，共 5 組（約 10 分鐘）。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "平路慢走（Cool Down）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "坡度 0% / 速度 4 km/h / RPE 3",
                "tempo": "",
                "note": "讓心率降下來。"
              },
              {
                "name": "臀橋（Glute Bridge）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "體重",
                "tempo": "2-1-2",
                "note": "放鬆下背並啟動臀部。"
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "小腿伸展（Calf Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留。"
              },
              {
                "name": "股四頭肌伸展（Quad Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "扶牆保持平衡。"
              }
            ]
          }
        ]
      },
      {
        "id": "cardio_4",
        "name": "飛輪／划船機間歇",
        "level": "中階",
        "durationMin": 40,
        "equipment": [
          "飛輪車",
          "划船機"
        ],
        "focus": "兩種器材輪流做間歇，避免單一動作疲勞，膝蓋壓力小。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "動態伸展：腿擺盪與髖繞圈（Leg Swings / Hip Circles）",
                "sets": 1,
                "reps": "每側 10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "活動髖與膝。"
              },
              {
                "name": "飛輪車輕鬆騎乘（Easy Spin）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "從很輕鬆開始逐漸加快，心率慢慢升高。"
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "划船機動作練習（Rowing Technique）",
                "sets": 2,
                "reps": "2 分鐘",
                "rest": 30,
                "load": "RPE 4",
                "tempo": "",
                "note": "順序：腿推 → 身體後仰 → 手拉。回程相反。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "飛輪衝刺間歇（Spin Intervals）：45 秒衝刺 / 75 秒輕鬆",
                "sets": 6,
                "reps": "45 秒衝刺＋75 秒輕鬆",
                "rest": 0,
                "load": "衝刺 RPE 9 / 輕鬆 RPE 3",
                "tempo": "",
                "note": "【循環 1/2】飛輪衝刺阻力加到不卡住為止，共 6 輪（約 12 分鐘），做完休息 2 分鐘。"
              },
              {
                "name": "划船機間歇（Row Intervals）：500 公尺 / 休息 90 秒",
                "sets": 4,
                "reps": "500 公尺",
                "rest": 90,
                "load": "RPE 8–9，心率 85–90%",
                "tempo": "",
                "note": "【循環 2/2】下背不適降低阻力與速度，或改飛輪。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "輕鬆騎乘（Cool Down Spin）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "轉速保持，阻力降到最低。"
              },
              {
                "name": "棒式（Plank）",
                "sets": 2,
                "reps": "40 秒",
                "rest": 30,
                "load": "RPE 7",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "髖屈肌伸展（Hip Flexor Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              },
              {
                "name": "腿後側伸展（Hamstring Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          }
        ]
      },
      {
        "id": "cardio_5",
        "name": "戶外／居家無器材",
        "level": "中階",
        "durationMin": 40,
        "equipment": [
          "跳繩",
          "運動鞋",
          "樓梯"
        ],
        "focus": "不用器材，戶外快走、跳繩、爬樓梯組合，隨處可做。",
        "phases": [
          {
            "key": "warmup",
            "title": "熱身",
            "items": [
              {
                "name": "原地踏步＋擺臂",
                "sets": 1,
                "reps": "3 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": "全身暖起來。"
              },
              {
                "name": "腿擺盪與髖繞圈（Leg Swings / Hip Circles）",
                "sets": 1,
                "reps": "每側 10 下",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "activation",
            "title": "啟動充血",
            "items": [
              {
                "name": "快走（Brisk Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 4，心率 55–65%",
                "tempo": "",
                "note": "步伐大一點、手臂擺動。"
              }
            ]
          },
          {
            "key": "main",
            "title": "主訓練（重量）",
            "items": [
              {
                "name": "快走（Brisk Walk）",
                "sets": 1,
                "reps": "10 分鐘",
                "rest": 0,
                "load": "RPE 5，心率 65–75%",
                "tempo": "",
                "note": "能說話但有點喘。"
              },
              {
                "name": "跳繩（Jump Rope）：1 分鐘 / 休息 30 秒",
                "sets": 6,
                "reps": "1 分鐘",
                "rest": 30,
                "load": "RPE 8",
                "tempo": "",
                "note": "落地輕、前腳掌著地。膝蓋踝關節不適改原地開合或不跳繩的空繩擺手。"
              },
              {
                "name": "爬樓梯（Stair Climb）",
                "sets": 5,
                "reps": "1 分鐘",
                "rest": 60,
                "load": "RPE 8",
                "tempo": "",
                "note": "全腳掌踩穩，身體略前傾。下樓慢走，不要跑下樓傷膝蓋。膝蓋不適改平地快走。"
              }
            ]
          },
          {
            "key": "accessory",
            "title": "輔助訓練",
            "items": [
              {
                "name": "原地深蹲（Bodyweight Squat）",
                "sets": 2,
                "reps": "15 下",
                "rest": 30,
                "load": "RPE 6",
                "tempo": "",
                "note": ""
              },
              {
                "name": "慢走恢復（Recovery Walk）",
                "sets": 1,
                "reps": "5 分鐘",
                "rest": 0,
                "load": "RPE 3",
                "tempo": "",
                "note": ""
              }
            ]
          },
          {
            "key": "cooldown",
            "title": "收操伸展",
            "items": [
              {
                "name": "小腿伸展（Calf Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "靜態停留。"
              },
              {
                "name": "股四頭肌伸展（Quad Stretch）",
                "sets": 1,
                "reps": "每側 30 秒",
                "rest": 0,
                "load": "",
                "tempo": "",
                "note": "扶牆保持平衡。"
              }
            ]
          }
        ]
      }
    ]
  }
});
