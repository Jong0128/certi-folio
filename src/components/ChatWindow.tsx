import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  X, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Calendar,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface ChatWindowProps {
  mentor: {
    id: number;
    name: string;
    title: string;
    company: string;
    image: string;
    verified: boolean;
    price: string;
  };
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'mentor';
  message: string;
  timestamp: string;
  type: 'text' | 'system' | 'suggestion';
}

export default function ChatWindow({ mentor, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'system',
      message: `${mentor.name} 멘토와의 채팅이 시작되었습니다.`,
      timestamp: '방금 전',
      type: 'system'
    },
    {
      id: 2,
      sender: 'mentor',
      message: '안녕하세요! 상담 신청해 주셔서 감사합니다. 어떤 부분에 대해 도움이 필요하신가요?',
      timestamp: '방금 전',
      type: 'text'
    },
    {
      id: 3,
      sender: 'mentor',
      message: '빠른 상담을 위해 아래 주제 중 하나를 선택해 주세요:',
      timestamp: '방금 전',
      type: 'suggestion'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        message: message.trim(),
        timestamp: '방금 전',
        type: 'text'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');

      // 자동 응답 시뮬레이션
      setTimeout(() => {
        const mentorResponse: Message = {
          id: messages.length + 2,
          sender: 'mentor',
          message: '좋은 질문이네요! 조금 더 구체적으로 설명해 주시면 더 정확한 조언을 드릴 수 있을 것 같습니다.',
          timestamp: '방금 전',
          type: 'text'
        };
        setMessages(prev => [...prev, mentorResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickTopics = [
    '진로 상담',
    '포트폴리오 리뷰',
    '기술 스택 추천',
    '취업 준비',
    '면접 준비'
  ];

  const handleQuickTopic = (topic: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      message: `${topic}에 대해 상담받고 싶습니다.`,
      timestamp: '방금 전',
      type: 'text'
    };
    
    setMessages([...messages, newMessage]);

    // 멘토 응답 시뮬레이션
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        '진로 상담': '진로에 대한 고민이 많으시겠네요. 현재 어떤 분야에 관심이 있으신지, 그리고 어떤 부분에서 어려움을 느끼고 계신지 말씀해 주세요.',
        '포트폴리오 리뷰': '포트폴리오 리뷰를 도와드리겠습니다. 깃허브 링크나 포트폴리오 URL을 공유해 주시면 자세히 살펴보고 피드백을 드릴게요.',
        '기술 스택 추천': '어떤 분야의 개발자를 목표로 하고 계신가요? 현재 학습하고 있는 기술들도 함께 알려주시면 더 맞춤형 추천을 드릴 수 있습니다.',
        '취업 준비': '취업 준비 과정에서 가장 궁금한 부분이 무엇인가요? 이력서, 자기소개서, 기술 면접 등 구체적인 영역을 알려주시면 도움을 드릴게요.',
        '면접 준비': '면접 준비를 도와드리겠습니다. 어떤 포지션의 면접인지, 그리고 특히 걱정되는 부분이 있다면 말씀해 주세요.'
      };
      
      const mentorResponse: Message = {
        id: messages.length + 2,
        sender: 'mentor',
        message: responses[topic] || '해당 주제에 대해 자세히 상담해 드리겠습니다. 구체적인 질문을 해주세요.',
        timestamp: '방금 전',
        type: 'text'
      };
      setMessages(prev => [...prev, mentorResponse]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Chat Header */}
        <CardHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={mentor.image} />
                <AvatarFallback>{mentor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">{mentor.name}</CardTitle>
                  {mentor.verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  )}
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">{mentor.title} • {mentor.company}</p>
                <p className="text-xs text-gray-500">온라인 • 보통 1시간 내 응답</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {mentor.price}
              </Badge>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.type === 'system' && (
                <div className="flex justify-center">
                  <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {msg.message}
                  </div>
                </div>
              )}
              
              {msg.type === 'text' && (
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.sender === 'mentor' && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mentor.image} />
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-3 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' 
                          ? 'text-blue-100' 
                          : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'suggestion' && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[70%]">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mentor.image} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
                      <p className="text-sm mb-2">{msg.message}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickTopics.map((topic, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            className="text-xs h-8"
                            onClick={() => handleQuickTopic(topic)}
                          >
                            {topic}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Smile className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="메시지를 입력하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-12"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
            <span>상담료: {mentor.price}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}