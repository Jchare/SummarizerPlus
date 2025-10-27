# Summarize+ Chrome Extension
A Chrome Extension that summarizes and translates highlighted/pasted text using Gemini Nano AI.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview
QuickAIExtension is a Chrome extension that allows users to summarize and translate highlighted text directly from the browser. The extension can detect the selected text and summarize it in the same language or translate it to the user's preferred language.


It uses a client-side + server-side hybrid architecture to ensure privacy and offline-first functionality.

## Features
- Summarize highlighted text
- Translate highlighted text
- Dual functionality: summarize + translate
- Copy/paste workflow for seamless user experience

## Technologies Used
- JavaScript, Node.js
- Chrome Extensions API
- HTML/CSS
- Gemini Nano AI

## Installation
1. **Clone this repository:**

```git clone https://github.com/Jchare/SummarizerPlus.git```
```cd SummarizerPlus```
2.**Instal dependencies**
```npm install```

3. **Start the local server**
```node server.js```
4. Load the chrome extension
   . Open chrome and go to chrome://extension
   . Enable Developer mode
   . Click load unpacked and select the project folder

## Usage
1. Highlight text on any webpage.
Right-click and select "Summarize Highlighted Text" from the context menu.A new window will appear with the summarized text
You can also paste text into the popup and use the buttons in the popup to:
Summarize text
Translate text
Summarize + Translate

## Demo
## Troubleshooting
- Ensure server.js is running locally before using the extension.
- Make sure Node.js and required packages are installed (npm install).
- 
- Clear chrome.storage if the extension seems to show old selected text.

## License
This project is open source under the MIT License
