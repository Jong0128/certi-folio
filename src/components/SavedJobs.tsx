import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Star,
  Bookmark,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Trash2,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  X
} from 'lucide-react';

interface SavedJob {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  deadline: string;
  savedDate: string;
  status: 'saved' | 'applied' | 'interviewing' | 'rejected' | 'accepted';
  matchScore?: number;
  notes?: string;
}

export default function SavedJobs() {
  const [activeTab, setActiveTab] = useState('all');

  const savedJobs: SavedJob[] = [
    {
      id: '1',
      company: '네이버',
      position: 'Backend Developer (신입)',
      location: '판교',
      salary: '5,500만원',
      deadline: '2024-10-30',
      savedDate: '2024-10-15',
      status: 'applied',
      matchScore: 92,
      notes: '면접 준비 필요 - Spring Boot 복습'
    },
    {
      id: '2',
      company: '카카오',
      position: 'Full Stack Developer',
      location: '판교',
      salary: '4,800만원~6,200만원',
      deadline: '2024-11-05',
      savedDate: '2024-10-14',
      status: 'interviewing',
      matchScore: 85,
      notes: '1차 면접 통과, 2차 면접 11월 1일'
    },
    {
      id: '3',
      company: '배달의민족',
      position: 'Backend Developer',
      location: '서울',
      salary: '5,000만원~6,500만원',
      deadline: '2024-11-20',
      savedDate: '2024-10-12',
      status: 'saved',
      matchScore: 88
    },
    {
      id: '4',
      company: '라인플러스',
      position: 'Frontend Developer',
      location: '판교',
      salary: '5,200만원',
      deadline: '2024-11-10',
      savedDate: '2024-10-10',
      status: 'saved',
      matchScore: 82
    },
    {
      id: '5',
      company: '토스',
      position: 'Backend Engineer',
      location: '서울',
      salary: '6,000만원~8,000만원',
      deadline: '2024-10-25',
      savedDate: '2024-10-08',
      status: 'rejected',
      matchScore: 78,
      notes: '경력 요건 미달'
    },
    {
      id: '6',
      company: '쿠팡',
      position: 'Software Engineer',
      location: '서울',
      salary: '5,200만원',
      deadline: '2024-11-15',
      savedDate: '2024-10-05',
      status: 'saved',
      matchScore: 88
    }
  ];

  const statusConfig = {
    saved: { label: '관심', color: 'bg-gray-100 text-gray-700', icon: Bookmark },
    applied: { label: '지원 완료', color: 'bg-blue-100 text-blue-700', icon: Clock },
    interviewing: { label: '면접 진행', color: 'bg-purple-100 text-purple-700', icon: Users },
    rejected: { label: '불합격', color: 'bg-red-100 text-red-700', icon: X },
    accepted: { label: '합격', color: 'bg-green-100 text-green-700', icon: Star }
  };

  const filteredJobs = savedJobs.filter(job => {
    if (activeTab === 'all') return true;
    return job.status === activeTab;
  });

  const stats = {
    total: savedJobs.length,
    saved: savedJobs.filter(j => j.status === 'saved').length,
    applied: savedJobs.filter(j => j.status === 'applied').length,
    interviewing: savedJobs.filter(j => j.status === 'interviewing').length,
    accepted: savedJobs.filter(j => j.status === 'accepted').length,
    rejected: savedJobs.filter(j => j.status === 'rejected').length
  };

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">관심 기업 및 공고</h1>
        <p className="text-gray-600 mt-1">저장한 기업과 공고를 관리하세요</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-gray-900">{stats.total}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>전체</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-gray-900">{stats.saved}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>관심</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-gray-900">{stats.applied}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>지원 완료</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-gray-900">{stats.interviewing}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>면접 진행</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-900">{stats.accepted}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>합격</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-gray-900">{stats.rejected}개</p>
            <p className="text-gray-600" style={{ fontSize: '13px' }}>불합격</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">
            전체 ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="saved">
            관심 ({stats.saved})
          </TabsTrigger>
          <TabsTrigger value="applied">
            지원 완료 ({stats.applied})
          </TabsTrigger>
          <TabsTrigger value="interviewing">
            면접 진행 ({stats.interviewing})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            합격 ({stats.accepted})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            불합격 ({stats.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const StatusIcon = statusConfig[job.status].icon;
              const daysLeft = getDaysLeft(job.deadline);
              
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
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-gray-900">{job.position}</h3>
                              <Badge className={statusConfig[job.status].color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[job.status].label}
                              </Badge>
                              {job.matchScore && (
                                <Badge variant="outline">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  매치도 {job.matchScore}%
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600" style={{ fontSize: '15px' }}>{job.company}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              // Remove from saved
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
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
                            <Calendar className="w-4 h-4" />
                            <span className={daysLeft <= 7 ? 'text-red-600' : ''}>
                              마감 D-{daysLeft}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bookmark className="w-4 h-4" />
                            <span>저장일: {job.savedDate}</span>
                          </div>
                        </div>

                        {job.notes && (
                          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-gray-700" style={{ fontSize: '14px' }}>
                              📝 {job.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              메모 추가
                            </Button>
                            <Button variant="outline" size="sm">
                              상태 변경
                            </Button>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              자세히 보기
                            </Button>
                            {job.status === 'saved' && (
                              <Button size="sm">
                                지원하기
                              </Button>
                            )}
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
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">저장된 공고가 없습니다</h3>
                <p className="text-gray-600 mb-6">
                  관심있는 공고를 저장하고 관리해보세요.
                </p>
                <Button>
                  채용 공고 검색
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
