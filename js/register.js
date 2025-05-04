document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      };

      try{
        const response = await fetch('http://localhost:8080/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        document.getElementById('response').textContent = "Kayıt Başarılı";

      }catch(error){
        document.getElementById('response').textContent = "Hata oluştu: " + error;
      }
    
})