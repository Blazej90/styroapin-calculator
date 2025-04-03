const packVolumes = {
  zwykły: {
    1: 0.3,
    2: 0.3,
    3: 0.3,
    4: 0.3,
    5: 0.3,
    6: 0.3,
    7: 0.28,
    8: 0.28,
    9: 0.27,
    10: 0.3,
    11: 0.275,
    12: 0.3,
    14: 0.28,
    15: 0.3,
    16: 0.24,
    17: 0.255,
    18: 0.27,
    20: 0.3,
  },
  frezowany: {
    5: 0.28,
    6: 0.28,
    7: 0.26,
    8: 0.26,
    9: 0.25,
    10: 0.28,
    11: 0.28,
    12: 0.26,
    14: 0.26,
    15: 0.28,
    16: 0.23,
    17: 0.24,
    18: 0.25,
    20: 0.28,
  },
};

function calculatePacks() {
  const area = parseFloat(document.getElementById("area").value);
  const thicknessCm = parseFloat(document.getElementById("thickness").value);
  const type = document.getElementById("type").value;
  const thicknessInt = parseInt(thicknessCm);

  const volumeEl = document.getElementById("volume");
  const packVolumeEl = document.getElementById("packVolume");
  const packsEl = document.getElementById("packs");
  const resultEl = document.getElementById("result");
  const calculator = document.querySelector(".calculator");

  volumeEl.textContent = "–";
  packVolumeEl.textContent = "–";
  packsEl.textContent = "–";
  resultEl.textContent = "";
  hideResultGroups();

  // Walidacja wejściowa
  if (
    isNaN(area) ||
    isNaN(thicknessCm) ||
    area <= 0 ||
    thicknessCm <= 0 ||
    !Number.isInteger(area) ||
    !Number.isInteger(thicknessCm)
  ) {
    showError(
      "Wprowadź poprawne liczby całkowite większe od zera.",
      calculator
    );
    return;
  }

  const packVolume = packVolumes[type]?.[thicknessInt];

  if (!packVolume) {
    showError(
      `Brak danych dla grubości ${thicknessInt} mm (${type}).`,
      calculator
    );
    return;
  }

  const thicknessM = thicknessCm / 100;
  const neededVolume = area * thicknessM;
  const neededPacks = Math.ceil(neededVolume / packVolume);

  volumeEl.textContent = neededVolume.toFixed(2);
  packVolumeEl.textContent = packVolume.toFixed(3);
  packsEl.textContent = neededPacks;

  resultEl.innerHTML = `
    Potrzebujesz <strong>${neededPacks}</strong> paczek styropianu.<br>
    Całkowita objętość: <strong>${neededVolume.toFixed(2)} m³</strong>.<br>
    Rodzaj styropianu: <strong>${type}</strong>.
  `;

  showResultGroups();
}

function showResultGroups() {
  document.querySelectorAll(".result-group").forEach((group) => {
    group.classList.add("visible");
  });
}

function hideResultGroups() {
  document.querySelectorAll(".result-group").forEach((group) => {
    group.classList.remove("visible");
  });
}

function showError(message, element) {
  const resultEl = document.getElementById("result");
  resultEl.textContent = message;
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 400);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateBtn")
    ?.addEventListener("click", calculatePacks);

  document.getElementById("resetBtn")?.addEventListener("click", function () {
    document.getElementById("area").value = "";
    document.getElementById("thickness").value = "";
    document.getElementById("type").value = "zwykły";

    document.getElementById("volume").textContent = "–";
    document.getElementById("packVolume").textContent = "–";
    document.getElementById("packs").textContent = "–";
    document.getElementById("result").textContent = "";

    hideResultGroups();
  });
});
