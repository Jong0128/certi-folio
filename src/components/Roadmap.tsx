import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Map, 
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronRight,
  BookOpen,
  Briefcase,
  Code,
  Globe,
  GraduationCap,
  Calendar,
  AlertCircle,
  Trophy,
  Zap,
  Star,
  Plus,
  Save
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'certificate' | 'skill' | 'experience' | 'language' | 'project';
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  progress: number;
  points: number;
  requirements?: string[];
  resources?: {
    title: string;
    url: string;
    type: 'course' | 'book' | 'article' | 'video';
  }[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  milestones: Milestone[];
}

export default function Roadmap() {
  const [selectedGoal, setSelectedGoal] = useState<string>('backend');
  
  // Dialog states
  const [newGoalDialogOpen, setNewGoalDialogOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  // Selected milestone for editing
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  
  // New goal form
  const [newGoalForm, setNewGoalForm] = useState({
    title: '',
    description: '',
    targetDate: '',
  });
  
  // Progress update form
  const [progressForm, setProgressForm] = useState({
    progress: 0,
    status: 'in-progress' as 'completed' | 'in-progress' | 'pending',
    notes: '',
  });
  
  // Schedule form
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    date: '',
    description: '',
  });

  const goals: Goal[] = [
    {
      id: 'backend',
      title: '백엔드 개발자 취업',
      description: '대기업 또는 유망 스타트업 백엔드 개발자 포지션',
      targetDate: '2025년 6월',
      progress: 65,
      milestones: [
        {
          id: '1',
          title: '정보처리기사 자격증 취득',
          description: '필기 합격 후 실기 준비 중',
          category: 'certificate',
          status: 'in-progress',
          priority: 'high',
          deadline: '2024년 11월',
          progress: 75,
          points: 15,
          requirements: [
            '필기 시험 합격',
            '실기 시험 준비',
            '기출문제 3회독'
          ],
          resources: [
            {
              title: '정보처리기사 필기 강의',
              url: '#',
              type: 'course'
            },
            {
              title: '정보처리기사 실기 대비서',
              url: '#',
              type: 'book'
            }
          ]
        },
        {
          id: '2',
          title: 'AWS 자격증 취득',
          description: 'AWS Solutions Architect Associate 준비',
          category: 'certificate',
          status: 'pending',
          priority: 'medium',
          deadline: '2025년 1월',
          progress: 30,
          points: 20,
          requirements: [
            'AWS 기초 학습',
            '실습 프로젝트 진행',
            '모의고사 3회 이상'
          ],
          resources: [
            {
              title: 'AWS Solutions Architect 강의',
              url: '#',
              type: 'course'
            },
            {
              title: 'AWS 공식 문서',
              url: '#',
              type: 'article'
            }
          ]
        },
        {
          id: '3',
          title: 'Spring Boot 실무 프로젝트',
          description: '실제 서비스 배포까지 완료하는 프로젝트',
          category: 'project',
          status: 'in-progress',
          priority: 'high',
          deadline: '2024년 12월',
          progress: 60,
          points: 25,
          requirements: [
            'RESTful API 설계 및 구현',
            'DB 설계 및 최적화',
            'AWS 배포 및 운영',
            '테스트 코드 작성'
          ],
          resources: [
            {
              title: 'Spring Boot 완벽 가이드',
              url: '#',
              type: 'course'
            },
            {
              title: 'Clean Code',
              url: '#',
              type: 'book'
            }
          ]
        },
        {
          id: '4',
          title: '알고리즘 문제 해결 역량',
          description: '백준 골드 티어, 프로그래머스 Lv.3 이상',
          category: 'skill',
          status: 'in-progress',
          priority: 'high',
          deadline: '2025년 3월',
          progress: 55,
          points: 20,
          requirements: [
            '백준 골드 티어 달성',
            '프로그래머스 Lv.3 문제 20개 이상',
            '주요 알고리즘 패턴 숙지'
          ],
          resources: [
            {
              title: '알고리즘 기초 강의',
              url: '#',
              type: 'course'
            },
            {
              title: '이것이 코딩테스트다',
              url: '#',
              type: 'book'
            }
          ]
        },
        {
          id: '5',
          title: '기술 블로그 운영',
          description: '월 2회 이상 기술 포스팅',
          category: 'skill',
          status: 'in-progress',
          priority: 'medium',
          deadline: '2025년 6월',
          progress: 40,
          points: 10,
          requirements: [
            '블로그 개설',
            '월 2회 이상 포스팅',
            '프로젝트 회고록 작성'
          ]
        },
        {
          id: '6',
          title: 'TOEIC Speaking IH 등급',
          description: '해외 기업 또는 글로벌 팀 대비',
          category: 'language',
          status: 'pending',
          priority: 'low',
          deadline: '2025년 4월',
          progress: 20,
          points: 10,
          requirements: [
            '매일 30분 영어 학습',
            '모의고사 5회 이상',
            'IH 등급 달성'
          ]
        },
        {
          id: '7',
          title: '인턴십 경험',
          description: '최소 3개월 이상 개발 인턴',
          category: 'experience',
          status: 'completed',
          priority: 'high',
          deadline: '2024년 8월',
          progress: 100,
          points: 30,
          requirements: [
            '인턴십 지원 및 합격',
            '3개월 이상 근무',
            '프로젝트 완수'
          ]
        }
      ]
    },
    {
      id: 'frontend',
      title: '프론트엔드 개발자 취업',
      description: 'React/TypeScript 기반 프론트엔드 개발자',
      targetDate: '2025년 6월',
      progress: 45,
      milestones: []
    }
  ];

  const currentGoal = goals.find(g => g.id === selectedGoal) || goals[0];

  const categoryIcons = {
    certificate: Award,
    skill: Code,
    experience: Briefcase,
    language: Globe,
    project: Target
  };

  const categoryColors = {
    certificate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    skill: 'bg-blue-100 text-blue-700 border-blue-200',
    experience: 'bg-purple-100 text-purple-700 border-purple-200',
    language: 'bg-green-100 text-green-700 border-green-200',
    project: 'bg-orange-100 text-orange-700 border-orange-200'
  };

  const categoryLabels = {
    certificate: '자격증',
    skill: '기술 역량',
    experience: '경력',
    language: '어학',
    project: '프로젝트'
  };

  const statusIcons = {
    completed: CheckCircle,
    'in-progress': Clock,
    pending: AlertCircle
  };

  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    pending: 'bg-gray-100 text-gray-700'
  };

  const statusLabels = {
    completed: '완료',
    'in-progress': '진행중',
    pending: '예정'
  };

  const priorityColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-gray-300'
  };

  const completedMilestones = currentGoal.milestones.filter(m => m.status === 'completed').length;
  const totalPoints = currentGoal.milestones.reduce((sum, m) => sum + m.points, 0);
  const earnedPoints = currentGoal.milestones
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.points, 0);
  
  // Handlers
  const handleNewGoalSubmit = () => {
    if (!newGoalForm.title || !newGoalForm.description || !newGoalForm.targetDate) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }
    toast.success('새로운 목표가 설정되었습니다!');
    setNewGoalDialogOpen(false);
    setNewGoalForm({ title: '', description: '', targetDate: '' });
  };
  
  const handleProgressUpdate = () => {
    if (!selectedMilestone) return;
    toast.success('진행 상태가 업데이트되었습니다!');
    setProgressDialogOpen(false);
    setProgressForm({ progress: 0, status: 'in-progress', notes: '' });
    setSelectedMilestone(null);
  };
  
  const handleScheduleAdd = () => {
    if (!scheduleForm.title || !scheduleForm.date) {
      toast.error('일정 제목과 날짜를 입력해주세요');
      return;
    }
    toast.success('일정이 추가되었습니다!');
    setScheduleDialogOpen(false);
    setScheduleForm({ title: '', date: '', description: '' });
  };
  
  const openProgressDialog = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setProgressForm({
      progress: milestone.progress,
      status: milestone.status,
      notes: '',
    });
    setProgressDialogOpen(true);
  };
  
  const openScheduleDialog = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setScheduleForm({
      title: milestone.title + ' 관련 일정',
      date: '',
      description: '',
    });
    setScheduleDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* New Goal Dialog */}
      <Dialog open={newGoalDialogOpen} onOpenChange={setNewGoalDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>새 목표 설정</DialogTitle>
            <DialogDescription>
              달성하고자 하는 새로운 목표를 설정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-title">목표 제목 *</Label>
              <Input
                id="goal-title"
                placeholder="예: 풀스택 개발자 취업"
                value={newGoalForm.title}
                onChange={(e) => setNewGoalForm({ ...newGoalForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-description">목표 설명 *</Label>
              <Textarea
                id="goal-description"
                placeholder="목표에 대한 구체적인 설명을 입력하세요"
                rows={3}
                value={newGoalForm.description}
                onChange={(e) => setNewGoalForm({ ...newGoalForm, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-target-date">목표 달성 시기 *</Label>
              <Input
                id="goal-target-date"
                placeholder="예: 2025년 12월"
                value={newGoalForm.targetDate}
                onChange={(e) => setNewGoalForm({ ...newGoalForm, targetDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGoalDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleNewGoalSubmit}>
              <Save className="w-4 h-4 mr-2" />
              목표 설정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Update Dialog */}
      <Dialog open={progressDialogOpen} onOpenChange={setProgressDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>진행 상태 업데이트</DialogTitle>
            <DialogDescription>
              {selectedMilestone?.title}의 진행 상태를 업데이트하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="progress-status">진행 상태</Label>
              <Select
                value={progressForm.status}
                onValueChange={(value) => setProgressForm({ ...progressForm, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">예정</SelectItem>
                  <SelectItem value="in-progress">진행중</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="progress-slider">진행률</Label>
                <span className="text-gray-900">{progressForm.progress}%</span>
              </div>
              <Slider
                id="progress-slider"
                min={0}
                max={100}
                step={5}
                value={[progressForm.progress]}
                onValueChange={(value) => setProgressForm({ ...progressForm, progress: value[0] })}
                className="py-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress-notes">진행 내용 메모</Label>
              <Textarea
                id="progress-notes"
                placeholder="진행 상황이나 특이사항을 기록하세요"
                rows={3}
                value={progressForm.notes}
                onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProgressDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleProgressUpdate}>
              <TrendingUp className="w-4 h-4 mr-2" />
              업데이트
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>일정 추가</DialogTitle>
            <DialogDescription>
              {selectedMilestone?.title}에 대한 일정을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-title">일정 제목 *</Label>
              <Input
                id="schedule-title"
                placeholder="예: 모의고사 1회 풀이"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-date">날짜 *</Label>
              <Input
                id="schedule-date"
                type="date"
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-description">설명</Label>
              <Textarea
                id="schedule-description"
                placeholder="일정에 대한 추가 설명을 입력하세요"
                rows={3}
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleScheduleAdd}>
              <Calendar className="w-4 h-4 mr-2" />
              일정 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">개선 로드맵</h1>
          <p className="text-gray-600 mt-1">목표 달성을 위한 맞춤형 성장 로드맵</p>
        </div>
        <Button onClick={() => setNewGoalDialogOpen(true)}>
          <Target className="w-4 h-4 mr-2" />
          새 목표 설정
        </Button>
      </div>

      {/* Goal Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`cursor-pointer transition-all ${
              selectedGoal === goal.id ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{goal.title}</h3>
                  <p className="text-gray-600">{goal.description}</p>
                </div>
                {selectedGoal === goal.id && (
                  <Badge className="bg-blue-600">선택됨</Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '13px' }}>목표 달성률</span>
                  <span className="text-gray-900">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '13px' }}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    목표 시기
                  </span>
                  <span className="text-gray-900">{goal.targetDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">전체 마일스톤</p>
                <p className="text-gray-900 mt-1">{currentGoal.milestones.length}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">완료</p>
                <p className="text-gray-900 mt-1">{completedMilestones}개</p>
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
                <p className="text-gray-600">진행중</p>
                <p className="text-gray-900 mt-1">
                  {currentGoal.milestones.filter(m => m.status === 'in-progress').length}개
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">획득 포인트</p>
                <p className="text-gray-900 mt-1">{earnedPoints} / {totalPoints}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">
            <Map className="w-4 h-4 mr-2" />
            타임라인
          </TabsTrigger>
          <TabsTrigger value="category">
            <Target className="w-4 h-4 mr-2" />
            카테고리별
          </TabsTrigger>
          <TabsTrigger value="priority">
            <Zap className="w-4 h-4 mr-2" />
            우선순위
          </TabsTrigger>
        </TabsList>

        {/* Timeline View */}
        <TabsContent value="timeline" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {currentGoal.milestones
              .sort((a, b) => {
                const statusOrder = { 'in-progress': 0, 'pending': 1, 'completed': 2 };
                return statusOrder[a.status] - statusOrder[b.status];
              })
              .map((milestone) => {
                const CategoryIcon = categoryIcons[milestone.category];
                const StatusIcon = statusIcons[milestone.status];
                
                return (
                  <AccordionItem key={milestone.id} value={milestone.id} className="border-none">
                    <Card className={`border-l-4 ${priorityColors[milestone.priority]}`}>
                      <AccordionTrigger className="hover:no-underline p-0">
                        <CardHeader className="w-full">
                          <div className="flex items-start justify-between w-full">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={categoryColors[milestone.category]}>
                                  <CategoryIcon className="w-3 h-3 mr-1" />
                                  {categoryLabels[milestone.category]}
                                </Badge>
                                <Badge className={statusColors[milestone.status]}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusLabels[milestone.status]}
                                </Badge>
                                {milestone.priority === 'high' && (
                                  <Badge variant="destructive">
                                    <Zap className="w-3 h-3 mr-1" />
                                    긴급
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-gray-900 mb-1">{milestone.title}</CardTitle>
                              <p className="text-gray-600">{milestone.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-4 h-4 text-yellow-600" />
                                <span className="text-gray-900">{milestone.points}pt</span>
                              </div>
                              {milestone.deadline && (
                                <p className="text-gray-600" style={{ fontSize: '13px' }}>
                                  {milestone.deadline}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            {/* Progress */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600">진행률</span>
                                <span className="text-gray-900">{milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-2" />
                            </div>

                            {/* Requirements */}
                            {milestone.requirements && milestone.requirements.length > 0 && (
                              <div>
                                <h4 className="text-gray-900 mb-2">필요 조건</h4>
                                <ul className="space-y-2">
                                  {milestone.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600" style={{ fontSize: '14px' }}>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Resources */}
                            {milestone.resources && milestone.resources.length > 0 && (
                              <div>
                                <h4 className="text-gray-900 mb-2">학습 자료</h4>
                                <div className="space-y-2">
                                  {milestone.resources.map((resource, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <BookOpen className="w-4 h-4 text-gray-600" />
                                        <span className="text-gray-900">{resource.title}</span>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                              {milestone.status !== 'completed' && (
                                <Button 
                                  className="flex-1"
                                  onClick={() => openProgressDialog(milestone)}
                                >
                                  <TrendingUp className="w-4 h-4 mr-2" />
                                  진행 상태 업데이트
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => openScheduleDialog(milestone)}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                일정 추가
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </TabsContent>

        {/* Category View */}
        <TabsContent value="category" className="space-y-4">
          {Object.entries(categoryLabels).map(([category, label]) => {
            const milestones = currentGoal.milestones.filter(
              m => m.category === category
            );
            
            if (milestones.length === 0) return null;
            
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CategoryIcon className="w-5 h-5 mr-2" />
                    {label}
                    <Badge variant="secondary" className="ml-2">
                      {milestones.length}개
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {milestones.map((milestone) => {
                      const StatusIcon = statusIcons[milestone.status];
                      
                      return (
                        <div
                          key={milestone.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-gray-900">{milestone.title}</h4>
                              <Badge className={statusColors[milestone.status]}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusLabels[milestone.status]}
                              </Badge>
                            </div>
                            <p className="text-gray-600" style={{ fontSize: '13px' }}>
                              {milestone.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 ml-4">
                            <div className="text-right">
                              <p className="text-gray-900">{milestone.progress}%</p>
                              <p className="text-gray-600" style={{ fontSize: '11px' }}>진행률</p>
                            </div>
                            <Progress value={milestone.progress} className="h-2 w-24" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Priority View */}
        <TabsContent value="priority" className="space-y-4">
          {(['high', 'medium', 'low'] as const).map((priority) => {
            const milestones = currentGoal.milestones.filter(
              m => m.priority === priority && m.status !== 'completed'
            );
            
            if (milestones.length === 0) return null;
            
            const priorityLabels = {
              high: '높음 (긴급)',
              medium: '중간',
              low: '낮음'
            };
            
            const priorityBgColors = {
              high: 'bg-red-50',
              medium: 'bg-yellow-50',
              low: 'bg-gray-50'
            };
            
            return (
              <Card key={priority} className={priorityBgColors[priority]}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    우선순위: {priorityLabels[priority]}
                    <Badge variant="secondary" className="ml-2">
                      {milestones.length}개
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {milestones.map((milestone) => {
                      const CategoryIcon = categoryIcons[milestone.category];
                      const StatusIcon = statusIcons[milestone.status];
                      
                      return (
                        <div
                          key={milestone.id}
                          className="p-4 bg-white rounded-lg border"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <Badge className={categoryColors[milestone.category]}>
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {categoryLabels[milestone.category]}
                            </Badge>
                            <Badge className={statusColors[milestone.status]}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusLabels[milestone.status]}
                            </Badge>
                          </div>
                          <h4 className="text-gray-900 mb-1">{milestone.title}</h4>
                          <p className="text-gray-600 mb-3" style={{ fontSize: '13px' }}>
                            {milestone.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600" style={{ fontSize: '13px' }}>진행률</span>
                              <span className="text-gray-900">{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                            {milestone.deadline && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600" style={{ fontSize: '13px' }}>마감일</span>
                                <span className="text-gray-900">{milestone.deadline}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
