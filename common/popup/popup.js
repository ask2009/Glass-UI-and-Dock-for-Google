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
  { href: "https://abema.tv" },
  { href: "https://x.com" },
];

const DEFAULT_OTHER_APPS = [
  { href: "https://mail.google.com" },
  { href: "https://drive.google.com" },
  { href: "https://calendar.google.com" },
  { href: "https://netflix.com" },
  { href: "https://spotify.com" },
  { href: "https://reddit.com" },
];

const resetBtn = document.getElementById("reset-btn");
const statusEl = document.getElementById("status");
const optionButtons = document.querySelectorAll(".option-button");

let selectedOption = null;

function showStatus(message, type = "success") {
  statusEl.textContent = message;
  statusEl.className = `status show ${type}`;
  
  setTimeout(() => {
    statusEl.classList.remove("show");
  }, 3500);
}

// Ripple effect on click
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Handle option selection
optionButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const type = button.dataset.type;
    
    // Toggle selection
    if (selectedOption === type) {
      button.classList.remove("selected");
      selectedOption = null;
      resetBtn.disabled = true;
    } else {
      // Remove previous selection
      optionButtons.forEach(btn => btn.classList.remove("selected"));
      
      // Add new selection
      button.classList.add("selected");
      selectedOption = type;
      resetBtn.disabled = false;
    }
    
    // Add ripple effect
    createRipple(e);
  });
});

resetBtn.addEventListener("mousedown", createRipple);

resetBtn.addEventListener("click", async () => {
  if (!selectedOption) return;
  
  try {
    resetBtn.disabled = true;
    resetBtn.classList.add("loading");
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updateData = {};
    let message = "";
    
    switch (selectedOption) {
      case "pinned":
        updateData.pinnedApps = DEFAULT_PINNED_APPS;
        message = "✓ ピン留めアプリを初期状態に戻しました";
        break;
      case "other":
        updateData.otherApps = DEFAULT_OTHER_APPS;
        message = "✓ その他のアプリを初期状態に戻しました";
        break;
      case "all":
        updateData.pinnedApps = DEFAULT_PINNED_APPS;
        updateData.otherApps = DEFAULT_OTHER_APPS;
        message = "✓ すべての設定を初期状態に戻しました";
        break;
    }
    
    await storage.local.set(updateData);
    showStatus(message, "success");
    
    // Reset selection after successful reset
    setTimeout(() => {
      optionButtons.forEach(btn => btn.classList.remove("selected"));
      selectedOption = null;
      resetBtn.disabled = true;
    }, 1000);
    
  } catch (error) {
    showStatus("✗ エラーが発生しました", "error");
    console.error("Reset error:", error);
  } finally {
    resetBtn.disabled = false;
    resetBtn.classList.remove("loading");
  }
});