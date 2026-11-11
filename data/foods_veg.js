// 超商素食即食品（7-11、全家、萊爾富、OK）：素食御飯糰、蔬食便當、素包子、植物肉堡、豆製品、植物奶等；
// 數值為一般值（參考各品項包裝標示與衛福部食品營養成分資料庫），各家配方份量常調整，實際以包裝標示為準
(function () {
  'use strict';
  const FOOD = window.FOOD_DB = window.FOOD_DB || [];
  const add = (o) => FOOD.push(Object.assign({ cat: '超商', cook: '', tags: [] }, o));
  // ---- 素食御飯糰／手卷 ----
  add({ id: 'veg_rb_ume', name: '御飯糰（素・梅子）', aliases: ['素食梅子飯糰', '7-11素食飯糰', '全家蔬食飯糰', '梅子素飯糰'], unit: '1 個（約 105g・全素）', kcal: 175, p: 3, c: 38, f: 1, sugar: 3, sodium: 380, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_rb_kelp', name: '御飯糰（素・昆布）', aliases: ['素食昆布飯糰', '昆布素飯糰', '7-11素食昆布飯糰', '萊爾富素食飯糰'], unit: '1 個（約 105g・全素）', kcal: 170, p: 3, c: 37, f: 1, sugar: 2, sodium: 420, tags: ['素食', '精緻澱粉'], swap: { to: 'cvs_rb_ume', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_rb_toon', name: '御飯糰（素・香椿）', aliases: ['香椿素飯糰', '全家蔬食香椿飯糰', '素食香椿御飯糰'], unit: '1 個（約 105g・全素）', kcal: 180, p: 3, c: 37, f: 2, sugar: 2, sodium: 400, tags: ['素食', '精緻澱粉'], swap: { to: 'cvs_rb_ume', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_rb_tofuskin', name: '御飯糰（素・豆皮）', aliases: ['豆皮素飯糰', '素食豆皮飯糰', '7-11素食豆皮飯糰'], unit: '1 個（約 110g・全素）', kcal: 195, p: 5, c: 37, f: 3, sugar: 5, sodium: 450, tags: ['素食', '精緻澱粉'], swap: { to: 'cvs_rb_ume', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_rb_plantmeat', name: '御飯糰（植物肉）', aliases: ['植物肉飯糰', '7-11植物肉飯糰', '全家植物系飯糰', '素肉鬆飯糰'], unit: '1 個（約 115g・蛋奶素）', kcal: 215, p: 7, c: 36, f: 5, sugar: 3, sodium: 480, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_rb_brownrice', name: '御飯糰（素・糙米）', aliases: ['素食糙米飯糰', '蔬食糙米飯糰', '全家蔬食糙米飯糰'], unit: '1 個（約 115g・全素）', kcal: 180, p: 5, c: 36, f: 2, sugar: 2, sodium: 380, tags: ['素食', '全穀', '高纖'] });
  add({ id: 'veg_rb_purple', name: '御飯糰（素・紫米）', aliases: ['素食紫米飯糰', '蔬食紫米飯糰', '萊爾富素食紫米飯糰'], unit: '1 個（約 110g・全素）', kcal: 185, p: 4, c: 38, f: 2, sugar: 3, sodium: 360, tags: ['素食', '全穀'] });
  add({ id: 'veg_rb_pickled', name: '御飯糰（素・酸菜）', aliases: ['素食酸菜飯糰', '蔬食酸菜飯糰', 'OK素食飯糰'], unit: '1 個（約 110g・全素）', kcal: 190, p: 4, c: 37, f: 3, sugar: 2, sodium: 500, tags: ['素食', '精緻澱粉', '高鈉'] });
  add({ id: 'veg_rb_handroll_tofu', name: '手卷（素・豆皮）', aliases: ['素食手卷', '豆皮手卷', '7-11素食手卷', '蔬食手卷'], unit: '1 個（約 85g・全素）', kcal: 145, p: 4, c: 26, f: 3, sugar: 4, sodium: 330, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_rb_handroll_corn', name: '手卷（素・玉米沙拉）', aliases: ['玉米手卷', '素食玉米手卷', '全家蔬食手卷'], unit: '1 個（約 90g・蛋奶素）', kcal: 180, p: 4, c: 25, f: 7, sugar: 4, sodium: 340, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_rb_sushi_inari', name: '豆皮壽司（素・2 個）', aliases: ['素食稻荷壽司', '素豆皮壽司', '7-11素食壽司'], unit: '2 個（約 80g・全素）', kcal: 150, p: 4, c: 24, f: 4, sugar: 8, sodium: 330, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_rb_riceball_fry', name: '炸蔬菜飯糰', aliases: ['蔬食炸飯糰', '素食炸飯糰', '全家蔬食炸物飯糰'], unit: '1 個（約 130g・蛋奶素）', cook: '炸', kcal: 260, p: 5, c: 38, f: 10, sugar: 3, sodium: 430, tags: ['素食', '精緻澱粉', '高脂', '油炸'] });
  // ---- 蔬食便當／飯麵 ----
  add({ id: 'veg_bx_bento_veg', name: '蔬食便當（素・一般）', aliases: ['全家蔬食便當', '7-11素食便當', '萊爾富素食便當', '素食便當'], unit: '1 盒（約 400g・全素）', kcal: 585, p: 16, c: 92, f: 17, sugar: 9, sodium: 1050, tags: ['素食', '精緻澱粉', '高鈉'] });
  add({ id: 'veg_bx_bento_plant', name: '植物肉排便當', aliases: ['7-11植物肉便當', '全家植物系便當', '植物肉便當', '素食排骨便當'], unit: '1 盒（約 420g・蛋奶素）', kcal: 670, p: 22, c: 96, f: 22, sugar: 10, sodium: 1150, tags: ['素食', '精緻澱粉', '高脂', '高鈉'] });
  add({ id: 'veg_bx_bento_brown', name: '蔬食糙米便當', aliases: ['糙米素食便當', '全家蔬食糙米便當', '素食健康便當'], unit: '1 盒（約 400g・蛋奶素）', kcal: 525, p: 20, c: 80, f: 14, sugar: 7, sodium: 900, tags: ['素食', '全穀', '高纖'] });
  add({ id: 'veg_bx_bento_light', name: '低卡蔬食便當', aliases: ['輕食素食便當', '全家蔬食低卡便當', '7-11素食輕食餐盒'], unit: '1 盒（約 350g・蛋奶素）', kcal: 380, p: 18, c: 55, f: 10, sugar: 6, sodium: 780, tags: ['素食', '低卡'] });
  add({ id: 'veg_bx_curry_rice', name: '蔬食咖哩飯', aliases: ['素食咖哩飯', '7-11素咖哩飯', '全家蔬食咖哩燴飯'], unit: '1 盒（約 400g・全素）', kcal: 540, p: 10, c: 98, f: 12, sugar: 10, sodium: 1000, tags: ['素食', '精緻澱粉', '高鈉'], swap: { to: 'veg_bx_bento_brown', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_bx_stew_rice', name: '素食燴飯（蔬菜豆腐）', aliases: ['素食燴飯', '蔬食燴飯', '萊爾富素食燴飯'], unit: '1 盒（約 380g・全素）', kcal: 490, p: 13, c: 85, f: 11, sugar: 8, sodium: 980, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_mushroom_rice', name: '香菇素肉燥飯', aliases: ['素肉燥飯', '素食滷肉飯', '7-11素食肉燥飯', '全家素肉燥飯'], unit: '1 盒（約 330g・全素）', kcal: 465, p: 11, c: 78, f: 12, sugar: 6, sodium: 880, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_fried_rice', name: '素食蛋炒飯', aliases: ['蔬食炒飯', '素炒飯', '全家蔬食炒飯', '7-11素食炒飯'], unit: '1 盒（約 350g・蛋奶素）', kcal: 525, p: 12, c: 85, f: 15, sugar: 3, sodium: 820, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_noodle_stirfry', name: '素食炒麵', aliases: ['蔬食炒麵', '素炒麵', '7-11素食炒麵', '全家蔬食炒麵'], unit: '1 盒（約 380g・全素）', kcal: 520, p: 12, c: 82, f: 16, sugar: 5, sodium: 1050, tags: ['素食', '精緻澱粉', '高鈉'] });
  add({ id: 'veg_bx_noodle_cold', name: '蔬食涼麵（麻醬）', aliases: ['素食涼麵', '麻醬涼麵（素）', '7-11素食涼麵', '全家蔬食涼麵'], unit: '1 盒（約 330g・蛋奶素）', kcal: 435, p: 13, c: 62, f: 15, sugar: 6, sodium: 880, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_noodle_cold_light', name: '蔬食涼麵（和風低脂）', aliases: ['和風素涼麵', '輕食蔬食涼麵', '萊爾富素食涼麵'], unit: '1 盒（約 320g・全素）', kcal: 330, p: 11, c: 60, f: 5, sugar: 7, sodium: 780, tags: ['素食', '精緻澱粉'], swap: { to: 'veg_bx_noodle_cold', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_bx_pasta_tomato', name: '素食義大利麵（番茄）', aliases: ['蔬食番茄義大利麵', '素食番茄麵', '全家蔬食義大利麵'], unit: '1 盒（約 360g・全素）', kcal: 450, p: 12, c: 78, f: 10, sugar: 10, sodium: 880, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_pasta_pesto', name: '素食青醬義大利麵', aliases: ['蔬食青醬麵', '素食青醬麵', '7-11素食義大利麵'], unit: '1 盒（約 340g・蛋奶素）', kcal: 505, p: 14, c: 72, f: 18, sugar: 4, sodium: 820, tags: ['素食', '精緻澱粉', '高脂'] });
  add({ id: 'veg_bx_udon_veg', name: '蔬食烏龍麵', aliases: ['素食烏龍麵', '素烏龍湯麵', '7-11蔬食烏龍'], unit: '1 碗（約 450g・全素）', kcal: 325, p: 9, c: 68, f: 2, sugar: 5, sodium: 1450, tags: ['素食', '精緻澱粉', '高鈉'] });
  add({ id: 'veg_bx_ricenoodle_veg', name: '素食炒米粉', aliases: ['蔬食炒米粉', '素炒米粉', '全家蔬食米粉'], unit: '1 盒（約 350g・全素）', kcal: 455, p: 8, c: 76, f: 13, sugar: 3, sodium: 980, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bx_oatmeal_cup', name: '蔬食燕麥粥（原味）', aliases: ['素食燕麥粥', '燕麥粥（素）', '全家蔬食燕麥'], unit: '1 杯（約 250g・蛋奶素）', kcal: 230, p: 8, c: 38, f: 5, sugar: 6, sodium: 150, tags: ['素食', '全穀', '高纖'] });
  // ---- 素食三明治／堡類 ----
  add({ id: 'veg_sw_sand_egg', name: '蔬食蛋沙拉三明治', aliases: ['素食蛋沙拉三明治', '7-11素食三明治', '全家蔬食三明治', '萊爾富素食三明治'], unit: '1 個（約 135g・蛋奶素）', kcal: 275, p: 9, c: 28, f: 14, sugar: 4, sodium: 430, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_sand_veg', name: '蔬食生菜起司三明治', aliases: ['素食起司三明治', '蔬食三明治', '全家素食三明治'], unit: '1 個（約 130g・蛋奶素）', kcal: 245, p: 9, c: 30, f: 10, sugar: 4, sodium: 450, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_sand_tofu', name: '豆腐排三明治（素）', aliases: ['素食豆腐三明治', '植物蛋白三明治', '7-11素食豆腐堡'], unit: '1 個（約 140g・全素）', kcal: 250, p: 11, c: 31, f: 9, sugar: 3, sodium: 470, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_sand_whole', name: '全麥蔬食三明治', aliases: ['全麥素食三明治', '蔬食全麥三明治', '全家蔬食全麥吐司'], unit: '1 個（約 130g・蛋奶素）', kcal: 225, p: 10, c: 28, f: 8, sugar: 3, sodium: 400, tags: ['素食', '高纖'] });
  add({ id: 'veg_sw_burger_plant', name: '植物肉漢堡', aliases: ['7-11植物肉漢堡', '全家植物肉堡', '素食漢堡', '蔬食漢堡'], unit: '1 個（約 170g・蛋奶素）', kcal: 365, p: 17, c: 38, f: 16, sugar: 6, sodium: 720, tags: ['素食', '精緻澱粉', '高脂'], swap: { to: 'veg_sw_sand_veg', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_sw_burger_tofu', name: '素食豆腐堡', aliases: ['素豆腐堡', '蔬食豆腐漢堡', '萊爾富素食漢堡'], unit: '1 個（約 150g・全素）', kcal: 280, p: 11, c: 36, f: 10, sugar: 5, sodium: 560, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_burger_rice', name: '蔬食米漢堡', aliases: ['素食米漢堡', '米堡（素）', '7-11素食米漢堡'], unit: '1 個（約 150g・全素）', kcal: 270, p: 7, c: 45, f: 7, sugar: 5, sodium: 520, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_bagel_veg', name: '蔬食貝果（奶油起司）', aliases: ['素食貝果', '蔬食貝果', '全家素食貝果'], unit: '1 個（約 120g・蛋奶素）', kcal: 295, p: 10, c: 44, f: 9, sugar: 6, sodium: 480, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_wrap_veg', name: '蔬食蛋餅捲', aliases: ['素食蛋餅', '素蛋餅捲', '7-11素食蛋餅'], unit: '1 個（約 130g・蛋奶素）', kcal: 220, p: 8, c: 25, f: 10, sugar: 2, sodium: 430, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sw_toast_peanut', name: '花生厚片吐司（蛋奶素）', aliases: ['素食花生吐司', '蔬食花生厚片', '全家素食厚片'], unit: '1 片（約 90g・蛋奶素）', kcal: 265, p: 8, c: 34, f: 11, sugar: 9, sodium: 260, tags: ['素食', '精緻澱粉', '高脂'] });
  // ---- 素包子／水餃 ----
  add({ id: 'veg_bn_cabbage', name: '素菜包', aliases: ['素食菜包', '7-11素菜包', '全家蔬食包子', '萊爾富素菜包'], unit: '1 個（約 90g・全素）', kcal: 175, p: 5, c: 30, f: 4, sugar: 2, sodium: 330, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bn_mushroom', name: '香菇素包', aliases: ['素食香菇包', '香菇包（素）', '全家香菇包', '7-11香菇素包'], unit: '1 個（約 95g・全素）', kcal: 170, p: 5, c: 29, f: 4, sugar: 2, sodium: 340, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bn_taro', name: '芋頭包（素）', aliases: ['素食芋頭包', '芋泥包', '全家芋頭包', '萊爾富芋頭包'], unit: '1 個（約 90g・蛋奶素）', kcal: 190, p: 4, c: 35, f: 4, sugar: 9, sodium: 150, tags: ['素食', '精緻澱粉', '高糖'] });
  add({ id: 'veg_bn_redbean', name: '紅豆包（素）', aliases: ['素食紅豆包', '豆沙包（素）', '7-11紅豆包'], unit: '1 個（約 85g・全素）', kcal: 190, p: 5, c: 38, f: 2, sugar: 13, sodium: 60, tags: ['素食', '精緻澱粉', '高糖'] });
  add({ id: 'veg_bn_plantmeat', name: '植物肉包', aliases: ['素肉包', '植物系肉包', '7-11植物肉包', '全家植物肉包'], unit: '1 個（約 100g・蛋奶素）', kcal: 205, p: 8, c: 32, f: 5, sugar: 2, sodium: 430, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bn_dumpling_veg', name: '素水餃（冷凍 10 顆）', aliases: ['素食水餃', '全素水餃', '蔬菜水餃（素）', '超商素水餃'], unit: '10 顆（約 250g・蛋奶素）', kcal: 370, p: 14, c: 56, f: 10, sugar: 3, sodium: 780, tags: ['素食', '精緻澱粉'], swap: { to: 'cvs_ht_dumpling', why: '熱量或脂肪較低的同類選擇' } });
  add({ id: 'veg_bn_dumpling_bowl', name: '素水餃盒（10 顆）', aliases: ['微波素水餃', '素食水餃盒', '7-11素水餃', '全家蔬食水餃'], unit: '1 盒（約 300g・蛋奶素）', kcal: 390, p: 15, c: 58, f: 11, sugar: 3, sodium: 860, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_bn_potsticker', name: '素煎餃（10 顆）', aliases: ['素食煎餃', '蔬食鍋貼', '素鍋貼', '全家素煎餃'], unit: '10 顆（約 250g・蛋奶素）', kcal: 410, p: 13, c: 54, f: 16, sugar: 3, sodium: 740, tags: ['素食', '精緻澱粉', '高脂'] });
  add({ id: 'veg_bn_scallion', name: '蔥油餅（素）', aliases: ['素食蔥油餅', '蔥抓餅（素）', '7-11蔥油餅'], unit: '1 片（約 110g・蛋奶素）', kcal: 240, p: 5, c: 32, f: 10, sugar: 2, sodium: 420, tags: ['素食', '精緻澱粉', '高脂'] });
  add({ id: 'veg_bn_turnip', name: '素蘿蔔糕', aliases: ['素食蘿蔔糕', '蔬食蘿蔔糕', '全家蘿蔔糕'], unit: '1 份（約 150g・全素）', kcal: 170, p: 3, c: 26, f: 6, sugar: 1, sodium: 520, tags: ['素食', '精緻澱粉'] });
  // ---- 素食關東煮 ----
  add({ id: 'veg_od_tofu_ball', name: '關東煮（素丸）', aliases: ['素食關東煮素丸', '素料關東煮', '全素關東煮'], unit: '1 個（約 40g・全素）', kcal: 65, p: 3, c: 6, f: 3, sugar: 1, sodium: 220, tags: ['素食'] });
  add({ id: 'veg_od_bean_curd', name: '關東煮（素食油豆腐）', aliases: ['素食關東煮豆腐', '關東煮油豆腐', '素油豆腐'], unit: '1 個（約 50g・全素）', kcal: 85, p: 5, c: 3, f: 6, sugar: 0, sodium: 200, tags: ['素食'] });
  add({ id: 'veg_od_kelp', name: '關東煮（海帶）', aliases: ['關東煮海帶結', '素食關東煮海帶', '海帶結'], unit: '1 份（約 40g・全素）', kcal: 12, p: 0, c: 3, f: 0, sugar: 0, sodium: 250, tags: ['素食', '低卡'] });
  add({ id: 'veg_od_cabbage_veg', name: '關東煮（素高麗菜捲）', aliases: ['素食高麗菜捲', '蔬食關東煮菜捲', '素菜捲'], unit: '1 個（約 55g・全素）', kcal: 55, p: 3, c: 6, f: 2, sugar: 1, sodium: 230, tags: ['素食'] });
  add({ id: 'veg_od_veg_soup', name: '關東煮素湯（1 杯）', aliases: ['素食關東煮湯', '蔬食高湯', '昆布湯底'], unit: '1 杯（約 200ml・全素）', kcal: 8, p: 0, c: 2, f: 0, sugar: 0, sodium: 650, tags: ['素食', '低卡', '高鈉'] });
  add({ id: 'veg_od_taro_ball', name: '關東煮（芋丸）', aliases: ['芋頭丸', '素食關東煮芋丸', '素芋丸'], unit: '1 個（約 40g・全素）', kcal: 75, p: 2, c: 10, f: 3, sugar: 1, sodium: 200, tags: ['素食'] });
  // ---- 豆製品／素料 ----
  add({ id: 'veg_tf_tofu_pack', name: '盒裝嫩豆腐（素・超商）', aliases: ['超商豆腐', '盒裝豆腐', '7-11豆腐', '全家蔬食豆腐'], unit: '1 盒（約 150g・全素）', kcal: 95, p: 9, c: 3, f: 5, sugar: 1, sodium: 15, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_tf_tofu_cold', name: '涼拌豆腐（醬油）', aliases: ['素食涼拌豆腐', '蔬食冷豆腐', '全家涼拌豆腐'], unit: '1 盒（約 170g・全素）', kcal: 115, p: 10, c: 5, f: 6, sugar: 3, sodium: 450, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_tf_dried_tofu_braised', name: '滷豆干（素・包裝）', aliases: ['素食滷豆干', '全素滷味豆干', '超商素豆干'], unit: '1 包（約 75g・全素）', kcal: 120, p: 11, c: 5, f: 6, sugar: 2, sodium: 520, tags: ['素食', '高蛋白', '高鈉'] });
  add({ id: 'veg_tf_tofu_skin', name: '滷豆皮（素）', aliases: ['素食豆皮', '素滷豆皮', '蔬食豆皮'], unit: '1 份（約 60g・全素）', kcal: 120, p: 9, c: 3, f: 8, sugar: 1, sodium: 430, tags: ['素食', '高脂'] });
  add({ id: 'veg_tf_veg_chicken', name: '素雞（滷）', aliases: ['素食素雞', '滷素雞', '素食雞塊', '超商素雞'], unit: '1 份（約 100g・全素）', kcal: 130, p: 13, c: 6, f: 6, sugar: 2, sodium: 480, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_tf_veg_gluten', name: '麵腸（滷）', aliases: ['素食麵腸', '滷麵腸', '素麵腸'], unit: '1 份（約 80g・全素）', kcal: 110, p: 11, c: 10, f: 3, sugar: 3, sodium: 420, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_tf_veg_gluten_roast', name: '烤麩（素）', aliases: ['滷烤麩', '素食烤麩', '蔬食烤麩'], unit: '1 份（約 100g・全素）', kcal: 135, p: 9, c: 18, f: 3, sugar: 6, sodium: 480, tags: ['素食'] });
  add({ id: 'veg_tf_plant_chicken_nugget', name: '植物肉雞塊（炸）', aliases: ['素食雞塊（炸）', '植物肉塊', '7-11植物肉雞塊', '全家植物系炸物'], unit: '5 塊（約 100g・蛋奶素）', cook: '炸', kcal: 235, p: 12, c: 17, f: 13, sugar: 1, sodium: 580, tags: ['素食', '高脂', '油炸'] });
  add({ id: 'veg_tf_veg_fish_tofu', name: '炸豆腐排（素）', aliases: ['素食炸豆腐', '蔬食豆腐排', '全家素炸物'], unit: '1 份（約 90g・全素）', cook: '炸', kcal: 185, p: 8, c: 11, f: 12, sugar: 1, sodium: 380, tags: ['素食', '高脂', '油炸'] });
  add({ id: 'veg_tf_stinky_tofu_veg', name: '蒸臭豆腐（素・盒裝）', aliases: ['素食臭豆腐', '全素臭豆腐', '7-11素臭豆腐'], unit: '1 盒（約 200g・全素）', kcal: 160, p: 12, c: 10, f: 8, sugar: 4, sodium: 780, tags: ['素食', '高鈉'] });
  add({ id: 'veg_tf_veg_ham', name: '素火腿片', aliases: ['素食火腿', '素火腿', '蔬食火腿片'], unit: '3 片（約 60g・蛋奶素）', kcal: 90, p: 9, c: 7, f: 3, sugar: 1, sodium: 450, tags: ['素食'] });
  add({ id: 'veg_tf_egg_tofu', name: '日式玉子豆腐（蛋奶素）', aliases: ['玉子豆腐', '蛋豆腐', '全家玉子豆腐'], unit: '1 盒（約 120g・蛋奶素）', kcal: 80, p: 6, c: 3, f: 5, sugar: 1, sodium: 300, tags: ['素食'] });
  // ---- 素食沙拉／輕食 ----
  add({ id: 'veg_sl_garden', name: '蔬食沙拉（和風芝麻醬）', aliases: ['素食沙拉', '7-11素食沙拉', '全家蔬食沙拉', '萊爾富素食沙拉'], unit: '1 盒（約 200g・蛋奶素）', kcal: 150, p: 5, c: 12, f: 9, sugar: 7, sodium: 320, tags: ['素食', '低卡'] });
  add({ id: 'veg_sl_tofu', name: '豆腐沙拉（素）', aliases: ['素食豆腐沙拉', '蔬食豆腐沙拉', '全家豆腐沙拉'], unit: '1 盒（約 230g・蛋奶素）', kcal: 185, p: 12, c: 12, f: 10, sugar: 6, sodium: 420, tags: ['素食', '高纖'] });
  add({ id: 'veg_sl_chickpea', name: '鷹嘴豆蔬食沙拉', aliases: ['鷹嘴豆沙拉', '素食鷹嘴豆沙拉', '全家鷹嘴豆沙拉'], unit: '1 盒（約 250g・全素）', kcal: 250, p: 10, c: 32, f: 9, sugar: 6, sodium: 380, tags: ['素食', '高纖'] });
  add({ id: 'veg_sl_quinoa', name: '藜麥蔬食沙拉', aliases: ['藜麥沙拉', '素食藜麥沙拉', '7-11藜麥沙拉'], unit: '1 盒（約 260g・蛋奶素）', kcal: 275, p: 11, c: 35, f: 10, sugar: 7, sodium: 400, tags: ['素食', '全穀', '高纖'] });
  add({ id: 'veg_sl_fruit', name: '蔬果盒（素）', aliases: ['素食水果盒', '蔬果杯', '全家蔬果盒', '綜合水果盒（素）'], unit: '1 盒（約 250g・全素）', kcal: 115, p: 2, c: 26, f: 0.5, sugar: 20, sodium: 10, tags: ['素食', '低卡'] });
  add({ id: 'veg_sl_veg_stick', name: '蔬菜棒＋豆腐醬', aliases: ['蔬菜棒（素）', '素食蔬菜棒', '全家蔬菜棒'], unit: '1 盒（約 150g・蛋奶素）', kcal: 95, p: 3, c: 10, f: 5, sugar: 5, sodium: 160, tags: ['素食', '低卡'] });
  add({ id: 'veg_sl_veg_soup', name: '蔬菜豆腐湯（微波）', aliases: ['素食湯品', '蔬食味噌湯', '素味噌湯', '全家蔬食湯'], unit: '1 碗（約 300g・全素）', kcal: 80, p: 5, c: 8, f: 3, sugar: 2, sodium: 780, tags: ['素食', '低卡', '高鈉'] });
  // ---- 植物奶／飲品 ----
  add({ id: 'veg_dr_oat_milk', name: '燕麥奶（無糖）', aliases: ['無糖燕麥奶', '素食燕麥奶', '全家燕麥奶', '7-11燕麥奶'], unit: '1 瓶（約 250ml・全素）', kcal: 110, p: 3, c: 18, f: 3, sugar: 6, sodium: 100, tags: ['素食'] });
  add({ id: 'veg_dr_oat_milk_sweet', name: '燕麥奶（微糖）', aliases: ['微糖燕麥奶', '植物奶燕麥', '燕麥飲'], unit: '1 瓶（約 290ml・全素）', kcal: 165, p: 4, c: 28, f: 4, sugar: 15, sodium: 120, tags: ['素食', '高糖'] });
  add({ id: 'veg_dr_almond_milk', name: '杏仁奶（無糖）', aliases: ['無糖杏仁奶', '杏仁露（無糖）', '素食杏仁奶'], unit: '1 瓶（約 250ml・全素）', kcal: 40, p: 1, c: 2, f: 3, sugar: 0, sodium: 130, tags: ['素食', '低卡'] });
  add({ id: 'veg_dr_almond_tea', name: '杏仁茶（含糖）', aliases: ['杏仁露', '杏仁飲', '素食杏仁茶'], unit: '1 瓶（約 300ml・全素）', kcal: 175, p: 3, c: 30, f: 5, sugar: 26, sodium: 90, tags: ['素食', '高糖', '含糖飲料'] });
  add({ id: 'veg_dr_soy_ctn', name: '豆漿（微糖・紙盒・素）', aliases: ['微糖豆漿', '全家豆漿', '7-11豆漿', '萊爾富豆漿'], unit: '1 盒（約 450ml・全素）', kcal: 200, p: 12, c: 20, f: 8, sugar: 14, sodium: 170, tags: ['素食'] });
  add({ id: 'veg_dr_soy_malt', name: '麥芽豆漿（蔬食）', aliases: ['蔬食麥芽豆漿', '燕麥豆漿', '全素麥芽豆漿'], unit: '1 瓶（約 400ml・全素）', kcal: 205, p: 10, c: 28, f: 6, sugar: 18, sodium: 160, tags: ['素食', '高糖'] });
  add({ id: 'veg_dr_soy_latte', name: '豆漿拿鐵（素）', aliases: ['蔬食豆漿拿鐵', '植物奶拿鐵', '燕麥拿鐵（素）', '全家蔬食拿鐵'], unit: '1 杯（約 350ml・全素）', kcal: 135, p: 7, c: 16, f: 5, sugar: 10, sodium: 140, tags: ['素食'] });
  add({ id: 'veg_dr_oat_latte', name: '燕麥奶拿鐵', aliases: ['燕麥拿鐵', '植物奶咖啡', '7-11燕麥拿鐵', '全家植物奶拿鐵'], unit: '1 杯（約 360ml・全素）', kcal: 150, p: 4, c: 22, f: 5, sugar: 12, sodium: 110, tags: ['素食'] });
  add({ id: 'veg_dr_coconut_water', name: '椰子水（全素）', aliases: ['椰子水', '純椰子水', '素食椰子水'], unit: '1 瓶（約 330ml・全素）', kcal: 50, p: 1, c: 12, f: 0, sugar: 11, sodium: 60, tags: ['素食'] });
  add({ id: 'veg_dr_vegjuice', name: '蔬果汁（無添加）', aliases: ['素食蔬果汁', '100%蔬果汁', '全家蔬果汁', '蔬食果菜汁'], unit: '1 瓶（約 300ml・全素）', kcal: 125, p: 1, c: 30, f: 0, sugar: 27, sodium: 50, tags: ['素食', '高糖'] });
  add({ id: 'veg_dr_soy_yogurt', name: '植物優格（豆奶）', aliases: ['素食優格', '豆奶優格', '全素優格', '植物性優格'], unit: '1 杯（約 150g・全素）', kcal: 125, p: 5, c: 17, f: 4, sugar: 12, sodium: 40, tags: ['素食'] });
  // ---- 素食泡麵 ----
  add({ id: 'veg_nd_bowl_veg', name: '素食碗麵（蔬菜）', aliases: ['素食泡麵', '蔬食碗麵', '素泡麵', '7-11素食泡麵'], unit: '1 碗（約 85g・全素）', kcal: 375, p: 8, c: 52, f: 15, sugar: 3, sodium: 1800, tags: ['素食', '精緻澱粉', '高脂', '高鈉'] });
  add({ id: 'veg_nd_bowl_mushroom', name: '素食香菇碗麵', aliases: ['香菇素麵', '素食香菇泡麵', '素香菇碗麵'], unit: '1 碗（約 80g・全素）', kcal: 350, p: 8, c: 50, f: 13, sugar: 3, sodium: 1700, tags: ['素食', '精緻澱粉', '高鈉'] });
  add({ id: 'veg_nd_bowl_spicy', name: '素食麻辣碗麵', aliases: ['素食麻辣泡麵', '素麻辣麵', '麻辣素碗麵'], unit: '1 碗（約 100g・全素）', kcal: 410, p: 9, c: 55, f: 17, sugar: 3, sodium: 2000, tags: ['素食', '精緻澱粉', '高脂', '高鈉'] });
  add({ id: 'veg_nd_noodle_plain', name: '素食拌麵（原味・袋裝）', aliases: ['素食拌麵', '蔬食乾麵', '素乾麵', '素食泡麵（乾拌）'], unit: '1 包（約 100g・全素）', kcal: 405, p: 9, c: 58, f: 15, sugar: 3, sodium: 1500, tags: ['素食', '精緻澱粉', '高脂', '高鈉'] });
  // ---- 素肉乾／零食／蛋白 ----
  add({ id: 'veg_sn_veg_jerky', name: '素肉乾（原味）', aliases: ['素食肉乾', '素肉條', '蔬食肉乾', '超商素肉乾'], unit: '1 包（約 40g・全素）', kcal: 140, p: 8, c: 18, f: 4, sugar: 10, sodium: 450, tags: ['素食'] });
  add({ id: 'veg_sn_soy_jerky', name: '豆乾條（素・辣味）', aliases: ['素食辣豆乾', '素食豆乾條', '蔬食豆乾'], unit: '1 包（約 50g・全素）', kcal: 130, p: 9, c: 10, f: 6, sugar: 3, sodium: 520, tags: ['素食', '高鈉'] });
  add({ id: 'veg_sn_seaweed', name: '海苔片（素食）', aliases: ['素食海苔', '海苔脆片', '紫菜片', '全家海苔'], unit: '1 包（約 5g・全素）', kcal: 26, p: 1, c: 1, f: 2, sugar: 0, sodium: 60, tags: ['素食', '低卡'] });
  add({ id: 'veg_sn_seaweed_nut', name: '海苔堅果脆片', aliases: ['海苔夾心脆片', '堅果海苔', '素食海苔堅果'], unit: '1 包（約 25g・蛋奶素）', kcal: 140, p: 3, c: 14, f: 8, sugar: 3, sodium: 180, tags: ['素食', '高脂'] });
  add({ id: 'veg_sn_nuts_mix', name: '綜合堅果（無調味・素）', aliases: ['素食堅果', '無調味堅果', '蔬食堅果包', '7-11堅果'], unit: '1 包（約 30g・全素）', kcal: 195, p: 5, c: 6, f: 17, sugar: 2, sodium: 2, tags: ['素食', '高脂'] });
  add({ id: 'veg_sn_veg_chips', name: '蔬菜脆片', aliases: ['素食蔬菜脆片', '蔬果脆片', '綜合蔬果脆片'], unit: '1 包（約 40g・全素）', cook: '炸', kcal: 190, p: 2, c: 25, f: 9, sugar: 6, sodium: 150, tags: ['素食', '油炸'] });
  add({ id: 'veg_sn_edamame_sn', name: '毛豆脆（烘烤）', aliases: ['烤毛豆零食', '毛豆酥', '素食毛豆脆'], unit: '1 包（約 30g・全素）', kcal: 135, p: 9, c: 11, f: 6, sugar: 1, sodium: 160, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_sn_protein_soy', name: '全素蛋白飲（豆類）', aliases: ['植物蛋白飲', '豌豆蛋白飲', '素食蛋白飲', '全素高蛋白飲'], unit: '1 瓶（約 330ml・全素）', kcal: 165, p: 20, c: 12, f: 4, sugar: 6, sodium: 230, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_sn_protein_bar_plant', name: '植物蛋白棒（豆類）', aliases: ['素食蛋白棒', '全素蛋白棒', '豆類蛋白棒', '植物蛋白能量棒'], unit: '1 條（約 55g・全素）', kcal: 220, p: 15, c: 20, f: 9, sugar: 6, sodium: 150, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_sn_soy_cracker', name: '豆乳餅乾（全素）', aliases: ['素食豆乳餅乾', '蔬食豆乳餅', '全素餅乾'], unit: '1 包（約 40g・全素）', kcal: 190, p: 4, c: 25, f: 8, sugar: 5, sodium: 180, tags: ['素食', '精緻澱粉'] });
  add({ id: 'veg_sn_soybean_roast', name: '烤黃豆（鹽味）', aliases: ['鹽味黃豆', '素食黃豆零食', '烘烤黃豆'], unit: '1 包（約 40g・全素）', kcal: 170, p: 14, c: 10, f: 8, sugar: 1, sodium: 200, tags: ['素食', '高蛋白'] });
  add({ id: 'veg_sn_peanut_candy', name: '花生糖（素）', aliases: ['素食花生糖', '花生酥糖', '蔬食花生糖'], unit: '1 包（約 40g・全素）', kcal: 190, p: 5, c: 22, f: 9, sugar: 15, sodium: 10, tags: ['素食', '高糖', '高脂'] });
})();
