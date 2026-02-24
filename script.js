/**
 * APP INITIALIZATION & UTILITIES
 */

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

// Clear all error states from the UI
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('input-error');
    });
}

// Show specific error for a field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    if (field) field.classList.add('input-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * VALIDATION CORE LOGIC
 */

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]*$/.test(name);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
}

/**
 * NAVIGATION & VISUALS
 */

function hideAll() {
    const containers = document.querySelectorAll('.form-container, .dashboard');
    containers.forEach(container => container.classList.add('hidden'));
}

function showCustomerLogin() {
    sessionStorage.clear();
    hideAll();
    clearErrors();
    document.getElementById('customerLogin')?.classList.remove('hidden');
}

function showRegister() {
    hideAll();
    clearErrors();
    document.getElementById('customerRegister')?.classList.remove('hidden');
}

function showAdminLogin() {
    hideAll();
    clearErrors();
    document.getElementById('adminLogin')?.classList.remove('hidden');
}

// Password Strength UI Feedback
document.getElementById('registerPassword')?.addEventListener('input', function(e) {
    const password = e.target.value;
    const strengthEl = document.getElementById('passwordStrength');
    if (!strengthEl) return;

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

/**
 * FORM SUBMISSION HANDLERS
 */

// 1. Customer Login
document.getElementById('customerLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('customerLoginEmail').value.trim();
    const password = document.getElementById('customerLoginPassword').value;

    let hasError = false;

    if (!validateEmail(email)) {
        showError('customerLoginEmail', 'Please enter a valid email');
        hasError = true;
    }
    if (!password) {
        showError('customerLoginPassword', 'Password cannot be empty');
        hasError = true;
    }

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

// 2. Customer Registration
document.getElementById('customerRegisterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    let hasError = false;

    if (!validateName(name)) {
        showError('registerName', 'Name must be at least 2 characters (letters only)');
        hasError = true;
    }
    if (!validateEmail(email)) {
        showError('registerEmail', 'Valid email required');
        hasError = true;
    }
    if (!validatePassword(password)) {
        showError('registerPassword', 'Password must be at least 6 characters');
        hasError = true;
    }
    if (password !== confirmPassword) {
        showError('registerConfirmPassword', 'Passwords do not match');
        hasError = true;
    }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        showError('registerEmail', 'Account already exists with this email');
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = 'Home.html';
});

// 3. Admin Login
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('adminLoginEmail').value.trim();
    const password = document.getElementById('adminLoginPassword').value;

    if (!validateEmail(email) || !password) {
        showError('adminLoginEmail', 'Credentials required');
        return;
    }

    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const admin = admins.find(a => a.email === email && a.password === password);

    if (admin) {
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
        showAdminDashboard(admin);
    } else {
        showError('adminLoginEmail', 'Invalid admin credentials');
    }
});

// 4. Add New Admin
document.getElementById('addAdminForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('newAdminName').value.trim();
    const email = document.getElementById('newAdminEmail').value.trim();
    const password = document.getElementById('newAdminPassword').value;

    let hasError = false;

    if (!validateName(name)) {
        showError('newAdminName', 'Min 2 characters required');
        hasError = true;
    }
    if (!validateEmail(email)) {
        showError('newAdminEmail', 'Invalid email format');
        hasError = true;
    }
    if (!validatePassword(password)) {
        showError('newAdminPassword', 'Min 6 characters required');
        hasError = true;
    }

    if (hasError) return;

    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (admins.some(a => a.email === email)) {
        showError('newAdminEmail', 'Admin email already exists');
        return;
    }

    const newAdmin = { name, email, password };
    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));

    alert('Admin added successfully!');
    document.getElementById('addAdminForm').reset();
    displayAdminList();
    window.location.href = '/ServerSide/ProductsManagement.html';
});

/**
 * DASHBOARD & LOGOUT
 */

function showAdminDashboard(admin) {
    hideAll();
    const dashboard = document.getElementById('adminDashboard');
    if (dashboard) {
        dashboard.classList.remove('hidden');
        document.getElementById('adminDashboardName').textContent = admin.name;
        document.getElementById('adminDashboardEmail').textContent = admin.email;
        displayAdminList();
    }
}

function displayAdminList() {
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const listEl = document.getElementById('adminList');
    if (!listEl) return;

    if (admins.length === 0) {
        listEl.innerHTML = '<p>No admins found</p>';
        return;
    }

    listEl.innerHTML = admins.map(admin => `
        <div class="admin-item">
            <strong>${admin.name}</strong><br>
            <small>${admin.email}</small>
        </div>
    `).join('');
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Attach logout to all signout buttons
document.querySelectorAll('.signout-button').forEach(button => {
    button.addEventListener('click', logout);
});

// Run on page load
initializeApp();