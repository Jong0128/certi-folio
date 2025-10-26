import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Award,
  Briefcase,
  GraduationCap,
  Target,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowRight,
  Upload,
  FileText,
  Plus,
  X
} from 'lucide-react';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';

export default function BecomeMentor() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    experience: '',
    expertise: [] as string[],
    bio: '',
    menteeCapacity: '5',
    availability: [] as string[],
    preferredFormat: 'both',
    certificates: [] as string[]
  });

  const [newExpertise, setNewExpertise] = useState('');

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const expertiseOptions = [
    '백엔드 개발',
    '프론트엔드 개발',
    'DevOps',
    '데이터 분석',
    '머신러닝',
    'PM/기획',
    'UX/UI 디자인',
    '창업/스타트업',
    '커리어 전환',
    '면접 준비'
  ];

  const availabilityOptions = [
    { value: 'weekday-morning', label: '평일 오전 (09:00-12:00)' },
    { value: 'weekday-afternoon', label: '평일 오후 (13:00-18:00)' },
    { value: 'weekday-evening', label: '평일 저녁 (19:00-22:00)' },
    { value: 'weekend-morning', label: '주말 오전 (09:00-12:00)' },
    { value: 'weekend-afternoon', label: '주말 오후 (13:00-18:00)' }
  ];

  const benefits = [
    {
      icon: Users,
      title: '성장하는 후배들과 함께',
      description: '열정적인 후배들의 성장을 도우며 보람을 느껴보세요'
    },
    {
      icon: TrendingUp,
      title: '나의 성장',
      description: '멘토링을 통해 리더십과 커뮤니케이션 역량을 키울 수 있어요'
    },
    {
      icon: Award,
      title: '멘토 인증 뱃지',
      description: '플랫폼 내 멘토 인증 뱃지로 전문성을 인정받으세요'
    },
    {
      icon: Star,
      title: '평판 관리',
      description: '멘티들의 피드백을 통해 전문가로서 평판을 쌓아가세요'
    }
  ];

  const requirements = [
    { text: '3년 이상의 실무 경력', met: true },
    { text: '해당 분야 전문성', met: true },
    { text: '정기적인 멘토링 시간 확보', met: false },
    { text: '열정과 책임감', met: true }
  ];

  const addExpertise = () => {
    if (newExpertise && !formData.expertise.includes(newExpertise)) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise]
      });
      setNewExpertise('');
    }
  };

  const removeExpertise = (item: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter(e => e !== item)
    });
  };

  const toggleAvailability = (value: string) => {
    if (formData.availability.includes(value)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter(a => a !== value)
      });
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, value]
      });
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Mentor application submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-gray-900">멘토 신청</h1>
        <p className="text-gray-600 mt-1">
          당신의 경험과 지식을 나누고 후배들의 성장을 도와주세요
        </p>
      </div>

      {step === 1 && (
        <>
          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>멘토 자격 요건</CardTitle>
              <CardDescription>
                아래 요건을 확인하고 신청해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {req.met ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <span className={req.met ? 'text-gray-900' : 'text-gray-500'}>
                    {req.text}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex justify-center">
            <Button size="lg" onClick={handleNext}>
              멘토 신청 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}

      {step > 1 && (
        <>
          {/* Progress Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">신청 진행률</span>
                <span className="text-gray-900">
                  {step - 1}/{totalSteps - 1} 완료
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>
                  멘토로서의 기본 정보를 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">직책 *</Label>
                    <Input
                      id="title"
                      placeholder="Senior Software Engineer"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">회사 *</Label>
                    <Input
                      id="company"
                      placeholder="네이버"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">경력 (년) *</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="5"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개 *</Label>
                  <Textarea
                    id="bio"
                    placeholder="멘토로서의 경험과 멘티들에게 제공할 수 있는 가치를 소개해주세요..."
                    rows={6}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    최소 100자 이상 작성해주세요
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Expertise */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>전문 분야</CardTitle>
                <CardDescription>
                  멘토링 가능한 분야를 선택하거나 직접 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((option) => {
                    const isSelected = formData.expertise.includes(option);
                    return (
                      <Badge
                        key={option}
                        variant={isSelected ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => {
                          if (isSelected) {
                            removeExpertise(option);
                          } else {
                            setFormData({
                              ...formData,
                              expertise: [...formData.expertise, option]
                            });
                          }
                        }}
                      >
                        {option}
                        {isSelected && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <Label>직접 입력</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="전문 분야를 입력하세요"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addExpertise()}
                    />
                    <Button type="button" onClick={addExpertise}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.expertise.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-900 mb-2">선택된 전문 분야</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.expertise.map((item) => (
                        <Badge key={item} className="bg-blue-600">
                          {item}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => removeExpertise(item)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="certificates">보유 자격증 (선택사항)</Label>
                  <Input
                    id="certificates"
                    placeholder="정보처리기사, AWS Solutions Architect..."
                  />
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    쉼표(,)로 구분하여 입력해주세요
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Availability */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>멘토링 설정</CardTitle>
                <CardDescription>
                  멘토링 가능 시간과 방식을 설정해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>최대 멘티 수</Label>
                  <Select value={formData.menteeCapacity} onValueChange={(v) => setFormData({ ...formData, menteeCapacity: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3명</SelectItem>
                      <SelectItem value="5">5명 (권장)</SelectItem>
                      <SelectItem value="10">10명</SelectItem>
                      <SelectItem value="unlimited">제한 없음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>가능한 시간대 *</Label>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={formData.availability.includes(option.value)}
                          onCheckedChange={() => toggleAvailability(option.value)}
                        />
                        <Label
                          htmlFor={option.value}
                          className="cursor-pointer"
                          style={{ fontWeight: 'normal' }}
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>선호하는 멘토링 방식</Label>
                  <Select value={formData.preferredFormat} onValueChange={(v) => setFormData({ ...formData, preferredFormat: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">화상 미팅만</SelectItem>
                      <SelectItem value="chat">채팅만</SelectItem>
                      <SelectItem value="both">화상 + 채팅</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 mb-1">멘토 활동 가이드</p>
                      <ul className="text-gray-600 space-y-1" style={{ fontSize: '14px' }}>
                        <li>• 정기적인 세션 진행을 위해 주 1-2회 이상 시간 확보를 권장합니다</li>
                        <li>• 멘티의 성장을 위해 피드백과 과제 제공이 필요합니다</li>
                        <li>• 첫 멘토링 전 멘티의 목표와 기대사항을 명확히 파악해주세요</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrev}>
              이전
            </Button>
            <div className="flex gap-2">
              {step < totalSteps ? (
                <Button onClick={handleNext}>
                  다음
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  신청 완료
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
