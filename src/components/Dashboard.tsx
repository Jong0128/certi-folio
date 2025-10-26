import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar as CalendarUI } from './ui/calendar';
import { 
  Calendar, 
  Award, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  BookOpen,
  Target,
  Edit,
  User,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  onStartInfoInput?: () => void;
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ onStartInfoInput, onNavigate }: DashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // 사용자의 정보 입력 여부를 체크하는 상태
  // 실제로는 Supabase에서 불러와야 하는 데이터
  const hasUserInfo = false; // 임시로 false로 설정
  const upcomingSchedules = [
    {
      id: 1,
      title: '정보처리기사 필기시험',
      date: '2024년 10월 15일',
      fullDate: new Date(2024, 9, 15), // Month is 0-indexed
      daysLeft: 12,
      type: 'exam',
      priority: 'high'
    },
    {
      id: 2,
      title: 'AWS 자격증 갱신',
      date: '2024년 11월 30일',
      fullDate: new Date(2024, 10, 30),
      daysLeft: 58,
      type: 'renewal',
      priority: 'medium'
    }
  ];

  const certificates = [
    {
      id: 1,
      name: '컴활 1급',
      issuer: '대한상공회의소',
      date: '2023.05.15',
      status: 'active',
      expiryDate: '2025.05.15'
    },
    {
      id: 2,
      name: 'TOEIC',
      issuer: 'ETS',
      date: '2023.08.20',
      status: 'active',
      score: '890점'
    },
    {
      id: 3,
      name: 'SQLD',
      issuer: '한국데이터진흥원',
      date: '2023.12.10',
      status: 'active'
    }
  ];

  const skillProgress = [
    { category: '자격증', current: 75, target: 100 },
    { category: '어학', current: 85, target: 100 },
    { category: '실무경험', current: 60, target: 100 },
    { category: '학점', current: 88, target: 100 }
  ];

  // 날짜에 일정이 있는지 확인하는 함수
  const hasScheduleOnDate = (date: Date) => {
    return upcomingSchedules.some(schedule => 
      schedule.fullDate.toDateString() === date.toDateString()
    );
  };

  // 선택된 날짜의 일정 가져오기
  const getSchedulesForDate = (date: Date | undefined) => {
    if (!date) return [];
    return upcomingSchedules.filter(schedule => 
      schedule.fullDate.toDateString() === date.toDateString()
    );
  };

  const selectedDateSchedules = getSchedulesForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">안녕하세요, 김민수님! 👋</h1>
        <p className="text-blue-100">오늘도 목표를 향해 한 걸음 더 나아가세요.</p>
      </div>

      {/* 정보 입력 안내 - 사용자가 정보를 입력하지 않았을 때만 표시 */}
      {!hasUserInfo && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-3">프로필을 완성하세요!</h2>
            <p className="text-blue-700 mb-6 text-lg">
              학력, 경력, 자격증 정보를 입력하면 더 정확한 분석과 추천을 받을 수 있습니다.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={onStartInfoInput}
            >
              <Edit className="w-5 h-5 mr-2" />
              정보 입력하기
            </Button>
            <div className="flex justify-center space-x-6 mt-6 text-sm text-blue-600">
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                학력 정보
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                자격증 정보
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                경력 정보
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Priority Alerts */}
      {upcomingSchedules.some(schedule => schedule.daysLeft <= 15) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              긴급 일정 알림
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSchedules
                .filter(schedule => schedule.daysLeft <= 15)
                .map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">{schedule.title}</p>
                        <p className="text-sm text-gray-600">{schedule.date} • D-{schedule.daysLeft}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      일정 추가
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            일정 캘린더
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="flex justify-center">
              <CalendarUI
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  scheduled: (date) => hasScheduleOnDate(date)
                }}
                modifiersStyles={{
                  scheduled: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: '#2563eb'
                  }
                }}
              />
            </div>
            
            {/* Selected Date Details */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">
                {selectedDate ? selectedDate.toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                }) : '날짜를 선택하세요'}
              </h3>
              
              {selectedDateSchedules.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{schedule.title}</p>
                          <p className="text-sm text-gray-600 mt-1">D-{schedule.daysLeft}</p>
                        </div>
                        <Badge variant={schedule.priority === 'high' ? 'destructive' : 'secondary'}>
                          {schedule.type === 'exam' ? '시험' : '갱신'}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {schedule.date}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">이 날짜에 예정된 일정이 없습니다</p>
                </div>
              )}
              
              <Button className="w-full mt-4" variant="outline" onClick={() => onNavigate?.('notifications')}>
                <Calendar className="w-4 h-4 mr-2" />
                전체 일정 관리
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skill Analysis Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              역량 분석 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.category}</span>
                    <span className="text-sm text-gray-600">{skill.current}% / {skill.target}%</span>
                  </div>
                  <Progress value={skill.current} className="h-2" />
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={() => onNavigate?.('analysis')}>
              <Target className="w-4 h-4 mr-2" />
              상세 분석 보기
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              다가오는 일정
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      schedule.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium">{schedule.title}</p>
                      <p className="text-sm text-gray-600">D-{schedule.daysLeft}</p>
                    </div>
                  </div>
                  <Badge variant={schedule.priority === 'high' ? 'destructive' : 'secondary'}>
                    {schedule.type === 'exam' ? '시험' : '갱신'}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={() => onNavigate?.('notifications')}>
              전체 일정 보기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* My Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              보유 자격증 ({certificates.length}개)
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('my-certificates')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm">취득일: {cert.date}</p>
                  {cert.score && <p className="text-sm">점수: {cert.score}</p>}
                  {cert.expiryDate && (
                    <p className="text-sm text-orange-600">유효기간: {cert.expiryDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate?.('study')}>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">스터디 찾기</h3>
            <p className="text-sm text-gray-600">함께 공부할 스터디원을 찾아보세요</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate?.('mentoring')}>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">멘토 매칭</h3>
            <p className="text-sm text-gray-600">전문가의 조언을 받아보세요</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate?.('jobs')}>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">기업 분석</h3>
            <p className="text-sm text-gray-600">내게 맞는 기업을 찾아보세요</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}