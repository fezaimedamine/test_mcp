import React, { useState, useRef, useEffect } from "react";

const botName = "MediBot";

const initialMessages = [
  {
    from: botName,
    text: "Bonjour ! Je suis MediBot, votre assistant médical. Comment puis-je vous aider aujourd’hui ?",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const question = input.trim();
    if (!question) return;

    // 👤 Ajouter le message utilisateur
    const userMessage = { from: "Vous", text: question };
    setMessages((prev) => [...prev, userMessage]);

    // Ajouter un message vide pour le bot
    const botMessage = { from: botName, text: "" };
    setMessages((prev) => [...prev, botMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        currentResponse += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          // Écrase le dernier message (celui du bot) à chaque nouveau token
          newMessages[newMessages.length - 1] = { from: botName, text: currentResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Erreur backend :", error);
      setMessages((prev) => [
        ...prev,
        { from: botName, text: "❌ Erreur lors de la connexion à l'assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Assistant Médical MediBot</h1>

      <div style={styles.chatWindow}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.from === "Vous" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "Vous" ? "#007bff" : "#e9ecef",
              color: msg.from === "Vous" ? "white" : "black",
            }}
          >
            <strong>{msg.from} :</strong> {msg.text}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              fontStyle: "italic",
              color: "#888",
            }}
          >
            {botName} est en train d'écrire...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputArea}>
        <textarea
          rows={2}
          placeholder="Posez votre question médicale..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.textarea}
        />
        <button onClick={handleSend} style={styles.button}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#343a40",
  },
  chatWindow: {
    flex: 1,
    overflowY: "auto",
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  message: {
    maxWidth: "80%",
    padding: "10px 14px",
    borderRadius: 20,
    fontSize: 16,
    lineHeight: 1.3,
  },
  inputArea: {
    marginTop: 15,
    display: "flex",
    gap: 10,
  },
  textarea: {
    flex: 1,
    borderRadius: 10,
    border: "1px solid #ccc",
    padding: 10,
    fontSize: 16,
    resize: "none",
    fontFamily: "inherit",
  },
  button: {
    backgroundColor: "#171718",
    border: "none",
    borderRadius: 10,
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16,
  },
};
