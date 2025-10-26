import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Search,
  Filter,
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Briefcase,
  Clock,
  Users,
  ExternalLink,
  Bookmark,
  TrendingUp
} from 'lucide-react';

interface JobPosting {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  employmentType: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  deadline: string;
  applicants: number;
  isBookmarked?: boolean;
}

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [filterEmploymentType, setFilterEmploymentType] = useState('all');

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      company: '삼성전자',
      position: 'Software Engineer (신입)',
      location: '수원',
      salary: '협상 가능',
      employmentType: '정규직',
      experienceLevel: '신입',
      description: '차세대 반도체 기술 개발에 참여할 소프트웨어 엔지니어를 모집합니다.',
      requirements: ['C/C++', 'Python', '자료구조', '알고리즘'],
      benefits: ['4대보험', '퇴직금', '성과급', '주택자금지원', '자기계발비'],
      posted: '1일 전',
      deadline: '2024-11-30',
      applicants: 342,
      isBookmarked: false
    },
    {
      id: '2',
      company: 'LG전자',
      position: 'AI 연구원',
      location: '서울',
      salary: '5,500만원~7,000만원',
      employmentType: '정규직',
      experienceLevel: '경력 3년',
      description: 'AI 기반 가전제품 개발을 위한 머신러닝 연구원을 모집합니다.',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'ML/DL'],
      benefits: ['4대보험', '스톡옵션', '연구개발비', '유연근무제'],
      posted: '2일 전',
      deadline: '2024-11-15',
      applicants: 156,
      isBookmarked: true
    },
    {
      id: '3',
      company: '현대자동차',
      position: '자율주행 SW 개발자',
      location: '서울',
      salary: '6,000만원~8,000만원',
      employmentType: '정규직',
      experienceLevel: '경력 5년',
      description: '자율주행 시스템 개발을 위한 소프트웨어 엔지니어를 찾습니다.',
      requirements: ['C++', 'ROS', 'Computer Vision', '자율주행'],
      benefits: ['차량지원', '4대보험', '성과급', '자녀학자금'],
      posted: '3일 전',
      deadline: '2024-10-31',
      applicants: 89,
      isBookmarked: false
    },
    {
      id: '4',
      company: '배달의민족',
      position: 'Backend Developer',
      location: '서울',
      salary: '5,000만원~6,500만원',
      employmentType: '정규직',
      experienceLevel: '신입~경력 3년',
      description: '배달 플랫폼의 핵심 백엔드 시스템을 개발합니다.',
      requirements: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
      benefits: ['식대지원', '야근수당', '재택근무', '컨퍼런스지원'],
      posted: '5일 전',
      deadline: '2024-11-20',
      applicants: 278,
      isBookmarked: true
    },
    {
      id: '5',
      company: '라인플러스',
      position: 'Frontend Developer',
      location: '판교',
      salary: '5,200만원',
      employmentType: '정규직',
      experienceLevel: '신입',
      description: 'LINE 서비스의 프론트엔드 개발자를 모집합니다.',
      requirements: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'],
      benefits: ['4대보험', '중식제공', '자기계발비', '워크숍'],
      posted: '1주일 전',
      deadline: '2024-11-10',
      applicants: 412,
      isBookmarked: false
    },
    {
      id: '6',
      company: 'SK텔레콤',
      position: 'Cloud Engineer',
      location: '서울',
      salary: '5,800만원~7,500만원',
      employmentType: '정규직',
      experienceLevel: '경력 2년',
      description: '클라우드 인프라 구축 및 운영을 담당할 엔지니어를 모집합니다.',
      requirements: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
      benefits: ['통신비지원', '건강검진', '콘도지원', '경조사비'],
      posted: '4일 전',
      deadline: '2024-11-25',
      applicants: 124,
      isBookmarked: false
    }
  ];

  const locations = ['all', '서울', '판교', '수원', '부산', '대전'];
  const experienceLevels = ['all', '신입', '경력 1년', '경력 3년', '경력 5년'];
  const employmentTypes = ['all', '정규직', '계약직', '인턴', '프리랜서'];

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = filterLocation === 'all' || job.location === filterLocation;
    const matchesExperience = filterExperience === 'all' || job.experienceLevel.includes(filterExperience);
    const matchesEmploymentType = filterEmploymentType === 'all' || job.employmentType === filterEmploymentType;
    
    return matchesSearch && matchesLocation && matchesExperience && matchesEmploymentType;
  });

  const stats = {
    totalJobs: jobPostings.length,
    newToday: jobPostings.filter(j => j.posted.includes('1일 전')).length,
    bookmarked: jobPostings.filter(j => j.isBookmarked).length,
    closingSoon: jobPostings.filter(j => {
      const deadline = new Date(j.deadline);
      const today = new Date();
      const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diff <= 7;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">채용 공고 검색</h1>
        <p className="text-gray-600 mt-1">최신 채용 정보를 검색하고 지원하세요</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">전체 공고</p>
                <p className="text-gray-900 mt-1">{stats.totalJobs}개</p>
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
                <p className="text-gray-600">오늘 등록</p>
                <p className="text-gray-900 mt-1">{stats.newToday}개</p>
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
                <p className="text-gray-600">관심 공고</p>
                <p className="text-gray-900 mt-1">{stats.bookmarked}개</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">마감 임박</p>
                <p className="text-gray-900 mt-1">{stats.closingSoon}개</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
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
                placeholder="포지션, 회사, 기술 스택 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-full md:w-32">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>
                    {loc === 'all' ? '전체 지역' : loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterExperience} onValueChange={setFilterExperience}>
              <SelectTrigger className="w-full md:w-32">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(exp => (
                  <SelectItem key={exp} value={exp}>
                    {exp === 'all' ? '전체 경력' : exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterEmploymentType} onValueChange={setFilterEmploymentType}>
              <SelectTrigger className="w-full md:w-32">
                <Briefcase className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employmentTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? '전체 고용' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const deadline = new Date(job.deadline);
          const today = new Date();
          const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-7 h-7 text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{job.position}</h3>
                        <p className="text-gray-600" style={{ fontSize: '15px' }}>{job.company}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          // Toggle bookmark
                        }}
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${job.isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} 
                        />
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-gray-600" style={{ fontSize: '14px' }}>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.employmentType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{job.experienceLevel}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{job.description}</p>

                    {/* Requirements */}
                    <div className="mb-3">
                      <h5 className="text-gray-600 mb-2" style={{ fontSize: '13px' }}>요구 기술</h5>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h5 className="text-gray-600 mb-2" style={{ fontSize: '13px' }}>복리후생</h5>
                      <div className="flex flex-wrap gap-1">
                        {job.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" style={{ fontSize: '12px' }}>
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-3 text-gray-500" style={{ fontSize: '13px' }}>
                        <span>{job.posted}</span>
                        <span>•</span>
                        <span className={daysLeft <= 7 ? 'text-red-600' : ''}>
                          마감 D-{daysLeft}
                        </span>
                        <span>•</span>
                        <span>지원자 {job.applicants}명</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
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

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">
              검색 조건을 변경해보세요.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
