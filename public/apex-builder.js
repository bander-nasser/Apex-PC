/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/apex-builder.js"
/*!***************************************!*\
  !*** ./src/assets/js/apex-builder.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apex_builder_products_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apex-builder/products-data */ \"./src/assets/js/apex-builder/products-data.js\");\n/* harmony import */ var _apex_builder_products_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apex_builder_products_data__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apex_builder_compatibility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apex-builder/compatibility */ \"./src/assets/js/apex-builder/compatibility.js\");\n/* harmony import */ var _apex_builder_compatibility__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apex_builder_compatibility__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _apex_builder_pc_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apex-builder/pc-builder */ \"./src/assets/js/apex-builder/pc-builder.js\");\n/* harmony import */ var _apex_builder_pc_builder__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apex_builder_pc_builder__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _apex_builder_budget_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apex-builder/budget-builder */ \"./src/assets/js/apex-builder/budget-builder.js\");\n/* harmony import */ var _apex_builder_budget_builder__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apex_builder_budget_builder__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n//# sourceURL=webpack://apex-pc-theme/./src/assets/js/apex-builder.js?\n}");

/***/ },

/***/ "./src/assets/js/apex-builder/budget-builder.js"
/*!******************************************************!*\
  !*** ./src/assets/js/apex-builder/budget-builder.js ***!
  \******************************************************/
