import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../Chatbot.css";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 Welcome to OnchoScan. I’m here to help you understand breast cancer, symptoms, types, treatment, medical aids, nutrition, and foods to avoid. What would you like to know?",
        },
    ]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage,
            },
        ]);

        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("https://oncho-chats-six.vercel.app/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: data.response || data.message || "Sorry, I couldn't process your request.",
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry, I'm having trouble connecting to the assistant. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            {/* Show floating button ONLY when chatbot is closed */}
            {!isOpen && (
                <button
                    className="chat-button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open OnchoScan Assistant"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chatbot-header">
                            <div className="bot-avatar">
                                <img src={logo} alt="bot-logo" height={50} />
                            </div>

                            <div className="chat-header-info">
                                <h3>OnchoScan Assistant</h3>
                                <span>
                                    <span className="online-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>

                        {/* Close button inside header */}
                        <button
                            className="chat-close-button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close OnchoScan Assistant"
                        >
                            ×
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message-row ${message.sender}`}
                            >
                                {message.sender === "bot" && (
                                    <div className="small-avatar">✦</div>
                                )}

                                <div className="message">
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message-row bot">
                                <div className="small-avatar">✦</div>
                                <div className="message">Typing...</div>
                            </div>
                        )}
                    </div>

                    <div className="quick-actions">
                        <button
                            onClick={() =>
                                setInput("How do I upload a scan?")
                            }
                        >
                            Upload scan
                        </button>

                        <button
                            onClick={() =>
                                setInput("How do I start an analysis?")
                            }
                        >
                            Start analysis
                        </button>
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={isLoading}
                        >
                            ➤
                        </button>
                    </div>

                    <div className="chat-disclaimer">
                        Your workflow companion, not a replacement for medical expertise.
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
