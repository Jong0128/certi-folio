import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { 
  HelpCircle, 
  CheckCircle,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Plus,
  Eye,
  ThumbsUp,
  Award,
  AlertCircle,
  Send
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    university: string;
    level: string;
    profileImage?: string;
    points: number;
  };
  category: string;
  tags: string[];
  status: 'open' | 'answered' | 'closed';
  bounty?: number;
  stats: {
    views: number;
    likes: number;
    answers: number;
  };
  timestamp: string;
  hasAcceptedAnswer?: boolean;
}

export default function QnA() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [likedQuestions, setLikedQuestions] = useState<string[]>([]);
  
  // Dialog state
  const [newQuestionDialogOpen, setNewQuestionDialogOpen] = useState(false);
  
  // New question form
  const [newQuestionForm, setNewQuestionForm] = useState({
    title: '',
    content: '',
    category: '백엔드',
    tags: '',
    bounty: '0',
    addBounty: false
  });

  const questions: Question[] = [
    {
      id: '1',
      title: 'Spring Boot에서 JPA N+1 문제 해결 방법이 궁금합니다',
      content: 'OneToMany 관계에서 N+1 문제가 발생하는데, Fetch Join과 EntityGraph 중 어떤 방법이 더 좋을까요?',
      author: {
        name: '김민준',
        university: '서울대학교',
        level: '초급',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        points: 150
      },
      category: '백엔드',
      tags: ['Spring Boot', 'JPA', 'N+1'],
      status: 'answered',
      stats: {
        views: 342,
        likes: 28,
        answers: 5
      },
      timestamp: '1시간 전',
      hasAcceptedAnswer: true
    },
    {
      id: '2',
      title: 'React에서 useEffect 의존성 배열 관련 질문',
      content: 'useEffect의 의존성 배열에 객체를 넣으면 무한 루프가 발생하는데, 어떻게 해결해야 할까요?',
      author: {
        name: '이서연',
        university: '연세대학교',
        level: '초급',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        points: 220
      },
      category: '프론트엔드',
      tags: ['React', 'useEffect', 'Hooks'],
      status: 'open',
      bounty: 50,
      stats: {
        views: 156,
        likes: 12,
        answers: 3
      },
      timestamp: '3시간 전'
    },
    {
      id: '3',
      title: 'AWS Lambda 콜드 스타트 문제 최적화 방법',
      content: 'Lambda 함수의 콜드 스타트 시간이 너무 길어서 사용자 경험이 좋지 않습니다. 어떻게 개선할 수 있을까요?',
      author: {
        name: '박준호',
        university: '고려대학교',
        level: '중급',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        points: 450
      },
      category: '인프라/DevOps',
      tags: ['AWS', 'Lambda', '최적화'],
      status: 'answered',
      stats: {
        views: 423,
        likes: 45,
        answers: 8
      },
      timestamp: '5시간 전',
      hasAcceptedAnswer: true
    },
    {
      id: '4',
      title: 'Git Rebase vs Merge, 실무에서는 어떤 걸 사용하나요?',
      content: '협업 프로젝트에서 브랜치를 병합할 때 Rebase와 Merge 중 어떤 것을 사용하는 게 좋을까요?',
      author: {
        name: '최지우',
        university: '성균관대학교',
        level: '초급',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        points: 180
      },
      category: '개발 도구',
      tags: ['Git', 'Rebase', 'Merge'],
      status: 'answered',
      stats: {
        views: 567,
        likes: 52,
        answers: 12
      },
      timestamp: '1일 전',
      hasAcceptedAnswer: false
    },
    {
      id: '5',
      title: 'CORS 에러 해결 방법 질문드립니다',
      content: '프론트엔드와 백엔드를 분리해서 개발 중인데, CORS 에러가 계속 발생합니다. Spring Boot에서 어떻게 설정해야 하나요?',
      author: {
        name: '정현우',
        university: '한양대학교',
        level: '초급',
        points: 95
      },
      category: '백엔드',
      tags: ['CORS', 'Spring Boot', 'HTTP'],
      status: 'open',
      stats: {
        views: 234,
        likes: 18,
        answers: 4
      },
      timestamp: '1일 전'
    },
    {
      id: '6',
      title: 'Docker Compose로 DB 연결 시 네트워크 설정',
      content: 'Docker Compose를 사용해서 애플리케이션과 DB를 연결하려는데, 컨테이너 간 통신이 안 됩니다.',
      author: {
        name: '강민지',
        university: '이화여대',
        level: '초급',
        profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
        points: 130
      },
      category: '인프라/DevOps',
      tags: ['Docker', 'Docker Compose', '네트워크'],
      status: 'open',
      bounty: 30,
      stats: {
        views: 189,
        likes: 14,
        answers: 2
      },
      timestamp: '2일 전'
    }
  ];

  const categories = ['all', '백엔드', '프론트엔드', '인프라/DevOps', '개발 도구', '데이터베이스', '알고리즘', '기타'];
  const statuses = ['all', 'open', 'answered', 'closed'];

  const statusConfig = {
    open: { label: '답변 대기', color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
    answered: { label: '답변 완료', color: 'bg-green-100 text-green-700', icon: MessageSquare },
    closed: { label: '종료', color: 'bg-gray-100 text-gray-700', icon: CheckCircle }
  };

  const filteredQuestions = questions
    .filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || q.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.stats.likes - a.stats.likes;
      } else if (sortBy === 'bounty') {
        return (b.bounty || 0) - (a.bounty || 0);
      }
      return 0;
    });

  const stats = {
    totalQuestions: questions.length,
    openQuestions: questions.filter(q => q.status === 'open').length,
    answeredQuestions: questions.filter(q => q.status === 'answered').length,
    totalBounty: questions.reduce((acc, q) => acc + (q.bounty || 0), 0)
  };
  
  // Handler
  const handleNewQuestionSubmit = () => {
    if (!newQuestionForm.title || !newQuestionForm.content) {
      toast.error('제목과 내용을 입력해주세요');
      return;
    }
    toast.success('질문이 등록되었습니다!');
    setNewQuestionDialogOpen(false);
    setNewQuestionForm({
      title: '',
      content: '',
      category: '백엔드',
      tags: '',
      bounty: '0',
      addBounty: false
    });
  };

  return (
    <div className="space-y-6">
      {/* New Question Dialog */}
      <Dialog open={newQuestionDialogOpen} onOpenChange={setNewQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>새 질문 작성</DialogTitle>
            <DialogDescription>
              개발 관련 질문을 작성하고 다른 사용자들의 도움을 받으세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question-title">질문 제목 *</Label>
              <Input
                id="question-title"
                placeholder="질문을 간단명료하게 요약해주세요"
                value={newQuestionForm.title}
                onChange={(e) => setNewQuestionForm({ ...newQuestionForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-category">카테고리</Label>
              <Select
                value={newQuestionForm.category}
                onValueChange={(value) => setNewQuestionForm({ ...newQuestionForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="백엔드">백엔드</SelectItem>
                  <SelectItem value="프론트엔드">프론트엔드</SelectItem>
                  <SelectItem value="인프라/DevOps">인프라/DevOps</SelectItem>
                  <SelectItem value="개발 도구">개발 도구</SelectItem>
                  <SelectItem value="데이터베이스">데이터베이스</SelectItem>
                  <SelectItem value="알고리즘">알고리즘</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-content">질문 내용 *</Label>
              <Textarea
                id="question-content"
                placeholder="질문 내용을 자세히 작성해주세요. 코드가 있다면 함께 첨부해주세요."
                rows={10}
                value={newQuestionForm.content}
                onChange={(e) => setNewQuestionForm({ ...newQuestionForm, content: e.target.value })}
              />
              <p className="text-gray-500" style={{ fontSize: '12px' }}>
                문제 상황, 시도한 해결 방법, 에러 메시지 등을 포함하면 더 좋은 답변을 받을 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-tags">태그</Label>
              <Input
                id="question-tags"
                placeholder="쉼표로 구분하여 입력 (예: React, useEffect, Hooks)"
                value={newQuestionForm.tags}
                onChange={(e) => setNewQuestionForm({ ...newQuestionForm, tags: e.target.value })}
              />
            </div>
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="add-bounty"
                  checked={newQuestionForm.addBounty}
                  onCheckedChange={(checked) => 
                    setNewQuestionForm({ ...newQuestionForm, addBounty: checked as boolean })
                  }
                />
                <Label htmlFor="add-bounty" className="cursor-pointer">
                  현상금 설정 (선택사항)
                </Label>
              </div>
              {newQuestionForm.addBounty && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="question-bounty">현상금 포인트</Label>
                  <Input
                    id="question-bounty"
                    type="number"
                    min="10"
                    max="500"
                    step="10"
                    placeholder="10"
                    value={newQuestionForm.bounty}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, bounty: e.target.value })}
                  />
                  <p className="text-gray-500" style={{ fontSize: '12px' }}>
                    현상금을 설정하면 더 많은 사용자들의 관심을 받을 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewQuestionDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleNewQuestionSubmit}>
              <Send className="w-4 h-4 mr-2" />
              질문 등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">질문 게시판</h1>
          <p className="text-gray-600 mt-1">개발 관련 질문을 하고 답변을 얻으세요</p>
        </div>
        <Button onClick={() => setNewQuestionDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          질문하기
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">전체 질문</p>
                <p className="text-gray-900 mt-1">{stats.totalQuestions}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">답변 대기</p>
                <p className="text-gray-900 mt-1">{stats.openQuestions}개</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">답변 완료</p>
                <p className="text-gray-900 mt-1">{stats.answeredQuestions}개</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">현상금 총액</p>
                <p className="text-gray-900 mt-1">{stats.totalBounty}P</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="질문 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? '전체 카테고리' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="open">답변 대기</SelectItem>
                <SelectItem value="answered">답변 완료</SelectItem>
                <SelectItem value="closed">종료</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="bounty">현상금순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((question) => {
          const StatusIcon = statusConfig[question.status].icon;
          
          return (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Stats Column */}
                  <div className="flex flex-col items-center space-y-2 min-w-[80px]">
                    <div className="text-center">
                      <p className="text-gray-900">{question.stats.answers}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>답변</p>
                    </div>
                    {question.hasAcceptedAnswer && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        채택
                      </Badge>
                    )}
                    {question.bounty && (
                      <Badge className="bg-purple-600">
                        <Award className="w-3 h-3 mr-1" />
                        {question.bounty}P
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={statusConfig[question.status].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[question.status].label}
                      </Badge>
                      <Badge variant="secondary">{question.category}</Badge>
                      {question.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>

                    <h3 className="text-gray-900 mb-2 cursor-pointer hover:text-blue-600">
                      {question.title}
                    </h3>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {question.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={question.author.profileImage} />
                          <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600" style={{ fontSize: '14px' }}>
                            {question.author.name}
                          </span>
                          <Badge variant="outline" style={{ fontSize: '11px' }}>
                            {question.author.level}
                          </Badge>
                          <span className="text-gray-400" style={{ fontSize: '13px' }}>
                            • {question.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-gray-500">
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <Eye className="w-4 h-4 mr-1" />
                          {question.stats.views}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={likedQuestions.includes(question.id) ? 'text-blue-600' : ''}
                          onClick={() => {
                            if (likedQuestions.includes(question.id)) {
                              setLikedQuestions(likedQuestions.filter(id => id !== question.id));
                              toast.success('좋아요를 취소했습니다');
                            } else {
                              setLikedQuestions([...likedQuestions, question.id]);
                              toast.success('좋아요를 눌렀습니다');
                            }
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-1 ${likedQuestions.includes(question.id) ? 'fill-blue-600' : ''}`} />
                          {question.stats.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">질문이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              검색 조건을 변경하거나 새로운 질문을 작성해보세요.
            </p>
            <Button onClick={() => setNewQuestionDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              질문하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