() {

eval("{function initApexBudgetBuilder() {\n  const page = document.getElementById(\"apex-budget-builder\");\n  if (!page || !window.ApexProducts) {\n    return;\n  }\n  const amountInput = document.getElementById(\"budget-amount\");\n  const purposeSelect = document.getElementById(\"budget-purpose\");\n  const resolutionSelect = document.getElementById(\"budget-resolution\");\n  const generateButton = document.getElementById(\"budget-generate\");\n  const result = document.getElementById(\"budget-result\");\n  const partsContainer = document.getElementById(\"budget-build-parts\");\n  const totalElement = document.getElementById(\"budget-build-total\");\n  const titleElement = document.getElementById(\"budget-build-title\");\n  let generatedBuild = [];\n  function getCheapest(list, filter = () => true) {\n    return list.filter(filter).sort((a, b) => a.price - b.price)[0];\n  }\n  function getMostExpensiveWithin(list, maxPrice) {\n    return list.filter(item => item.price <= maxPrice).sort((a, b) => b.price - a.price)[0] || list[0];\n  }\n  function generateBuild(budget, resolution) {\n    const gpuShare = resolution === \"4k\" ? 0.42 : resolution === \"1440p\" ? 0.36 : 0.29;\n    const cpuShare = 0.19;\n    const gpu = getMostExpensiveWithin(window.ApexProducts.gpu, budget * gpuShare);\n    const cpu = getMostExpensiveWithin(window.ApexProducts.cpu, budget * cpuShare);\n    const motherboard = getCheapest(window.ApexProducts.motherboard, item => item.socket === cpu.socket);\n    const ram = getCheapest(window.ApexProducts.ram, item => item.ramType === motherboard.ramType);\n    const storage = budget >= 9000 ? window.ApexProducts.storage[1] : window.ApexProducts.storage[0];\n    const cooler = cpu.wattage >= 100 ? window.ApexProducts.cooler[1] : window.ApexProducts.cooler[0];\n    const caseItem = getCheapest(window.ApexProducts.case, item => item.formFactors.includes(motherboard.formFactor) && item.maxGpuLength >= gpu.length && (!cooler.radiatorSize || item.radiatorSizes.includes(cooler.radiatorSize)));\n    const estimatedPower = Math.ceil((cpu.wattage + gpu.wattage + 100) * 1.35 / 50) * 50;\n    const psu = getCheapest(window.ApexProducts.psu, item => item.capacity >= estimatedPower);\n    return [{\n      label: \"المعالج\",\n      product: cpu\n    }, {\n      label: \"اللوحة الأم\",\n      product: motherboard\n    }, {\n      label: \"كرت الشاشة\",\n      product: gpu\n    }, {\n      label: \"الذاكرة\",\n      product: ram\n    }, {\n      label: \"التخزين\",\n      product: storage\n    }, {\n      label: \"التبريد\",\n      product: cooler\n    }, {\n      label: \"مزود الطاقة\",\n      product: psu\n    }, {\n      label: \"الكيس\",\n      product: caseItem\n    }];\n  }\n  generateButton.addEventListener(\"click\", () => {\n    const budget = Number(amountInput.value);\n    const purpose = purposeSelect.value;\n    const resolution = resolutionSelect.value;\n    if (!budget || budget < 3000 || budget > 30000) {\n      alert(\"اكتبي ميزانية بين 3000 و30000 ريال.\");\n      return;\n    }\n    if (!purpose || !resolution) {\n      alert(\"اختاري الاستخدام والدقة المطلوبة.\");\n      return;\n    }\n    generatedBuild = generateBuild(budget, resolution);\n    const unavailablePart = generatedBuild.find(item => !item.product);\n    if (unavailablePart) {\n      alert(`لا يوجد خيار مناسب حاليًا لقسم: ${unavailablePart.label}`);\n      result.hidden = true;\n      return;\n    }\n    const total = generatedBuild.reduce((sum, item) => sum + (item.product?.price || 0), 0);\n    if (total > budget) {\n      alert(\"لا توجد تجميعة تجريبية مناسبة ضمن هذه الميزانية حاليًا. سنضيف خيارات أكثر عند ربط منتجات المتجر.\");\n    }\n    titleElement.textContent = purpose === \"gaming\" ? `تجميعة ألعاب ${resolution}` : purpose === \"streaming\" ? `تجميعة ألعاب وبث ${resolution}` : purpose === \"design\" ? \"تجميعة تصميم ومونتاج\" : \"تجميعة أعمال احترافية\";\n    partsContainer.innerHTML = generatedBuild.map(item => `\n          <div class=\"apex-budget-part\">\n            <span>${item.label}</span>\n            <strong>${item.product?.name || \"غير متوفر\"}</strong>\n          </div>\n        `).join(\"\");\n    totalElement.textContent = total.toLocaleString(\"ar-SA\");\n    result.hidden = false;\n    result.scrollIntoView({\n      behavior: \"smooth\",\n      block: \"start\"\n    });\n  });\n  document.getElementById(\"budget-add-cart\")?.addEventListener(\"click\", () => {\n    if (!generatedBuild.length) {\n      return;\n    }\n    const products = generatedBuild.map(item => item.product).filter(Boolean);\n    const missingSallaId = products.some(product => !product.sallaProductId);\n    if (missingSallaId) {\n      alert(\"التجميعة جاهزة، لكن يجب ربط القطع بمنتجات المتجر الحقيقية قبل إضافتها للسلة.\");\n      return;\n    }\n    const button = document.getElementById(\"budget-add-cart\");\n    button.disabled = true;\n    button.textContent = \"جارٍ إضافة التجميعة...\";\n    Promise.all(products.map(product => salla.cart.addItem({\n      id: product.sallaProductId,\n      quantity: 1\n    }))).then(() => {\n      button.textContent = \"تمت الإضافة إلى السلة\";\n      window.location.href = salla.url.get(\"cart\");\n    }).catch(error => {\n      console.error(\"Apex budget cart error:\", error);\n      button.disabled = false;\n      button.textContent = \"أضف التجميعة إلى السلة\";\n      alert(\"تعذر إضافة بعض القطع إلى السلة.\");\n    });\n  });\n}\nif (document.readyState === \"loading\") {\n  document.addEventListener(\"DOMContentLoaded\", initApexBudgetBuilder);\n} else {\n  initApexBudgetBuilder();\n}\n\n//# sourceURL=webpack://apex-pc-theme/./src/assets/js/apex-builder/budget-builder.js?\n}");

/***/ },

/***/ "./src/assets/js/apex-builder/compatibility.js"
/*!*****************************************************!*\
  !*** ./src/assets/js/apex-builder/compatibility.js ***!
  \*****************************************************/
