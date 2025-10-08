async function sendMessage() {
  const input = document.getElementById("chat-input");
  const question = input.value.trim();
  if (!question) return;

  const chat = document.getElementById("chat-box");

  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.innerHTML = `<span class="icon">🧑</span><div>${question}</div>`;
  chat.appendChild(userMessage);
  input.value = "";

  const loadingMessage = document.createElement("div");
  loadingMessage.className = "message assistant-message loading";
  loadingMessage.innerHTML = `<span class="icon"><img src="logo.png" alt="Bot icon"></span><div><div class="loader"></div></div>`;
  chat.appendChild(loadingMessage);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("https://diabetes-chatbot-worker.fredje4711.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question // ✨ AANGEPAST: Stuur 'question' zoals de werkende worker verwacht
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Serverfout: ${response.status} - ${errorText}`);
    }

    // ✨ AANGEPAST: Lees het correcte response formaat
    const data = await response.json();
    const antwoord = data.choices?.[0]?.message?.content?.trim() || "(Geen antwoord ontvangen)";
    
    // URL, e-mail en regeleinde conversies (deze logica is correct en blijft)
    let formattedAntwoord = antwoord.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    formattedAntwoord = formattedAntwoord.replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, url => `<a href="${url.replace(/[.,!?;:]+$/, '')}" target="_blank" rel="noopener noreferrer">${url.replace(/[.,!?;:]+$/, '')}</a>`);
    formattedAntwoord = formattedAntwoord.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>');
    formattedAntwoord = formattedAntwoord.replace(/\n/g, '<br>');

    loadingMessage.remove();

    const assistantMessage = document.createElement("div");
    assistantMessage.className = "message assistant-message";
    assistantMessage.innerHTML = `<span class="icon"><img src="logo.png" alt="Bot icon"></span><div>${formattedAntwoord}</div>`;
    chat.appendChild(assistantMessage);
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    console.error("Fout bij ophalen antwoord:", err);
    loadingMessage.remove();
    const errorMessage = document.createElement("div");
    errorMessage.className = "message assistant-message error";
    errorMessage.innerHTML = `<span class="icon"><img src="logo.png" alt="Bot icon"></span><div>Er is een fout opgetreden. Probeer opnieuw.</div>`;
    chat.appendChild(errorMessage);
  }
}