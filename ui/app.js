const modal = document.getElementById("analysis-modal");
const toast = document.getElementById("toast");
const pageTitle = document.getElementById("page-title");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    pageTitle.textContent = item.dataset.view;
    showToast(`${item.dataset.view} workspace selected`);
  });
});

document.getElementById("new-analysis").addEventListener("click", () => {
  modal.hidden = false;
  document.getElementById("amount-input").focus();
});
document.getElementById("close-modal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (event) => { if (event.target === modal) modal.hidden = true; });

document.getElementById("analysis-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(document.getElementById("amount-input").value);
  const type = document.getElementById("type-input").value;
  const location = document.getElementById("location-input").value;
  let score = amount > 10000 ? 41 : amount > 2000 ? 25 : 12;
  if (type === "wire") score += 12;
  if (type === "atm") score += 8;
  if (location === "new") score += 17;
  if (location === "cross") score += 26;
  const result = document.getElementById("analysis-result");
  const isHighRisk = score >= 55;
  result.hidden = false;
  result.className = `analysis-result ${isHighRisk ? "warn" : "safe"}`;
  result.innerHTML = `<strong>${isHighRisk ? "Review recommended" : "Low risk detected"}</strong><br>Network score: ${score}/100 · ${isHighRisk ? "Additional verification is recommended before settlement." : "Transaction behavior is consistent with the customer profile."}`;
});

document.querySelectorAll(".review-button").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const id = row.querySelector(".transaction-id").textContent;
    button.textContent = "Assigned";
    button.disabled = true;
    button.style.opacity = ".65";
    showToast(`${id} assigned to your investigation queue`);
  });
});

document.getElementById("date-filter").addEventListener("click", () => showToast("Date range options are ready"));
document.getElementById("chart-range").addEventListener("click", () => showToast("Chart range set to weekly"));
document.getElementById("view-alerts").addEventListener("click", () => {
  document.querySelector(".alerts-panel").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.getElementById("network-details").addEventListener("click", () => showToast("Opening network performance details"));