() {

eval("{window.ApexCompatibility = {\n  getRecommendedWattage(selected) {\n    const baseWattage = 80;\n    const total = baseWattage + (selected.cpu?.wattage || 0) + (selected.gpu?.wattage || 0) + (selected.storage?.wattage || 0) + (selected.cooler?.wattage || 0);\n    return Math.ceil(total * 1.35 / 50) * 50;\n  },\n  check(selected) {\n    const errors = [];\n    if (selected.cpu && selected.motherboard && selected.cpu.socket !== selected.motherboard.socket) {\n      errors.push(\"سوكيت المعالج غير متوافق مع اللوحة الأم.\");\n    }\n    if (selected.motherboard && selected.ram && selected.motherboard.ramType !== selected.ram.ramType) {\n      errors.push(\"نوع الذاكرة غير متوافق مع اللوحة الأم.\");\n    }\n    if (selected.cpu && selected.cooler && !selected.cooler.sockets.includes(selected.cpu.socket)) {\n      errors.push(\"المبرد غير متوافق مع سوكيت المعالج.\");\n    }\n    if (selected.motherboard && selected.case && !selected.case.formFactors.includes(selected.motherboard.formFactor)) {\n      errors.push(\"حجم اللوحة الأم غير مناسب للكيس.\");\n    }\n    if (selected.gpu && selected.case && selected.gpu.length > selected.case.maxGpuLength) {\n      errors.push(\"طول كرت الشاشة أكبر من المساحة المتوفرة داخل الكيس.\");\n    }\n    if (selected.cooler?.radiatorSize && selected.case && !selected.case.radiatorSizes.includes(selected.cooler.radiatorSize)) {\n      errors.push(\"حجم رديتر التبريد غير مدعوم في الكيس.\");\n    }\n    const recommendedWattage = this.getRecommendedWattage(selected);\n    if (selected.psu && selected.psu.capacity < recommendedWattage) {\n      errors.push(`مزود الطاقة ضعيف. القدرة المقترحة هي ${recommendedWattage} واط أو أكثر.`);\n    }\n    return {\n      compatible: errors.length === 0,\n      errors,\n      recommendedWattage\n    };\n  }\n};\n\n//# sourceURL=webpack://apex-pc-theme/./src/assets/js/apex-builder/compatibility.js?\n}");

/***/ },

/***/ "./src/assets/js/apex-builder/pc-builder.js"
/*!**************************************************!*\
  !*** ./src/assets/js/apex-builder/pc-builder.js ***!
  \**************************************************/
