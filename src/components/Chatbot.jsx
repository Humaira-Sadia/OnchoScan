import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../Chatbot.css";
import { getBotResponse } from "../constants/faqs";
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 Welcome to OnchoScan. I'm your AI assistant. I can help you understand the diagnosis process, upload requirements, and patient details. How can I help you today?",
        },
    ]);



    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage,
            },
        ]);

        setInput("");

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: getBotResponse(userMessage),
                },
            ]);
        }, 500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                className={`chat-button ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open OnchoScan Assistant"
            >
                {isOpen ? "×" : "💬"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-container">

                    {/* Header */}
                    <div className="chat-header">
                        <div className="bot-avatar">
                            <img src={logo} alt="bot-logo" height={50} />
                        </div>

                        <div>
                            <h3>OnchoScan Assistant</h3>
                            <span>
                                <span className="online-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
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
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <button onClick={() => setInput("How do I upload a scan?")}>
                            Upload scan
                        </button>

                        <button onClick={() => setInput("How do I start an analysis?")}>
                            Start analysis
                        </button>
                    </div>

                    {/* Input */}
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button onClick={sendMessage}>
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