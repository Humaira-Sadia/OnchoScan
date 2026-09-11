import { useState } from "react";
import { Header } from "./components/Header";
import { Diagnosis } from "./components/Diagnosis";
import { Report } from "./components/Report";
import { Footer } from "./components/Footer";
import ChatBot from "./components/Chatbot";

export default function App() {
  const [screen, setScreen] = useState("upload");
  const [reportData, setReportData] = useState(null);

  const handleComplete = (data) => {
    setReportData(data);
    setScreen("report");
  };

  return (
    <div className="app-root">
      <Header />
      {screen === "upload"
        ? <Diagnosis onComplete={handleComplete} />
        : <Report data={reportData} onReset={() => setScreen("upload")} />}
      <ChatBot />
      <Footer />
    </div>
  );
}