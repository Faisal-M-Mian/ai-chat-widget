(function() {
  'use strict';
  
  // Prevent multiple instances
  if (window.AIWidgetLoaded) return;
  window.AIWidgetLoaded = true;

  // Configuration
  const CONFIG = {
    API_BASE_URL: 'https://chatwidget.datagen.agency',
    WIDGET_ID: 'ai-chat-widget',
    SESSION_STORAGE_KEY: 'ai_widget_session'
  };

  // Get or create session ID
  function getSessionId() {
    let sessionId = sessionStorage.getItem(CONFIG.SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(CONFIG.SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  }

  // Create widget HTML
  function createWidgetHTML() {
    return `
      <div id="${CONFIG.WIDGET_ID}" style="position: fixed; bottom: 24px; left: 24px; z-index: 10000; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <!-- Floating Chat Icon -->
        <div id="ai-chat-icon" style="position: relative;">
          <!-- Pulse Ring Animation -->
          <div id="ai-pulse-ring" style="position: absolute; inset: 0; background-color: #2563eb; border-radius: 50%; animation: ai-pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; opacity: 0.2; transform: scale(1.1);"></div>
          
          <!-- Main Chat Button -->
          <button id="ai-chat-toggle" style="position: relative; background-color: #2563eb; color: white; padding: 16px; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); transition: all 0.3s; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <!-- Chat Icon -->
            <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-1.946-.274A5.978 5.978 0 0112 20a5.978 5.978 0 01-4.474-2.025A8.955 8.955 0 018 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8z"/>
            </svg>
            
            <!-- Notification Dot -->
            <div id="ai-notification-dot" style="position: absolute; top: -4px; right: -4px; background-color: #10b981; color: white; font-size: 12px; border-radius: 50%; height: 20px; width: 20px; display: flex; align-items: center; justify-content: center; animation: ai-bounce-gentle 1s infinite; font-weight: bold;">
              !
            </div>
          </button>
        </div>

        <!-- Chat Window -->
        <div id="ai-chat-window" style="display: none; margin-bottom: 16px; background-color: white; border-radius: 8px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); width: 320px; height: 400px; overflow: hidden; animation: ai-fade-in 0.3s ease-out;">
          <!-- Chat Header -->
          <div id="ai-chat-header" style="background-color: #2563eb; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; background-color: #1d4ed8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 16px; height: 16px;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <h3 style="font-weight: 600; font-size: 16px; margin: 0;">AI Assistant</h3>
                <p style="font-size: 12px; color: #bfdbfe; margin: 0;">Online</p>
              </div>
            </div>
            
            <!-- Close Button -->
            <button id="ai-close-chat" style="color: #bfdbfe; background: none; border: none; cursor: pointer; padding: 4px; transition: color 0.2s;">
              <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Chat Messages -->
          <div id="ai-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background-color: #f8fafc; height: 280px;">
            <!-- Welcome Message -->
            <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 12px; animation: ai-slide-up 0.3s ease-out;">
              <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div style="background-color: white; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; max-width: 240px;">
                <p style="font-size: 14px; color: #374151; margin: 0; margin-bottom: 4px;">Hello! I'm your AI assistant. How can I help you today?</p>
                <span style="font-size: 12px; color: #6b7280;">Just now</span>
              </div>
            </div>

            <!-- Loading Message (hidden by default) -->
            <div id="ai-loading-message" style="display: none; align-items: flex-start; gap: 8px; margin-bottom: 12px; animation: ai-slide-up 0.3s ease-out;">
              <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <div style="width: 16px; height: 16px; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: ai-spin 1s linear infinite;"></div>
              </div>
              <div style="background-color: white; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
                <div style="display: flex; gap: 4px;">
                  <div style="width: 8px; height: 8px; background-color: #9ca3af; border-radius: 50%; animation: ai-bounce 1s infinite;"></div>
                  <div style="width: 8px; height: 8px; background-color: #9ca3af; border-radius: 50%; animation: ai-bounce 1s infinite; animation-delay: 0.1s;"></div>
                  <div style="width: 8px; height: 8px; background-color: #9ca3af; border-radius: 50%; animation: ai-bounce 1s infinite; animation-delay: 0.2s;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div id="ai-chat-input" style="padding: 16px; border-top: 1px solid #e2e8f0; background-color: white;">
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <input 
                id="ai-message-input" 
                type="text" 
                placeholder="Type your message..." 
                style="flex: 1; border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; transition: border-color 0.2s;"
              >
              <button 
                id="ai-send-button" 
                style="background-color: #2563eb; color: white; padding: 8px 16px; border-radius: 8px; transition: background-color 0.2s; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;"
              >
                <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
            
            <!-- Error Message -->
            <div id="ai-error-message" style="display: none; font-size: 12px; color: #dc2626; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 8px;">
              Unable to send message. Please try again.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Add CSS animations
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ai-pulse-soft {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.4; }
      }
      @keyframes ai-bounce-gentle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25%); }
      }
      @keyframes ai-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes ai-slide-up {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes ai-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes ai-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      #ai-chat-toggle:hover {
        background-color: #1d4ed8 !important;
        transform: scale(1.05) !important;
      }
      #ai-close-chat:hover {
        color: white !important;
      }
      #ai-send-button:hover {
        background-color: #1d4ed8 !important;
      }
      #ai-send-button:disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
      }
      #ai-message-input:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
      }
      @media (max-width: 480px) {
        #${CONFIG.WIDGET_ID} {
          left: 16px !important;
          bottom: 16px !important;
        }
        #ai-chat-window {
          width: calc(100vw - 32px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add message to chat
  function addMessage(message, isUser = false) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.style.cssText = `
      display: flex; 
      align-items: flex-start; 
      gap: 8px; 
      margin-bottom: 12px; 
      animation: ai-slide-up 0.3s ease-out;
      ${isUser ? 'justify-content: flex-end;' : ''}
    `;
    
    messageDiv.innerHTML = `
      ${!isUser ? `
        <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        </div>
      ` : ''}
      <div style="${isUser ? 'background-color: #2563eb; color: white;' : 'background-color: white; border: 1px solid #e2e8f0;'} border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); max-width: 240px;">
        <p style="font-size: 14px; ${isUser ? 'color: white;' : 'color: #374151;'} margin: 0; margin-bottom: 4px;">${message}</p>
        <span style="font-size: 12px; ${isUser ? 'color: #bfdbfe;' : 'color: #6b7280;'}">${timestamp}</span>
      </div>
      ${isUser ? `
        <div style="width: 32px; height: 32px; background-color: #d1d5db; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg style="width: 16px; height: 16px; color: #6b7280;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
        </div>
      ` : ''}
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Send message to API
  async function sendMessage(message) {
    const sessionId = getSessionId();
    
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.response || 'I received your message, but I don\'t have a response right now.';
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Unable to send message. Please check your connection and try again.');
    }
  }

  // Handle message sending
  async function handleSendMessage() {
    const input = document.getElementById('ai-message-input');
    const sendButton = document.getElementById('ai-send-button');
    const loadingMessage = document.getElementById('ai-loading-message');
    const errorMessage = document.getElementById('ai-error-message');
    
    const message = input.value.trim();
    if (!message) return;

    // Hide error message
    errorMessage.style.display = 'none';
    
    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Disable input and show loading
    input.disabled = true;
    sendButton.disabled = true;
    loadingMessage.style.display = 'flex';
    
    try {
      const response = await sendMessage(message);
      addMessage(response, false);
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    } finally {
      // Re-enable input and hide loading
      input.disabled = false;
      sendButton.disabled = false;
      loadingMessage.style.display = 'none';
      input.focus();
    }
  }

  // Initialize widget
  function initWidget() {
    // Add styles
    addStyles();
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = createWidgetHTML();
    document.body.appendChild(widgetContainer);

    // Get elements
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatIcon = document.getElementById('ai-chat-icon');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChat = document.getElementById('ai-close-chat');
    const messageInput = document.getElementById('ai-message-input');
    const sendButton = document.getElementById('ai-send-button');
    const notificationDot = document.getElementById('ai-notification-dot');

    let isOpen = false;

    // Toggle chat window
    function toggleChat() {
      isOpen = !isOpen;
      if (isOpen) {
        chatWindow.style.display = 'block';
        chatIcon.style.transform = 'scale(0.9)';
        notificationDot.style.display = 'none';
        setTimeout(() => messageInput.focus(), 100);
      } else {
        chatWindow.style.display = 'none';
        chatIcon.style.transform = 'scale(1)';
      }
    }

    // Event listeners
    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', handleSendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    // Hide error message when user starts typing
    messageInput.addEventListener('input', function() {
      const errorMessage = document.getElementById('ai-error-message');
      errorMessage.style.display = 'none';
    });

    console.log('AI Chat Widget initialized successfully');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

})();
