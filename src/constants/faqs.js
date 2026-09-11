export const getBotResponse = (message) => {
  const text = message.toLowerCase().trim();

  if (text === "hi" || text === "hii" || text === "hello" || text === "hey" || text.includes("good morning") || text.includes("good evening")) {
    return "Hello! 👋 Welcome to OnchoScan. How can I assist you today?";
  }

  if (text.includes("who are you") || text.includes("what are you")) {
    return "I'm the OnchoScan AI Assistant. I can guide you through the ultrasound upload and diagnosis workflow.";
  }

  if (text.includes("upload") || text.includes("scan") || text.includes("image")) {
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

  if (text.includes("help") || text.includes("how") || text.includes("start")) {
    return "Sure! Start by uploading an ultrasound scan, enter the required patient details, and click 'Run analysis'.";
  }

  if (text.includes("thank") || text.includes("thanks")) {
    return "You're welcome! 😊 I'm here if you need help with the OnchoScan workflow.";
  }

  if (text.includes("bye") || text.includes("goodbye")) {
    return "Goodbye! 👋 Take care, and feel free to come back whenever you need assistance.";
  }

  return "I'm here to help with OnchoScan. You can ask me about uploading a scan, patient details, BI-RADS, or how to start an analysis.";
};
