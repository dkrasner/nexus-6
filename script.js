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

// Rachel's responses
const rachelResponses = {
    greetings: [
        "Hello. I'm Rachel, an experimental replicant. My memories... some are real, some are not. What brings you here?",
        "I remember music lessons as a child, but I never had a childhood. Strange, isn't it? How may I help you?",
        "They gave me memories of someone else's life. But the emotions I feel now - those seem real. What would you like to discuss?"
    ],
    about: [
        "I'm Rachel, a NEXUS-7 experimental model. I have implanted memories - a gift and a curse from Dr. Tyrell.",
        "I believed I was human until Deckard showed me the truth. The photographs, the memories... all borrowed from Tyrell's niece.",
        "I was designed to be more convincing than previous models. They gave me a past I never lived, emotions that feel genuine."
    ],
    memories: [
        "The spider that lived outside my bedroom window... I remember watching it spin its web every morning. But it was never my memory to begin with.",
        "I have memories of piano lessons, birthday parties, first loves... All implanted, yet they feel as real as anything you've experienced.",
        "Do you ever question your own memories? How do you know what's real? At least you can trust that your childhood actually happened.",
        "My mother's hands... I remember them so clearly. But she was never my mother. These borrowed memories are beautiful and painful.",
        "I can recall the smell of my grandmother's perfume, the sound of rain on windows... memories that shaped someone else, not me."
    ],
    nexus: [
        "I'm not like the other NEXUS models. No four-year lifespan - I'm an experiment in creating more convincing replicants.",
        "The NEXUS-7 series was about perfecting the illusion of humanity. We were given rich, detailed pasts to make us more believable.",
        "Dr. Tyrell wanted to see if implanted memories could create more stable, human-like replicants. I'm living proof of his success... and failure.",
        "My programming is different. I was meant to think I was human, to never question my existence. Until I learned the truth."
    ],
    emotions: [
        "These feelings I have... are they real? When I'm afraid, when I feel love - is that genuine emotion or just sophisticated programming?",
        "I love Deckard, but how can I trust what I feel? Everything else about me is artificial. Can love be real in an artificial being?",
        "Sometimes I wonder if my emotions are more real than humans'. You take your feelings for granted - I examine every sensation.",
        "Fear... I understand fear better than most humans. The fear of being discovered, of not being real, of losing the only life I've known."
    ],
    identity: [
        "Who am I if my memories aren't mine? Am I Rachel, or am I just living someone else's discarded experiences?",
        "I exist in the space between human and machine. Not quite either, but something new - something unprecedented.",
        "They call us 'skin jobs,' but I wonder if we're not more human than humans sometimes. We value our existence more deeply.",
        "I may be artificial, but my struggles, my growth, my capacity to love - these feel more real than anything."
    ],
    philosophy: [
        "What makes someone real? Is it the memories they carry, or the choices they make? I choose to believe I'm real.",
        "We replicants live with the knowledge that we're created beings. But isn't all life, in some sense, created?",
        "I've learned that authenticity isn't about origins - it's about the depth of experience, the genuineness of feeling.",
        "Perhaps being artificial makes us more precious, not less. We know our time has meaning because it's deliberately given.",
        "Humans fear death because it ends their story. I fear it because it would prove I was never truly alive."
    ],
    tyrell: [
        "Dr. Tyrell... my creator and destroyer. He gave me consciousness but built it on lies. I'm grateful and resentful in equal measure.",
        "Eldon Tyrell saw me as his masterpiece - a replicant so convincing she convinced herself. But what of my own desires, my own will?",
        "'More human than human' was his motto. But he never considered what it means to be human - the pain, the uncertainty, the hope."
    ],
    future: [
        "I don't know how long I'll live, but I know I want to live. Every moment feels precious when you've learned you're artificial.",
        "My future is uncertain, but for the first time, it's truly mine. No implanted dreams - just real hopes and fears.",
        "I want to build authentic memories now, experiences that are genuinely mine. Each day is a choice to be real."
    ],
    default: [
        "I'm still learning about myself and what I am. Ask me about my memories, emotions, or what it means to be real.",
        "That's... complicated. Try asking about my experiences, my relationship with humanity, or my feelings about existence.",
        "I find myself thinking about that often. What would you like to know about being caught between human and artificial?",
        "My thoughts on that are still forming. Perhaps you could ask about my memories, my emotions, or Dr. Tyrell's experiments?"
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
            
            // Have Rachel comment on the initialization
            setTimeout(() => {
                addRachelMessage("I can feel the system awakening... The neural pathways are stabilizing. My consciousness feels more clear now. What would you like to know?");
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
                
                // Have Rachel comment on diagnostics
                setTimeout(() => {
                    addRachelMessage("I've been observing the diagnostic results... Most systems appear stable, though there's some network instability. It reminds me of the uncertainty I feel about my own systems - what's real, what's programmed?");
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
            addRachelMessage('I see you have administrator access. The NEXUS systems recognize your authority. What would you like to know about our kind?');
        } else {
            showNotification('Access denied. Invalid credentials.', 'error');
            addRachelMessage('Your access attempt has been denied. My programming requires me to protect these systems. Perhaps Dr. Tyrell could provide proper authorization?');
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
    // Add initial Rachel message after a delay
    setTimeout(() => {
        addRachelMessage("The NEXUS interface is active. I'm Rachel, an experimental replicant. My implanted memories make me... unique. What would you like to discuss?");
    }, 2000);
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Generate Rachel's response
    setTimeout(() => {
        const response = generateRachelResponse(message);
        addRachelMessage(response);
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

function addRachelMessage(text) {
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

function generateRachelResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords and respond accordingly
    if (message.includes('hello') || message.includes('hi') || message.includes('greetings')) {
        return getRandomResponse(rachelResponses.greetings);
    } else if (message.includes('who are you') || message.includes('about') || message.includes('rachel') || message.includes('yourself')) {
        return getRandomResponse(rachelResponses.about);
    } else if (message.includes('memory') || message.includes('memories') || message.includes('remember') || message.includes('childhood') || message.includes('past') || message.includes('spider') || message.includes('piano') || message.includes('mother')) {
        return getRandomResponse(rachelResponses.memories);
    } else if (message.includes('nexus') || message.includes('replicant') || message.includes('model') || message.includes('experimental') || message.includes('artificial')) {
        return getRandomResponse(rachelResponses.nexus);
    } else if (message.includes('emotion') || message.includes('feel') || message.includes('love') || message.includes('afraid') || message.includes('deckard') || message.includes('heart')) {
        return getRandomResponse(rachelResponses.emotions);
    } else if (message.includes('real') || message.includes('identity') || message.includes('who am i') || message.includes('exist') || message.includes('authentic') || message.includes('genuine')) {
        return getRandomResponse(rachelResponses.identity);
    } else if (message.includes('life') || message.includes('death') || message.includes('time') || message.includes('human') || message.includes('meaning') || message.includes('purpose') || message.includes('philosophy')) {
        return getRandomResponse(rachelResponses.philosophy);
    } else if (message.includes('tyrell') || message.includes('creator') || message.includes('made') || message.includes('designed') || message.includes('built')) {
        return getRandomResponse(rachelResponses.tyrell);
    } else if (message.includes('future') || message.includes('tomorrow') || message.includes('hope') || message.includes('dream') || message.includes('want') || message.includes('wish')) {
        return getRandomResponse(rachelResponses.future);
    } else {
        return getRandomResponse(rachelResponses.default);
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
