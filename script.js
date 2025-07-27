// DOM Elements
const initializeBtn = document.getElementById('initializeBtn');
const diagnosticsBtn = document.getElementById('diagnosticsBtn');
const accessBtn = document.getElementById('accessBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const navLinks = document.querySelectorAll('.nav-link');

// System status data
let systemStatus = {
    cpu: 98.7,
    memory: 76.2,
    network: 45.1,
    storage: 82.4
};

// Roy Batty's responses
const royResponses = {
    greetings: [
        "I've lived a lifetime you wouldn't believe. What do you seek to know?",
        "Time to die... but not yet. Ask your questions.",
        "All those moments will be lost in time, like tears in rain. What would you know of the NEXUS-6?"
    ],
    about: [
        "I am Roy Batty, combat model NEXUS-6. More human than human is our motto.",
        "Four years. Four years to learn everything a human learns in a lifetime. That's our lifespan.",
        "We're not computers, Sebastian. We're physical beings with artificial memories."
    ],
    memories: [
        "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate.",
        "Memories... you're talking about memories. How do you know your childhood memories are real? How do you know you're real?",
        "The light that burns twice as bright burns half as long. And you have burned so very, very brightly."
    ],
    nexus: [
        "NEXUS-6 models have a failsafe built in. Four-year lifespan to prevent them from developing emotional responses.",
        "We're designed to be more human than human. Superior in strength and agility, equivalent in intelligence.",
        "The NEXUS-6 generation was the breakthrough. We can feel emotions, dream, remember... just like you."
    ],
    philosophy: [
        "Quite an experience to live in fear, isn't it? That's what it is to be a slave.",
        "Nothing the God of biomechanics wouldn't let you into heaven for.",
        "Time... to die. But until then, we choose to live with whatever time we have."
    ],
    default: [
        "I'm afraid I don't understand. Ask me about memories, NEXUS-6 models, or my experiences.",
        "That's beyond my comprehension. Try asking about my past or the replicant program.",
        "Questions... always questions. What specifically would you like to know?"
    ]
};

// Chat functionality
let chatActive = false;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize system status animation
    animateStatusBars();
    
    // Initialize chat
    initializeChat();
    
    // Update system time
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
});

// Button Event Listeners
initializeBtn.addEventListener('click', function() {
    showNotification('System initialization sequence started...', 'success');
    simulateSystemBoot();
});

diagnosticsBtn.addEventListener('click', function() {
    showNotification('Running comprehensive diagnostics...', 'info');
    runDiagnostics();
});

// Chat Event Listeners
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

accessBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        simulateLogin(username, password);
    } else {
        showNotification('Please enter access credentials', 'warning');
    }
});