() {

eval("{function initApexPcBuilder() {\n  const builder = document.getElementById(\"apex-pc-builder\");\n  if (!builder || !window.ApexProducts || !window.ApexCompatibility) {\n    return;\n  }\n  const partLabels = {\n    cpu: \"المعالج\",\n    motherboard: \"اللوحة الأم\",\n    gpu: \"كرت الشاشة\",\n    ram: \"الذاكرة\",\n    storage: \"التخزين\",\n    cooler: \"التبريد\",\n    psu: \"مزود الطاقة\",\n    case: \"الكيس\"\n  };\n  const requiredParts = Object.keys(partLabels);\n  const selected = {};\n  const statusElement = document.getElementById(\"builder-status\");\n  const selectedPartsElement = document.getElementById(\"builder-selected-parts\");\n  const totalElement = document.getElementById(\"builder-total\");\n  const wattageElement = document.getElementById(\"builder-wattage\");\n  const warningElement = document.getElementById(\"builder-warning\");\n  const addCartButton = document.getElementById(\"builder-add-cart\");\n  function getSelect(part) {\n    return document.getElementById(`builder-${part}`);\n  }\n  function fillSelect(part, products, disabled = false) {\n    const select = getSelect(part);\n    if (!select) {\n      return;\n    }\n    const currentValue = select.value;\n    select.innerHTML = `\n      <option value=\"\">اختر ${partLabels[part]}</option>\n      ${products.map(product => `\n            <option value=\"${product.id}\">\n              ${product.name} — ${product.price.toLocaleString(\"ar-SA\")} ر.س\n            </option>\n          `).join(\"\")}\n    `;\n    select.disabled = disabled;\n    if (products.some(product => String(product.id) === currentValue)) {\n      select.value = currentValue;\n    }\n  }\n  function initializeSelects() {\n    fillSelect(\"cpu\", window.ApexProducts.cpu);\n    fillSelect(\"gpu\", window.ApexProducts.gpu);\n    fillSelect(\"storage\", window.ApexProducts.storage);\n    fillSelect(\"motherboard\", [], true);\n    fillSelect(\"ram\", [], true);\n    fillSelect(\"cooler\", [], true);\n    fillSelect(\"psu\", [], true);\n    fillSelect(\"case\", [], true);\n  }\n  function updateAvailableParts() {\n    const cpu = selected.cpu;\n    const motherboard = selected.motherboard;\n    const gpu = selected.gpu;\n    const cooler = selected.cooler;\n    if (cpu) {\n      const boards = window.ApexProducts.motherboard.filter(item => item.socket === cpu.socket);\n      fillSelect(\"motherboard\", boards);\n      fillSelect(\"cooler\", window.ApexProducts.cooler.filter(item => item.sockets.includes(cpu.socket)));\n    }\n    if (motherboard) {\n      fillSelect(\"ram\", window.ApexProducts.ram.filter(item => item.ramType === motherboard.ramType));\n    }\n    if (motherboard && gpu) {\n      const cases = window.ApexProducts.case.filter(item => item.formFactors.includes(motherboard.formFactor) && item.maxGpuLength >= gpu.length && (!cooler?.radiatorSize || item.radiatorSizes.includes(cooler.radiatorSize)));\n      fillSelect(\"case\", cases);\n    }\n    const recommendation = window.ApexCompatibility.getRecommendedWattage(selected);\n    fillSelect(\"psu\", window.ApexProducts.psu.filter(item => item.capacity >= recommendation));\n  }\n  function updateSummary() {\n    const chosenParts = requiredParts.filter(part => selected[part]);\n    if (!chosenParts.length) {\n      selectedPartsElement.innerHTML = `\n        <p class=\"apex-builder-empty\">\n          لم يتم اختيار أي قطعة بعد.\n        </p>\n      `;\n    } else {\n      selectedPartsElement.innerHTML = chosenParts.map(part => {\n        const product = selected[part];\n        return `\n            <div class=\"apex-selected-item\">\n              <div>\n                <span>${partLabels[part]}</span>\n                <strong>${product.name}</strong>\n              </div>\n              <b>${product.price.toLocaleString(\"ar-SA\")} ر.س</b>\n            </div>\n          `;\n      }).join(\"\");\n    }\n    const total = chosenParts.reduce((sum, part) => sum + selected[part].price, 0);\n    const compatibility = window.ApexCompatibility.check(selected);\n    const complete = requiredParts.every(part => selected[part]);\n    totalElement.textContent = total.toLocaleString(\"ar-SA\");\n    wattageElement.textContent = `${compatibility.recommendedWattage} واط`;\n    warningElement.hidden = compatibility.errors.length === 0;\n    warningElement.innerHTML = compatibility.errors.join(\"<br>\");\n    statusElement.className = \"apex-builder-status\";\n    if (compatibility.errors.length) {\n      statusElement.classList.add(\"is-warning\");\n      statusElement.textContent = \"تحتاج تعديل\";\n    } else if (complete) {\n      statusElement.classList.add(\"is-compatible\");\n      statusElement.textContent = \"متوافقة بالكامل\";\n    } else {\n      statusElement.classList.add(\"is-pending\");\n      statusElement.textContent = \"بانتظار الاختيارات\";\n    }\n    addCartButton.disabled = !complete || !compatibility.compatible;\n    document.querySelectorAll(\".apex-builder-step\").forEach(step => {\n      step.classList.toggle(\"is-selected\", Boolean(selected[step.dataset.part]));\n    });\n  }\n  requiredParts.forEach(part => {\n    const select = getSelect(part);\n    if (!select) {\n      return;\n    }\n    select.addEventListener(\"change\", event => {\n      const product = window.ApexProducts[part].find(item => String(item.id) === event.target.value);\n      if (product) {\n        selected[part] = product;\n      } else {\n        delete selected[part];\n      }\n      if (part === \"cpu\") {\n        delete selected.motherboard;\n        delete selected.ram;\n        delete selected.cooler;\n        delete selected.psu;\n        delete selected.case;\n      }\n      if (part === \"motherboard\") {\n        delete selected.ram;\n        delete selected.case;\n      }\n      if (part === \"gpu\") {\n        delete selected.psu;\n        delete selected.case;\n      }\n      if (part === \"cooler\") {\n        delete selected.psu;\n        delete selected.case;\n      }\n      updateAvailableParts();\n      updateSummary();\n    });\n  });\n  addCartButton.addEventListener(\"click\", () => {\n    alert(\"واجهة التجميعة تعمل. سنربط هذا الزر بمنتجات متجر سلة بعد إضافة أرقام المنتجات الحقيقية.\");\n  });\n  initializeSelects();\n  updateSummary();\n}\nif (document.readyState === \"loading\") {\n  document.addEventListener(\"DOMContentLoaded\", initApexPcBuilder);\n} else {\n  initApexPcBuilder();\n}\n\n//# sourceURL=webpack://apex-pc-theme/./src/assets/js/apex-builder/pc-builder.js?\n}");

/***/ },

/***/ "./src/assets/js/apex-builder/products-data.js"
/*!*****************************************************!*\
  !*** ./src/assets/js/apex-builder/products-data.js ***!
  \*****************************************************/
