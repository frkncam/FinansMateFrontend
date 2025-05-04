document.getElementById('loginForm').addEventListener('submit', async function name(e) {
    e.preventDefault();

    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        });

        const result = await response.json();

        if (!response.ok || !result.token) {
            throw new Error(result.message || 'Login failed');
        }

        if (!result.token || !result.email || !result.role) {
            throw new Error('Geçersiz response formatı: Eksik bilgiler');
        }

        localStorage.setItem('token', result.token);
        localStorage.setItem('email', result.email);
        localStorage.setItem('role', result.role);

        document.getElementById('response').textContent = "Giriş Başarılı! Yönlendiriliyorsunuz...";

        setTimeout(() => {
            window.location.href = '../html/index.html';
        }, 2000);

    } catch (error) {
        document.getElementById('response').textContent = "Hata oluştu: " + error.message;
    }
});