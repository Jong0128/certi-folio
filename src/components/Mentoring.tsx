import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Search, 
  MessageCircle, 
  Star,
  Award,
  MapPin,
  Clock,
  Send,
  Filter,
  UserCheck,
  Building
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ChatWindow from './ChatWindow';
import MentorProfile from './MentorProfile';

export default function Mentoring() {
  const [activeTab, setActiveTab] = useState('find-mentor');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const mentors = [
    {
      id: 1,
      name: '김선영',
      title: '시니어 백엔드 개발자',
      company: '네이버',
      experience: '8년',
      rating: 4.9,
      reviews: 127,
      skills: ['Java', 'Spring Boot', 'AWS', '시스템 설계'],
      location: '서울',
      price: '30,000원/시간',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face',
      verified: true,
      description: '네이버에서 대규모 서비스 개발 경험이 있습니다. 백엔드 아키텍처 설계와 성능 최적화를 전문으로 합니다.'
    },
    {
      id: 2,
      name: '박민호',
      title: '풀스택 개발자',
      company: '카카오',
      experience: '6년',
      rating: 4.8,
      reviews: 89,
      skills: ['React', 'Node.js', 'TypeScript', 'DevOps'],
      location: '판교',
      price: '25,000원/시간',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      verified: true,
      description: '스타트업부터 대기업까지 다양한 환경에서 풀스택 개발 경험을 쌓았습니다.'
    },
    {
      id: 3,
      name: '이지혜',
      title: 'AI/ML 엔지니어',
      company: '삼성전자',
      experience: '5년',
      rating: 4.7,
      reviews: 64,
      skills: ['Python', 'TensorFlow', 'PyTorch', '데이터 사이언스'],
      location: '수원',
      price: '35,000원/시간',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face',
      verified: true,
      description: '삼성전자에서 AI 제품 개발 및 연구를 담당하고 있습니다.'
    }
  ];

  const mentoringRequests = [
    {
      id: 1,
      title: '백엔드 개발자 진로 상담',
      mentee: '김민수',
      skills: ['Java', 'Spring'],
      budget: '30,000원',
      deadline: '2024-10-15',
      description: '컴공과 3학년입니다. 백엔드 개발자로 취업하고 싶은데 어떤 공부를 더 해야 할지 궁금합니다.',
      status: 'active'
    },
    {
      id: 2,
      title: '프론트엔드 포트폴리오 리뷰',
      mentee: '이영희',
      skills: ['React', 'JavaScript'],
      budget: '20,000원',
      deadline: '2024-10-20',
      description: 'React로 만든 포트폴리오 사이트에 대한 피드백을 받고 싶습니다.',
      status: 'active'
    }
  ];

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">멘토링 시스템</h1>
        <p className="text-gray-600">전문가와의 1:1 멘토링으로 역량을 강화하세요.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'find-mentor' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('find-mentor')}
        >
          <Users className="w-4 h-4 mr-2" />
          멘토 찾기
        </Button>
        <Button
          variant={activeTab === 'mentor-requests' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('mentor-requests')}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          멘토링 요청
        </Button>
      </div>

      {activeTab === 'find-mentor' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="멘토 이름, 스킬, 회사명으로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  필터
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mentor.image} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{mentor.name}</h3>
                        {mentor.verified && (
                          <UserCheck className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Building className="w-3 h-3" />
                        <span>{mentor.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">경력</span>
                      <span className="font-medium">{mentor.experience}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">평점</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-gray-500">({mentor.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">위치</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{mentor.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {mentor.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {mentor.description}
                    </p>

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-blue-600">{mentor.price}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedMentor(mentor);
                            setShowChatWindow(true);
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          상담 신청
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedMentor(mentor);
                            setShowProfile(true);
                          }}
                        >
                          프로필
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mentor-requests' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>멘토링 요청 게시판</CardTitle>
              <p className="text-gray-600">멘토를 찾고 있는 멘티들의 요청을 확인하세요.</p>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4">
                <Send className="w-4 h-4 mr-2" />
                새로운 요청 등록
              </Button>
              
              <div className="space-y-4">
                {mentoringRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{request.title}</h4>
                          <p className="text-sm text-gray-600">요청자: {request.mentee}</p>
                        </div>
                        <Badge variant="outline">{request.status === 'active' ? '모집중' : '완료'}</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {request.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="space-x-4">
                          <span>예산: {request.budget}</span>
                          <span>마감: {request.deadline}</span>
                        </div>
                        <Button size="sm">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          지원하기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Window Modal */}
      {showChatWindow && selectedMentor && (
        <ChatWindow
          mentor={selectedMentor}
          onClose={() => {
            setShowChatWindow(false);
            setSelectedMentor(null);
          }}
        />
      )}

      {/* Mentor Profile Modal */}
      {showProfile && selectedMentor && (
        <MentorProfile
          mentor={selectedMentor}
          onClose={() => {
            setShowProfile(false);
            setSelectedMentor(null);
          }}
          onStartChat={() => {
            setShowProfile(false);
            setShowChatWindow(true);
          }}
        />
      )}
    </div>
  );
}