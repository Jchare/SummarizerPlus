/**
 * Summarize+ Chrome Extension
 * Author: Jamila Nchare 
 * Date: October 2025
 * Description: Summarizes and translates highlighted text using Chrome's built-in AI (Gemini Nano).
 */


document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById("myInput"); 
  const summarizeButton = document.getElementById("Summarize");
  const translateButton = document.getElementById("Translate");
  const bothButton = document.getElementById("Both");
  const outputElement = document.getElementById("myOutput"); 

  const SERVER_URL = 'http://localhost:3000/generateContent';
  const userLang = navigator.language || navigator.userLanguage;
  const langName = new Intl.DisplayNames(['en'], { type: 'language' })
    .of(userLang.split('-')[0]);

  function updateUI(status, message = "") {
    if (status === 'loading') {
      outputElement.textContent = "Processing... Please wait.";
      summarizeButton.disabled = translateButton.disabled = bothButton.disabled = true;
    } else if (status === 'ready') {
      outputElement.textContent = message;
      summarizeButton.disabled = translateButton.disabled = bothButton.disabled = false;
    } else if (status === 'error') {
      outputElement.textContent = `Error: ${message}`;
      summarizeButton.disabled = translateButton.disabled = bothButton.disabled = false;
    }
  }

  async function fetchAIResponse(systemInstruction, text = null) {
    const userText = text || inputElement.value.trim();

    if (!userText) {
      updateUI('error', "No text to process.");
      return;
    }

    const finalPrompt = `${systemInstruction}\n\nUSER TEXT:\n${userText}`;
    updateUI('loading');

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const resultText = data.generatedText || "No response from AI model.";
      updateUI('ready', resultText);
    } catch (err) {
      console.error(err);
      updateUI('error', err.message);
    }
  }

  // Load any selected text from background
   chrome.storage.local.get("textToSummarize", (data) => {
    if (data.textToSummarize) {
      inputElement.value = data.textToSummarize;

      const instruction = "You are a summarization expert. Summarize the text concisely, keeping the language the same as the input.";
      fetchAIResponse(instruction, data.textToSummarize);

      chrome.storage.local.remove("textToSummarize");
    }
  });

  // Buttons
  summarizeButton.addEventListener("click", () => {
    const instruction = `You are a summarization expert.
     Summarize the text concisely. Return the summary in 
     the same language as the input text.
     Do not translate it into another language.`;
    fetchAIResponse(instruction);
  });

  translateButton.addEventListener("click", () => {
    const instruction = `Translate the text into the user's default language (${langName}).`;
    fetchAIResponse(instruction);
  });

  bothButton.addEventListener("click", () => {
    const instruction = `
      You are an expert summarizer and translator.
      Instructions:
      1. Summarize the text.
      2. Translate that summary into ${langName}.
      3. Output ONLY the translated summary as plain text.
      4. Do NOT include any labels or explanations.
    `;
    fetchAIResponse(instruction);
  });
});
