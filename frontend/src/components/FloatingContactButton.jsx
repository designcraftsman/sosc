import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { TfiClose } from 'react-icons/tfi';
import { BsChatDots } from 'react-icons/bs';
import { IoSendSharp } from 'react-icons/io5';
import { useLanguage } from '../context/LanguageContext';

const FloatingContactButton = () => {
  const { language } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  const text = language === 'fr' ? 'Contactez-nous' : 
               language === 'ar' ? 'اتصل بنا' : 
               'Contact us';

  const chatContent = {
    fr: {
      agentName: 'Agent SOSC',
      greeting: 'Bonjour! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui?',
      quickReplies: [
        { text: 'Demande de crédit', link: '/services/crédit' },
        { text: 'Recouvrement', link: '/services/recouvrement' },
        { text: 'Formations', link: '/services/formations' },
        { text: 'Parler à un humain', action: 'contact' }
      ],
      responses: {
        credit: 'Excellent choix! Nous proposons des solutions de crédit personnalisées. Je vous redirige vers notre page de crédit pour plus de détails. 💳',
        recouvrement: 'Nous offrons des services professionnels de recouvrement de créances. Laissez-moi vous montrer nos solutions. 📊',
        formations: 'Nous proposons diverses formations professionnelles. Découvrez nos programmes! 📚',
        contact: 'Je vous mets en relation avec notre équipe. Vous pouvez aussi nous appeler au +216 12 345 678 ou nous écrire à contact@sosc.tn 📞',
        default: 'Merci pour votre message! Un de nos agents vous répondra bientôt. Pour une réponse immédiate, appelez-nous au +216 12 345 678. 😊'
      },
      placeholder: 'Tapez votre message...',
      typing: 'En train d\'écrire...'
    },
    ar: {
      agentName: 'وكيل SOSC',
      greeting: 'مرحبا! 👋 أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟',
      quickReplies: [
        { text: 'طلب قرض', link: '/services/crédit' },
        { text: 'تحصيل الديون', link: '/services/recouvrement' },
        { text: 'التدريب', link: '/services/formations' },
        { text: 'التحدث إلى إنسان', action: 'contact' }
      ],
      responses: {
        credit: 'اختيار ممتاز! نحن نقدم حلول قروض مخصصة. سأوجهك إلى صفحة القروض لمزيد من التفاصيل. 💳',
        recouvrement: 'نحن نقدم خدمات تحصيل ديون احترافية. دعني أريك حلولنا. 📊',
        formations: 'نحن نقدم برامج تدريبية مختلفة. اكتشف برامجنا! 📚',
        contact: 'سأضعك على اتصال مع فريقنا. يمكنك أيضا الاتصال بنا على +216 12 345 678 أو مراسلتنا على contact@sosc.tn 📞',
        default: 'شكرا لرسالتك! سيرد عليك أحد وكلائنا قريبا. للحصول على رد فوري، اتصل بنا على +216 12 345 678. 😊'
      },
      placeholder: 'اكتب رسالتك...',
      typing: 'يكتب...'
    },
    en: {
      agentName: 'SOSC Agent',
      greeting: 'Hello! 👋 I\'m your virtual assistant. How can I help you today?',
      quickReplies: [
        { text: 'Loan request', link: '/services/crédit' },
        { text: 'Debt recovery', link: '/services/recouvrement' },
        { text: 'Training', link: '/services/formations' },
        { text: 'Talk to a human', action: 'contact' }
      ],
      responses: {
        credit: 'Great choice! We offer customized loan solutions. Let me redirect you to our loan page for more details. 💳',
        recouvrement: 'We offer professional debt recovery services. Let me show you our solutions. 📊',
        formations: 'We offer various professional training programs. Discover our programs! 📚',
        contact: 'I\'ll connect you with our team. You can also call us at +216 12 345 678 or email us at contact@sosc.tn 📞',
        default: 'Thanks for your message! One of our agents will respond soon. For immediate response, call us at +216 12 345 678. 😊'
      },
      placeholder: 'Type your message...',
      typing: 'Typing...'
    }
  };

  const content = chatContent[language] || chatContent.fr;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            type: 'agent',
            text: content.greeting,
            timestamp: new Date()
          }
        ]);
      }, 500);
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      type: 'user',
      text: reply.text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    simulateTyping(() => {
      let responseText = content.responses.default;
      let shouldNavigate = false;
      let navigationLink = '';

      if (reply.link) {
        const service = reply.link.split('/').pop();
        if (service === 'crédit') responseText = content.responses.credit;
        else if (service === 'recouvrement') responseText = content.responses.recouvrement;
        else if (service === 'formations') responseText = content.responses.formations;
        
        shouldNavigate = true;
        navigationLink = reply.link;
      } else if (reply.action === 'contact') {
        responseText = content.responses.contact;
        shouldNavigate = true;
        navigationLink = '/contact';
      }

      const agentMessage = {
        type: 'agent',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);

      if (shouldNavigate) {
        setTimeout(() => {
          navigate(navigationLink);
          setIsChatOpen(false);
        }, 2000);
      }
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    simulateTyping(() => {
      const agentMessage = {
        type: 'agent',
        text: content.responses.default,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    });
  };

  return (
    <>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="floating-chat-modal">
          <div className="chat-header">
            <div className="agent-info">
              <div className="agent-avatar">
                <BsChatDots />
              </div>
              <div>
                <h3>{content.agentName}</h3>
                <span className="agent-status">En ligne</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggleChat}>
              <TfiClose />
            </button>
          </div>
          
          <div className="chat-body">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.type}`}>
                  {message.type === 'agent' && (
                    <div className="message-avatar">
                      <BsChatDots />
                    </div>
                  )}
                  <div className="message-bubble">
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-message agent">
                  <div className="message-avatar">
                    <BsChatDots />
                  </div>
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {messages.length > 0 && !isTyping && (
              <div className="quick-replies">
                {content.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={content.placeholder}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">
              <IoSendSharp />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button className="floating-contact-button" onClick={toggleChat}>
        {isChatOpen ? (
          <TfiClose className="floating-contact-icon" />
        ) : (
          <>
            <BsChatDots className="floating-contact-icon" />
            <span className="floating-contact-text">{text}</span>
          </>
        )}
      </button>
    </>
  );
};

export default FloatingContactButton;
