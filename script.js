// ==========================================
// Utility Functions
// ==========================================

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.length >= 2;
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    return strength;
}

// Error Handling
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input');
    
    errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
}

// ==========================================
// Navigation Functions
// ==========================================

function hideAll() {
    const containers = document.querySelectorAll('.form-container, .dashboard');
    containers.forEach(container => container.classList.add('hidden'));
}

function showCustomerLogin() {
    hideAll();
    clearErrors();
    document.getElementById('customerLogin').classList.remove('hidden');
}

function showRegister() {
    hideAll();
    clearErrors();
    document.getElementById('customerRegister').classList.remove('hidden');
}

function showAdminLogin() {
    hideAll();
    clearErrors();
    document.getElementById('adminLogin').classList.remove('hidden');
}

// ==========================================
// Initialization
// ==========================================

function initializeApp() {
    // Initialize default admin if no admins exist
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    
    if (admins.length === 0) {
        const defaultAdmin = {
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin123'
        };
        localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
        console.log('Default admin created - Email: admin@example.com, Password: admin123');
    }
}

// ==========================================
// Password Strength Indicator
// ==========================================

document.getElementById('registerPassword')?.addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthEl = document.getElementById('passwordStrength');
    const strength = checkPasswordStrength(password);

    if (password.length === 0) {
        strengthEl.textContent = '';
        return;
    }

    if (strength <= 2) {
        strengthEl.textContent = '🔴 Weak password';
        strengthEl.className = 'password-strength strength-weak';
    } else if (strength <= 3) {
        strengthEl.textContent = '🟡 Medium password';
        strengthEl.className = 'password-strength strength-medium';
    } else {
        strengthEl.textContent = '🟢 Strong password';
        strengthEl.className = 'password-strength strength-strong';
    }
});

// ==========================================
// Customer Login
// ==========================================

document.getElementById('customerLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('customerLoginEmail').value.trim();
    const password = document.getElementById('customerLoginPassword').value;

    let hasError = false;

    // if (!validateEmail(email)) {
    //     showError('customerLoginEmail', 'Please enter a valid email address');
    //     hasError = true;
    // }

    // if (!validatePassword(password)) {
    //     showError('customerLoginPassword', 'Password must be at least 6 characters');
    //     hasError = true;
    // }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'Home.html';
    } else {
        showError('customerLoginEmail', 'Invalid email or password');
    }
});

// ==========================================
// Customer Registration
// ==========================================

document.getElementById('customerRegisterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    let hasError = false;

    if (!validateName(name)) {
        showError('registerName', 'Name must be at least 2 characters long');
        hasError = true;
    }

    if (!validateEmail(email)) {
        showError('registerEmail', 'Please enter a valid email address');
        hasError = true;
    }

    if (!validatePassword(password)) {
        showError('registerPassword', 'Password must be at least 6 characters long');
        hasError = true;
    }

    if (password !== confirmPassword) {
        showError('registerConfirmPassword', 'Passwords do not match');
        hasError = true;
    }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === email)) {
        showError('registerEmail', 'An account with this email already exists');
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = 'Home.html';
});

// ==========================================
// Admin Login
// ==========================================

document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('adminLoginEmail').value.trim();
    const password = document.getElementById('adminLoginPassword').value;

    let hasError = false;

    // if (!validateEmail(email)) {
    //     showError('adminLoginEmail', 'Please enter a valid email address');
    //     hasError = true;
    // }

    // if (!validatePassword(password)) {
    //     showError('adminLoginPassword', 'Password must be at least 6 characters');
    //     hasError = true;
    // }

    if (hasError) return;

    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const admin = admins.find(a => a.email === email && a.password === password);

    if (admin) {
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
        window.location.href = '/ServerSide/ProductsManagement.html';
    } else {
        showError('adminLoginEmail', 'Invalid admin credentials');
    }
});

// ==========================================
// Add New Admin
// ==========================================

// document.getElementById('addAdminForm')?.addEventListener('submit', function(e) {
//     e.preventDefault();
//     clearErrors();

//     const name = document.getElementById('newAdminName').value.trim();
//     const email = document.getElementById('newAdminEmail').value.trim();
//     const password = document.getElementById('newAdminPassword').value;

//     let hasError = false;

//     if (!validateName(name)) {
//         showError('newAdminName', 'Name must be at least 2 characters long');
//         hasError = true;
//     }

//     if (!validateEmail(email)) {
//         showError('newAdminEmail', 'Please enter a valid email address');
//         hasError = true;
//     }

//     if (!validatePassword(password)) {
//         showError('newAdminPassword', 'Password must be at least 6 characters long');
//         hasError = true;
//     }

//     if (hasError) return;

//     const admins = JSON.parse(localStorage.getItem('admins') || '[]');

//     if (admins.some(a => a.email === email)) {
//         showError('newAdminEmail', 'An admin with this email already exists');
//         return;
//     }

//     const newAdmin = { name, email, password };
//     admins.push(newAdmin);
//     localStorage.setItem('admins', JSON.stringify(admins));

//     const successEl = document.getElementById('addAdminSuccess');
//     successEl.textContent = `✅ Admin "${name}" added successfully!`;
//     successEl.classList.remove('hidden');

//     document.getElementById('addAdminForm').reset();
//     displayAdminList();

//     setTimeout(() => {
//         successEl.classList.add('hidden');
//     }, 3000);
// });

// ==========================================
// Dashboard Functions
// ==========================================

// function showCustomerDashboard(user) {
//     hideAll();
//     document.getElementById('customerDashboard').classList.remove('hidden');
//     document.getElementById('customerDashboardName').textContent = user.name;
//     document.getElementById('customerDashboardEmail').textContent = user.email;
// }

// function showAdminDashboard(admin) {
//     hideAll();
//     document.getElementById('adminDashboard').classList.remove('hidden');
//     document.getElementById('adminDashboardName').textContent = admin.name;
//     document.getElementById('adminDashboardEmail').textContent = admin.email;
//     displayAdminList();
// }

// function displayAdminList() {
//     const admins = JSON.parse(localStorage.getItem('admins') || '[]');
//     const listEl = document.getElementById('adminList');
    
//     if (admins.length === 0) {
//         listEl.innerHTML = '<p style="text-align: center; color: #666;">No admins found</p>';
//         return;
//     }

//     listEl.innerHTML = admins.map(admin => `
//         <div class="admin-item">
//             <div>
//                 <strong>${admin.name}</strong><br>
//                 <small>${admin.email}</small>
//             </div>
//         </div>
//     `).join('');
// }

// ==========================================
// Logout
// ==========================================
let signoutButtons = document.querySelectorAll('.signout-button');
signoutButtons.forEach(button => {
    button.addEventListener('click', logout);
    
});

function logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentAdmin');
    location.replace('index.html');

}

// ==========================================
// Session Management on Load
// ==========================================

// window.addEventListener('load', function() {
//     initializeApp();
    
//     const currentUser = sessionStorage.getItem('currentUser');
//     const currentAdmin = sessionStorage.getItem('currentAdmin');

    // if (currentAdmin) {
    //     showAdminDashboard(JSON.parse(currentAdmin));
    // } else if (currentUser) {
    //     showCustomerDashboard(JSON.parse(currentUser));
    // } 
    // else {
    //     showCustomerLogin();
    // }
// });
