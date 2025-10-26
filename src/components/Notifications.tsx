import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Bell,
  Check,
  Trash2,
  Users,
  Award,
  Briefcase,
  MessageSquare,
  BookOpen,
  TrendingUp,
  X,
  CheckCheck
} from 'lucide-react';

type NotificationType = 'mentoring' | 'certificate' | 'job' | 'study' | 'system' | 'analysis';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'mentoring',
    title: '새로운 멘토링 요청',
    message: '이지훈 멘토님이 멘토링 요청을 수락했습니다.',
    timestamp: '5분 전',
    isRead: false,
    actionUrl: '/mentoring'
  },
  {
    id: '2',
    type: 'study',
    title: '스터디 모집 마감 임박',
    message: '"React 스터디" 모집이 3일 후 마감됩니다.',
    timestamp: '1시간 전',
    isRead: false,
    actionUrl: '/study'
  },
  {
    id: '3',
    type: 'certificate',
    title: '자격증 갱신 알림',
    message: '정보처리기사 자격증이 2개월 후 갱신 예정입니다.',
    timestamp: '3시간 전',
    isRead: false,
    actionUrl: '/upload'
  },
  {
    id: '4',
    type: 'job',
    title: '새로운 기업 매칭',
    message: '회원님의 역량과 일치하는 3개의 새로운 기업이 추천되었습니다.',
    timestamp: '5시간 전',
    isRead: true,
    actionUrl: '/jobs'
  },
  {
    id: '5',
    type: 'analysis',
    title: '역량 분석 완료',
    message: '이번 달 역량 분석 리포트가 준비되었습니다.',
    timestamp: '1일 전',
    isRead: true,
    actionUrl: '/analysis'
  },
  {
    id: '6',
    type: 'mentoring',
    title: '멘토링 세션 예정',
    message: '내일 오후 3시에 박서연 멘토님과의 멘토링이 예정되어 있습니다.',
    timestamp: '1일 전',
    isRead: true,
    actionUrl: '/mentoring'
  },
  {
    id: '7',
    type: 'system',
    title: '프로필 업데이트 권장',
    message: '최근 활동 내역을 반영하여 프로필을 업데이트해보세요.',
    timestamp: '2일 전',
    isRead: true,
    actionUrl: '/settings'
  },
  {
    id: '8',
    type: 'study',
    title: '스터디 신청 승인',
    message: '"알고리즘 스터디"에 참여 신청이 승인되었습니다.',
    timestamp: '3일 전',
    isRead: true,
    actionUrl: '/study'
  }
];

const notificationIcons: Record<NotificationType, any> = {
  mentoring: Users,
  certificate: Award,
  job: Briefcase,
  study: BookOpen,
  analysis: TrendingUp,
  system: Bell
};

const notificationColors: Record<NotificationType, string> = {
  mentoring: 'bg-purple-100 text-purple-600',
  certificate: 'bg-yellow-100 text-yellow-600',
  job: 'bg-blue-100 text-blue-600',
  study: 'bg-green-100 text-green-600',
  analysis: 'bg-indigo-100 text-indigo-600',
  system: 'bg-gray-100 text-gray-600'
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">알림</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림이 있습니다` : '모든 알림을 확인했습니다'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCheck className="w-4 h-4 mr-2" />
            모두 읽음 처리
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="all">
            전체 알림
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            읽지 않음
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-blue-600">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {activeFilter === 'unread' 
                        ? '읽지 않은 알림이 없습니다' 
                        : '알림이 없습니다'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                const colorClass = notificationColors[notification.type];
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all ${!notification.isRead ? 'border-l-4 border-l-blue-600 bg-blue-50/30' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="text-gray-900">{notification.title}</h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1.5 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400" style={{ fontSize: '14px' }}>
                              {notification.timestamp}
                            </span>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  읽음
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>알림 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(notificationIcons).map(([type, Icon]) => {
              const count = notifications.filter(n => n.type === type).length;
              if (count === 0) return null;
              
              const colorClass = notificationColors[type as NotificationType];
              const typeLabels: Record<NotificationType, string> = {
                mentoring: '멘토링',
                certificate: '자격증',
                job: '기업 추천',
                study: '스터디',
                analysis: '역량 분석',
                system: '시스템'
              };
              
              return (
                <div key={type} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      {typeLabels[type as NotificationType]}
                    </p>
                    <p className="text-gray-900">{count}개</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
