import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  MessageCircle, 
  Calendar, 
  Clock,
  Star,
  CheckCircle,
  Video,
  FileText,
  TrendingUp,
  Users,
  Target,
  Plus,
  Send,
  Paperclip,
  MoreVertical,
  Filter
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

interface MentoringSession {
  id: string;
  mentor: {
    name: string;
    title: string;
    company: string;
    expertise: string[];
    profileImage?: string;
    rating: number;
  };
  status: 'active' | 'completed' | 'scheduled' | 'pending';
  topic: string;
  startDate: string;
  totalSessions: number;
  completedSessions: number;
  nextSession?: {
    date: string;
    time: string;
    type: 'video' | 'chat';
  };
  progress: number;
  goals: string[];
}

interface Message {
  id: string;
  sender: 'me' | 'mentor';
  content: string;
  timestamp: string;
  type: 'text' | 'file';
}

export default function MyMentoring() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const mentoringSessions: MentoringSession[] = [
    {
      id: '1',
      mentor: {
        name: '김서연',
        title: 'Senior Backend Developer',
        company: '네이버',
        expertise: ['백엔드 개발', 'Spring Boot', 'MSA'],
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        rating: 4.9
      },
      status: 'active',
      topic: '백엔드 개발 커리어 멘토링',
      startDate: '2024.01.15',
      totalSessions: 8,
      completedSessions: 5,
      nextSession: {
        date: '2024.10.15',
        time: '19:00',
        type: 'video'
      },
      progress: 63,
      goals: ['Spring Boot 실무 역량 강화', '클린 아키텍처 이해', '포트폴리오 프로젝트 완성']
    },
    {
      id: '2',
      mentor: {
        name: '이준호',
        title: 'Tech Lead',
        company: '카카오',
        expertise: ['프론트엔드', 'React', 'TypeScript'],
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.8
      },
      status: 'scheduled',
      topic: 'React 심화 학습',
      startDate: '2024.10.20',
      totalSessions: 6,
      completedSessions: 0,
      nextSession: {
        date: '2024.10.20',
        time: '14:00',
        type: 'video'
      },
      progress: 0,
      goals: ['React Hooks 마스터', '상태 관리 라이브러리 활용', '성능 최적화']
    },
    {
      id: '3',
      mentor: {
        name: '박민수',
        title: 'AI Research Engineer',
        company: '삼성전자',
        expertise: ['머신러닝', 'Python', 'TensorFlow'],
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5.0
      },
      status: 'completed',
      topic: '머신러닝 기초부터 실전까지',
      startDate: '2023.11.01',
      totalSessions: 10,
      completedSessions: 10,
      progress: 100,
      goals: ['ML 기초 이론 습득', '실전 프로젝트 진행', '포트폴리오 완성']
    },
    {
      id: '4',
      mentor: {
        name: '최지우',
        title: 'Product Manager',
        company: '토스',
        expertise: ['PM', '제품 전략', 'UX 리서치'],
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7
      },
      status: 'pending',
      topic: 'PM 커리어 전환 가이드',
      startDate: '2024.11.01',
      totalSessions: 6,
      completedSessions: 0,
      progress: 0,
      goals: ['PM 역할 이해', '케이스 스터디', 'PM 이력서 작성']
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'mentor',
      content: '안녕하세요! 다음 세션 전에 Spring Boot 공식 문서의 Security 부분을 미리 읽어오시면 좋을 것 같아요.',
      timestamp: '10:30',
      type: 'text'
    },
    {
      id: '2',
      sender: 'me',
      content: '네, 알겠습니다! 혹시 JWT 인증 관련해서도 다룰 예정인가요?',
      timestamp: '10:35',
      type: 'text'
    },
    {
      id: '3',
      sender: 'mentor',
      content: '네, 맞습니다. JWT와 OAuth2.0 모두 다룰 예정입니다. 참고 자료를 보내드릴게요.',
      timestamp: '10:37',
      type: 'text'
    },
    {
      id: '4',
      sender: 'mentor',
      content: 'spring-security-jwt-guide.pdf',
      timestamp: '10:38',
      type: 'file'
    }
  ];

  const statusConfig = {
    active: { label: '진행중', color: 'bg-blue-100 text-blue-700', icon: TrendingUp },
    completed: { label: '완료', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    scheduled: { label: '예정', color: 'bg-purple-100 text-purple-700', icon: Calendar },
    pending: { label: '대기중', color: 'bg-orange-100 text-orange-700', icon: Clock }
  };

  const filteredSessions = mentoringSessions.filter(session => 
    filterStatus === 'all' || session.status === filterStatus
  );

  const stats = {
    total: mentoringSessions.length,
    active: mentoringSessions.filter(s => s.status === 'active').length,
    completed: mentoringSessions.filter(s => s.status === 'completed').length,
    totalHours: mentoringSessions.reduce((acc, s) => acc + s.completedSessions, 0) * 1.5
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">내 멘토링</h1>
          <p className="text-gray-600 mt-1">진행 중인 멘토링을 관리하고 확인하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 멘토링 신청
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">전체 멘토링</p>
                <p className="text-gray-900 mt-1">{stats.total}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">진행중</p>
                <p className="text-gray-900 mt-1">{stats.active}개</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">완료</p>
                <p className="text-gray-900 mt-1">{stats.completed}개</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">총 멘토링 시간</p>
                <p className="text-gray-900 mt-1">{stats.totalHours}시간</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="sessions">
              <Calendar className="w-4 h-4 mr-2" />
              멘토링 목록
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="w-4 h-4 mr-2" />
              메시지
            </TabsTrigger>
          </TabsList>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 상태</SelectItem>
              <SelectItem value="active">진행중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="scheduled">예정</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sessions List */}
        <TabsContent value="sessions" className="space-y-4">
          {filteredSessions.map((session) => {
            const StatusIcon = statusConfig[session.status].icon;
            
            return (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.mentor.profileImage} />
                        <AvatarFallback>{session.mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-gray-900">{session.topic}</CardTitle>
                          <Badge className={statusConfig[session.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[session.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <span>{session.mentor.name} • {session.mentor.title}</span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                            {session.mentor.rating}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {session.mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">진행률</span>
                      <span className="text-gray-900">
                        {session.completedSessions}/{session.totalSessions} 세션 완료
                      </span>
                    </div>
                    <Progress value={session.progress} className="h-2" />
                  </div>

                  {/* Goals */}
                  <div>
                    <p className="text-gray-600 mb-2">목표</p>
                    <ul className="space-y-1">
                      {session.goals.map((goal, index) => (
                        <li key={index} className="flex items-start space-x-2 text-gray-700">
                          <Target className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span style={{ fontSize: '14px' }}>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Session */}
                  {session.nextSession && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 mb-1">다음 세션</p>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {session.nextSession.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.nextSession.time}
                            </span>
                            <span className="flex items-center">
                              {session.nextSession.type === 'video' ? (
                                <>
                                  <Video className="w-4 h-4 mr-1" />
                                  화상
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  채팅
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        <Button>세션 입장</Button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          메시지
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>멘토와 대화</DialogTitle>
                          <DialogDescription>{session.mentor.name} 멘토님과의 대화</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Messages */}
                          <div className="h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
                            {messages.map((msg) => (
                              <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[70%] ${
                                  msg.sender === 'me' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-900'
                                } p-3 rounded-lg`}>
                                  {msg.type === 'file' ? (
                                    <div className="flex items-center space-x-2">
                                      <FileText className="w-4 h-4" />
                                      <span style={{ fontSize: '14px' }}>{msg.content}</span>
                                    </div>
                                  ) : (
                                    <p style={{ fontSize: '14px' }}>{msg.content}</p>
                                  )}
                                  <p className={`mt-1 ${
                                    msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                                  }`} style={{ fontSize: '12px' }}>
                                    {msg.timestamp}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Input */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                            <Input 
                              placeholder="메시지를 입력하세요..."
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <Button>
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      자료 보기
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredSessions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">멘토링이 없습니다</h3>
                <p className="text-gray-600 mb-6">
                  새로운 멘토링을 신청하거나 필터를 변경해보세요.
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  멘토링 신청
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">멘토를 선택하세요</h3>
              <p className="text-gray-600">
                멘토링 목록에서 멘토를 선택하여 메시지를 확인하세요.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
