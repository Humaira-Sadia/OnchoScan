import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../App.css"
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 Welcome to OnchoScan. I'm your AI assistant. I can help you understand the diagnosis process, upload requirements, and patient details. How can I help you today?",
        },
    ]);

    const getBotResponse = (message) => {
        const text = message.toLowerCase().trim();

        if (
            text === "hi" ||
            text === "hii" ||
            text === "hello" ||
            text === "hey" ||
            text.includes("good morning") ||
            text.includes("good evening")
        ) {
            return "Hello! 👋 Welcome to OnchoScan. How can I assist you today?";
        }

        if (text.includes("who are you") || text.includes("what are you")) {
            return "I'm the OnchoScan AI Assistant. I can guide you through the ultrasound upload and diagnosis workflow.";
        }

        if (
            text.includes("upload") ||
            text.includes("scan") ||
            text.includes("image")
        ) {
            return "You can upload an ultrasound scan using the upload area. OnchoScan supports DICOM, PNG, JPEG, and NIfTI files.";
        }

        if (text.includes("diagnosis") || text.includes("analysis")) {
            return "To start an analysis, upload the ultrasound scan and enter the patient's age, BI-RADS score, and family history information. Then select 'Run analysis'.";
        }

        if (text.includes("birads") || text.includes("bi-rads")) {
            return "BI-RADS is a standardized breast imaging assessment system. Please enter the BI-RADS score provided by the qualified radiologist or medical professional.";
        }

        if (text.includes("age") || text.includes("patient details")) {
            return "Patient details currently include age, BI-RADS score, and family history of breast cancer.";
        }

        if (
            text.includes("help") ||
            text.includes("how") ||
            text.includes("start")
        ) {
            return "Sure! Start by uploading an ultrasound scan, enter the required patient details, and click 'Run analysis'.";
        }

        if (
            text.includes("thank") ||
            text.includes("thanks")
        ) {
            return "You're welcome! 😊 I'm here if you need help with the OnchoScan workflow.";
        }

        if (
            text.includes("bye") ||
            text.includes("goodbye")
        ) {
            return "Goodbye! 👋 Take care, and feel free to come back whenever you need assistance.";
        }

        return "I'm here to help with OnchoScan. You can ask me about uploading a scan, patient details, BI-RADS, or how to start an analysis.";
    };

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
                        OnchoScan Assistant provides workflow guidance and is not a
                        substitute for professional medical advice.
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;