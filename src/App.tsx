import { useState } from 'react';
import { Button } from './components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Toaster } from './components/ui/sonner';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { 
  Upload, 
  Users, 
  BookOpen, 
  Target, 
  Bell, 
  Award, 
  TrendingUp,
  LogOut,
  Home,
  ClipboardList,
  LineChart,
  MessageSquare,
  Briefcase,
  Settings,
  FileText,
  GraduationCap,
  Map,
  UserPlus,
  MessageCircle,
  HelpCircle,
  Star,
  Search,
  User,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CertificateUpload from './components/CertificateUpload';
import SkillAnalysis from './components/SkillAnalysis';
import Mentoring from './components/Mentoring';
import StudyBoard from './components/StudyBoard';
import JobRecommendation from './components/JobRecommendation';
import JobSearch from './components/JobSearch';
import SavedJobs from './components/SavedJobs';
import Notifications from './components/Notifications';
import SettingsPage from './components/Settings';
import Auth from './components/Auth';
import MyCertificates from './components/MyCertificates';
import Career from './components/Career';
import Education from './components/Education';
import Roadmap from './components/Roadmap';
import MyMentoring from './components/MyMentoring';
import BecomeMentor from './components/BecomeMentor';
import Board from './components/Board';
import QnA from './components/QnA';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Demo mode for quick testing
  const enableDemoMode = () => {
    const demoUser = {
      id: 'demo',
      name: '김민수',
      email: 'demo@example.com',
      university: '서울대학교',
      major: '컴퓨터공학과',
      year: '3',
      interests: ['백엔드 개발'],
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    setUser(demoUser);
    setIsAuthenticated(true);
  };

  const handleLogin = (userData: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Mock notifications for dropdown
  const recentNotifications = [
    {
      id: '1',
      type: 'mentoring' as const,
      title: '새로운 멘토링 요청',
      message: '이지훈 멘토님이 멘토링 요청을 수락했습니다.',
      timestamp: '5분 전',
      isRead: false
    },
    {
      id: '2',
      type: 'study' as const,
      title: '스터디 모집 마감 임박',
      message: '"React 스터디" 모집이 3일 후 마감됩니다.',
      timestamp: '1시간 전',
      isRead: false
    },
    {
      id: '3',
      type: 'certificate' as const,
      title: '자격증 갱신 알림',
      message: '정보처리기사 자격증이 2개월 후 갱신 예정입니다.',
      timestamp: '3시간 전',
      isRead: false
    }
  ];

  const notificationIcons = {
    mentoring: Users,
    certificate: Award,
    job: Briefcase,
    study: BookOpen,
    analysis: TrendingUp,
    system: Bell
  };

  const notificationColors = {
    mentoring: 'bg-purple-100 text-purple-600',
    certificate: 'bg-yellow-100 text-yellow-600',
    job: 'bg-blue-100 text-blue-600',
    study: 'bg-green-100 text-green-600',
    analysis: 'bg-indigo-100 text-indigo-600',
    system: 'bg-gray-100 text-gray-600'
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로그인 중...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <Auth onLogin={handleLogin} />
        {/* Demo mode button for testing */}
        <div className="fixed bottom-4 right-4">
          <Button onClick={enableDemoMode} variant="outline" size="sm">
            데모 모드
          </Button>
        </div>
      </div>
    );
  }

  const navigationMenus = [
    {
      id: 'info',
      label: '정보 관리',
      icon: ClipboardList,
      items: [
        { id: 'upload', label: '정보 입력하기', icon: Upload, description: '학력, 자격증, 경력 등록' },
        { id: 'my-certificates', label: '내 자격증', icon: Award, description: '보유 자격증 관리' },
        { id: 'career', label: '경력 관리', icon: Briefcase, description: '인턴 및 경력 사항' },
        { id: 'education', label: '학력 관리', icon: GraduationCap, description: '학력 및 성적 정보' }
      ]
    },
    {
      id: 'analysis',
      label: '역량 분석',
      icon: LineChart,
      items: [
        { id: 'analysis', label: '역량 차트', icon: TrendingUp, description: '내 역량 레이더 차트' },
        { id: 'roadmap', label: '개선 로드맵', icon: Map, description: '맞춤형 성장 로드맵' }
      ]
    },
    {
      id: 'mentoring',
      label: '멘토링',
      icon: MessageSquare,
      items: [
        { id: 'mentoring', label: '멘토 찾기', icon: Users, description: '전문가 멘토 검색' },
        { id: 'my-mentoring', label: '내 멘토링', icon: MessageCircle, description: '진행 중인 멘토링' },
        { id: 'become-mentor', label: '멘토 신청', icon: UserPlus, description: '멘토로 활동하기' }
      ]
    },
    {
      id: 'community',
      label: '커뮤니티',
      icon: Users,
      items: [
        { id: 'study', label: '스터디/프로젝트', icon: BookOpen, description: '스터디 및 프로젝트 모집' },
        { id: 'board', label: '자유 게시판', icon: MessageSquare, description: '자유로운 소통 공간' },
        { id: 'qna', label: '질문 게시판', icon: HelpCircle, description: 'Q&A 및 정보 공유' }
      ]
    },
    {
      id: 'jobs',
      label: '기업 추천',
      icon: Briefcase,
      items: [
        { id: 'jobs', label: '맞춤 기업', icon: Award, description: '내 역량 기반 기업 추천' },
        { id: 'job-search', label: '채용 공고', icon: Search, description: '최신 채용 정보 검색' },
        { id: 'saved-jobs', label: '관심 기업', icon: Star, description: '저장한 기업 및 공고' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {/* Logo - Clickable to go to Dashboard */}
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setActiveTab('dashboard')}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Certi-Folio</span>
              </div>

              {/* Navigation Menu */}
              <div className="flex items-center space-x-1">
                <NavigationMenu viewport={false}>
                  <NavigationMenuList>
                    {navigationMenus.map((menu) => {
                      const MenuIcon = menu.icon;
                      return (
                        <NavigationMenuItem key={menu.id}>
                          <NavigationMenuTrigger className="h-10">
                            <MenuIcon className="w-4 h-4 mr-2" />
                            {menu.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[350px] gap-2 p-3">
                              {menu.items.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <li key={item.id}>
                                    <div
                                      onClick={() => setActiveTab(item.id)}
                                      className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer ${
                                        activeTab === item.id ? 'bg-accent' : ''
                                      }`}
                                    >
                                      <div className="flex items-center space-x-2 mb-1">
                                        <ItemIcon className="w-4 h-4" />
                                        <div className="leading-none">{item.label}</div>
                                      </div>
                                      <p className="line-clamp-2 leading-snug text-muted-foreground" style={{ fontSize: '13px' }}>
                                        {item.description}
                                      </p>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications Popover */}
              <Popover>
                <PopoverTrigger className="relative inline-flex items-center justify-center rounded-md px-3 h-9 hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Bell className="w-4 h-4" />
                  {/* Notification Badge */}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                    {recentNotifications.filter(n => !n.isRead).length}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-900">알림</h3>
                      <Badge variant="secondary">
                        {recentNotifications.filter(n => !n.isRead).length}개 새로움
                      </Badge>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {recentNotifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500" style={{ fontSize: '14px' }}>알림이 없습니다</p>
                      </div>
                    ) : (
                      recentNotifications.map((notification, index) => {
                        const Icon = notificationIcons[notification.type];
                        const colorClass = notificationColors[notification.type];
                        return (
                          <div key={notification.id}>
                            <div className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''}`}>
                              <div className="flex space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-1">
                                    <p className="text-gray-900" style={{ fontSize: '14px' }}>
                                      {notification.title}
                                    </p>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1 flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-gray-600 mb-1" style={{ fontSize: '13px' }}>
                                    {notification.message}
                                  </p>
                                  <p className="text-gray-400" style={{ fontSize: '12px' }}>
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {index < recentNotifications.length - 1 && <Separator />}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="p-3 border-t bg-gray-50">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between"
                      onClick={() => setActiveTab('notifications')}
                    >
                      모든 알림 보기
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-gray-200 transition-all">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback>{user?.name?.[0] || '사'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-gray-900">{user?.name || '사용자'}</p>
                      <p className="text-gray-500" style={{ fontSize: '13px', fontWeight: 'normal' }}>
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    설정
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('upload')}>
                    <Award className="w-4 h-4 mr-2" />
                    내 자격증
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onStartInfoInput={() => setActiveTab('upload')} onNavigate={setActiveTab} />}
        {activeTab === 'notifications' && <Notifications />}
        {activeTab === 'settings' && <SettingsPage />}
        {activeTab === 'upload' && <CertificateUpload />}
        {activeTab === 'my-certificates' && <MyCertificates />}
        {activeTab === 'career' && <Career />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'analysis' && <SkillAnalysis />}
        {activeTab === 'roadmap' && <Roadmap />}
        {activeTab === 'mentoring' && <Mentoring />}
        {activeTab === 'my-mentoring' && <MyMentoring />}
        {activeTab === 'become-mentor' && <BecomeMentor />}
        {activeTab === 'study' && <StudyBoard />}
        {activeTab === 'board' && <Board />}
        {activeTab === 'qna' && <QnA />}
        {activeTab === 'jobs' && <JobRecommendation />}
        {activeTab === 'job-search' && <JobSearch />}
        {activeTab === 'saved-jobs' && <SavedJobs />}
      </div>
    </div>
  );
}