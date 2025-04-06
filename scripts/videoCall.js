// Video call functionality for collaboration hub
let localStream;
let remoteStream;
let peerConnection;

document.addEventListener('DOMContentLoaded', function() {
    const startCallBtn = document.getElementById('start-call-btn');
    if (startCallBtn) {
        startCallBtn.addEventListener('click', startCall);
    }

    const endCallBtn = document.getElementById('end-call-btn');
    if (endCallBtn) {
        endCallBtn.addEventListener('click', endCall);
    }
});

// Function to start a video call
function startCall() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localStream = stream;
            const videoElement = document.getElementById('local-video');
            videoElement.srcObject = localStream;

            // Initialize peer connection
            peerConnection = new RTCPeerConnection();
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

            // Handle remote stream
            peerConnection.ontrack = event => {
                remoteStream = event.streams[0];
                const remoteVideoElement = document.getElementById('remote-video');
                remoteVideoElement.srcObject = remoteStream;
            };

            // Create offer
            return peerConnection.createOffer();
        })
        .then(offer => {
            return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
            // Send offer to the server
            // Implement signaling logic here
        })
        .catch(error => console.error('Error starting call:', error));
}

// Function to end a video call
function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    const localVideoElement = document.getElementById('local-video');
    localVideoElement.srcObject = null;
    const remoteVideoElement = document.getElementById('remote-video');
    remoteVideoElement.srcObject = null;
}