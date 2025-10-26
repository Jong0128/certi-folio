import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  Globe,
  Briefcase,
  Users,
  ChevronRight,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function SkillAnalysis() {
  const [selectedJob, setSelectedJob] = useState('backend');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [selectedWeakArea, setSelectedWeakArea] = useState('');

  const jobOptions = [
    { value: 'backend', label: '백엔드 개발자' },
    { value: 'frontend', label: '프론트엔드 개발자' },
    { value: 'fullstack', label: '풀스택 개발자' },
    { value: 'data', label: '데이터 분석가' },
    { value: 'ai', label: 'AI/ML 엔지니어' }
  ];

  const companyOptions = [
    { value: 'all', label: '전체' },
    { value: 'big-tech', label: '빅테크' },
    { value: 'startup', label: '스타트업' },
    { value: 'finance', label: '금융권' },
    { value: 'public', label: '공공기관' }
  ];

  const skillData = [
    { subject: '자격증', myScore: 75, targetScore: 100, fullMark: 100 },
    { subject: '어학', myScore: 85, targetScore: 100, fullMark: 100 },
    { subject: '실무경험', myScore: 60, targetScore: 100, fullMark: 100 },
    { subject: '학점', myScore: 88, targetScore: 100, fullMark: 100 },
    { subject: '프로젝트', myScore: 70, targetScore: 100, fullMark: 100 },
    { subject: '네트워킹', myScore: 45, targetScore: 100, fullMark: 100 }
  ];

  const certificationRoadmap = [
    {
      id: 1,
      name: '정보처리기사',
      provider: '한국산업인력공단',
      priority: 'high',
      difficulty: 'medium',
      nextExam: '2024-05-18',
      description: '소프트웨어 개발 전 과정에 대한 기본 지식',
      status: 'recommended'
    },
    {
      id: 2,
      name: 'SQLD',
      provider: '한국데이터진흥원',
      priority: 'high',
      difficulty: 'easy',
      nextExam: '2024-06-15',
      description: 'SQL 및 데이터베이스 관련 전문 지식',
      status: 'recommended'
    },
    {
      id: 3,
      name: 'AWS Solutions Architect',
      provider: 'Amazon',
      priority: 'medium',
      difficulty: 'hard',
      nextExam: '상시',
      description: '클라우드 아키텍처 설계 및 구현',
      status: 'optional'
    },
    {
      id: 4,
      name: 'OCJP',
      provider: 'Oracle',
      priority: 'medium',
      difficulty: 'medium',
      nextExam: '상시',
      description: 'Java 프로그래밍 전문 능력',
      status: 'optional'
    }
  ];

  const strengthsAndWeaknesses = {
    strengths: [
      { area: '어학능력', score: 85, description: 'TOEIC 890점으로 우수한 영어 실력' },
      { area: '학점', score: 88, description: '전공 3.8/4.5로 우수한 학업 성취도' }
    ],
    weaknesses: [
      { area: '실무경험', score: 60, description: '인턴 경험 부족, 프로젝트 경험 필요' },
      { area: '네트워킹', score: 45, description: '업계 네트워크 및 멘토링 부족' }
    ]
  };

  const handleWeakAreaClick = (area: string) => {
    setSelectedWeakArea(area);
    setShowRoadmap(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">역량 분석</h1>
        <p className="text-gray-600">목표 직무와 비교하여 나의 역량을 분석하고 개선 방향을 확인하세요.</p>
      </div>

      {/* Job & Company Selection */}
      <Card>
        <CardHeader>
          <CardTitle>분석 조건 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">목표 직무</label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="직무를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {jobOptions.map((job) => (
                    <SelectItem key={job.value} value={job.value}>
                      {job.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">희망 기업군</label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="기업군을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {companyOptions.map((company) => (
                    <SelectItem key={company.value} value={company.value}>
                      {company.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            역량 수준 비교
          </CardTitle>
          <p className="text-gray-600">
            파란색: 내 현재 수준 | 빨간색: 목표 그룹 평균
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="내 수준"
                  dataKey="myScore"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="목표 수준"
                  dataKey="targetScore"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">강점 영역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengthsAndWeaknesses.strengths.map((strength, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{strength.area}</h4>
                    <Badge variant="secondary">{strength.score}점</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{strength.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">개선 필요 영역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengthsAndWeaknesses.weaknesses.map((weakness, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-white rounded-lg border border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleWeakAreaClick(weakness.area)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{weakness.area}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{weakness.score}점</Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{weakness.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Roadmap */}
      {showRoadmap && selectedWeakArea === '실무경험' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">
              자격증 취득 로드맵 - {selectedWeakArea} 개선
            </CardTitle>
            <p className="text-blue-700">추천 자격증을 순서대로 취득하여 역량을 강화하세요.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {certificationRoadmap.map((cert, index) => (
                <div key={cert.id} className="p-4 bg-white rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <Badge 
                          variant={cert.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {cert.priority === 'high' ? '필수' : '권장'}
                        </Badge>
                      </div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.provider}</p>
                    </div>
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{cert.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>난이도:</span>
                      <span className={`font-medium ${
                        cert.difficulty === 'easy' ? 'text-green-600' :
                        cert.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {cert.difficulty === 'easy' ? '쉬움' :
                         cert.difficulty === 'medium' ? '보통' : '어려움'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>다음 시험:</span>
                      <span className="font-medium">{cert.nextExam}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      일정 추가
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            목표 달성 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillData.map((skill, index) => {
              const progress = Math.round((skill.myScore / skill.targetScore) * 100);
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.subject}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {skill.myScore}/{skill.targetScore}
                      </span>
                      <Badge variant={progress >= 100 ? "default" : progress >= 80 ? "secondary" : "outline"}>
                        {progress}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}