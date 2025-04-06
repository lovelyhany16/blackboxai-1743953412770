// Core application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Voice command functionality
    const voiceCommandBtn = document.getElementById('voice-command-btn');
    if (voiceCommandBtn) {
        voiceCommandBtn.addEventListener('click', toggleVoiceCommands);
    }

    // AR Scanner initialization
    const arScannerBtn = document.getElementById('ar-scanner-btn');
    if (arScannerBtn) {
        arScannerBtn.addEventListener('click', initARScanner);
    }

    // Initialize tooltips
    initTooltips();
});

// Voice command functionality
function toggleVoiceCommands() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice commands not supported in your browser');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Voice recognition started');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice command:', transcript);
        processVoiceCommand(transcript);
    };

    recognition.onerror = function(event) {
        console.error('Voice recognition error', event.error);
    };

    recognition.start();
}

function processVoiceCommand(command) {
    // Process different voice commands
    if (command.includes('search')) {
        const searchTerm = command.replace('search', '').trim();
        document.getElementById('search-input').value = searchTerm;
        // Trigger search
    } 
    else if (command.includes('add item')) {
        // Open add item modal
    }
    // Add more command processing
}

// AR Scanner functionality
function initARScanner() {
    // Check if device supports AR
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('AR scanning not supported on this device');
        return;
    }

    // Initialize camera stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            
            // Add video to AR scanner overlay
            const scannerOverlay = document.getElementById('scanner-overlay');
            scannerOverlay.innerHTML = '';
            scannerOverlay.appendChild(video);
            scannerOverlay.style.display = 'block';

            // Initialize barcode scanner
            initBarcodeScanner(video);
        })
        .catch(function(err) {
            console.error('Error accessing camera:', err);
        });
}

function initBarcodeScanner(videoElement) {
    // Use QuaggaJS or similar library for barcode scanning
    // This is a placeholder implementation
    console.log('Initializing barcode scanner on video element');
}

// Helper function for tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-10 bg-gray-800 text-white text-xs rounded py-1 px-2';
    tooltip.textContent = tooltipText;
    tooltip.style.top = `${this.offsetTop - 30}px`;
    tooltip.style.left = `${this.offsetLeft + this.offsetWidth/2 - tooltip.offsetWidth/2}px`;
    this.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = this.querySelector('div[class*="bg-gray-800"]');
    if (tooltip) {
        tooltip.remove();
    }
}