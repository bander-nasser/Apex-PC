document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("apex-budget-builder");

  if (!page || !window.ApexProducts) {
    return;
  }

  const amountInput = document.getElementById("budget-amount");
  const purposeSelect = document.getElementById("budget-purpose");
  const resolutionSelect = document.getElementById("budget-resolution");
  const generateButton = document.getElementById("budget-generate");
  const result = document.getElementById("budget-result");
  const partsContainer = document.getElementById("budget-build-parts");
  const totalElement = document.getElementById("budget-build-total");
  const titleElement = document.getElementById("budget-build-title");

  let generatedBuild = [];

  function getCheapest(list, filter = () => true) {
    return list
      .filter(filter)
      .sort((a, b) => a.price - b.price)[0];
  }

  function getMostExpensiveWithin(list, maxPrice) {
    return list
      .filter(item => item.price <= maxPrice)
      .sort((a, b) => b.price - a.price)[0] || list[0];
  }

  function generateBuild(budget, resolution) {
    const gpuShare =
      resolution === "4k" ? 0.42 :
      resolution === "1440p" ? 0.36 :
      0.29;

    const cpuShare = 0.19;

    const gpu = getMostExpensiveWithin(
      window.ApexProducts.gpu,
      budget * gpuShare
    );

    const cpu = getMostExpensiveWithin(
      window.ApexProducts.cpu,
      budget * cpuShare
    );

    const motherboard = getCheapest(
      window.ApexProducts.motherboard,
      item => item.socket === cpu.socket
    );

    const ram = getCheapest(
      window.ApexProducts.ram,
      item => item.ramType === motherboard.ramType
    );

    const storage =
      budget >= 9000
        ? window.ApexProducts.storage[1]
        : window.ApexProducts.storage[0];

    const cooler =
      cpu.wattage >= 100
        ? window.ApexProducts.cooler[1]
        : window.ApexProducts.cooler[0];

    const caseItem = getCheapest(
      window.ApexProducts.case,
      item =>
        item.formFactors.includes(motherboard.formFactor) &&
        item.maxGpuLength >= gpu.length &&
        (!cooler.radiatorSize ||
          item.radiatorSizes.includes(cooler.radiatorSize))
    );

    const estimatedPower =
      Math.ceil(
        (
          (cpu.wattage + gpu.wattage + 100) * 1.35
        ) / 50
      ) * 50;

    const psu = getCheapest(
      window.ApexProducts.psu,
      item => item.capacity >= estimatedPower
    );

    return [
      { label: "المعالج", product: cpu },
      { label: "اللوحة الأم", product: motherboard },
      { label: "كرت الشاشة", product: gpu },
      { label: "الذاكرة", product: ram },
      { label: "التخزين", product: storage },
      { label: "التبريد", product: cooler },
      { label: "مزود الطاقة", product: psu },
      { label: "الكيس", product: caseItem }
    ];
  }

  generateButton.addEventListener("click", () => {
    const budget = Number(amountInput.value);
    const purpose = purposeSelect.value;
    const resolution = resolutionSelect.value;

    if (!budget || budget < 3000 || budget > 30000) {
      alert("اكتبي ميزانية بين 3000 و30000 ريال.");
      return;
    }

    if (!purpose || !resolution) {
      alert("اختاري الاستخدام والدقة المطلوبة.");
      return;
    }

    generatedBuild = generateBuild(budget, resolution);
    const unavailablePart = generatedBuild.find(
  item => !item.product
);

if (unavailablePart) {
  alert(
    `لا يوجد خيار مناسب حاليًا لقسم: ${unavailablePart.label}`
  );
  result.hidden = true;
  return;
}

    const total = generatedBuild.reduce(
      (sum, item) => sum + (item.product?.price || 0),
      0
    );

    if (total > budget) {
      alert(
        "لا توجد تجميعة تجريبية مناسبة ضمن هذه الميزانية حاليًا. سنضيف خيارات أكثر عند ربط منتجات المتجر."
      );
    }

    titleElement.textContent =
      purpose === "gaming"
        ? `تجميعة ألعاب ${resolution}`
        : purpose === "streaming"
          ? `تجميعة ألعاب وبث ${resolution}`
          : purpose === "design"
            ? "تجميعة تصميم ومونتاج"
            : "تجميعة أعمال احترافية";

    partsContainer.innerHTML = generatedBuild
      .map(
        item => `
          <div class="apex-budget-part">
            <span>${item.label}</span>
            <strong>${item.product?.name || "غير متوفر"}</strong>
          </div>
        `
      )
      .join("");

    totalElement.textContent = total.toLocaleString("ar-SA");
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

    document
    .getElementById("budget-add-cart")
    ?.addEventListener("click", () => {
      if (!generatedBuild.length) {
        return;
      }

      const products = generatedBuild
        .map(item => item.product)
        .filter(Boolean);

      const missingSallaId = products.some(
        product => !product.sallaProductId
      );

      if (missingSallaId) {
        alert(
          "التجميعة جاهزة، لكن يجب ربط القطع بمنتجات المتجر الحقيقية قبل إضافتها للسلة."
        );
        return;
      }

      const button = document.getElementById("budget-add-cart");

      button.disabled = true;
      button.textContent = "جارٍ إضافة التجميعة...";

      Promise.all(
        products.map(product =>
          salla.cart.addItem({
            id: product.sallaProductId,
            quantity: 1
          })
        )
      )
        .then(() => {
          button.textContent = "تمت الإضافة إلى السلة";
          window.location.href = salla.url.get("cart");
        })
        .catch(error => {
          console.error("Apex budget cart error:", error);
          button.disabled = false;
          button.textContent = "أضف التجميعة إلى السلة";
          alert("تعذر إضافة بعض القطع إلى السلة.");
        });
    });
});