() {

eval("{window.ApexProducts = {\n  cpu: [{\n    id: 101,\n    sallaProductId: null,\n    name: \"AMD Ryzen 5 7600\",\n    price: 849,\n    socket: \"AM5\",\n    ramType: \"DDR5\",\n    wattage: 65\n  }, {\n    id: 102,\n    sallaProductId: null,\n    name: \"AMD Ryzen 7 7800X3D\",\n    price: 1649,\n    socket: \"AM5\",\n    ramType: \"DDR5\",\n    wattage: 120\n  }, {\n    id: 103,\n    sallaProductId: null,\n    name: \"Intel Core i5-14400F\",\n    price: 899,\n    socket: \"LGA1700\",\n    ramType: \"DDR5\",\n    wattage: 148\n  }],\n  motherboard: [{\n    id: 201,\n    sallaProductId: null,\n    name: \"B650 Gaming WiFi DDR5\",\n    price: 749,\n    socket: \"AM5\",\n    ramType: \"DDR5\",\n    formFactor: \"ATX\"\n  }, {\n    id: 202,\n    sallaProductId: null,\n    name: \"B650M Gaming DDR5\",\n    price: 599,\n    socket: \"AM5\",\n    ramType: \"DDR5\",\n    formFactor: \"MATX\"\n  }, {\n    id: 203,\n    sallaProductId: null,\n    name: \"B760 Gaming WiFi DDR5\",\n    price: 699,\n    socket: \"LGA1700\",\n    ramType: \"DDR5\",\n    formFactor: \"ATX\"\n  }],\n  gpu: [{\n    id: 301,\n    sallaProductId: null,\n    name: \"RTX 4060 8GB\",\n    price: 1499,\n    wattage: 115,\n    length: 250\n  }, {\n    id: 302,\n    sallaProductId: null,\n    name: \"RTX 4070 Super 12GB\",\n    price: 2799,\n    wattage: 220,\n    length: 300\n  }, {\n    id: 303,\n    sallaProductId: null,\n    name: \"RTX 5070 12GB\",\n    price: 3299,\n    wattage: 250,\n    length: 305\n  }],\n  ram: [{\n    id: 401,\n    sallaProductId: null,\n    name: \"16GB DDR5 5600MHz\",\n    price: 249,\n    ramType: \"DDR5\"\n  }, {\n    id: 402,\n    sallaProductId: null,\n    name: \"32GB DDR5 6000MHz\",\n    price: 449,\n    ramType: \"DDR5\"\n  }],\n  storage: [{\n    id: 501,\n    sallaProductId: null,\n    name: \"NVMe SSD 1TB\",\n    price: 299,\n    wattage: 8\n  }, {\n    id: 502,\n    sallaProductId: null,\n    name: \"NVMe SSD 2TB\",\n    price: 549,\n    wattage: 10\n  }],\n  cooler: [{\n    id: 601,\n    sallaProductId: null,\n    name: \"Air Cooler 120mm\",\n    price: 159,\n    sockets: [\"AM5\", \"LGA1700\"],\n    radiatorSize: 0,\n    wattage: 5\n  }, {\n    id: 602,\n    sallaProductId: null,\n    name: \"Liquid Cooler 240mm\",\n    price: 399,\n    sockets: [\"AM5\", \"LGA1700\"],\n    radiatorSize: 240,\n    wattage: 15\n  }, {\n    id: 603,\n    sallaProductId: null,\n    name: \"Liquid Cooler 360mm\",\n    price: 599,\n    sockets: [\"AM5\", \"LGA1700\"],\n    radiatorSize: 360,\n    wattage: 20\n  }],\n  psu: [{\n    id: 701,\n    sallaProductId: null,\n    name: \"650W 80+ Bronze\",\n    price: 299,\n    capacity: 650\n  }, {\n    id: 702,\n    sallaProductId: null,\n    name: \"750W 80+ Gold\",\n    price: 449,\n    capacity: 750\n  }, {\n    id: 703,\n    sallaProductId: null,\n    name: \"850W 80+ Gold\",\n    price: 599,\n    capacity: 850\n  }],\n  case: [{\n    id: 801,\n    sallaProductId: null,\n    name: \"Apex Flow ATX Case\",\n    price: 349,\n    formFactors: [\"ATX\", \"MATX\"],\n    maxGpuLength: 340,\n    radiatorSizes: [240, 360]\n  }, {\n    id: 802,\n    sallaProductId: null,\n    name: \"Apex Mini MATX Case\",\n    price: 279,\n    formFactors: [\"MATX\"],\n    maxGpuLength: 290,\n    radiatorSizes: [240]\n  }]\n};\n\n//# sourceURL=webpack://apex-pc-theme/./src/assets/js/apex-builder/products-data.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/apex-builder.js");
/******/ 	
/******/ })()
;