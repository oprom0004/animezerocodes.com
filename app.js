// AnimeZeroCodes.com - Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  // Toast element
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.id = 'toastMsg';
  document.body.appendChild(toast);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Copy Code Functionality
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      if (!code) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          handleSuccess(btn, code);
        }).catch(() => {
          fallbackCopy(code, btn);
        });
      } else {
        fallbackCopy(code, btn);
      }
    });
  });

  function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      handleSuccess(btn, text);
    } catch (err) {
      showToast('Failed to copy. Please copy manually: ' + text);
    }
    document.body.removeChild(textarea);
  }

  function handleSuccess(btn, code) {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '✓ COPIED!';
    showToast(`✓ Copied "${code}" to clipboard! Paste it in Anime Zero.`);
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalText;
    }, 2000);
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const topNav = document.getElementById('topNav');
  if (mobileBtn && topNav) {
    mobileBtn.addEventListener('click', () => {
      topNav.classList.toggle('open');
    });
  }
});
