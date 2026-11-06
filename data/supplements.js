// 運動補充品：蛋白粉、胺基酸、肌酸等（數值為市售常見產品營養標示的一般值，實際以包裝標示為準）
// 胺基酸每克約 4 大卡；肌酸不會被當能量代謝，熱量視為 0
(function () {
  'use strict';
  const FOOD = window.FOOD_DB = window.FOOD_DB || [];
  const PRE = window.MEAL_PRESETS = window.MEAL_PRESETS || [];
  const SUP = '補充品';

  // 原資料庫已有的乳清與蛋白棒：歸到補充品分類並補別名
  FOOD.forEach(f => {
    if (f.id === 'whey_protein') { f.cat = SUP; f.name = '乳清蛋白（濃縮 WPC）'; f.aliases = ['乳清', '乳清蛋白', '高蛋白粉', '蛋白粉', '高蛋白', 'whey', 'WPC']; f.tags = ['高蛋白', '補充品']; }
    if (f.id === 'protein_bar') { f.cat = SUP; f.tags = ['高蛋白', '補充品']; f.swap = { to: 'whey_isolate', tip: '蛋白棒常含糖與代糖醇，熱量接近一份點心；只是要補蛋白質的話，一匙分離乳清約 110 大卡就有 26 g' }; }
  });

  const add = (o) => FOOD.push(Object.assign({ cook: '', tags: ['補充品'] }, o, { cat: SUP }));

  // ---- 蛋白粉 ----
  add({ id: 'whey_isolate', name: '分離乳清（WPI）', aliases: ['分離乳清', '分離乳清蛋白', 'WPI', 'ISO'], unit: '1 匙（約 30g 沖水）', kcal: 110, p: 26, c: 1, f: 0.5, tags: ['高蛋白', '補充品'] });
  add({ id: 'whey_hydro', name: '水解乳清（WPH）', aliases: ['水解乳清', 'WPH'], unit: '1 匙（約 30g 沖水）', kcal: 110, p: 25, c: 1.5, f: 0.5, tags: ['高蛋白', '補充品'] });
  add({ id: 'casein', name: '酪蛋白（Casein）', aliases: ['酪蛋白', '緩釋蛋白', '睡前蛋白'], unit: '1 匙（約 33g 沖水）', kcal: 120, p: 24, c: 3, f: 1, tags: ['高蛋白', '補充品'] });
  add({ id: 'plant_protein', name: '植物蛋白粉（豌豆／大豆）', aliases: ['植物蛋白', '豌豆蛋白', '大豆蛋白粉', '素食蛋白粉'], unit: '1 匙（約 30g 沖水）', kcal: 115, p: 21, c: 3, f: 2, tags: ['高蛋白', '補充品'] });
  add({ id: 'protein_rtd', name: '高蛋白飲（即飲瓶裝）', aliases: ['高蛋白飲', '蛋白飲', '即飲蛋白', '高蛋白奶昔'], unit: '1 瓶（約 330ml）', kcal: 170, p: 27, c: 10, f: 2.5, tags: ['高蛋白', '補充品'] });
  add({ id: 'collagen', name: '膠原蛋白粉', aliases: ['膠原蛋白', '膠原蛋白粉'], unit: '1 包（約 10g）', kcal: 36, p: 9, c: 0, f: 0, tags: ['補充品'] });
  add({ id: 'mass_gainer', name: '增肌粉（高熱量）', aliases: ['增肌粉', '增重粉', 'Mass Gainer', '高熱量蛋白粉'], unit: '1 份（約 150g 沖水）', kcal: 600, p: 30, c: 110, f: 5, tags: ['高糖', '補充品'],
    swap: { to: 'whey_isolate', tip: '增肌粉是給「增重」用的，一份就 600 大卡；減脂期改喝分離乳清，蛋白質差不多、熱量少 490 大卡' } });

  // ---- 胺基酸 ----
  add({ id: 'bcaa', name: 'BCAA 支鏈胺基酸', aliases: ['BCAA', '支鏈胺基酸', '胺基酸', '氨基酸'], unit: '1 匙（約 5g 沖水）', kcal: 20, p: 5, c: 0, f: 0, tags: ['胺基酸', '補充品'] });
  add({ id: 'eaa', name: 'EAA 必需胺基酸', aliases: ['EAA', '必需胺基酸', '必須胺基酸'], unit: '1 匙（約 10g 沖水）', kcal: 40, p: 10, c: 0, f: 0, tags: ['胺基酸', '補充品'] });
  add({ id: 'glutamine', name: '麩醯胺酸', aliases: ['麩醯胺酸', '谷氨酰胺', 'Glutamine'], unit: '1 匙（約 5g）', kcal: 20, p: 5, c: 0, f: 0, tags: ['胺基酸', '補充品'] });

  // ---- 肌酸與其他 ----
  add({ id: 'creatine', name: '肌酸（單水肌酸）', aliases: ['肌酸', '機酸', '單水肌酸', 'Creatine', '肌酸粉'], unit: '1 匙（約 5g）', kcal: 0, p: 0, c: 0, f: 0, tags: ['肌酸', '補充品'] });
  add({ id: 'pre_workout', name: '訓練前補劑（Pre-workout）', aliases: ['訓練前補劑', '氮泵', 'Pre-workout', 'C4'], unit: '1 匙（約 10g）', kcal: 10, p: 0, c: 2.5, f: 0, tags: ['咖啡因', '補充品'] });
  add({ id: 'caffeine_tab', name: '咖啡因錠', aliases: ['咖啡因錠', '咖啡因'], unit: '1 錠（200mg）', kcal: 0, p: 0, c: 0, f: 0, tags: ['咖啡因', '補充品'] });
  add({ id: 'electrolyte', name: '電解質粉／發泡錠', aliases: ['電解質', '電解質粉', '發泡錠', '電解質錠'], unit: '1 包或 1 錠', kcal: 10, p: 0, c: 2.5, f: 0 });
  add({ id: 'energy_gel', name: '能量膠', aliases: ['能量膠', 'Gel', '能量包'], unit: '1 包（約 40g）', kcal: 100, p: 0, c: 25, f: 0, tags: ['高糖', '補充品'] });
  add({ id: 'fish_oil', name: '魚油', aliases: ['魚油', 'Omega-3', '魚油膠囊'], unit: '1 顆（約 1g）', kcal: 9, p: 0, c: 0, f: 1 });
  add({ id: 'multivitamin', name: '綜合維他命', aliases: ['綜合維他命', '維他命', '維生素', 'B群'], unit: '1 顆', kcal: 0, p: 0, c: 0, f: 0 });
  add({ id: 'l_carnitine', name: '左旋肉鹼', aliases: ['左旋肉鹼', '肉鹼', 'L-Carnitine'], unit: '1 份（約 1g）', kcal: 0, p: 0, c: 0, f: 0 });
  add({ id: 'chicken_essence', name: '滴雞精／雞精', aliases: ['雞精', '滴雞精'], unit: '1 包（約 60ml）', kcal: 20, p: 5, c: 0, f: 0 });

  // ---- 補充品組合 ----
  PRE.push(
    { id: 'post_shake_milk', name: '訓練後奶昔（乳清＋香蕉＋低脂奶）', aliases: ['乳清香蕉牛奶', '訓練後奶昔', '高蛋白奶昔香蕉'], cat: '補充品',
      items: [{ food: 'whey_protein', qty: 1 }, { food: 'banana', qty: 1 }, { food: 'milk_low', qty: 1 }] },
    { id: 'whey_water', name: '乳清沖水', aliases: ['乳清加水', '一匙乳清'], cat: '補充品', items: [{ food: 'whey_protein', qty: 1 }] },
    { id: 'whey_milk', name: '乳清＋全脂鮮奶', aliases: ['乳清加牛奶', '乳清牛奶'], cat: '補充品', items: [{ food: 'whey_protein', qty: 1 }, { food: 'milk_whole', qty: 1 }] },
    { id: 'whey_soy', name: '乳清＋無糖豆漿', aliases: ['乳清加豆漿', '乳清豆漿'], cat: '補充品', items: [{ food: 'whey_protein', qty: 1 }, { food: 'soy_milk_plain', qty: 1 }] },
    { id: 'whey_oat', name: '乳清燕麥早餐', aliases: ['乳清燕麥', '蛋白燕麥'], cat: '補充品', items: [{ food: 'whey_protein', qty: 1 }, { food: 'oatmeal', qty: 1.5 }, { food: 'banana', qty: 0.5 }] },
    { id: 'training_stack', name: '訓練日補充品（乳清＋肌酸）', aliases: ['乳清加肌酸', '乳清肌酸', '訓練補給'], cat: '補充品', items: [{ food: 'whey_protein', qty: 1 }, { food: 'creatine', qty: 1 }] },
    { id: 'intra_eaa', name: '訓練中 EAA＋電解質', aliases: ['訓練中飲品', 'EAA電解質'], cat: '補充品', items: [{ food: 'eaa', qty: 1 }, { food: 'electrolyte', qty: 1 }] }
  );
})();
