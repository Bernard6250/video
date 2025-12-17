document.addEventListener('DOMContentLoaded', () => {
    // Optional: Add simple animation or interaction logic here
    const downloadBtns = document.querySelectorAll('.download-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Because these are local files, the browser usually handles download immediately.
            // visual feedback for the user:
            const originalText = btn.innerHTML;
            const originalWidth = btn.offsetWidth;
            
            // Lock width to prevent layout shift
            btn.style.width = `${originalWidth}px`;
            
            btn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                ...
            `;
            btn.classList.add('downloading');

            // Reset button state after a short delay to simulate "started"
            // Since we can't truly track download progress of a direct link without XHR/Blob complexity which might break large files
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('downloading');
                btn.style.width = ''; // Unlock width
                
                // Show a small toast/check mark
                showToast('Téléchargement lancé');
            }, 1500);
        });
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    // Add toast styles dynamically if not in CSS
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#10b981';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    toast.style.zIndex = '1000';
    toast.style.animation = 'fadeIn 0.3s ease-out';
    
    // Keyframes for fade in would typically be in CSS, but this works for a quick JS inject
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add simple spinner animation style to head
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
.spinner {
    animation: spin 1s linear infinite;
}
`;
document.head.appendChild(styleSheet);
