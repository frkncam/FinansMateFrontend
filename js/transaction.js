document.getElementById("transactionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    userId: parseInt(document.getElementById("userId").value),
    currency: document.getElementById("currency").value
  };

  fetch("http://localhost:8080/api/transaction/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(async response => {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Sunucu hatası");
    }
    return response.json();
  })
  .then(result => {
    alert("✅ İşlem başarıyla kaydedildi!");
    document.getElementById("transactionForm").reset();
  })
  .catch(error => {
    console.error("Hata:", error);
    alert("❌ İşlem sırasında bir hata oluştu: " + error.message);
  });
});