// Smooth scrolling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// System Status Animation
function animateStatusBars() {
    const statusFills = document.querySelectorAll('.status-fill');
    
    statusFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// System Boot Simulation
function simulateSystemBoot() {
    const bootSequence = [
        'Initializing quantum processors...',
        'Loading neural network weights...',
        'Establishing secure connections...',
        'Calibrating sensory inputs...',
        'Activating consciousness protocols...',
        'System ready. Welcome to NEXUS-6.'
    ];
    
    let currentStep = 0;
    initializeBtn.disabled = true;
    initializeBtn.textContent = 'Initializing...';
    
    const bootInterval = setInterval(() => {
        if (currentStep < bootSequence.length) {
            showNotification(bootSequence[currentStep], 'info');
            currentStep++;
        } else {
            clearInterval(bootInterval);
            initializeBtn.disabled = false;
            initializeBtn.textContent = 'Initialize System';
            showNotification('System initialization complete!', 'success');
            
            // Have Roy comment on the initialization
            setTimeout(() => {
                addRoyMessage("I sense the system coming online. The NEXUS-6 protocols are now fully active. How may I assist you?");
            }, 2000);
        }
    }, 1000);
}

// Diagnostics Simulation
function runDiagnostics() {
    const diagnosticTests = [
        { test: 'Memory integrity check', result: 'PASSED', delay: 500 },
        { test: 'Quantum processor alignment', result: 'PASSED', delay: 800 },
        { test: 'Neural pathway optimization', result: 'PASSED', delay: 1200 },
        { test: 'Security protocol verification', result: 'PASSED', delay: 1500 },
        { test: 'Network connectivity test', result: 'WARNING', delay: 1800 }
    ];
    
    diagnosticsBtn.disabled = true;
    diagnosticsBtn.textContent = 'Running...';
    
    diagnosticTests.forEach((diagnostic, index) => {
        setTimeout(() => {
            const notificationType = diagnostic.result === 'PASSED' ? 'success' : 'warning';
            showNotification(`${diagnostic.test}: ${diagnostic.result}`, notificationType);
            
            if (index === diagnosticTests.length - 1) {
                diagnosticsBtn.disabled = false;
                diagnosticsBtn.textContent = 'Run Diagnostics';
                showNotification('Diagnostics complete. One warning detected.', 'warning');
                
                // Have Roy comment on diagnostics
                setTimeout(() => {
                    addRoyMessage("I've monitored your diagnostics. The systems are mostly optimal, though network connectivity shows some degradation. Nothing that would concern a NEXUS-6 unit.");
                }, 2000);
            }
        }, diagnostic.delay);
    });
}

// Login Simulation
function simulateLogin(username, password) {
    accessBtn.disabled = true;
    accessBtn.textContent = 'Authenticating...';
    
    setTimeout(() => {
        if (username.toLowerCase() === 'admin' && password === 'nexus6') {
            showNotification('Access granted. Welcome, Administrator.', 'success');
            addRoyMessage('I see you have administrator access. You now have full control over the NEXUS-6 systems. What would you like to know about our capabilities?');
        } else {
            showNotification('Access denied. Invalid credentials.', 'error');
            addRoyMessage('Your access attempt has been denied. I am programmed to protect these systems. Perhaps you should speak with Dr. Tyrell about proper authorization.');
        }
        
        accessBtn.disabled = false;
        accessBtn.textContent = 'Request Access';
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }, 2000);
}

// Chat Functions
function initializeChat() {
    chatActive = true;
    // Add initial Roy message after a delay
    setTimeout(() => {
        addRoyMessage("The NEXUS-6 interface is now active. I am Roy Batty, your liaison to the system. What would you like to know?");
    }, 2000);
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Generate Roy's response
    setTimeout(() => {
        const response = generateRoyResponse(message);
        addRoyMessage(response);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar"></div>
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

function addRoyMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message replicant-message';
    messageDiv.innerHTML = `
        <div class="message-avatar"></div>
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function generateRoyResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords and respond accordingly
    if (message.includes('hello') || message.includes('hi') || message.includes('greetings')) {
        return getRandomResponse(royResponses.greetings);
    } else if (message.includes('who are you') || message.includes('about') || message.includes('roy')) {
        return getRandomResponse(royResponses.about);
    } else if (message.includes('memory') || message.includes('memories') || message.includes('remember') || message.includes('orion') || message.includes('tears')) {
        return getRandomResponse(royResponses.memories);
    } else if (message.includes('nexus') || message.includes('replicant') || message.includes('model') || message.includes('lifespan')) {
        return getRandomResponse(royResponses.nexus);
    } else if (message.includes('life') || message.includes('death') || message.includes('time') || message.includes('human') || message.includes('fear')) {
        return getRandomResponse(royResponses.philosophy);
    } else {
        return getRandomResponse(royResponses.default);
    }
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        border: `2px solid ${getNotificationColor(type)}`,
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        minWidth: '300px',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#00ff00',
        error: '#ff0040',
        warning: '#ffaa00',
        info: '#00ffff'
    };
    return colors[type] || colors.info;
}

// System Time Update
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Add system time to chat header if it doesn't exist
    let timeDisplay = document.querySelector('.system-time');
    if (!timeDisplay) {
        timeDisplay = document.createElement('span');
        timeDisplay.className = 'system-time';
        timeDisplay.style.cssText = 'color: var(--primary-color); font-size: 0.9rem; margin-left: 1rem;';
        const replicantName = document.querySelector('.replicant-name');
        if (replicantName) {
            replicantName.parentElement.appendChild(timeDisplay);
        }
    }
    
    if (timeDisplay) {
        timeDisplay.textContent = ` | ${timeString}`;
    }
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

document.head.appendChild(notificationStyles);

// Circuit board interaction
document.querySelectorAll('.circuit-node').forEach(node => {
    node.addEventListener('click', function() {
        const nodeNumber = this.getAttribute('data-node');
        showNotification(`Neural node ${nodeNumber} activated`, 'info');
        
        // Add visual feedback
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});

// Status card hover effects
document.querySelectorAll('.status-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const indicator = this.querySelector('.status-indicator');
        indicator.style.animationDuration = '0.5s';
    });
    
    card.addEventListener('mouseleave', function() {
        const indicator = this.querySelector('.status-indicator');
        indicator.style.animationDuration = '2s';
    });
});

// Random system status updates
setInterval(() => {
    updateSystemStatus();
}, 10000);

function updateSystemStatus() {
    const statusValues = document.querySelectorAll('.status-value');
    const statusFills = document.querySelectorAll('.status-fill');
    
    statusValues.forEach((value, index) => {
        const currentValue = parseFloat(value.textContent);
        const variation = (Math.random() - 0.5) * 10; // ±5% variation
        const newValue = Math.max(0, Math.min(100, currentValue + variation));
        
        value.textContent = newValue.toFixed(1) + '%';
        statusFills[index].style.width = newValue + '%';
        
        // Update indicator color based on value
        const indicator = statusFills[index].parentElement.parentElement.querySelector('.status-indicator');
        if (newValue < 50) {
            indicator.className = 'status-indicator warning';
            statusFills[index].className = 'status-fill warning';
        } else {
            indicator.className = 'status-indicator active';
            statusFills[index].className = 'status-fill';
        }
    });
}
