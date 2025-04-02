function calculatePacks() {
  const areaInput = document.getElementById("area").value;
  const thicknessInput = document.getElementById("thickness").value;
  const type = document.getElementById("type").value;

  const volumeEl = document.getElementById("volume");
  const packVolumeEl = document.getElementById("packVolume");
  const packsEl = document.getElementById("packs");
  const resultEl = document.getElementById("result");

  if (!volumeEl || !packVolumeEl || !packsEl || !resultEl) {
    console.error("Nie znaleziono elementów wynikowych w DOM.");
    return;
  }

  volumeEl.textContent = "–";
  packVolumeEl.textContent = "–";
  packsEl.textContent = "–";
  resultEl.textContent = "";
  hideResultGroups();

  const area = parseFloat(areaInput);
  const thicknessCm = parseFloat(thicknessInput);

  if (
    isNaN(area) ||
    isNaN(thicknessCm) ||
    area <= 0 ||
    thicknessCm <= 0 ||
    !Number.isInteger(area) ||
    !Number.isInteger(thicknessCm)
  ) {
    resultEl.textContent =
      "Wprowadź poprawne liczby całkowite większe od zera.";

    const calculator = document.querySelector(".calculator");
    calculator.classList.add("shake");

    setTimeout(() => {
      calculator.classList.remove("shake");
    }, 400);

    return;
  }

  const thicknessM = thicknessCm / 100;
  const neededVolume = area * thicknessM;

  const packVolume = type === "frezowany" ? 0.268 : 0.28;
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

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("calculateBtn");
  if (button) {
    button.addEventListener("click", calculatePacks);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("calculateBtn");
  if (button) {
    button.addEventListener("click", calculatePacks);
  }

  const resetButton = document.getElementById("resetBtn");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      document.getElementById("area").value = "";
      document.getElementById("thickness").value = "";
      document.getElementById("type").value = "zwykły";

      document.getElementById("volume").textContent = "–";
      document.getElementById("packVolume").textContent = "–";
      document.getElementById("packs").textContent = "–";
      document.getElementById("result").textContent = "";

      hideResultGroups();
    });
  }
});
