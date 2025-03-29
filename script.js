// Voice recognition and call handling
const startBtn = document.getElementById('start-call');
const endBtn = document.getElementById('end-call');
const callStatus = document.getElementById('call-status');
const transcript = document.getElementById('transcript');

let recognition;
let isCallActive = false;
let synthesis = window.speechSynthesis;

// Initialize voice recognition
function initVoiceRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcriptText = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (event.results[0].isFinal) {
            addToTranscript(transcriptText, 'user');
            processUserInput(transcriptText);
        }
    };

    recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
    };
}

// Add message to transcript
function addToTranscript(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('p-3', 'mb-2', 'max-w-xs', 
        sender === 'ai' ? 'ai-message' : 'user-message',
        sender === 'ai' ? 'mr-auto' : 'ml-auto');
    messageDiv.textContent = text;
    transcript.appendChild(messageDiv);
    transcript.scrollTop = transcript.scrollTop + 1000;
}

// Process user input and get AI response
function processUserInput(text) {
    // Get AI response (will be implemented in ai.js)
    const response = getAIResponse(text);
    speakResponse(response);
}

// Speak AI response
function speakResponse(text) {
    if (!text) return;
    
    addToTranscript(text, 'ai');
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    synthesis.speak(utterance);
}

// Start call
function startCall() {
    if (!recognition) initVoiceRecognition();
    
    isCallActive = true;
    startBtn.classList.add('hidden');
    endBtn.classList.remove('hidden');
    transcript.classList.remove('hidden');
    callStatus.innerHTML = '<i class="fas fa-circle text-green-500 animate-pulse text-4xl mb-2"></i><p>Call in progress</p>';
    document.body.classList.add('call-active');
    
    recognition.start();
    speakResponse("Hello! How can I help you today?");
}

// End call
function endCall() {
    isCallActive = false;
    startBtn.classList.remove('hidden');
    endBtn.classList.add('hidden');
    callStatus.innerHTML = '<i class="fas fa-phone-alt text-4xl text-indigo-500 mb-2"></i><p>Call ended</p>';
    document.body.classList.remove('call-active');
    
    if (recognition) recognition.stop();
    synthesis.cancel();
}

// Event listeners
startBtn.addEventListener('click', startCall);
endBtn.addEventListener('click', endCall);

// Check browser support
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    callStatus.innerHTML = '<p class="text-red-500">Voice recognition not supported in this browser</p>';
    startBtn.disabled = true;
}