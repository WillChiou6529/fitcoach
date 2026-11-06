// 早餐店品項（西式早餐店、中式豆漿店、早午餐）：數值為一般份量估計，參考衛福部食品營養成分資料庫與食物代換表；
// 各店份量、用油差很多，實際以店家為準
(function () {
  'use strict';
  const FOOD = window.FOOD_DB = window.FOOD_DB || [];
  const PRE = window.MEAL_PRESETS = window.MEAL_PRESETS || [];
  const add = (o) => FOOD.push(Object.assign({ cat: '早餐', cook: '', tags: [] }, o));
  // ---- 蛋餅 ----
  add({ id: 'bk_egg_pancake_cheese', name: '起司蛋餅', aliases: ['起司蛋餅', '起士蛋餅', '乳酪蛋餅', '麥味登起司蛋餅'], unit: '1 份（約 170g）', kcal: 320, p: 13, c: 31, f: 16, sugar: 2, sodium: 600, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '起司改原味蛋餅可省約 65 大卡' } });
  add({ id: 'bk_egg_pancake_corn', name: '玉米蛋餅', aliases: ['玉米蛋餅', '玉米粒蛋餅', '拉亞玉米蛋餅'], unit: '1 份（約 185g）', kcal: 300, p: 10, c: 35.8, f: 13, sugar: 3, sodium: 560, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '玉米改原味蛋餅可省約 45 大卡' } });
  add({ id: 'bk_egg_pancake_tuna', name: '鮪魚蛋餅', aliases: ['鮪魚蛋餅', '吞拿魚蛋餅', '鮪魚醬蛋餅'], unit: '1 份（約 185g）', kcal: 335, p: 15, c: 32.8, f: 16, sugar: 2, sodium: 640, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '鮪魚醬含美乃滋，改原味蛋餅可省約 80 大卡' } });
  add({ id: 'bk_egg_pancake_ham', name: '火腿蛋餅', aliases: ['火腿蛋餅', '美而美火腿蛋餅', '火腿蛋餅加蛋'], unit: '1 份（約 180g）', kcal: 310, p: 13, c: 33, f: 14, sugar: 2, sodium: 720, cook: '煎', tags: ['精緻澱粉', '高鈉', '加工肉'],
    swap: { to: 'egg_pancake', tip: '火腿改原味蛋餅可省約 55 大卡且鈉較低' } });
  add({ id: 'bk_egg_pancake_floss', name: '肉鬆蛋餅', aliases: ['肉鬆蛋餅', '肉酥蛋餅', '肉鬆加蛋餅'], unit: '1 份（約 175g）', kcal: 300, p: 11, c: 34.8, f: 13, sugar: 2, sodium: 620, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '肉鬆含糖含油，改原味蛋餅可省約 45 大卡' } });
  add({ id: 'bk_egg_pancake_hashbrown', name: '薯餅蛋餅', aliases: ['薯餅蛋餅', '麥味登薯餅蛋餅', '薯餅加蛋餅'], unit: '1 份（約 200g）', kcal: 380, p: 10, c: 42.3, f: 19, sugar: 1, sodium: 620, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '改點原味蛋餅加茶葉蛋，約省 50 大卡且多 6g 蛋白質' } });
  add({ id: 'bk_egg_pancake_hotdog', name: '熱狗蛋餅', aliases: ['熱狗蛋餅', '香腸蛋餅', '熱狗加蛋餅'], unit: '1 份（約 195g）', kcal: 350, p: 12, c: 35, f: 18, sugar: 2, sodium: 760, cook: '煎', tags: ['精緻澱粉', '高鈉', '加工肉'],
    swap: { to: 'egg_pancake', tip: '熱狗是加工肉，改原味蛋餅可省約 95 大卡' } });
  add({ id: 'bk_egg_pancake_smoked_chicken', name: '燻雞蛋餅', aliases: ['燻雞蛋餅', '煙燻雞蛋餅', '燻雞肉蛋餅'], unit: '1 份（約 190g）', kcal: 315, p: 16, c: 33.5, f: 13, sugar: 2, sodium: 700, cook: '煎', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'egg_pancake', tip: '燻雞鈉偏高，改原味蛋餅可省約 60 大卡' } });
  add({ id: 'bk_egg_pancake_basil', name: '九層塔蛋餅', aliases: ['九層塔蛋餅', '塔香蛋餅', '九層塔加蛋餅'], unit: '1 份（約 175g）', kcal: 285, p: 11, c: 28.8, f: 14, sugar: 1, sodium: 520, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '九層塔蛋餅用油較多，點少油煎的原味蛋餅可省約 30 大卡' } });
  add({ id: 'bk_egg_pancake_kimchi', name: '泡菜蛋餅', aliases: ['泡菜蛋餅', '韓式泡菜蛋餅', '辣泡菜蛋餅'], unit: '1 份（約 190g）', kcal: 285, p: 11, c: 33.3, f: 12, sugar: 3, sodium: 820, cook: '煎', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'egg_pancake', tip: '泡菜鈉高，改原味蛋餅並搭配無糖豆漿' } });
  add({ id: 'bk_egg_pancake_pork_cutlet', name: '豬排蛋餅', aliases: ['豬排蛋餅', '炸豬排蛋餅', '排骨蛋餅'], unit: '1 份（約 210g）', kcal: 420, p: 18, c: 42, f: 20, sugar: 2, sodium: 780, cook: '炸', tags: ['精緻澱粉', '油炸'],
    swap: { to: 'egg_pancake', tip: '豬排油炸，改原味蛋餅加茶葉蛋可省約 90 大卡' } });
  add({ id: 'bk_egg_pancake_veg', name: '蔬菜蛋餅', aliases: ['蔬菜蛋餅', '青菜蛋餅', '高麗菜蛋餅'], unit: '1 份（約 190g）', kcal: 270, p: 10, c: 30.5, f: 12, sugar: 2, sodium: 500, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '蔬菜蛋餅較清爽，已接近原味蛋餅熱量' } });
  add({ id: 'bk_egg_pancake_batter', name: '麵糊蛋餅', aliases: ['麵糊蛋餅', '古早味蛋餅', '厚麵糊蛋餅'], unit: '1 份（約 200g）', kcal: 290, p: 9, c: 38.8, f: 11, sugar: 1, sodium: 480, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '麵糊蛋餅吸油，點薄皮原味蛋餅可省約 35 大卡' } });
  add({ id: 'bk_egg_pancake_cheese_corn', name: '起司玉米蛋餅', aliases: ['起司玉米蛋餅', '起士玉米蛋餅', '玉米起司蛋餅'], unit: '1 份（約 200g）', kcal: 360, p: 14, c: 37.8, f: 17, sugar: 3, sodium: 680, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '雙配料熱量疊加，改原味蛋餅可省約 105 大卡' } });
  add({ id: 'bk_egg_pancake_club', name: '總匯蛋餅', aliases: ['總匯蛋餅', '火腿起司蛋餅', '綜合蛋餅'], unit: '1 份（約 220g）', kcal: 390, p: 17, c: 37.8, f: 19, sugar: 3, sodium: 820, cook: '煎', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'egg_pancake', tip: '總匯配料多，改原味蛋餅加茶葉蛋可省約 60 大卡' } });
  add({ id: 'bk_egg_pancake_chinese', name: '中式厚蛋餅', aliases: ['厚蛋餅', '中式蛋餅', '豆漿店蛋餅'], unit: '1 份（約 200g）', kcal: 330, p: 11, c: 37.8, f: 15, sugar: 1, sodium: 520, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '厚蛋餅吃油量高，改薄皮原味蛋餅可省約 75 大卡' } });
  // ---- 吐司 ----
  add({ id: 'bk_toast_jam', name: '果醬吐司', aliases: ['果醬吐司', '草莓醬吐司', '水果醬吐司'], unit: '2 片（約 120g）', kcal: 270, p: 6, c: 48, f: 6, sugar: 14, sodium: 300, cook: '', tags: ['精緻澱粉', '高糖'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥吐司夾薄果醬，可多纖維並省約 30 大卡' } });
  add({ id: 'bk_toast_peanut', name: '花生吐司', aliases: ['花生吐司', '花生醬吐司', '花生醬三明治'], unit: '2 片（約 130g）', kcal: 340, p: 9, c: 46.8, f: 13, sugar: 9, sodium: 320, cook: '', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '花生醬塗薄一點，或改全麥吐司可省約 40 大卡' } });
  add({ id: 'bk_toast_chocolate', name: '巧克力吐司', aliases: ['巧克力吐司', '巧克力醬吐司', '可可吐司'], unit: '2 片（約 130g）', kcal: 330, p: 6, c: 51.8, f: 11, sugar: 18, sodium: 300, cook: '', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '巧克力醬糖高，改全麥吐司加蛋可省約 50 大卡' } });
  add({ id: 'bk_toast_custard', name: '奶酥吐司', aliases: ['奶酥吐司', '奶油酥吐司', '奶酥醬吐司'], unit: '2 片（約 135g）', kcal: 380, p: 7, c: 52, f: 16, sugar: 14, sodium: 340, cook: '', tags: ['高脂', '高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '奶酥醬油脂高，改全麥吐司夾蛋可省約 100 大卡' } });
  add({ id: 'bk_toast_strawberry', name: '草莓吐司', aliases: ['草莓吐司', '草莓果醬吐司', '草莓醬三明治'], unit: '2 片（約 130g）', kcal: 280, p: 6, c: 50.5, f: 6, sugar: 15, sodium: 300, cook: '', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥吐司可省約 30 大卡，糖量減半更好' } });
  add({ id: 'bk_toast_cheese', name: '起司吐司', aliases: ['起司吐司', '起士吐司', '乳酪吐司'], unit: '2 片（約 130g）', kcal: 310, p: 11, c: 37.3, f: 13, sugar: 3, sodium: 520, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '起司吐司改全麥吐司夾蛋，可省約 50 大卡並提高蛋白質' } });
  add({ id: 'bk_toast_floss_egg', name: '肉鬆蛋吐司', aliases: ['肉鬆蛋吐司', '肉鬆蛋三明治', '肉鬆加蛋吐司'], unit: '1 份（約 170g）', kcal: 350, p: 14, c: 42, f: 14, sugar: 5, sodium: 580, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'bk_toast_egg', tip: '肉鬆蛋改點單純蛋吐司可省約 60 大卡' } });
  add({ id: 'bk_toast_tuna_egg', name: '鮪魚蛋吐司', aliases: ['鮪魚蛋吐司', '鮪魚蛋三明治', '吞拿魚蛋吐司'], unit: '1 份（約 180g）', kcal: 400, p: 17, c: 42.5, f: 18, sugar: 3, sodium: 620, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'bk_toast_egg', tip: '鮪魚含美乃滋，改單純蛋吐司可省約 110 大卡' } });
  add({ id: 'bk_toast_pork_egg', name: '豬排蛋吐司', aliases: ['豬排蛋吐司', '豬排蛋三明治', '炸豬排吐司'], unit: '1 份（約 220g）', kcal: 470, p: 20, c: 50.3, f: 21, sugar: 4, sodium: 760, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'bk_toast_smoked_chicken_egg', tip: '豬排改燻雞可省約 110 大卡' } });
  add({ id: 'bk_toast_smoked_chicken_egg', name: '燻雞蛋吐司', aliases: ['燻雞蛋吐司', '燻雞蛋三明治', '燻雞吐司'], unit: '1 份（約 185g）', kcal: 360, p: 19, c: 44, f: 12, sugar: 4, sodium: 720, cook: '', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'bk_toast_egg', tip: '燻雞鈉高，改單純蛋吐司可省約 70 大卡' } });
  add({ id: 'bk_toast_bacon_egg', name: '培根蛋吐司', aliases: ['培根蛋吐司', '培根蛋三明治', '培根吐司'], unit: '1 份（約 170g）', kcal: 370, p: 15, c: 39.3, f: 17, sugar: 3, sodium: 700, cook: '煎', tags: ['精緻澱粉', '高鈉', '加工肉'],
    swap: { to: 'bk_toast_egg', tip: '培根改單純蛋吐司可省約 80 大卡' } });
  add({ id: 'bk_toast_cheese_egg', name: '起司蛋吐司', aliases: ['起司蛋吐司', '起士蛋吐司', '起司蛋三明治'], unit: '1 份（約 170g）', kcal: 360, p: 15, c: 39, f: 16, sugar: 3, sodium: 640, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'bk_toast_egg', tip: '起司片改蛋吐司可省約 70 大卡' } });
  add({ id: 'bk_toast_club', name: '總匯吐司', aliases: ['總匯三明治', '總匯吐司', '美而美總匯'], unit: '3 層（約 260g）', kcal: 480, p: 20, c: 50.5, f: 22, sugar: 5, sodium: 900, cook: '煎', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'bk_toast_roast_chicken', tip: '總匯有火腿、培根、起司，改烤雞吐司可省約 80 大卡' } });
  add({ id: 'bk_toast_karaage_chicken', name: '卡拉雞腿吐司', aliases: ['卡拉雞腿吐司', '卡拉雞腿三明治', '炸雞腿吐司'], unit: '1 份（約 240g）', kcal: 520, p: 26, c: 50, f: 24, sugar: 4, sodium: 880, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'bk_toast_roast_chicken', tip: '卡拉雞腿改烤雞吐司可省約 120 大卡' } });
  add({ id: 'bk_toast_roast_chicken', name: '烤雞吐司', aliases: ['烤雞吐司', '烤雞腿吐司', '烤雞三明治'], unit: '1 份（約 220g）', kcal: 400, p: 26, c: 51.5, f: 10, sugar: 4, sodium: 780, cook: '烤', tags: ['精緻澱粉'],
    swap: { to: 'bk_toast_roast_chicken_whole', tip: '改全麥吐司並去美乃滋，可再省約 40 大卡' } });
  add({ id: 'bk_toast_roast_chicken_whole', name: '全麥烤雞蛋吐司', aliases: ['全麥烤雞蛋吐司', '全麥雞肉三明治', '全麥烤雞吐司'], unit: '1 份（約 200g）', kcal: 360, p: 24, c: 45.8, f: 9, sugar: 3, sodium: 650, cook: '烤', tags: ['高蛋白', '全穀'],
    swap: { to: 'bk_toast_roast_chicken', tip: '這已是較均衡選擇，醬料減半可再省約 30 大卡' } });
  add({ id: 'bk_toast_french', name: '法式吐司', aliases: ['法式吐司', '法國吐司', '蛋液吐司'], unit: '2 片（約 150g）', kcal: 360, p: 10, c: 44, f: 16, sugar: 12, sodium: 320, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'bk_toast_egg', tip: '法式吐司吸油加糖，改蛋吐司可省約 70 大卡' } });
  add({ id: 'bk_toast_condensed', name: '煉乳吐司', aliases: ['煉乳吐司', '煉乳烤吐司', '煉奶吐司'], unit: '2 片（約 120g）', kcal: 300, p: 6, c: 53.3, f: 7, sugar: 16, sodium: 260, cook: '烤', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥吐司不加煉乳，可省約 100 大卡' } });
  add({ id: 'bk_toast_garlic', name: '蒜香吐司', aliases: ['蒜香吐司', '蒜味吐司', '蒜香奶油吐司'], unit: '1 份（約 80g）', kcal: 250, p: 5, c: 32.8, f: 11, sugar: 1, sodium: 330, cook: '烤', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '奶油蒜味吐司改烤全麥吐司，可省約 100 大卡' } });
  add({ id: 'bk_toast_egg', name: '蛋吐司', aliases: ['蛋吐司', '荷包蛋吐司', '蛋三明治加煎蛋'], unit: '1 份（約 140g）', kcal: 290, p: 11, c: 39, f: 10, sugar: 3, sodium: 450, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥吐司夾蛋，纖維更多' } });
  add({ id: 'bk_toast_ham_cheese', name: '火腿起司吐司', aliases: ['火腿起司吐司', '火腿起士吐司', '火腿起司三明治'], unit: '1 份（約 175g）', kcal: 380, p: 16, c: 43, f: 16, sugar: 3, sodium: 880, cook: '', tags: ['精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'bk_toast_egg', tip: '火腿起司鈉高，改蛋吐司可省約 90 大卡' } });
  // ---- 漢堡 ----
  add({ id: 'bk_burger_beef_egg', name: '牛肉蛋堡', aliases: ['牛肉蛋堡', '牛肉漢堡加蛋', '牛肉堡'], unit: '1 份（約 200g）', kcal: 400, p: 19, c: 40.5, f: 18, sugar: 4, sodium: 720, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'breakfast_burger', tip: '牛肉蛋堡改豬肉蛋堡約差 30 大卡，改烤雞堡更少油' } });
  add({ id: 'bk_burger_roast_chicken', name: '烤雞腿堡', aliases: ['烤雞腿堡', '烤雞堡', '烤雞腿漢堡'], unit: '1 個（約 230g）', kcal: 400, p: 24, c: 46.8, f: 13, sugar: 5, sodium: 820, cook: '烤', tags: ['精緻澱粉'],
    swap: { to: 'breakfast_burger', tip: '已是較佳漢堡選擇，醬料減半可再省約 30 大卡' } });
  add({ id: 'bk_burger_karaage', name: '卡拉雞腿堡', aliases: ['卡拉雞腿堡', '麥味登卡拉雞腿堡', '炸雞腿堡', '美而美卡拉雞腿堡'], unit: '1 個（約 250g）', kcal: 550, p: 24, c: 52.8, f: 27, sugar: 5, sodium: 1050, cook: '炸', tags: ['高脂', '精緻澱粉', '高鈉', '油炸'],
    swap: { to: 'bk_burger_roast_chicken', tip: '卡拉雞腿堡改烤雞腿堡可省約 150 大卡' } });
  add({ id: 'bk_burger_smoked_chicken', name: '燻雞堡', aliases: ['燻雞堡', '燻雞漢堡', '燻雞蛋堡'], unit: '1 個（約 200g）', kcal: 340, p: 17, c: 43.3, f: 11, sugar: 4, sodium: 880, cook: '', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'bk_burger_roast_chicken', tip: '燻雞鈉偏高，改烤雞堡熱量相近但鈉較低' } });
  add({ id: 'bk_burger_tuna', name: '鮪魚堡', aliases: ['鮪魚堡', '鮪魚漢堡', '吞拿魚堡'], unit: '1 個（約 200g）', kcal: 390, p: 15, c: 39.8, f: 19, sugar: 4, sodium: 700, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'bk_burger_roast_chicken', tip: '鮪魚醬含美乃滋，改烤雞堡可多 9g 蛋白質' } });
  add({ id: 'bk_burger_pork_cutlet', name: '豬排堡', aliases: ['豬排堡', '炸豬排漢堡', '豬排蛋堡'], unit: '1 個（約 230g）', kcal: 480, p: 20, c: 50.5, f: 22, sugar: 5, sodium: 850, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'bk_burger_roast_chicken', tip: '豬排改烤雞堡可省約 80 大卡' } });
  add({ id: 'bk_burger_cheese_egg', name: '起司蛋堡', aliases: ['起司蛋堡', '起士蛋堡', '起司漢堡加蛋'], unit: '1 個（約 190g）', kcal: 410, p: 18, c: 41.8, f: 19, sugar: 4, sodium: 780, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'breakfast_burger', tip: '起司蛋堡改豬肉蛋堡可省約 35 大卡' } });
  add({ id: 'bk_burger_egg', name: '蛋堡', aliases: ['蛋堡', '純蛋堡', '荷包蛋堡'], unit: '1 個（約 150g）', kcal: 290, p: 11, c: 36.8, f: 11, sugar: 4, sodium: 480, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'breakfast_burger', tip: '蛋堡已是較輕選擇' } });
  add({ id: 'bk_burger_hashbrown_egg', name: '薯餅蛋堡', aliases: ['薯餅蛋堡', '薯餅漢堡', '薯餅蛋漢堡'], unit: '1 個（約 210g）', kcal: 430, p: 13, c: 49.5, f: 20, sugar: 4, sodium: 650, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'bk_burger_egg', tip: '薯餅蛋堡改蛋堡可省約 140 大卡' } });
  add({ id: 'bk_burger_fish', name: '魚排堡', aliases: ['魚排堡', '炸魚排堡', '鱈魚堡'], unit: '1 個（約 220g）', kcal: 440, p: 17, c: 50.3, f: 19, sugar: 5, sodium: 720, cook: '炸', tags: ['精緻澱粉', '油炸'],
    swap: { to: 'bk_burger_roast_chicken', tip: '魚排油炸，改烤雞堡熱量相近但少油' } });
  add({ id: 'bk_burger_bacon_egg', name: '培根蛋堡', aliases: ['培根蛋堡', '培根漢堡', '培根蛋漢堡'], unit: '1 個（約 200g）', kcal: 420, p: 17, c: 43, f: 20, sugar: 4, sodium: 860, cook: '煎', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'breakfast_burger', tip: '培根改豬肉蛋堡可省約 50 大卡' } });
  add({ id: 'bk_burger_pork', name: '豬肉堡', aliases: ['豬肉堡', '豬肉漢堡', '漢堡肉堡'], unit: '1 個（約 170g）', kcal: 330, p: 13, c: 35.8, f: 15, sugar: 4, sodium: 680, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'bk_burger_egg', tip: '豬肉堡不加蛋是輕選擇' } });
  add({ id: 'bk_burger_double_beef', name: '雙層牛肉堡', aliases: ['雙層牛肉堡', '雙層漢堡', '雙層牛肉蛋堡'], unit: '1 個（約 280g）', kcal: 600, p: 29, c: 49, f: 32, sugar: 6, sodium: 1100, cook: '', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_burger_roast_chicken', tip: '雙層牛肉堡改烤雞腿堡可省約 200 大卡' } });
  // ---- 麵類 ----
  add({ id: 'bk_iron_noodle_mushroom_egg', name: '蘑菇鐵板麵加蛋', aliases: ['蘑菇鐵板麵加蛋', '蘑菇麵加蛋', '蘑菇鐵板麵蛋'], unit: '1 份（約 380g）', kcal: 590, p: 19, c: 74.5, f: 24, sugar: 7, sodium: 1050, cook: '炒', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '醬汁少淋一半並改炒麵加蛋，可省約 70 大卡' } });
  add({ id: 'bk_iron_noodle_pepper_egg', name: '黑胡椒鐵板麵加蛋', aliases: ['黑胡椒鐵板麵加蛋', '黑胡椒麵加蛋', '黑胡椒鐵板麵蛋'], unit: '1 份（約 380g）', kcal: 600, p: 19, c: 74.8, f: 25, sugar: 7, sodium: 1100, cook: '炒', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '黑胡椒醬鈉高，改炒麵加蛋可省約 80 大卡' } });
  add({ id: 'bk_iron_noodle_pepper_beef', name: '黑胡椒牛肉鐵板麵', aliases: ['黑胡椒牛肉鐵板麵', '牛肉鐵板麵', '黑胡椒牛柳麵'], unit: '1 份（約 400g）', kcal: 620, p: 22, c: 74.5, f: 26, sugar: 7, sodium: 1150, cook: '炒', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '牛肉鐵板麵改炒麵加蛋可省約 100 大卡' } });
  add({ id: 'bk_noodle_fried_egg', name: '炒麵加蛋', aliases: ['炒麵加蛋', '蛋炒麵', '早餐店炒麵'], unit: '1 份（約 300g）', kcal: 520, p: 17, c: 68, f: 20, sugar: 4, sodium: 900, cook: '炒', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'bk_pasta_tomato_chicken', tip: '炒麵吸油多，請店家少油或減半麵可省約 130 大卡' } });
  add({ id: 'bk_noodle_instant', name: '炒泡麵', aliases: ['炒泡麵', '泡麵炒麵', '鐵板炒泡麵'], unit: '1 份（約 280g）', kcal: 520, p: 12, c: 70.8, f: 21, sugar: 3, sodium: 1300, cook: '炒', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '泡麵含油與鈉高，改炒麵少油可省約 70 大卡' } });
  add({ id: 'bk_noodle_instant_egg', name: '炒泡麵加蛋', aliases: ['炒泡麵加蛋', '泡麵加蛋', '炒泡麵蛋'], unit: '1 份（約 330g）', kcal: 600, p: 18, c: 71.3, f: 27, sugar: 3, sodium: 1400, cook: '炒', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '改炒麵加蛋少油可省約 80 大卡' } });
  add({ id: 'bk_pasta_cream_bacon', name: '奶油培根義大利麵', aliases: ['奶油培根義大利麵', '白醬義大利麵', '奶油培根麵'], unit: '1 份（約 360g）', kcal: 650, p: 20, c: 81.8, f: 27, sugar: 4, sodium: 1000, cook: '', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'bk_pasta_tomato_chicken', tip: '奶油白醬熱量高，改番茄雞肉醬可省約 150 大卡' } });
  add({ id: 'bk_pasta_tomato_chicken', name: '番茄雞肉義大利麵', aliases: ['番茄雞肉義大利麵', '紅醬義大利麵', '茄汁雞肉麵'], unit: '1 份（約 380g）', kcal: 500, p: 24, c: 74, f: 12, sugar: 8, sodium: 900, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'spaghetti_meat', tip: '番茄紅醬較清爽，是早午餐義大利麵中較佳選擇' } });
  // ---- 點心 ----
  add({ id: 'bk_turnip_egg', name: '蘿蔔糕加蛋', aliases: ['蘿蔔糕加蛋', '菜頭粿加蛋', '蘿蔔糕蛋'], unit: '1 份（約 200g）', kcal: 330, p: 9, c: 42, f: 14, sugar: 1, sodium: 760, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'turnip_cake', tip: '蘿蔔糕加蛋改少油煎並搭配無糖豆漿即可' } });
  add({ id: 'bk_turnip_hk', name: '港式蘿蔔糕', aliases: ['港式蘿蔔糕', '廣式蘿蔔糕', '港式菜頭粿'], unit: '3 片（約 150g）', kcal: 240, p: 5, c: 34.8, f: 9, sugar: 1, sodium: 620, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'turnip_cake', tip: '港式蘿蔔糕含臘味，少油煎可省約 50 大卡' } });
  add({ id: 'bk_hotdog_one', name: '熱狗（單根）', aliases: ['熱狗單根', '一根熱狗', '煎熱狗'], unit: '1 根（約 60g）', kcal: 170, p: 6, c: 5, f: 14, sugar: 1, sodium: 520, cook: '煎', tags: ['高脂', '加工肉'],
    swap: { to: 'boiled_egg', tip: '熱狗改水煮蛋可省約 100 大卡且少加工肉' } });
  add({ id: 'bk_nugget_5', name: '雞塊（5 塊）', aliases: ['早餐店雞塊', '炸雞塊', '雞塊五塊'], unit: '5 塊（約 100g）', kcal: 260, p: 13, c: 18.3, f: 15, sugar: 1, sodium: 520, cook: '炸', tags: ['油炸'],
    swap: { to: 'bk_chicken_leg_roast', tip: '雞塊改烤雞腿排可省約 10 大卡且蛋白質更多' } });
  add({ id: 'bk_fries_small', name: '薯條（小份）', aliases: ['早餐店薯條', '炸薯條', '薯條小份'], unit: '1 份（約 100g）', kcal: 310, p: 4, c: 39.8, f: 15, sugar: 0, sodium: 300, cook: '炸', tags: ['油炸', '精緻澱粉'],
    swap: { to: 'sweet_potato', tip: '薯條改烤地瓜可省約 190 大卡' } });
  add({ id: 'bk_pork_bean', name: '小肉豆', aliases: ['小肉豆', '炸小肉豆', '迷你肉豆'], unit: '1 份（約 100g）', kcal: 300, p: 10, c: 26.8, f: 17, sugar: 1, sodium: 450, cook: '炸', tags: ['高脂', '油炸'],
    swap: { to: 'bk_chicken_leg_roast', tip: '小肉豆油炸，改點烤雞腿排可省約 50 大卡' } });
  add({ id: 'bk_potsticker_6', name: '煎餃（6 顆）', aliases: ['早餐煎餃', '煎餃六顆', '早餐店煎餃'], unit: '6 顆（約 150g）', kcal: 330, p: 12, c: 39, f: 14, sugar: 1, sodium: 520, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'dumpling', tip: '煎餃改水餃（6 顆）可省約 100 大卡' } });
  add({ id: 'bk_chicken_leg_fried', name: '炸雞腿排', aliases: ['炸雞腿排', '酥炸雞腿排', '雞腿排炸'], unit: '1 片（約 150g）', kcal: 380, p: 26, c: 19.5, f: 22, sugar: 1, sodium: 620, cook: '炸', tags: ['高脂', '油炸'],
    swap: { to: 'bk_chicken_leg_roast', tip: '雞腿排改烤的可省約 130 大卡' } });
  add({ id: 'bk_chicken_leg_roast', name: '烤雞腿排', aliases: ['烤雞腿排', '雞腿排', '烤雞腿'], unit: '1 片（約 150g）', kcal: 250, p: 27, c: 1.8, f: 15, sugar: 0, sodium: 500, cook: '烤', tags: ['高蛋白'],
    swap: { to: 'roast_chicken_leg_skinless', tip: '去皮可再省約 50 大卡' } });
  add({ id: 'bk_grab_cake_plain', name: '抓餅（原味）', aliases: ['抓餅', '手抓餅', '原味抓餅'], unit: '1 份（約 140g）', kcal: 340, p: 6, c: 47.5, f: 14, sugar: 1, sodium: 350, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '抓餅用油多，改原味蛋餅可省約 85 大卡' } });
  add({ id: 'bk_grab_cake_egg', name: '抓餅加蛋', aliases: ['抓餅加蛋', '手抓餅加蛋', '蛋抓餅'], unit: '1 份（約 190g）', kcal: 400, p: 12, c: 43, f: 20, sugar: 1, sodium: 450, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '抓餅加蛋改原味蛋餅可省約 145 大卡' } });
  add({ id: 'bk_grab_cake_cheese', name: '抓餅加起司', aliases: ['抓餅加起司', '起司抓餅', '起士抓餅'], unit: '1 份（約 165g）', kcal: 400, p: 11, c: 44, f: 20, sugar: 1, sodium: 520, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '起司抓餅改原味蛋餅可省約 145 大卡' } });
  add({ id: 'bk_grab_cake_ham', name: '抓餅加火腿', aliases: ['抓餅加火腿', '火腿抓餅', '火腿蛋抓餅'], unit: '1 份（約 200g）', kcal: 420, p: 14, c: 43.8, f: 21, sugar: 1, sodium: 780, cook: '煎', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'egg_pancake', tip: '火腿抓餅改原味蛋餅可省約 165 大卡' } });
  add({ id: 'bk_scallion_pancake_egg', name: '蔥油餅加蛋', aliases: ['蔥油餅加蛋', '蔥抓餅加蛋', '蛋蔥油餅'], unit: '1 份（約 170g）', kcal: 390, p: 10, c: 44.8, f: 19, sugar: 1, sodium: 520, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '蔥油餅用油多，改原味蛋餅可省約 135 大卡' } });
  add({ id: 'bk_thick_choco', name: '厚片（巧克力）', aliases: ['巧克力厚片', '厚片巧克力', '厚片吐司巧克力'], unit: '1 片（約 150g）', kcal: 420, p: 7, c: 66.5, f: 14, sugar: 24, sodium: 380, cook: '', tags: ['高脂', '高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '厚片醬料厚，改全麥薄片吐司可省約 180 大卡' } });
  add({ id: 'bk_thick_strawberry', name: '厚片（草莓）', aliases: ['草莓厚片', '厚片草莓', '厚片吐司草莓'], unit: '1 片（約 150g）', kcal: 340, p: 6, c: 61, f: 8, sugar: 22, sodium: 360, cook: '', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥薄片吐司可省約 100 大卡' } });
  add({ id: 'bk_thick_cheese', name: '厚片（起司）', aliases: ['起司厚片', '起士厚片', '厚片起司'], unit: '1 片（約 150g）', kcal: 400, p: 12, c: 52, f: 16, sugar: 4, sodium: 600, cook: '', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '厚片起司改全麥吐司夾蛋可省約 120 大卡' } });
  add({ id: 'bk_thick_floss', name: '厚片（肉鬆）', aliases: ['肉鬆厚片', '厚片肉鬆', '肉鬆厚片吐司'], unit: '1 片（約 150g）', kcal: 380, p: 9, c: 54.5, f: 14, sugar: 8, sodium: 520, cook: '', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '肉鬆厚片改全麥吐司可省約 140 大卡' } });
  add({ id: 'bk_thick_garlic', name: '厚片（蒜香）', aliases: ['蒜香厚片', '蒜味厚片', '厚片蒜香'], unit: '1 片（約 130g）', kcal: 370, p: 7, c: 49.5, f: 16, sugar: 1, sodium: 480, cook: '烤', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '蒜香奶油厚片改烤全麥吐司可省約 170 大卡' } });
  add({ id: 'bk_steamed_bun_egg', name: '饅頭夾蛋', aliases: ['饅頭夾蛋', '饅頭加蛋', '夾蛋饅頭'], unit: '1 份（約 150g）', kcal: 310, p: 12, c: 45.3, f: 9, sugar: 3, sodium: 420, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '饅頭夾蛋已偏清爽，改全麥饅頭更好' } });
  add({ id: 'bk_fried_platter', name: '炸物拼盤', aliases: ['炸物拼盤', '炸物', '綜合炸物'], unit: '1 份（約 200g）', kcal: 600, p: 18, c: 51, f: 36, sugar: 1, sodium: 900, cook: '炸', tags: ['高脂', '油炸'],
    swap: { to: 'bk_chicken_leg_roast', tip: '炸物拼盤分給二人或改點烤雞腿排可省約 350 大卡' } });
  add({ id: 'bk_salad_veg', name: '蔬菜沙拉', aliases: ['早餐店沙拉', '生菜沙拉', '蔬菜沙拉'], unit: '1 份（約 150g）', kcal: 90, p: 2, c: 7, f: 6, sugar: 4, sodium: 180, cook: '', tags: ['低卡', '高纖'],
    swap: { to: 'salad_plain', tip: '淋醬改用一半或和風醬可省約 40 大卡' } });
  add({ id: 'bk_onion_rings', name: '洋蔥圈', aliases: ['洋蔥圈', '炸洋蔥圈', '洋蔥圈炸物'], unit: '1 份（約 100g）', kcal: 300, p: 4, c: 35, f: 16, sugar: 3, sodium: 420, cook: '炸', tags: ['油炸', '精緻澱粉'],
    swap: { to: 'cherry_tomato', tip: '洋蔥圈改點小番茄可省約 270 大卡' } });
  add({ id: 'bk_corn_soup_cup', name: '玉米濃湯（早餐店）', aliases: ['玉米濃湯', '早餐玉米湯', '濃湯'], unit: '1 杯（約 250ml）', kcal: 130, p: 3, c: 18.3, f: 5, sugar: 6, sodium: 520, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'egg_drop_soup', tip: '濃湯改蛋花湯可省約 60 大卡' } });
  add({ id: 'bk_egg_ham_fried', name: '煎蛋＋火腿', aliases: ['煎蛋火腿', '火腿煎蛋', '荷包蛋加火腿'], unit: '1 份（約 120g）', kcal: 210, p: 13, c: 3.5, f: 16, sugar: 0, sodium: 580, cook: '煎', tags: ['加工肉', '高鈉'],
    swap: { to: 'tea_egg', tip: '火腿煎蛋改茶葉蛋可省約 135 大卡' } });
  // ---- 中式 ----
  add({ id: 'bk_shaobing_egg', name: '燒餅夾蛋', aliases: ['燒餅夾蛋', '燒餅加蛋', '燒餅蛋'], unit: '1 份（約 130g）', kcal: 330, p: 11, c: 40, f: 14, sugar: 1, sodium: 520, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'shaobing', tip: '燒餅夾蛋加無糖豆漿即可，勿再加油條' } });
  add({ id: 'bk_shaobing_meat', name: '燒餅夾肉', aliases: ['燒餅夾肉', '燒餅夾滷肉', '燒餅夾燒肉'], unit: '1 份（約 150g）', kcal: 390, p: 14, c: 43, f: 18, sugar: 1, sodium: 620, cook: '', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'bk_shaobing_egg', tip: '改燒餅夾蛋可省約 60 大卡' } });
  add({ id: 'bk_scallion_shaobing', name: '蔥燒餅', aliases: ['蔥燒餅', '蔥油燒餅', '蔥花燒餅'], unit: '1 個（約 90g）', kcal: 270, p: 6, c: 41.3, f: 9, sugar: 1, sodium: 380, cook: '烤', tags: ['精緻澱粉'],
    swap: { to: 'shaobing', tip: '蔥燒餅改一般燒餅可省約 20 大卡' } });
  add({ id: 'bk_ricerball_purple', name: '紫米飯糰', aliases: ['紫米飯糰', '紫米飯團', '黑米飯糰'], unit: '1 個（約 230g）', kcal: 430, p: 9, c: 71.5, f: 12, sugar: 3, sodium: 580, cook: '', tags: ['精緻澱粉', '高纖'],
    swap: { to: 'rice_ball_traditional', tip: '紫米飯糰纖維較多，油條改素鬆可省約 60 大卡' } });
  add({ id: 'bk_ricerball_veg', name: '素飯糰', aliases: ['素飯糰', '素食飯糰', '蘿蔔乾飯糰'], unit: '1 個（約 200g）', kcal: 360, p: 6, c: 68.3, f: 7, sugar: 1, sodium: 520, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'rice_ball_traditional', tip: '飯糰米飯改半量可省約 100 大卡' } });
  add({ id: 'bk_ricerball_egg', name: '鹹飯糰加蛋', aliases: ['鹹飯糰加蛋', '飯糰加蛋', '鹹飯糰蛋'], unit: '1 個（約 250g）', kcal: 450, p: 13, c: 68, f: 14, sugar: 1, sodium: 700, cook: '', tags: ['精緻澱粉', '高脂'],
    swap: { to: 'rice_ball_traditional', tip: '不加油條可省約 100 大卡' } });
  add({ id: 'bk_soy_salty', name: '鹹豆漿', aliases: ['鹹豆漿', '豆漿店鹹豆漿', '鹹豆花漿'], unit: '1 碗（約 450ml）', kcal: 150, p: 9, c: 12.8, f: 7, sugar: 1, sodium: 800, cook: '', tags: ['高鈉'],
    swap: { to: 'soy_milk_plain', tip: '鹹豆漿鈉偏高，少喝湯可降低鈉攝取' } });
  add({ id: 'bk_soy_sweet_m', name: '甜豆漿（中杯）', aliases: ['甜豆漿中杯', '甜豆漿', '加糖豆漿'], unit: '中杯 500ml', kcal: 190, p: 10, c: 26.3, f: 5, sugar: 22, sodium: 20, cook: '', tags: ['高糖', '含糖飲料'],
    swap: { to: 'bk_soy_plain_m', tip: '甜豆漿改無糖豆漿可省約 90 大卡' } });
  add({ id: 'bk_soy_sweet_l', name: '甜豆漿（大杯）', aliases: ['甜豆漿大杯', '大杯甜豆漿', '大杯豆漿加糖'], unit: '大杯 700ml', kcal: 265, p: 14, c: 36.5, f: 7, sugar: 31, sodium: 30, cook: '', tags: ['高糖', '含糖飲料'],
    swap: { to: 'bk_soy_plain_l', tip: '甜豆漿改無糖豆漿可省約 125 大卡' } });
  add({ id: 'bk_soy_plain_m', name: '無糖豆漿（中杯）', aliases: ['無糖豆漿中杯', '無糖豆漿', '豆漿無糖'], unit: '中杯 500ml', kcal: 100, p: 9, c: 4.8, f: 5, sugar: 2, sodium: 20, cook: '', tags: ['高蛋白'],
    swap: { to: 'soy_milk_plain', tip: '早餐搭無糖豆漿是好選擇' } });
  add({ id: 'bk_soy_plain_l', name: '無糖豆漿（大杯）', aliases: ['無糖豆漿大杯', '大杯無糖豆漿', '大杯豆漿無糖'], unit: '大杯 700ml', kcal: 140, p: 13, c: 6.3, f: 7, sugar: 3, sodium: 30, cook: '', tags: ['高蛋白'],
    swap: { to: 'soy_milk_plain', tip: '大杯適合運動日蛋白質補充' } });
  add({ id: 'bk_steam_fry_pork', name: '水煎包（豬肉）', aliases: ['水煎包', '豬肉水煎包', '鮮肉水煎包'], unit: '1 個（約 100g）', kcal: 230, p: 8, c: 27, f: 10, sugar: 1, sodium: 380, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'meat_bun', tip: '水煎包改蒸肉包可省約 40 大卡' } });
  add({ id: 'bk_steam_fry_cabbage', name: '生煎包（高麗菜）', aliases: ['生煎包', '高麗菜水煎包', '菜肉生煎包'], unit: '1 個（約 100g）', kcal: 200, p: 5, c: 27, f: 8, sugar: 2, sodium: 340, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'veg_bun', tip: '改蒸菜包可省約 40 大卡' } });
  add({ id: 'bk_chive_pocket', name: '韭菜盒', aliases: ['韭菜盒', '韭菜盒子', '韭菜餡餅'], unit: '1 個（約 120g）', kcal: 260, p: 8, c: 30, f: 12, sugar: 1, sodium: 450, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'veg_bun', tip: '韭菜盒改蒸菜包可省約 90 大卡' } });
  add({ id: 'bk_pie_pork', name: '豬肉餡餅', aliases: ['豬肉餡餅', '餡餅', '肉餡餅'], unit: '1 個（約 120g）', kcal: 320, p: 11, c: 30.8, f: 17, sugar: 1, sodium: 550, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'meat_bun', tip: '餡餅改蒸肉包可省約 80 大卡' } });
  add({ id: 'bk_pie_beef', name: '牛肉餡餅', aliases: ['牛肉餡餅', '牛肉餅', '牛肉餡餅捲'], unit: '1 個（約 130g）', kcal: 340, p: 13, c: 31.5, f: 18, sugar: 1, sodium: 580, cook: '煎', tags: ['高脂', '精緻澱粉'],
    swap: { to: 'meat_bun', tip: '牛肉餡餅改蒸肉包可省約 100 大卡' } });
  add({ id: 'bk_pie_radish', name: '蘿蔔絲餅', aliases: ['蘿蔔絲餅', '蘿蔔酥餅', '蘿蔔絲酥餅'], unit: '1 個（約 110g）', kcal: 250, p: 5, c: 35, f: 10, sugar: 1, sodium: 420, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'veg_bun', tip: '蘿蔔絲餅改蒸菜包可省約 40 大卡' } });
  add({ id: 'bk_mantou_brown_sugar', name: '黑糖饅頭', aliases: ['黑糖饅頭', '黑糖包', '紅糖饅頭'], unit: '1 個（約 90g）', kcal: 230, p: 6, c: 49.3, f: 1, sugar: 10, sodium: 120, cook: '蒸', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'bk_mantou_whole', tip: '黑糖饅頭改全麥饅頭可省約 30 大卡' } });
  add({ id: 'bk_mantou_whole', name: '全麥饅頭', aliases: ['全麥饅頭', '全麥包子', '全麥蒸饅頭'], unit: '1 個（約 90g）', kcal: 200, p: 7, c: 39.6, f: 1.5, sugar: 2, sodium: 140, cook: '蒸', tags: ['全穀'],
    swap: { to: 'mantou', tip: '已是較佳主食選擇' } });
  add({ id: 'bk_bun_char_siu', name: '早餐店叉燒包', aliases: ['叉燒包', '港式叉燒包', '蒸叉燒包'], unit: '1 個（約 80g）', kcal: 210, p: 7, c: 29.8, f: 7, sugar: 7, sodium: 360, cook: '蒸', tags: ['精緻澱粉'],
    swap: { to: 'veg_bun', tip: '叉燒包改菜包可省約 30 大卡' } });
  add({ id: 'bk_bun_red_bean', name: '豆沙包', aliases: ['豆沙包', '紅豆包', '紅豆沙包'], unit: '1 個（約 80g）', kcal: 220, p: 5, c: 43.3, f: 3, sugar: 12, sodium: 110, cook: '蒸', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'veg_bun', tip: '豆沙包糖量高，改菜包可省約 20 大卡' } });
  add({ id: 'bk_shumai_4', name: '燒賣（4 顆）', aliases: ['燒賣', '燒麥', '蒸燒賣'], unit: '4 顆（約 100g）', kcal: 220, p: 9, c: 25.8, f: 9, sugar: 2, sodium: 420, cook: '蒸', tags: ['精緻澱粉'],
    swap: { to: 'xiaolongbao', tip: '燒賣改小籠包可省約 30 大卡' } });
  add({ id: 'bk_congee_pork_egg', name: '早餐店皮蛋瘦肉粥', aliases: ['皮蛋瘦肉粥', '瘦肉粥', '皮蛋粥'], unit: '1 碗（約 350g）', kcal: 200, p: 9, c: 29.8, f: 5, sugar: 0, sodium: 720, cook: '', tags: ['高鈉'],
    swap: { to: 'plain_congee', tip: '少喝湯，鈉可降低' } });
  add({ id: 'bk_congee_sweet_potato', name: '地瓜稀飯', aliases: ['地瓜稀飯', '地瓜粥', '地瓜稀飯一碗'], unit: '1 碗（約 300g）', kcal: 150, p: 3, c: 33.4, f: 0.5, sugar: 3, sodium: 20, cook: '', tags: ['高纖'],
    swap: { to: 'plain_congee', tip: '地瓜稀飯搭蛋與豆腐，營養更完整' } });
  add({ id: 'bk_youtiao_ricerball', name: '油條飯糰', aliases: ['油條飯糰', '飯糰加油條', '飯糰油條'], unit: '1 個（約 220g）', kcal: 480, p: 10, c: 76.3, f: 15, sugar: 2, sodium: 640, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'bk_ricerball_veg', tip: '飯糰改不加油條可省約 120 大卡' } });
  add({ id: 'bk_scallion_egg_pie', name: '蔥蛋餅', aliases: ['蔥蛋餅', '煎蛋餅', '蔥花蛋餅'], unit: '1 份（約 150g）', kcal: 290, p: 11, c: 34.5, f: 12, sugar: 1, sodium: 450, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'egg_pancake', tip: '蔥蛋餅改原味蛋餅可省約 35 大卡' } });
  // ---- 飲料 ----
  add({ id: 'bk_bt_black_m', name: '紅茶（中杯）', aliases: ['紅茶中杯', '早餐店紅茶', '古早味紅茶'], cat: '飲料', unit: '中杯 500ml', kcal: 140, p: 0, c: 35, f: 0, sugar: 35, sodium: 10, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖茶可省約 140 大卡' } });
  add({ id: 'bk_bt_black_l', name: '紅茶（大杯）', aliases: ['紅茶大杯', '大杯紅茶', '大冰紅'], cat: '飲料', unit: '大杯 700ml', kcal: 195, p: 0, c: 48.8, f: 0, sugar: 48, sodium: 15, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖茶可省約 195 大卡' } });
  add({ id: 'bk_milk_tea_l', name: '奶茶（大杯）', aliases: ['奶茶大杯', '大杯奶茶', '大冰奶'], cat: '飲料', unit: '大杯 700ml', kcal: 340, p: 3, c: 64, f: 8, sugar: 50, sodium: 120, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'soy_milk_plain', tip: '大杯奶茶改無糖豆漿可省約 200 大卡' } });
  add({ id: 'bk_milk_tea_m_less', name: '奶茶（少糖）', aliases: ['奶茶少糖', '少糖奶茶', '微糖奶茶'], cat: '飲料', unit: '中杯 500ml', kcal: 190, p: 2, c: 32, f: 6, sugar: 26, sodium: 90, cook: '', tags: ['含糖飲料'],
    swap: { to: 'bk_soy_plain_m', tip: '少糖奶茶改無糖豆漿可省約 90 大卡' } });
  add({ id: 'bk_milk_tea_real', name: '鮮奶茶', aliases: ['鮮奶茶', '鮮奶紅茶', '紅茶拿鐵'], cat: '飲料', unit: '中杯 500ml', kcal: 180, p: 7, c: 22.3, f: 7, sugar: 14, sodium: 100, cook: '', tags: ['含糖飲料'],
    swap: { to: 'bk_milk_tea_m_less', tip: '鮮奶茶比奶精茶好，微糖更佳' } });
  add({ id: 'bk_soy_black_tea', name: '豆漿紅茶', aliases: ['豆漿紅茶', '豆漿奶茶', '豆奶茶'], cat: '飲料', unit: '中杯 500ml', kcal: 150, p: 6, c: 24.8, f: 3, sugar: 20, sodium: 20, cook: '', tags: ['含糖飲料'],
    swap: { to: 'bk_soy_plain_m', tip: '豆漿紅茶改無糖豆漿可省約 50 大卡' } });
  add({ id: 'bk_rice_milk_m', name: '米漿（中杯）', aliases: ['米漿', '中杯米漿', '花生米漿'], cat: '飲料', unit: '中杯 500ml', kcal: 250, p: 7, c: 39.8, f: 7, sugar: 12, sodium: 50, cook: '', tags: ['含糖飲料'],
    swap: { to: 'bk_soy_plain_m', tip: '米漿熱量高，改無糖豆漿可省約 150 大卡' } });
  add({ id: 'bk_rice_milk_l', name: '米漿（大杯）', aliases: ['大杯米漿', '米漿大杯', '大杯花生米漿'], cat: '飲料', unit: '大杯 700ml', kcal: 340, p: 9, c: 53.5, f: 10, sugar: 16, sodium: 70, cook: '', tags: ['含糖飲料'],
    swap: { to: 'bk_soy_plain_l', tip: '改無糖豆漿可省約 200 大卡' } });
  add({ id: 'bk_americano_m', name: '早餐店美式咖啡（中杯）', aliases: ['美式咖啡中杯', '黑咖啡', '早餐店美式'], cat: '飲料', unit: '中杯 500ml', kcal: 10, p: 0.5, c: 2, f: 0, sugar: 0, sodium: 10, cook: '', tags: ['低卡'],
    swap: { to: 'americano', tip: '無糖黑咖啡是好選擇' } });
  add({ id: 'bk_latte_m', name: '早餐店拿鐵（中杯）', aliases: ['拿鐵中杯', '咖啡拿鐵', '鮮奶拿鐵'], cat: '飲料', unit: '中杯 450ml', kcal: 170, p: 9, c: 15.5, f: 8, sugar: 13, sodium: 110, cook: '', tags: [],
    swap: { to: 'bk_americano_m', tip: '拿鐵改美式可省約 160 大卡' } });
  add({ id: 'bk_latte_l', name: '早餐店拿鐵（大杯）', aliases: ['拿鐵大杯', '大杯拿鐵', '大杯咖啡拿鐵'], cat: '飲料', unit: '大杯 600ml', kcal: 230, p: 12, c: 20.8, f: 11, sugar: 17, sodium: 150, cook: '', tags: [],
    swap: { to: 'bk_americano_m', tip: '拿鐵改美式可省約 220 大卡' } });
  add({ id: 'bk_orange_juice_m', name: '柳橙汁（早餐店）', aliases: ['柳橙汁中杯', '鮮橙汁', '早餐店柳橙汁'], cat: '飲料', unit: '中杯 500ml', kcal: 220, p: 2, c: 51.9, f: 0.5, sugar: 44, sodium: 10, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'orange_juice', tip: '柳橙汁含糖高，改整顆柳丁可省約 150 大卡' } });
  add({ id: 'bk_ovaltine', name: '阿華田', aliases: ['阿華田', '麥芽牛奶', '阿華田熱飲'], cat: '飲料', unit: '中杯 500ml', kcal: 280, p: 8, c: 46.3, f: 7, sugar: 38, sodium: 140, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'milk_low', tip: '阿華田改低脂鮮奶可省約 120 大卡' } });
  add({ id: 'bk_cocoa', name: '可可', aliases: ['可可', '熱可可', '冰可可'], cat: '飲料', unit: '中杯 500ml', kcal: 300, p: 7, c: 50, f: 8, sugar: 43, sodium: 130, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'milk_low', tip: '可可改低脂鮮奶可省約 140 大卡' } });
  add({ id: 'bk_winter_melon_m', name: '冬瓜茶（中杯）', aliases: ['冬瓜茶中杯', '冬瓜茶', '冬瓜露'], cat: '飲料', unit: '中杯 500ml', kcal: 180, p: 0, c: 45, f: 0, sugar: 44, sodium: 15, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖茶可省約 180 大卡' } });
  add({ id: 'bk_green_tea_m', name: '綠茶（中杯）', aliases: ['綠茶中杯', '早餐店綠茶', '甜綠茶'], cat: '飲料', unit: '中杯 500ml', kcal: 150, p: 0, c: 37.5, f: 0, sugar: 37, sodium: 10, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖綠茶可省約 150 大卡' } });
  add({ id: 'bk_milk_bottle', name: '鮮奶（早餐店）', aliases: ['早餐店鮮奶', '冰鮮奶', '鮮奶一瓶'], cat: '飲料', unit: '1 瓶 450ml', kcal: 280, p: 15, c: 21.3, f: 15, sugar: 21, sodium: 180, cook: '', tags: ['高脂'],
    swap: { to: 'milk_low', tip: '改低脂鮮奶可省約 70 大卡' } });
  add({ id: 'bk_lemon_tea', name: '早餐店檸檬紅茶', aliases: ['檸檬紅茶', '檸檬茶', '冰檸檬紅茶'], cat: '飲料', unit: '中杯 500ml', kcal: 190, p: 0, c: 47.5, f: 0, sugar: 47, sodium: 20, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖茶加檸檬片可省約 190 大卡' } });
  add({ id: 'bk_honey_tea', name: '蜂蜜紅茶', aliases: ['蜂蜜紅茶', '蜂蜜茶', '蜂蜜檸檬茶'], cat: '飲料', unit: '中杯 500ml', kcal: 170, p: 0, c: 42.5, f: 0, sugar: 42, sodium: 15, cook: '', tags: ['含糖飲料', '高糖'],
    swap: { to: 'unsweetened_tea', tip: '改無糖茶可省約 170 大卡' } });
  // ---- 早午餐 ----
  add({ id: 'bk_omelet_cheese', name: '起司歐姆蛋', aliases: ['歐姆蛋', '起司歐姆蛋', '歐姆蛋起司'], unit: '1 份（約 200g）', kcal: 340, p: 22, c: 4.5, f: 26, sugar: 2, sodium: 520, cook: '煎', tags: ['高脂', '高蛋白'],
    swap: { to: 'bk_scrambled_plate', tip: '歐姆蛋少油煎可省約 60 大卡' } });
  add({ id: 'bk_omelet_mushroom', name: '蘑菇歐姆蛋', aliases: ['蘑菇歐姆蛋', '菇菇歐姆蛋', '蘑菇蛋捲'], unit: '1 份（約 210g）', kcal: 290, p: 19, c: 6.3, f: 21, sugar: 2, sodium: 480, cook: '煎', tags: ['高脂', '高蛋白'],
    swap: { to: 'bk_scrambled_plate', tip: '蘑菇歐姆蛋少油煎，是不錯的蛋白質選擇' } });
  add({ id: 'bk_eggs_benedict', name: '班尼迪克蛋', aliases: ['班尼迪克蛋', '班尼迪克', '荷蘭醬蛋'], unit: '1 份（約 250g）', kcal: 480, p: 22, c: 35, f: 28, sugar: 3, sodium: 900, cook: '煎', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_omelet_mushroom', tip: '荷蘭醬油脂高，改歐姆蛋可省約 190 大卡' } });
  add({ id: 'bk_pancake_plain', name: '鬆餅（原味）', aliases: ['鬆餅', '原味鬆餅', '厚鬆餅'], unit: '3 片（約 180g）', kcal: 420, p: 9, c: 64.5, f: 14, sugar: 12, sodium: 480, cook: '煎', tags: ['高糖', '精緻澱粉'],
    swap: { to: 'bk_toast_egg', tip: '鬆餅配奶油、糖漿，改蛋吐司可省約 130 大卡' } });
  add({ id: 'bk_pancake_maple', name: '鬆餅（楓糖奶油）', aliases: ['楓糖鬆餅', '鬆餅加楓糖', '楓糖奶油鬆餅'], unit: '3 片（約 230g）', kcal: 580, p: 9, c: 97.8, f: 17, sugar: 32, sodium: 500, cook: '煎', tags: ['高脂', '高糖', '精緻澱粉'],
    swap: { to: 'bk_pancake_plain', tip: '楓糖減半可省約 100 大卡' } });
  add({ id: 'bk_pancake_icecream', name: '鬆餅（加冰淇淋）', aliases: ['鬆餅加冰淇淋', '冰淇淋鬆餅', '鬆餅冰淇淋'], unit: '3 片＋冰淇淋（約 300g）', kcal: 730, p: 11, c: 110.8, f: 27, sugar: 45, sodium: 520, cook: '煎', tags: ['高脂', '高糖', '精緻澱粉'],
    swap: { to: 'bk_pancake_plain', tip: '不加冰淇淋可省約 310 大卡' } });
  add({ id: 'bk_brunch_plate', name: '早午餐盤', aliases: ['早午餐盤', '美式早午餐', '早午餐拼盤'], unit: '1 份（約 450g）', kcal: 720, p: 28, c: 57.5, f: 42, sugar: 7, sodium: 1300, cook: '煎', tags: ['高脂', '加工肉', '高鈉', '精緻澱粉'],
    swap: { to: 'bk_scrambled_plate', tip: '薯餅與香腸改水果可省約 160 大卡' } });
  add({ id: 'bk_panini_chicken', name: '雞肉帕尼尼', aliases: ['帕尼尼', '雞肉帕尼尼', '起司帕尼尼'], unit: '1 份（約 230g）', kcal: 450, p: 25, c: 49.3, f: 17, sugar: 4, sodium: 860, cook: '烤', tags: ['精緻澱粉', '高鈉'],
    swap: { to: 'bk_toast_roast_chicken', tip: '雞肉帕尼尼是均衡選擇，起司減半可省約 50 大卡' } });
  add({ id: 'bk_french_toast_brunch', name: '法式吐司早午餐', aliases: ['法式吐司早午餐', '法式吐司套餐', '法式吐司培根蛋'], unit: '1 份（約 300g）', kcal: 620, p: 20, c: 63, f: 32, sugar: 20, sodium: 880, cook: '煎', tags: ['高脂', '高糖', '精緻澱粉', '加工肉'],
    swap: { to: 'bk_toast_french', tip: '不加培根，改蛋與水果可省約 200 大卡' } });
  add({ id: 'bk_caesar_salad', name: '早餐店凱薩沙拉', aliases: ['凱薩沙拉', '雞肉凱薩沙拉', '凱撒沙拉'], unit: '1 份（約 250g）', kcal: 380, p: 24, c: 17, f: 24, sugar: 5, sodium: 820, cook: '', tags: ['高脂', '高蛋白'],
    swap: { to: 'bk_salad_veg', tip: '凱薩醬減半可省約 80 大卡' } });
  add({ id: 'bk_scrambled_plate', name: '炒蛋培根香腸盤', aliases: ['炒蛋培根香腸', '炒蛋盤', '美式炒蛋盤'], unit: '1 份（約 300g）', kcal: 560, p: 29, c: 16.5, f: 42, sugar: 2, sodium: 1100, cook: '炒', tags: ['高脂', '加工肉', '高鈉', '高蛋白'],
    swap: { to: 'boiled_egg', tip: '培根香腸改水煮蛋可省約 200 大卡' } });
  add({ id: 'bk_avocado_egg_toast', name: '酪梨蛋吐司', aliases: ['酪梨蛋吐司', '酪梨吐司', '酪梨荷包蛋吐司'], unit: '1 份（約 220g）', kcal: 380, p: 14, c: 33.8, f: 21, sugar: 2, sodium: 420, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '酪梨脂肪屬好油，改全麥吐司更佳' } });
  add({ id: 'bk_yogurt_granola', name: '優格水果穀麥杯', aliases: ['優格穀麥杯', '穀麥優格', '優格水果杯'], unit: '1 杯（約 250g）', kcal: 280, p: 9, c: 43, f: 8, sugar: 22, sodium: 90, cook: '', tags: ['高糖'],
    swap: { to: 'yogurt_plain', tip: '穀麥減半可省約 60 大卡' } });
  // ---- 其他口味 ----
  add({ id: 'bk_egg_pancake_bacon_cheese', name: '培根起司蛋餅', aliases: ['培根起司蛋餅', '培根起士蛋餅', '起司培根蛋餅'], unit: '1 份（約 200g）', kcal: 390, p: 15, c: 35.3, f: 21, sugar: 2, sodium: 820, cook: '煎', tags: ['高脂', '精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'bacon_egg_pancake', tip: '培根起司雙重加料，改培根蛋餅可省約 55 大卡' } });
  add({ id: 'bk_egg_pancake_youtiao', name: '油條蛋餅', aliases: ['油條蛋餅', '蛋餅夾油條', '油條加蛋餅'], unit: '1 份（約 220g）', kcal: 430, p: 11, c: 47, f: 22, sugar: 1, sodium: 620, cook: '炸', tags: ['高脂', '精緻澱粉', '油炸'],
    swap: { to: 'egg_pancake', tip: '油條蛋餅改原味蛋餅可省約 175 大卡' } });
  add({ id: 'bk_toast_veg_egg', name: '蔬菜蛋吐司', aliases: ['蔬菜蛋吐司', '生菜蛋吐司', '青菜蛋三明治'], unit: '1 份（約 160g）', kcal: 300, p: 12, c: 40.5, f: 10, sugar: 4, sodium: 480, cook: '煎', tags: ['精緻澱粉'],
    swap: { to: 'whole_wheat_bread', tip: '改全麥吐司，纖維更多' } });
  add({ id: 'bk_burger_chicken_cutlet', name: '雞排堡', aliases: ['雞排堡', '炸雞排堡', '大雞排漢堡'], unit: '1 個（約 250g）', kcal: 560, p: 25, c: 54.3, f: 27, sugar: 5, sodium: 1000, cook: '炸', tags: ['高脂', '精緻澱粉', '高鈉', '油炸'],
    swap: { to: 'bk_burger_roast_chicken', tip: '雞排堡改烤雞腿堡可省約 160 大卡' } });
  add({ id: 'bk_burger_teriyaki', name: '照燒雞腿堡', aliases: ['照燒雞腿堡', '照燒雞堡', '照燒雞腿漢堡'], unit: '1 個（約 240g）', kcal: 430, p: 24, c: 52, f: 14, sugar: 9, sodium: 900, cook: '烤', tags: ['精緻澱粉'],
    swap: { to: 'bk_burger_roast_chicken', tip: '照燒醬含糖，改烤雞腿堡可省約 30 大卡' } });
  add({ id: 'bk_iron_noodle_plain', name: '蘑菇鐵板麵（不加蛋）', aliases: ['蘑菇鐵板麵', '蘑菇麵', '鐵板蘑菇麵'], unit: '1 份（約 340g）', kcal: 520, p: 14, c: 68.8, f: 21, sugar: 6, sodium: 980, cook: '炒', tags: ['高脂', '精緻澱粉', '高鈉'],
    swap: { to: 'bk_noodle_fried_egg', tip: '醬汁少淋一半可省約 70 大卡' } });
  add({ id: 'bk_sausage_two', name: '香腸（2 條）', aliases: ['早餐店香腸', '煎香腸', '小香腸兩條'], unit: '2 條（約 100g）', kcal: 330, p: 12, c: 7.5, f: 28, sugar: 2, sodium: 780, cook: '煎', tags: ['高脂', '加工肉', '高鈉'],
    swap: { to: 'boiled_egg', tip: '香腸改水煮蛋可省約 250 大卡且少加工肉' } });
  add({ id: 'bk_mantou_milk', name: '鮮奶饅頭', aliases: ['鮮奶饅頭', '牛奶饅頭', '奶香饅頭'], unit: '1 個（約 90g）', kcal: 220, p: 6, c: 45.6, f: 1.5, sugar: 8, sodium: 130, cook: '蒸', tags: ['精緻澱粉'],
    swap: { to: 'bk_mantou_whole', tip: '鮮奶饅頭改全麥饅頭可省約 20 大卡' } });
  add({ id: 'bk_fruit_cup', name: '水果盤', aliases: ['早餐水果盤', '水果杯', '切盤水果'], unit: '1 份（約 150g）', kcal: 80, p: 1, c: 18.3, f: 0.3, sugar: 16, sodium: 5, cook: '', tags: ['低卡', '高纖'],
    swap: { to: 'apple', tip: '水果盤是好選擇，加無糖豆漿更完整' } });
  add({ id: 'bk_oat_milk_cup', name: '燕麥鮮奶杯', aliases: ['燕麥鮮奶', '燕麥牛奶杯', '燕麥飲'], unit: '1 杯（約 300ml）', kcal: 220, p: 9, c: 32.5, f: 6, sugar: 12, sodium: 90, cook: '', tags: ['全穀'],
    swap: { to: 'oatmeal', tip: '改無糖燕麥加低脂奶可省約 40 大卡' } });
  add({ id: 'bk_ricerball_tuna', name: '鮪魚飯糰', aliases: ['鮪魚飯糰', '鮪魚飯團', '吞拿魚飯糰'], unit: '1 個（約 220g）', kcal: 400, p: 13, c: 60, f: 12, sugar: 2, sodium: 620, cook: '', tags: ['精緻澱粉'],
    swap: { to: 'rice_ball_traditional', tip: '鮪魚美乃滋多，改傳統飯糰可省約 20 大卡' } });
  add({ id: 'bk_toast_egg_cheese_ham_light', name: '烤吐司夾蛋火腿', aliases: ['火腿蛋烤吐司', '烤吐司夾蛋火腿', '火腿蛋烤三明治'], unit: '1 份（約 160g）', kcal: 330, p: 15, c: 38.3, f: 13, sugar: 3, sodium: 760, cook: '烤', tags: ['精緻澱粉', '加工肉', '高鈉'],
    swap: { to: 'bk_toast_egg', tip: '火腿改單純蛋吐司可省約 40 大卡' } });
  // ---- 套餐 ----
  PRE.push({ id: 'bk_set_karaage_milktea', name: '卡拉雞腿堡＋大杯奶茶', aliases: ['卡拉雞腿堡套餐', '卡拉雞腿堡加大杯奶茶', '麥味登卡拉雞腿堡套餐'], cat: '早餐', items: [ { food: 'bk_burger_karaage', qty: 1 }, { food: 'bk_milk_tea_l', qty: 1 } ] });
  PRE.push({ id: 'bk_set_turnip_soy', name: '蘿蔔糕加蛋＋無糖豆漿', aliases: ['蘿蔔糕套餐', '蘿蔔糕加蛋配豆漿', '菜頭粿豆漿'], cat: '早餐', items: [ { food: 'bk_turnip_egg', qty: 1 }, { food: 'bk_soy_plain_m', qty: 1 } ] });
  PRE.push({ id: 'bk_set_shaobing_ricemilk', name: '燒餅夾蛋＋米漿', aliases: ['燒餅夾蛋配米漿', '燒餅米漿', '豆漿店套餐'], cat: '早餐', items: [ { food: 'bk_shaobing_egg', qty: 1 }, { food: 'bk_rice_milk_m', qty: 1 } ] });
  PRE.push({ id: 'bk_set_light_pancake', name: '減脂版：原味蛋餅＋無糖豆漿＋茶葉蛋', aliases: ['減脂早餐蛋餅', '蛋餅豆漿茶葉蛋', '減脂版蛋餅套餐'], cat: '早餐', items: [ { food: 'egg_pancake', qty: 1 }, { food: 'bk_soy_plain_m', qty: 1 }, { food: 'tea_egg', qty: 1 } ] });
  PRE.push({ id: 'bk_set_light_toast', name: '減脂版：全麥烤雞蛋吐司＋無糖豆漿', aliases: ['減脂早餐吐司', '全麥吐司套餐', '全麥烤雞套餐'], cat: '早餐', items: [ { food: 'bk_toast_roast_chicken_whole', qty: 1 }, { food: 'bk_soy_plain_m', qty: 1 }, { food: 'bk_salad_veg', qty: 1 } ] });
  PRE.push({ id: 'bk_set_iron_noodle_tea', name: '蘑菇鐵板麵加蛋＋紅茶', aliases: ['鐵板麵套餐', '蘑菇鐵板麵套餐', '鐵板麵配紅茶'], cat: '早餐', items: [ { food: 'bk_iron_noodle_mushroom_egg', qty: 1 }, { food: 'bk_bt_black_m', qty: 1 } ] });
  PRE.push({ id: 'bk_set_cheese_pancake_milktea', name: '起司蛋餅＋奶茶', aliases: ['蛋餅奶茶', '起司蛋餅套餐', '美而美蛋餅套餐'], cat: '早餐', items: [ { food: 'bk_egg_pancake_cheese', qty: 1 }, { food: 'milk_tea_breakfast', qty: 1 } ] });
  PRE.push({ id: 'bk_set_roast_burger_americano', name: '烤雞腿堡＋美式咖啡', aliases: ['烤雞腿堡套餐', '烤雞堡配美式', '漢堡配黑咖啡'], cat: '早餐', items: [ { food: 'bk_burger_roast_chicken', qty: 1 }, { food: 'bk_americano_m', qty: 1 } ] });
  PRE.push({ id: 'bk_set_purple_rice_soy', name: '紫米飯糰＋無糖豆漿', aliases: ['飯糰套餐', '紫米飯糰配豆漿', '飯糰豆漿'], cat: '早餐', items: [ { food: 'bk_ricerball_purple', qty: 1 }, { food: 'bk_soy_plain_m', qty: 1 } ] });
  PRE.push({ id: 'bk_set_pancake_latte', name: '楓糖鬆餅＋拿鐵', aliases: ['鬆餅套餐', '早午餐鬆餅拿鐵', '鬆餅配咖啡'], cat: '早餐', items: [ { food: 'bk_pancake_maple', qty: 1 }, { food: 'bk_latte_m', qty: 1 } ] });
})();
