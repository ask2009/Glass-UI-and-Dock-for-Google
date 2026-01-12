const storage =
  typeof chrome !== "undefined" && chrome.storage
    ? chrome.storage
    : browser.storage;

const DEFAULT_PINNED_APPS = [
  { href: "https://chatgpt.com" },
  { href: "https://icloud.com" },
  { href: "https://youtube.com" },
  { href: "https://epicgames.com" },
  { href: "https://github.com" },
  { href:  "https://abema.tv" },
  { href: "https://x.com" },
];

const resetBtn = document.getElementById("reset-btn");
const statusEl = document.getElementById("status");

// Add shimmer effect element
const shimmer = document.createElement("span");
shimmer.className = "shimmer";
resetBtn.appendChild(shimmer);

function showStatus(message, type = "success") {
  statusEl.textContent = message;
  statusEl.className = `show ${type}`;
  
  setTimeout(() => {
    statusEl.classList.remove("show");
  }, 3000);
}

// Ripple effect on click
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect. top - size / 2;
  
  ripple.style. width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

resetBtn.addEventListener("mousedown", createRipple);

resetBtn.addEventListener("click", async () => {
  try {
    resetBtn.disabled = true;
    resetBtn.classList.add("loading");
    
    await storage.local.set({
      pinnedApps: DEFAULT_PINNED_APPS,
    });

    showStatus("設定を初期状態に戻しました", "success");
  } catch (error) {
    showStatus("エラーが発生しました", "error");
    console.error("Reset error:", error);
  } finally {
    resetBtn.disabled = false;
    resetBtn.classList. remove("loading");
  }
});