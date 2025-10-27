document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("myInput"),t=document.getElementById("Summarize"),a=document.getElementById("Translate"),n=document.getElementById("Both"),r=document.getElementById("myOutput"),o=navigator.language||navigator.userLanguage,i=new Intl.DisplayNames(["en"],{type:"language"}).of(o.split("-")[0]);function s(e,o=""){"loading"===e?(r.textContent="Processing... Please wait.",t.disabled=a.disabled=n.disabled=!0):"ready"===e?(r.textContent=o,t.disabled=a.disabled=n.disabled=!1):"error"===e&&(r.textContent=`Error: ${o}`,t.disabled=a.disabled=n.disabled=!1)}async function l(t,a=null){let n=a||e.value.trim();if(!n)return void s("error","No text to process.");let r=`${t}

USER TEXT:
${n}`;s("loading");try{let e=await fetch("http://localhost:3000/generateContent",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:r})});if(!e.ok){let t=await e.json();throw Error(t.error||`Server responded with status ${e.status}`)}let t=(await e.json()).generatedText||"No response from AI model.";s("ready",t)}catch(e){console.error(e),s("error",e.message)}}chrome.storage.local.get("textToSummarize",t=>{t.textToSummarize&&(e.value=t.textToSummarize,l("You are a summarization expert. Summarize the text concisely, keeping the language the same as the input.",t.textToSummarize),chrome.storage.local.remove("textToSummarize"))}),t.addEventListener("click",()=>{l(`You are a summarization expert.
     Summarize the text concisely. Return the summary in 
     the same language as the input text.
     Do not translate it into another language.`)}),a.addEventListener("click",()=>{l(`Translate the text into the user's default language (${i}).`)}),n.addEventListener("click",()=>{l(`
      You are an expert summarizer and translator.
      Instructions:
      1. Summarize the text.
      2. Translate that summary into ${i}.
      3. Output ONLY the translated summary as plain text.
      4. Do NOT include any labels or explanations.
    `)})});
//# sourceMappingURL=popup.f4ddb162.js.map
