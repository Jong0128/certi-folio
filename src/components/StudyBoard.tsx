import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  MapPin, 
  Search,
  Plus,
  MessageCircle,
  Clock,
  Target,
  Code,
  Lightbulb,
  Save,
  Send
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function StudyBoard() {
  const [activeTab, setActiveTab] = useState('study');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog states
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  
  // New group form
  const [newGroupForm, setNewGroupForm] = useState({
    type: 'study',
    title: '',
    category: '코딩테스트',
    description: '',
    location: '온라인',
    schedule: '',
    duration: '',
    maxMembers: '6',
    level: '초급',
    tags: ''
  });
  
  // Join form
  const [joinForm, setJoinForm] = useState({
    message: '',
    experience: ''
  });

  const studyGroups = [
    {
      id: 1,
      title: '알고리즘 스터디 (백준/프로그래머스)',
      type: 'study',
      category: '코딩테스트',
      leader: '김코딩',
      members: 4,
      maxMembers: 6,
      location: '온라인',
      schedule: '주 3회 (월, 수, 금) 저녁 8시',
      duration: '3개월',
      level: '초급-중급',
      description: '코딩테스트 대비를 위한 알고리즘 문제 풀이 스터디입니다. 매주 정��진 주제로 문제를 풀고 코드 리뷰를 진행합니다.',
      tags: ['알고리즘', '코딩테스트', '백준', '프로그래머스'],
      status: 'recruiting',
      startDate: '2024-11-01'
    },
    {
      id: 2,
      title: 'React + TypeScript 프로젝트 스터디',
      type: 'project',
      category: '웹 개발',
      leader: '이리액트',
      members: 3,
      maxMembers: 5,
      location: '강남역 스터디룸',
      schedule: '주 2회 (토, 일) 오후 2시',
      duration: '4개월',
      level: '중급',
      description: 'React와 TypeScript를 사용하여 실제 서비스를 만들어보는 프로젝트 스터디입니다. 협업 경험과 포트폴리오를 만들 수 있습니다.',
      tags: ['React', 'TypeScript', '프로젝트', '협업'],
      status: 'recruiting',
      startDate: '2024-10-25'
    },
    {
      id: 3,
      title: '정보처리기사 필기 스터디',
      type: 'study',
      category: '자격증',
      leader: '박정처',
      members: 8,
      maxMembers: 10,
      location: '온라인',
      schedule: '주 5회 (평일) 저녁 7시',
      duration: '2개월',
      level: '초급',
      description: '2024년 정보처리기사 필기 시험 대비 스터디입니다. 매일 문제 풀���와 개념 정리를 함께 진행합니다.',
      tags: ['정보처리기사', '자격증', '필기시험'],
      status: 'full',
      startDate: '2024-10-15'
    },
    {
      id: 4,
      title: 'AWS 클라우드 실습 프로젝트',
      type: 'project',
      category: '클라우드',
      leader: '최클라우드',
      members: 2,
      maxMembers: 4,
      location: '온라인',
      schedule: '주 2회 (화, 목) 저녁 8시',
      duration: '6주',
      level: '중급-고급',
      description: 'AWS 서비스를 활용한 실제 인프라 구축 및 배포 프로젝트입니다. DevOps 경험을 쌓고 싶은 분들 환영합니다.',
      tags: ['AWS', 'DevOps', '클라우드', '인프라'],
      status: 'recruiting',
      startDate: '2024-11-05'
    }
  ];

  const filteredGroups = studyGroups.filter(group => {
    const query = searchQuery.toLowerCase();
    return (
      group.title.toLowerCase().includes(query) ||
      group.category.toLowerCase().includes(query) ||
      group.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const studyFilter = filteredGroups.filter(group => group.type === 'study');
  const projectFilter = filteredGroups.filter(group => group.type === 'project');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recruiting':
        return <Badge variant="default">모집중</Badge>;
      case 'full':
        return <Badge variant="secondary">모집완료</Badge>;
      case 'in-progress':
        return <Badge variant="outline">진행중</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '초급':
        return 'text-green-600 bg-green-50';
      case '중급':
        return 'text-blue-600 bg-blue-50';
      case '고급':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  
  // Handlers
  const handleNewGroupSubmit = () => {
    if (!newGroupForm.title || !newGroupForm.description || !newGroupForm.schedule) {
      toast.error('필수 항목을 모두 입력해주세요');
      return;
    }
    toast.success('새로운 그룹이 생성되었습니다!');
    setNewGroupDialogOpen(false);
    setNewGroupForm({
      type: 'study',
      title: '',
      category: '코딩테스트',
      description: '',
      location: '온라인',
      schedule: '',
      duration: '',
      maxMembers: '6',
      level: '초급',
      tags: ''
    });
  };
  
  const handleJoinSubmit = () => {
    if (!joinForm.message) {
      toast.error('간단한 자기소개를 입력해주세요');
      return;
    }
    toast.success('참여 신청이 완료되었습니다!');
    setJoinDialogOpen(false);
    setJoinForm({ message: '', experience: '' });
    setSelectedGroup(null);
  };
  
  const openJoinDialog = (group: any) => {
    setSelectedGroup(group);
    setJoinDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* New Group Dialog */}
      <Dialog open={newGroupDialogOpen} onOpenChange={setNewGroupDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>새 스터디/프로젝트 만들기</DialogTitle>
            <DialogDescription>
              함께 성장할 팀원을 모집하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-type">타입 *</Label>
              <Select
                value={newGroupForm.type}
                onValueChange={(value) => setNewGroupForm({ ...newGroupForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">스터디</SelectItem>
                  <SelectItem value="project">프로젝트</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-title">제목 *</Label>
              <Input
                id="group-title"
                placeholder="예: 알고리즘 스터디 (백준/프로그래머스)"
                value={newGroupForm.title}
                onChange={(e) => setNewGroupForm({ ...newGroupForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-category">카테고리</Label>
              <Select
                value={newGroupForm.category}
                onValueChange={(value) => setNewGroupForm({ ...newGroupForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="코딩테스트">코딩테스트</SelectItem>
                  <SelectItem value="웹 개발">웹 개발</SelectItem>
                  <SelectItem value="자격증">자격증</SelectItem>
                  <SelectItem value="클라우드">클라우드</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">설명 *</Label>
              <Textarea
                id="group-description"
                placeholder="스터디/프로젝트에 대한 자세한 설명을 입력하세요"
                rows={4}
                value={newGroupForm.description}
                onChange={(e) => setNewGroupForm({ ...newGroupForm, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="group-location">활동 장소</Label>
                <Select
                  value={newGroupForm.location}
                  onValueChange={(value) => setNewGroupForm({ ...newGroupForm, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="온라인">온라인</SelectItem>
                    <SelectItem value="강남역">강남역</SelectItem>
                    <SelectItem value="신촌역">신촌역</SelectItem>
                    <SelectItem value="홍대입구역">홍대입구역</SelectItem>
                    <SelectItem value="판교역">판교역</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-max-members">모집 인원</Label>
                <Input
                  id="group-max-members"
                  type="number"
                  min="2"
                  max="20"
                  value={newGroupForm.maxMembers}
                  onChange={(e) => setNewGroupForm({ ...newGroupForm, maxMembers: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-schedule">일정 *</Label>
              <Input
                id="group-schedule"
                placeholder="예: 주 3회 (월, 수, 금) 저녁 8시"
                value={newGroupForm.schedule}
                onChange={(e) => setNewGroupForm({ ...newGroupForm, schedule: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="group-duration">예상 기간</Label>
                <Input
                  id="group-duration"
                  placeholder="예: 3개월"
                  value={newGroupForm.duration}
                  onChange={(e) => setNewGroupForm({ ...newGroupForm, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-level">난이도</Label>
                <Select
                  value={newGroupForm.level}
                  onValueChange={(value) => setNewGroupForm({ ...newGroupForm, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="초급-중급">초급-중급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="중급-고급">중급-고급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-tags">태그</Label>
              <Input
                id="group-tags"
                placeholder="쉼표로 구분하여 입력 (예: 알고리즘, 코딩테스트, 백준)"
                value={newGroupForm.tags}
                onChange={(e) => setNewGroupForm({ ...newGroupForm, tags: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGroupDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleNewGroupSubmit}>
              <Save className="w-4 h-4 mr-2" />
              그룹 만들기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Join Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>참여 신청</DialogTitle>
            <DialogDescription>
              {selectedGroup?.title}에 참여 신청합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="join-message">자기소개 *</Label>
              <Textarea
                id="join-message"
                placeholder="간단한 자기소개와 참여 동기를 작성해주세요"
                rows={5}
                value={joinForm.message}
                onChange={(e) => setJoinForm({ ...joinForm, message: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-experience">관련 경험</Label>
              <Textarea
                id="join-experience"
                placeholder="관련 프로젝트나 학습 경험이 있다면 작성해주세요 (선택사항)"
                rows={3}
                value={joinForm.experience}
                onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700" style={{ fontSize: '14px' }}>
                스터디장이 신청서를 검토한 후 승인 여부를 알려드립니다.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleJoinSubmit}>
              <Send className="w-4 h-4 mr-2" />
              신청하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <h1 className="text-2xl font-bold mb-2">스터디 & 프로젝트 모집</h1>
        <p className="text-gray-600">함께 성장할 스터디원과 프로젝트 팀원을 찾아보세요.</p>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="스터디명, 카테고리, 기술 스택으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setNewGroupDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              새 스터디/프로젝트 만들기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'study' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('study')}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          스터디 ({studyFilter.length})
        </Button>
        <Button
          variant={activeTab === 'project' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('project')}
        >
          <Code className="w-4 h-4 mr-2" />
          프로젝트 ({projectFilter.length})
        </Button>
        <Button
          variant={activeTab === 'my-groups' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('my-groups')}
        >
          <Users className="w-4 h-4 mr-2" />
          내 그룹
        </Button>
      </div>

      {/* Study Groups */}
      {(activeTab === 'study' || activeTab === 'project') && (
        <div className="grid gap-6">
          {(activeTab === 'study' ? studyFilter : projectFilter).map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{group.title}</h3>
                      {getStatusBadge(group.status)}
                      <Badge variant="outline" className={getLevelColor(group.level)}>
                        {group.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{group.members}/{group.maxMembers}명</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{group.startDate} 시작</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {group.type === 'study' ? (
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Lightbulb className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{group.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span><strong>일정:</strong> {group.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span><strong>기간:</strong> {group.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span><strong>스터디장:</strong> {group.leader}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`} />
                      <AvatarFallback>{group.leader[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{group.leader}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast.success('스터디장에게 메시지를 보냈습니다')}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      문의하기
                    </Button>
                    <Button 
                      size="sm" 
                      disabled={group.status === 'full'}
                      onClick={() => openJoinDialog(group)}
                    >
                      {group.status === 'full' ? '모집완료' : '참여 신청'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* My Groups */}
      {activeTab === 'my-groups' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>참여 중인 그룹</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold">알고리즘 스터디</h4>
                    <p className="text-sm text-gray-600">주 3회 • 4/6명 참여</p>
                    <p className="text-sm text-blue-600">다음 모임: 2024년 10월 16일 (수) 20:00</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      채팅방
                    </Button>
                    <Button size="sm">
                      자료실
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>내가 만든 그룹</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>아직 만든 그룹이 없습니다.</p>
                <p className="text-sm">새로운 스터디나 프로젝트를 시작해보세요!</p>
                <Button className="mt-4" onClick={() => setNewGroupDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 그룹 만들기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}