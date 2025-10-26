import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  GraduationCap, 
  School,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Star,
  MapPin,
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

interface EducationItem {
  id: string;
  type: 'high-school' | 'university' | 'graduate' | 'boot-camp' | 'online-course';
  schoolName: string;
  major?: string;
  degree?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  maxGpa?: number;
  location: string;
  activities?: string[];
  awards?: string[];
  courses?: string[];
}

export default function Education() {
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);
  const [educations] = useState<EducationItem[]>([
    {
      id: '1',
      type: 'university',
      schoolName: '서울대학교',
      major: '컴퓨터공학과',
      degree: '학사',
      startDate: '2021.03',
      isCurrent: true,
      gpa: 4.15,
      maxGpa: 4.5,
      location: '서울시 관악구',
      activities: [
        '알고리즘 학회 ICPC 회장',
        '프로그래밍 동아리 멘토',
        '학생회 IT 분과위원'
      ],
      awards: [
        '학업우수장학금 (2022, 2023)',
        'ICPC 한국 지역 예선 동상',
        '해커톤 대회 최우수상'
      ],
      courses: [
        '자료구조',
        '알고리즘',
        '운영체제',
        '데이터베이스',
        '컴퓨터 네트워크',
        '소프트웨어 공학'
      ]
    },
    {
      id: '2',
      type: 'high-school',
      schoolName: '한영고등학교',
      startDate: '2018.03',
      endDate: '2021.02',
      isCurrent: false,
      location: '서울시 강남구',
      activities: [
        '정보과학 동아리 회장',
        '과학경시대회 참여'
      ],
      awards: [
        '정보 올림피아드 지역 예선 은상',
        '교내 과학경시대회 금상'
      ]
    },
    {
      id: '3',
      type: 'boot-camp',
      schoolName: '패스트캠퍼스',
      major: '웹 개발 부트캠프',
      startDate: '2023.06',
      endDate: '2023.09',
      isCurrent: false,
      location: '온라인',
      courses: [
        'React 심화',
        'Node.js 백엔드',
        'TypeScript',
        'AWS 클라우드',
        '프로젝트 실습'
      ]
    }
  ]);

  const typeConfig = {
    'high-school': { label: '고등학교', color: 'bg-blue-100 text-blue-700', icon: School },
    'university': { label: '대학교', color: 'bg-purple-100 text-purple-700', icon: GraduationCap },
    'graduate': { label: '대학원', color: 'bg-indigo-100 text-indigo-700', icon: GraduationCap },
    'boot-camp': { label: '부트캠프', color: 'bg-green-100 text-green-700', icon: BookOpen },
    'online-course': { label: '온라인 강의', color: 'bg-orange-100 text-orange-700', icon: BookOpen }
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

  const currentEducation = educations.find(e => e.isCurrent && e.type === 'university');

  const stats = {
    total: educations.length,
    current: educations.filter(e => e.isCurrent).length,
    gpa: currentEducation?.gpa || 0,
    maxGpa: currentEducation?.maxGpa || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">학력 관리</h1>
          <p className="text-gray-600 mt-1">학력 및 교육 이력을 관리하세요</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              학력 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>학력 추가</DialogTitle>
              <DialogDescription>
                증명서를 업로드하거나 직접 입력하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* 파일 업로드 섹션 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-gray-900 mb-2">증명서 업로드</h3>
                <p className="text-gray-600 mb-4">
                  졸업/재학 증명서를 업로드하면 AI가 자동으로 인식합니다
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="education-upload-file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setIsOcrProcessing(true);
                      setTimeout(() => {
                        setOcrData({
                          type: 'university',
                          schoolName: '서울대학교',
                          major: '컴퓨터공학과',
                          degree: '학사',
                          startDate: '2021-03',
                          location: '서울시 관악구',
                          gpa: 4.15,
                          maxGpa: 4.5
                        });
                        setIsOcrProcessing(false);
                      }, 2000);
                    }
                  }}
                />
                <Button asChild variant="outline">
                  <label htmlFor="education-upload-file" className="cursor-pointer">
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
              <div>
                <Label htmlFor="education-type">구분</Label>
                <Select
                  value={ocrData?.type || ''}
                  onValueChange={(value) => setOcrData({ ...ocrData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="학력 구분 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">고등학교</SelectItem>
                    <SelectItem value="university">대학교</SelectItem>
                    <SelectItem value="graduate">대학원</SelectItem>
                    <SelectItem value="boot-camp">부트캠프</SelectItem>
                    <SelectItem value="online-course">온라인 강의</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">학교명/기관명</label>
                  <Input placeholder="예: 서울대학교" />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">전공 (선택)</label>
                  <Input placeholder="예: 컴퓨터공학과" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">학위 (선택)</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="학위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="고졸">고졸</SelectItem>
                      <SelectItem value="학사">학사</SelectItem>
                      <SelectItem value="석사">석사</SelectItem>
                      <SelectItem value="박사">박사</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">지역</label>
                  <Input placeholder="예: 서울시 관악구" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">시작일</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">종료일 (재학 중이면 비워두세요)</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 mb-2 block">학점 (선택)</label>
                  <Input type="number" step="0.01" placeholder="예: 4.15" />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">만점 (선택)</label>
                  <Input type="number" step="0.1" placeholder="예: 4.5" />
                </div>
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">활동 사항 (선택)</label>
                <Textarea 
                  placeholder="동아리, 학회 등의 활동을 입력하세요 (줄바꿈으로 구분)"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">수상 경력 (선택)</label>
                <Textarea 
                  placeholder="수상 경력을 입력하세요 (줄바꿈으로 구분)"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">주요 수강 과목 (선택, 쉼표로 구분)</label>
                <Input placeholder="예: 자료구조, 알고리즘, 운영체제" />
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
                <p className="text-gray-600">총 교육 이력</p>
                <p className="text-gray-900 mt-1">{stats.total}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">재학 중</p>
                <p className="text-gray-900 mt-1">{stats.current}개</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">현재 학점</p>
                <p className="text-gray-900 mt-1">
                  {stats.gpa > 0 ? `${stats.gpa.toFixed(2)} / ${stats.maxGpa}` : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">학점 백분율</p>
                <p className="text-gray-900 mt-1">
                  {stats.gpa > 0 ? `${((stats.gpa / stats.maxGpa) * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Education Highlight */}
      {currentEducation && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <GraduationCap className="w-5 h-5 mr-2" />
              현재 재학 중
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-blue-900 mb-1">{currentEducation.schoolName}</h3>
                  <p className="text-blue-700">
                    {currentEducation.major} {currentEducation.degree && `· ${currentEducation.degree}`}
                  </p>
                  <p className="text-blue-600 mt-2">
                    {currentEducation.startDate} - 현재 · {calculateDuration(currentEducation.startDate)}
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white">재학 중</Badge>
              </div>

              {currentEducation.gpa && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-blue-900">학점</p>
                    <p className="text-blue-900">
                      {currentEducation.gpa.toFixed(2)} / {currentEducation.maxGpa}
                      <span className="text-blue-600 ml-2">
                        ({((currentEducation.gpa / currentEducation.maxGpa!) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                  <Progress 
                    value={(currentEducation.gpa / currentEducation.maxGpa!) * 100} 
                    className="h-2 bg-blue-200"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <School className="w-5 h-5 mr-2" />
            학력 타임라인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {educations.map((education, index) => {
              const TypeIcon = typeConfig[education.type].icon;
              
              return (
                <div key={education.id}>
                  <div className="flex gap-6">
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        education.isCurrent ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        <TypeIcon className={`w-6 h-6 ${
                          education.isCurrent ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      {index < educations.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2" style={{ minHeight: '120px' }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-gray-900">{education.schoolName}</h3>
                            <Badge className={typeConfig[education.type].color}>
                              {typeConfig[education.type].label}
                            </Badge>
                            {education.isCurrent && (
                              <Badge className="bg-blue-100 text-blue-700">재학 중</Badge>
                            )}
                          </div>
                          {education.major && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <span>{education.major}</span>
                              {education.degree && (
                                <>
                                  <span>•</span>
                                  <span>{education.degree}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              상세보기
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{education.schoolName}</DialogTitle>
                              <DialogDescription>
                                {education.major && `${education.major} ${education.degree ? `· ${education.degree}` : ''}`}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-500 mb-1">재학 기간</p>
                                  <p className="text-gray-900">
                                    {education.startDate} - {education.isCurrent ? '현재' : education.endDate}
                                    <span className="text-gray-500 ml-2">
                                      ({calculateDuration(education.startDate, education.endDate)})
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">구분</p>
                                  <Badge className={typeConfig[education.type].color}>
                                    {typeConfig[education.type].label}
                                  </Badge>
                                </div>
                              </div>

                              {education.gpa && (
                                <div>
                                  <p className="text-gray-500 mb-2">학점</p>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-gray-900">
                                        {education.gpa.toFixed(2)} / {education.maxGpa}
                                      </span>
                                      <span className="text-gray-600">
                                        {((education.gpa / education.maxGpa!) * 100).toFixed(1)}%
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(education.gpa / education.maxGpa!) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                </div>
                              )}

                              {education.courses && education.courses.length > 0 && (
                                <>
                                  <Separator />
                                  <div>
                                    <p className="text-gray-500 mb-2">주요 수강 과목</p>
                                    <div className="flex flex-wrap gap-2">
                                      {education.courses.map((course, idx) => (
                                        <Badge key={idx} variant="secondary">
                                          {course}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              )}

                              {education.activities && education.activities.length > 0 && (
                                <>
                                  <Separator />
                                  <div>
                                    <p className="text-gray-500 mb-2">활동 사항</p>
                                    <ul className="space-y-2">
                                      {education.activities.map((activity, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <span className="text-blue-600 mt-1">•</span>
                                          <span className="text-gray-900">{activity}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              )}

                              {education.awards && education.awards.length > 0 && (
                                <>
                                  <Separator />
                                  <div>
                                    <p className="text-gray-500 mb-2">수상 경력</p>
                                    <ul className="space-y-2">
                                      {education.awards.map((award, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <Award className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                                          <span className="text-gray-900">{award}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              )}

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
                          {education.startDate} - {education.isCurrent ? '현재' : education.endDate}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{calculateDuration(education.startDate, education.endDate)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{education.location}</span>
                      </div>

                      {education.gpa && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600">학점</p>
                            <p className="text-gray-900">
                              {education.gpa.toFixed(2)} / {education.maxGpa}
                              <span className="text-gray-500 ml-2">
                                ({((education.gpa / education.maxGpa!) * 100).toFixed(1)}%)
                              </span>
                            </p>
                          </div>
                          <Progress 
                            value={(education.gpa / education.maxGpa!) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}

                      {education.activities && education.activities.length > 0 && (
                        <div className="space-y-1 mb-3">
                          <p className="text-gray-600">활동 사항</p>
                          <div className="flex flex-wrap gap-2">
                            {education.activities.slice(0, 3).map((activity, idx) => (
                              <Badge key={idx} variant="outline">
                                {activity}
                              </Badge>
                            ))}
                            {education.activities.length > 3 && (
                              <Badge variant="outline">
                                +{education.activities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {educations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">등록된 학력이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              학력 및 교육 이력을 추가하여 프로필을 완성하세요.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  학력 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>학력 추가</DialogTitle>
                  <DialogDescription>
                    새로운 학력 또는 교육 이력을 입력하세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">구분</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="학력 구분 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">고등학교</SelectItem>
                        <SelectItem value="university">대학교</SelectItem>
                        <SelectItem value="graduate">대학원</SelectItem>
                        <SelectItem value="boot-camp">부트캠프</SelectItem>
                        <SelectItem value="online-course">온라인 강의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">학교명/기관명</label>
                      <Input placeholder="예: 서울대학교" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">전공 (선택)</label>
                      <Input placeholder="예: 컴퓨터공학과" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">학위 (선택)</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="학위 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="고졸">고졸</SelectItem>
                          <SelectItem value="학사">학사</SelectItem>
                          <SelectItem value="석사">석사</SelectItem>
                          <SelectItem value="박사">박사</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">지역</label>
                      <Input placeholder="예: 서울시 관악구" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">시작일</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">종료일 (재학 중이면 비워두세요)</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 mb-2 block">학점 (선택)</label>
                      <Input type="number" step="0.01" placeholder="예: 4.15" />
                    </div>
                    <div>
                      <label className="text-gray-700 mb-2 block">만점 (선택)</label>
                      <Input type="number" step="0.1" placeholder="예: 4.5" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">활동 사항 (선택)</label>
                    <Textarea 
                      placeholder="동아리, 학회 등의 활동을 입력하세요 (줄바꿈으로 구분)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">수상 경력 (선택)</label>
                    <Textarea 
                      placeholder="수상 경력을 입력하세요 (줄바꿈으로 구분)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">주요 수강 과목 (선택, 쉼표로 구분)</label>
                    <Input placeholder="예: 자료구조, 알고리즘, 운영체제" />
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
