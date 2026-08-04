window.ApexCompatibility = {
  getRecommendedWattage(selected) {
    const baseWattage = 80;

    const total =
      baseWattage +
      (selected.cpu?.wattage || 0) +
      (selected.gpu?.wattage || 0) +
      (selected.storage?.wattage || 0) +
      (selected.cooler?.wattage || 0);

    return Math.ceil((total * 1.35) / 50) * 50;
  },

  check(selected) {
    const errors = [];

    if (
      selected.cpu &&
      selected.motherboard &&
      selected.cpu.socket !== selected.motherboard.socket
    ) {
      errors.push("سوكيت المعالج غير متوافق مع اللوحة الأم.");
    }

    if (
      selected.motherboard &&
      selected.ram &&
      selected.motherboard.ramType !== selected.ram.ramType
    ) {
      errors.push("نوع الذاكرة غير متوافق مع اللوحة الأم.");
    }

    if (
      selected.cpu &&
      selected.cooler &&
      !selected.cooler.sockets.includes(selected.cpu.socket)
    ) {
      errors.push("المبرد غير متوافق مع سوكيت المعالج.");
    }

    if (
      selected.motherboard &&
      selected.case &&
      !selected.case.formFactors.includes(selected.motherboard.formFactor)
    ) {
      errors.push("حجم اللوحة الأم غير مناسب للكيس.");
    }

    if (
      selected.gpu &&
      selected.case &&
      selected.gpu.length > selected.case.maxGpuLength
    ) {
      errors.push("طول كرت الشاشة أكبر من المساحة المتوفرة داخل الكيس.");
    }

    if (
      selected.cooler?.radiatorSize &&
      selected.case &&
      !selected.case.radiatorSizes.includes(selected.cooler.radiatorSize)
    ) {
      errors.push("حجم رديتر التبريد غير مدعوم في الكيس.");
    }

    const recommendedWattage = this.getRecommendedWattage(selected);

    if (
      selected.psu &&
      selected.psu.capacity < recommendedWattage
    ) {
      errors.push(
        `مزود الطاقة ضعيف. القدرة المقترحة هي ${recommendedWattage} واط أو أكثر.`
      );
    }

    return {
      compatible: errors.length === 0,
      errors,
      recommendedWattage
    };
  }
};