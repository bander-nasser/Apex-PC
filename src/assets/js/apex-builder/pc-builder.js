document.addEventListener("DOMContentLoaded", () => {
  const builder = document.getElementById("apex-pc-builder");

  if (!builder || !window.ApexProducts || !window.ApexCompatibility) {
    return;
  }

  const partLabels = {
    cpu: "المعالج",
    motherboard: "اللوحة الأم",
    gpu: "كرت الشاشة",
    ram: "الذاكرة",
    storage: "التخزين",
    cooler: "التبريد",
    psu: "مزود الطاقة",
    case: "الكيس"
  };

  const requiredParts = Object.keys(partLabels);
  const selected = {};

  const statusElement = document.getElementById("builder-status");
  const selectedPartsElement = document.getElementById(
    "builder-selected-parts"
  );
  const totalElement = document.getElementById("builder-total");
  const wattageElement = document.getElementById("builder-wattage");
  const warningElement = document.getElementById("builder-warning");
  const addCartButton = document.getElementById("builder-add-cart");

  function getSelect(part) {
    return document.getElementById(`builder-${part}`);
  }

  function fillSelect(part, products, disabled = false) {
    const select = getSelect(part);

    if (!select) {
      return;
    }

    const currentValue = select.value;

    select.innerHTML = `
      <option value="">اختر ${partLabels[part]}</option>
      ${products
        .map(
          product => `
            <option value="${product.id}">
              ${product.name} — ${product.price.toLocaleString("ar-SA")} ر.س
            </option>
          `
        )
        .join("")}
    `;

    select.disabled = disabled;

    if (products.some(product => String(product.id) === currentValue)) {
      select.value = currentValue;
    }
  }

  function initializeSelects() {
    fillSelect("cpu", window.ApexProducts.cpu);
    fillSelect("gpu", window.ApexProducts.gpu);
    fillSelect("storage", window.ApexProducts.storage);

    fillSelect("motherboard", [], true);
    fillSelect("ram", [], true);
    fillSelect("cooler", [], true);
    fillSelect("psu", [], true);
    fillSelect("case", [], true);
  }

  function updateAvailableParts() {
    const cpu = selected.cpu;
    const motherboard = selected.motherboard;
    const gpu = selected.gpu;
    const cooler = selected.cooler;

    if (cpu) {
      const boards = window.ApexProducts.motherboard.filter(
        item => item.socket === cpu.socket
      );

      fillSelect("motherboard", boards);
      fillSelect(
        "cooler",
        window.ApexProducts.cooler.filter(item =>
          item.sockets.includes(cpu.socket)
        )
      );
    }

    if (motherboard) {
      fillSelect(
        "ram",
        window.ApexProducts.ram.filter(
          item => item.ramType === motherboard.ramType
        )
      );
    }

    if (motherboard && gpu) {
      const cases = window.ApexProducts.case.filter(
        item =>
          item.formFactors.includes(motherboard.formFactor) &&
          item.maxGpuLength >= gpu.length &&
          (!cooler?.radiatorSize ||
            item.radiatorSizes.includes(cooler.radiatorSize))
      );

      fillSelect("case", cases);
    }

    const recommendation =
      window.ApexCompatibility.getRecommendedWattage(selected);

    fillSelect(
      "psu",
      window.ApexProducts.psu.filter(
        item => item.capacity >= recommendation
      )
    );
  }

  function updateSummary() {
    const chosenParts = requiredParts.filter(part => selected[part]);

    if (!chosenParts.length) {
      selectedPartsElement.innerHTML = `
        <p class="apex-builder-empty">
          لم يتم اختيار أي قطعة بعد.
        </p>
      `;
    } else {
      selectedPartsElement.innerHTML = chosenParts
        .map(part => {
          const product = selected[part];

          return `
            <div class="apex-selected-item">
              <div>
                <span>${partLabels[part]}</span>
                <strong>${product.name}</strong>
              </div>
              <b>${product.price.toLocaleString("ar-SA")} ر.س</b>
            </div>
          `;
        })
        .join("");
    }

    const total = chosenParts.reduce(
      (sum, part) => sum + selected[part].price,
      0
    );

    const compatibility = window.ApexCompatibility.check(selected);
    const complete = requiredParts.every(part => selected[part]);

    totalElement.textContent = total.toLocaleString("ar-SA");
    wattageElement.textContent =
      `${compatibility.recommendedWattage} واط`;

    warningElement.hidden = compatibility.errors.length === 0;
    warningElement.innerHTML = compatibility.errors.join("<br>");

    statusElement.className = "apex-builder-status";

    if (compatibility.errors.length) {
      statusElement.classList.add("is-warning");
      statusElement.textContent = "تحتاج تعديل";
    } else if (complete) {
      statusElement.classList.add("is-compatible");
      statusElement.textContent = "متوافقة بالكامل";
    } else {
      statusElement.classList.add("is-pending");
      statusElement.textContent = "بانتظار الاختيارات";
    }

    addCartButton.disabled = !complete || !compatibility.compatible;

    document.querySelectorAll(".apex-builder-step").forEach(step => {
      step.classList.toggle(
        "is-selected",
        Boolean(selected[step.dataset.part])
      );
    });
  }

  requiredParts.forEach(part => {
    const select = getSelect(part);

    if (!select) {
      return;
    }

    select.addEventListener("change", event => {
      const product = window.ApexProducts[part].find(
        item => String(item.id) === event.target.value
      );

      if (product) {
        selected[part] = product;
      } else {
        delete selected[part];
      }

      if (part === "cpu") {
        delete selected.motherboard;
        delete selected.ram;
        delete selected.cooler;
        delete selected.case;
      }

      if (part === "motherboard") {
        delete selected.ram;
        delete selected.case;
      }

      if (part === "gpu" || part === "cooler") {
        delete selected.case;
      }

      updateAvailableParts();
      updateSummary();
    });
  });

  addCartButton.addEventListener("click", () => {
    alert(
      "واجهة التجميعة تعمل. سنربط هذا الزر بمنتجات متجر سلة بعد إضافة أرقام المنتجات الحقيقية."
    );
  });

  initializeSelects();
  updateSummary();
});