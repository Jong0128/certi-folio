import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Briefcase, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Building2,
  TrendingUp,
  Clock,
  Users,
  Award,
  CheckCircle,
  Upload,
  FileImage,
  Scan
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';

interface CareerItem {
  id: string;
  type: 'intern' | 'fulltime' | 'parttime' | 'contract';
  company: string;
  position: string;
  department?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  description: string[];
  skills: string[];
  achievements?: string[];
}

export default function Career() {
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);
  const [careers] = useState<CareerItem[]>([
    {
      id: '1',
      type: 'intern',
      company: '네이버',
      position: '백엔드 개발 인턴',
      department: 'Cloud Platform 팀',
      startDate: '2023.07',
      endDate: '2023.08',
      isCurrent: false,
      location: '경기도 성남시',
      description: [
        'Spring Boot 기반 RESTful API 개발',
        'MySQL 데이터베이스 설계 및 최적화',
        '테스트 코드 작성 및 CI/CD 파이프라인 구축'
      ],
      skills: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Git'],
      achievements: [
        'API 응답 속도 30% 개선',
        '테스트 커버리지 80% 달성'
      ]
    },
    {
      id: '2',
      type: 'intern',
      company: '카카오',
      position: '프론트엔드 개발 인턴',
      department: 'UX개발팀',
      startDate: '2024.01',
      endDate: '2024.02',
      isCurrent: false,
      location: '경기도 판교',
      description: [
        'React 기반 웹 애플리케이션 개발',
        '반응형 UI 컴포넌트 구현',
        '웹 접근성 개선 작업'
      ],
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      achievements: [
        '웹 접근성 AA 등급 달성',
        '페이지 로딩 속도 40% 개선'
      ]
    },
    {
      id: '3',
      type: 'parttime',
      company: '스타트업 ABC',
      position: '웹 개발자',
      startDate: '2024.03',
      isCurrent: true,
      location: '서울시 강남구',
      description: [
        '풀스택 개발 (React + Node.js)',
        'MVP 제품 개발 및 런칭',
        '사용자 피드백 기반 기능 개선'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      achievements: [
        '3개월 내 MVP 런칭',
        '사용자 500명 확보'
      ]
    }
  ]);

  const typeConfig = {
    intern: { label: '인턴', color: 'bg-blue-100 text-blue-700' },
    fulltime: { label: '정규직', color: 'bg-green-100 text-green-700' },
    parttime: { label: '파트타임', color: 'bg-purple-100 text-purple-700' },
    contract: { label: '계약직', color: 'bg-orange-100 text-orange-700' }
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate.replace('.', '-'));
    const end = endDate ? new Date(endDate.replace('.', '-')) : new Date();
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (months < 1) return '1개월 미만';
    if (months < 12) return `${months}개월`;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) return `${years}년`;
    return `${years}년 ${remainingMonths}개월`;
  };

  const totalMonths = careers.reduce((total, career) => {
    const start = new Date(career.startDate.replace('.', '-'));
    const end = career.endDate ? new Date(career.endDate.replace('.', '-')) : new Date();
    return total + Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  }, 0);

  const stats = {
    total: careers.length,
    current: careers.filter(c => c.isCurrent).length,
    totalMonths: totalMonths,
    companies: new Set(careers.map(c => c.company)).size
  };

  // 최신순으로 정렬 (startDate 기준)
  const sortedCareers = [...careers].sort((a, b) => {
    const dateA = new Date(a.startDate.replace('.', '-'));
    const dateB = new Date(b.startDate.replace('.', '-'));
    return dateB.getTime() - dateA.getTime(); // 최신이 먼저
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">경력 관리</h1>
          <p className="text-gray-600 mt-1">인턴십 및 업무 경험을 관리하세요</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              경력 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>경력 추가</DialogTitle>
              <DialogDescription>
                재직증명서를 업로드하거나 직접 입력하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* 파일 업로드 섹션 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-gray-900 mb-2">재직증명서 업로드</h3>
                <p className="text-gray-600 mb-4">
                  AI가 자동으로 정보를 인식합니다
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="career-upload-file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setIsOcrProcessing(true);
                      setTimeout(() => {
                        setOcrData({
                          company: '네이버',
                          position: '백엔드 개발 인턴',
                          department: 'Cloud Platform 팀',
                          type: 'intern',
                          startDate: '2023-07',
                          endDate: '2023-08',
                          location: '경기도 성남시'
                        });
                        setIsOcrProcessing(false);
                      }, 2000);
                    }
                  }}
                />
                <Button asChild variant="outline">
                  <label htmlFor="career-upload-file" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {isOcrProcessing ? 'AI 분석 중...' : '파일 선택하기'}
                  </label>
                </Button>
                {isOcrProcessing && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Scan className="w-4 h-4 animate-pulse text-blue-600" />
                    <span className="text-blue-600">OCR 처리 중...</span>
                  </div>
                )}
              </div>

              {/* 구분선 */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-gray-500">또는 직접 입력</span>
                </div>
              </div>

              <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="career-company">회사명</Label>
                  <Input 
                    id="career-company"
                    placeholder="예: 네이버"
                    value={ocrData?.company || ''}
                    onChange={(e) => setOcrData({ ...ocrData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">직급/직책</label>
                  <Input placeholder="예: 백엔드 개발 인턴" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">부서 (선택)</label>
                  <Input placeholder="예: Cloud Platform 팀" />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">근무 형태</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="형태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intern">인턴</SelectItem>
                      <SelectItem value="fulltime">정규직</SelectItem>
                      <SelectItem value="parttime">파트타임</SelectItem>
                      <SelectItem value="contract">계약직</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">시작일</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">종료일 (재직 중이면 비워두세요)</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">근무 지역</label>
                <Input placeholder="예: 경기도 성남시" />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">주요 업무</label>
                <Textarea 
                  placeholder="담당했던 주요 업무를 입력하세요 (줄바꿈으로 구분)"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">사용 기술 (쉼표로 구분)</label>
                <Input placeholder="예: Java, Spring Boot, MySQL, Docker" />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">주요 성과 (선택)</label>
                <Textarea 
                  placeholder="주요 성과를 입력하세요 (줄바꿈으로 구분)"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  추가하기
                </Button>
              </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">총 경력</p>
                <p className="text-gray-900 mt-1">{stats.total}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">진행 중</p>
                <p className="text-gray-900 mt-1">{stats.current}개</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">총 경력 기간</p>
                <p className="text-gray-900 mt-1">
                  {Math.floor(stats.totalMonths / 12) > 0 
                    ? `${Math.floor(stats.totalMonths / 12)}년 ${stats.totalMonths % 12}개월`
                    : `${stats.totalMonths}개월`
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">근무 기업</p>
                <p className="text-gray-900 mt-1">{stats.companies}곳</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            경력 타임라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedCareers.map((career, index) => (
              <div key={career.id}>
                <div className="flex gap-6">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      career.isCurrent ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      <Briefcase className={`w-6 h-6 ${
                        career.isCurrent ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    {index < sortedCareers.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-2" style={{ minHeight: '100px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">{career.position}</h3>
                          <Badge className={typeConfig[career.type].color}>
                            {typeConfig[career.type].label}
                          </Badge>
                          {career.isCurrent && (
                            <Badge className="bg-blue-100 text-blue-700">재직 중</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{career.company}</span>
                          </div>
                          {career.department && (
                            <>
                              <span>•</span>
                              <span>{career.department}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            상세보기
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{career.position}</DialogTitle>
                            <DialogDescription>{career.company}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-gray-500 mb-1">근무 기간</p>
                                <p className="text-gray-900">
                                  {career.startDate} - {career.isCurrent ? '현재' : career.endDate}
                                  <span className="text-gray-500 ml-2">
                                    ({calculateDuration(career.startDate, career.endDate)})
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">근무 형태</p>
                                <Badge className={typeConfig[career.type].color}>
                                  {typeConfig[career.type].label}
                                </Badge>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <p className="text-gray-500 mb-2">주요 업무</p>
                              <ul className="space-y-2">
                                {career.description.map((desc, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span className="text-gray-900">{desc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {career.achievements && career.achievements.length > 0 && (
                              <div>
                                <p className="text-gray-500 mb-2">주요 성과</p>
                                <ul className="space-y-2">
                                  {career.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <Award className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                                      <span className="text-gray-900">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div>
                              <p className="text-gray-500 mb-2">사용 기술</p>
                              <div className="flex flex-wrap gap-2">
                                {career.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button variant="outline" className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                수정
                              </Button>
                              <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4 mr-2" />
                                삭제
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {career.startDate} - {career.isCurrent ? '현재' : career.endDate}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{calculateDuration(career.startDate, career.endDate)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{career.location}</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-gray-600 mb-2">주요 업무</p>
                      <ul className="space-y-1">
                        {career.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-900">
                            <span className="text-blue-600">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {careers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">등록된 경력이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              인턴십이나 업무 경험을 추가하여 프로필을 완성하세요.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  경력 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>경력 추가</DialogTitle>
                  <DialogDescription>
                    새로운 인턴십 또는 업무 경험을 입력하세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">회사명</label>
                      <Input placeholder="예: 네이버" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">직급/직책</label>
                      <Input placeholder="예: 백엔드 개발 인턴" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">부서 (선택)</label>
                      <Input placeholder="예: Cloud Platform 팀" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">근무 형태</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="형태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intern">인턴</SelectItem>
                          <SelectItem value="fulltime">정규직</SelectItem>
                          <SelectItem value="parttime">파트타임</SelectItem>
                          <SelectItem value="contract">계약직</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">시작일</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">종료일 (재직 중이면 비워두세요)</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">근무 지역</label>
                    <Input placeholder="예: 경기도 성남시" />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">주요 업무</label>
                    <Textarea 
                      placeholder="담당했던 주요 업무를 입력하세요 (줄바꿈으로 구분)"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">사용 기술 (쉼표로 구분)</label>
                    <Input placeholder="예: Java, Spring Boot, MySQL, Docker" />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">주요 성과 (선택)</label>
                    <Textarea 
                      placeholder="주요 성과를 입력하세요 (줄바꿈으로 구분)"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      추가하기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
