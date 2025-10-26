import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Award, 
  Building, 
  MapPin, 
  Calendar,
  DollarSign,
  TrendingUp,
  ExternalLink,
  Bookmark,
  Filter,
  Search,
  ChevronRight,
  Target,
  Users,
  Clock
} from 'lucide-react';

export default function JobRecommendation() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '전체', count: 24 },
    { id: 'high-match', label: '높은 매치도', count: 8 },
    { id: 'entry-level', label: '신입', count: 12 },
    { id: 'experienced', label: '경력', count: 6 },
    { id: 'recent', label: '최신', count: 15 }
  ];

  const jobRecommendations = [
    {
      id: 1,
      company: '네이버',
      position: 'Backend Developer (신입)',
      location: '판교',
      salary: '5,500만원',
      matchScore: 92,
      requirements: ['Java', 'Spring Boot', 'MySQL', '정보처리기사'],
      mySkills: ['Java', 'Spring Boot', 'MySQL'],
      missingSkills: ['정보처리기사'],
      deadline: '2024-10-30',
      description: '네이버의 핵심 서비스를 개발하는 백엔드 개발자를 모집합니다.',
      benefits: ['4대보험', '연봉협상가능', '재택근무', '교육지원'],
      experienceLevel: 'entry',
      posted: '1일 전',
      applicants: 156,
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop'
    },
    {
      id: 2,
      company: '카카오',
      position: 'Full Stack Developer',
      location: '판교',
      salary: '4,800만원~6,200만원',
      matchScore: 85,
      requirements: ['React', 'Node.js', 'TypeScript', 'AWS'],
      mySkills: ['React', 'TypeScript'],
      missingSkills: ['Node.js', 'AWS'],
      deadline: '2024-11-05',
      description: '카카오톡 플랫폼 개발에 참여할 풀스택 개발자를 찾습니다.',
      benefits: ['4대보험', '스톡옵션', '점심제공', '컨퍼런스지원'],
      experienceLevel: 'entry',
      posted: '3일 전',
      applicants: 203,
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop'
    },
    {
      id: 3,
      company: '토스',
      position: 'Backend Engineer',
      location: '서울',
      salary: '6,000만원~8,000만원',
      matchScore: 78,
      requirements: ['Java', 'Spring', 'Kotlin', 'MSA', '3년 이상 경력'],
      mySkills: ['Java', 'Spring'],
      missingSkills: ['Kotlin', 'MSA', '3년 이상 경력'],
      deadline: '2024-10-25',
      description: '금융 혁신을 이끌어갈 백엔드 엔지니어를 모집합니다.',
      benefits: ['성과급', '스톡옵션', '자기계발비', '건강검진'],
      experienceLevel: 'experienced',
      posted: '5일 전',
      applicants: 89,
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop'
    },
    {
      id: 4,
      company: '쿠팡',
      position: 'Software Engineer',
      location: '서울',
      salary: '5,200만원',
      matchScore: 88,
      requirements: ['Java', 'Python', 'AWS', 'Docker'],
      mySkills: ['Java', 'Python'],
      missingSkills: ['AWS', 'Docker'],
      deadline: '2024-11-15',
      description: '글로벌 이커머스 플랫폼의 핵심 시스템을 개발합니다.',
      benefits: ['글로벌경험', '교육비지원', '점심제공', '헬스장'],
      experienceLevel: 'entry',
      posted: '1주일 전',
      applicants: 234,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop'
    }
  ];

  const filteredJobs = jobRecommendations.filter(job => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'high-match') return job.matchScore >= 85;
    if (selectedCategory === 'entry-level') return job.experienceLevel === 'entry';
    if (selectedCategory === 'experienced') return job.experienceLevel === 'experienced';
    if (selectedCategory === 'recent') return ['1일 전', '3일 전'].includes(job.posted);
    return true;
  });

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">맞춤 기업 추천</h1>
        <p className="text-gray-600">나의 역량을 바탕으로 합격 가능성이 높은 기업을 추천합니다.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-600">92%</p>
            <p className="text-sm text-gray-600">최고 매치도</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">{filteredJobs.length}</p>
            <p className="text-sm text-gray-600">추천 기업</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">높은 매치도</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-600">15</p>
            <p className="text-sm text-gray-600">마감 임박</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Recommendations */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const daysLeft = getDaysLeft(job.deadline);
          return (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Company Logo */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{job.position}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>D-{daysLeft}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          매치도 {job.matchScore}%
                        </div>
                        <p className="text-xs text-gray-500 mt-1">지원자 {job.applicants}명</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    {/* Skills Match */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-2">보유 스킬</h5>
                        <div className="flex flex-wrap gap-1">
                          {job.mySkills.map((skill, index) => (
                            <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-orange-800 mb-2">부족한 스킬</h5>
                        <div className="flex flex-wrap gap-1">
                          {job.missingSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">복리후생</h5>
                      <div className="flex flex-wrap gap-1">
                        {job.benefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">역량 매치도</span>
                        <span className="text-sm text-gray-600">{job.matchScore}%</span>
                      </div>
                      <Progress value={job.matchScore} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {job.posted}
                        </Badge>
                        <Badge 
                          variant={daysLeft <= 7 ? 'destructive' : 'outline'} 
                          className="text-xs"
                        >
                          마감 D-{daysLeft}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Bookmark className="w-3 h-3 mr-1" />
                          관심기업
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          자세히 보기
                        </Button>
                        <Button size="sm">
                          지원하기
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

      {/* Improvement Suggestions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">매치도 향상 제안</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <Award className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium">정보처리기사 취득</h4>
                <p className="text-sm text-gray-600">대부분의 IT 기업에서 우대하는 자격증입니다. (+15% 매치도 상승)</p>
                <Button size="sm" variant="outline" className="mt-2">
                  시험 일정 확인
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">AWS 실습 프로젝트</h4>
                <p className="text-sm text-gray-600">클라우드 기술은 현재 가장 수요가 높은 스킬입니다. (+20% 매치도 상승)</p>
                <Button size="sm" variant="outline" className="mt-2">
                  스터디 찾기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}