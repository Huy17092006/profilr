// Payment Configuration
const PAYMENT_CONFIG = {
    accountNumber: '42051799999',
    accountName: 'PHUNG GIA HUY',
    bank: 'MB',
    amount: 30000
};

// Form Submission - Step 1
document.getElementById('bioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate username
    const username = document.getElementById('username').value.trim();
    const usernameError = document.getElementById('usernameError');
    
    // Check username format (no spaces, no special chars except dash/underscore)
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        usernameError.textContent = 'Username chỉ chứa chữ, số, dấu gạch ngang và gạch dưới';
        return;
    }
    
    if (username.length < 3) {
        usernameError.textContent = 'Username tối thiểu 3 ký tự';
        return;
    }
    
    usernameError.textContent = '';
    
    // Check if username already exists
    const allBios = JSON.parse(localStorage.getItem('allBios') || '{}');
    if (allBios[username]) {
        usernameError.textContent = 'Username này đã được sử dụng';
        return;
    }
    
    // Save form data temporarily
    const bioData = {
        username: username,
        fullname: document.getElementById('fullname').value,
        avatar: document.getElementById('avatar').value || 'https://via.placeholder.com/150?text=' + username,
        bio: document.getElementById('bio').value,
        instagram: document.getElementById('instagram').value,
        facebook: document.getElementById('facebook').value,
        tiktok: document.getElementById('tiktok').value,
        website: document.getElementById('website').value,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('tempBioData', JSON.stringify(bioData));
    
    // Generate QR Code
    generateQRCode(username);
    
    // Switch to step 2
    goToStep2();
});

// Generate QR Code for Bank Transfer
function generateQRCode(username) {
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = ''; // Clear previous QR
    
    // Generate Viettel NAPAS QR Code format
    const transferContent = `bio-${username}`;
    const qrData = `00020126360014vn.com.vietqr010412100366${PAYMENT_CONFIG.bank}0010${PAYMENT_CONFIG.accountNumber}01050000000${PAYMENT_CONFIG.amount}0208TRANSFER5410VN63041000`;
    
    // Using QR Code JS library
    new QRCode(qrContainer, {
        text: generateVietQRString(username),
        width: 300,
        height: 300,
        colorDark: "#667eea",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Generate VietQR format (MB Bank)
function generateVietQRString(username) {
    // Simplified QR format for MB Bank
    const transferContent = `bio-${username}`;
    return `https://img.vietqr.io/image/${PAYMENT_CONFIG.bank}-${PAYMENT_CONFIG.accountNumber}-compact.png?amount=${PAYMENT_CONFIG.amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(PAYMENT_CONFIG.accountName)}`;
}

// Switch to Step 2
function goToStep2() {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Go back to Step 1
function goBackStep1() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Confirm Payment and Create Bio Link
document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    const tempData = JSON.parse(localStorage.getItem('tempBioData'));
    
    if (!tempData) {
        alert('Dữ liệu bio không tìm thấy');
        return;
    }
    
    // Save bio to localStorage
    const allBios = JSON.parse(localStorage.getItem('allBios') || '{}');
    allBios[tempData.username] = tempData;
    localStorage.setItem('allBios', JSON.stringify(allBios));
    
    // Clear temp data
    localStorage.removeItem('tempBioData');
    
    // Show success step
    showSuccessStep(tempData.username);
});

// Show Success Step
function showSuccessStep(username) {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
    
    const bioLink = `${window.location.origin}/bio.html?user=${username}`;
    document.getElementById('bioLink').textContent = bioLink;
    
    window.scrollTo(0, 0);
}

// Copy Link to Clipboard
function copyToClipboard() {
    const linkText = document.getElementById('bioLink').textContent;
    navigator.clipboard.writeText(linkText).then(() => {
        alert('✓ Đã copy link!');
    });
}

// View Bio
function viewBio() {
    const tempData = JSON.parse(localStorage.getItem('tempBioData'));
    const bioLink = `${window.location.origin}/bio.html?user=${tempData ? tempData.username : ''}`;
    window.open(bioLink, '_blank');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Clear temp data on page load
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Don't clear if already on step 2 or 3
        if (!document.getElementById('step2').classList.contains('hidden') === false) {
            // Keep data for navigation
        }
    }
});
