import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Upload, 
  FileImage, 
  Scan, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Award,
  Download,
  Edit,
  GraduationCap,
  School,
  Shield,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin
} from 'lucide-react';

export default function CertificateUpload() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // 고등학교 정보
    highSchool: {
      name: '',
      location: '',
      graduationYear: '',
      type: '' // 일반고, 특성화고, 자율고 등
    },
    // 대학교 정보
    university: {
      name: '',
      major: '',
      degree: '', // 학사, 석사, 박사
      year: '', // 학년 또는 졸업년도
      gpa: '',
      status: '' // 재학중, 졸업 등
    },
    // 군대 정보
    military: {
      status: '', // 완료, 면제, 미필 등
      branch: '', // 육군, 해군, 공군 등
      rank: '',
      period: '',
      specialty: ''
    },
    // 자격증 정보
    certificates: [],
    // 인턴/경력 정보
    experience: {
      internships: [],
      jobs: []
    }
  });

  const steps = [
    { id: 0, title: '고등학교', icon: School, description: '고등학교 정보를 입력해주세요' },
    { id: 1, title: '대학교', icon: GraduationCap, description: '대학교/대학원 정보를 입력해주세요' },
    { id: 2, title: '군복무', icon: Shield, description: '군복무 정보를 입력해주세요' },
    { id: 3, title: '자격증', icon: Award, description: '보유하신 자격증을 등록해주세요' },
    { id: 4, title: '경력/인턴', icon: Briefcase, description: '인턴십 및 경력사항을 입력해주세요' }
  ];

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderHighSchoolStep = () => (
    <div className="space-y-8">
      {/* 문서 업로드 섹션 */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">졸업증명서 업로드</CardTitle>
          <p className="text-blue-700">
            졸업증명서를 업로드하면 정보가 자동으로 입력됩니다
          </p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors bg-white">
            <School className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h3 className="text-xl mb-4">졸업증명서 또는 성적증명서 업로드</h3>
            <p className="text-gray-600 mb-6 text-lg">
              JPG, PNG, PDF 파일을 드래그하거나 클릭하여 업로드하세요
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              id="highschool-file-upload"
            />
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <label htmlFor="highschool-file-upload" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-3" />
                파일 선택하기
              </label>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              또는 아래에서 직접 입력할 수 있습니다
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 직접 입력 섹션 */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Edit className="w-6 h-6 mr-3" />
            고등학교 정보 직접 입력
          </CardTitle>
          <p className="text-gray-600 text-lg">출신 고등학교 정보를 입력해주세요.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="highschool-name" className="text-lg mb-3 block">고등학교명</Label>
            <Input 
              id="highschool-name"
              placeholder="예: 서울고등학교"
              value={formData.highSchool.name}
              onChange={(e) => updateFormData('highSchool', { name: e.target.value })}
              className="h-14 text-lg"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="highschool-location" className="text-lg mb-3 block">지역</Label>
              <Select onValueChange={(value) => updateFormData('highSchool', { location: value })}>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seoul">서울특별시</SelectItem>
                  <SelectItem value="busan">부산광역시</SelectItem>
                  <SelectItem value="daegu">대구광역시</SelectItem>
                  <SelectItem value="incheon">인천광역시</SelectItem>
                  <SelectItem value="gwangju">광주광역시</SelectItem>
                  <SelectItem value="daejeon">대전광역시</SelectItem>
                  <SelectItem value="ulsan">울산광역시</SelectItem>
                  <SelectItem value="gyeonggi">경기도</SelectItem>
                  <SelectItem value="gangwon">강원도</SelectItem>
                  <SelectItem value="chungbuk">충청북도</SelectItem>
                  <SelectItem value="chungnam">충청남도</SelectItem>
                  <SelectItem value="jeonbuk">전라북도</SelectItem>
                  <SelectItem value="jeonnam">전라남도</SelectItem>
                  <SelectItem value="gyeongbuk">경상북도</SelectItem>
                  <SelectItem value="gyeongnam">경상남도</SelectItem>
                  <SelectItem value="jeju">제주특별자치도</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="graduation-year" className="text-lg mb-3 block">졸업년도</Label>
              <Input 
                id="graduation-year"
                type="number"
                placeholder="2020"
                value={formData.highSchool.graduationYear}
                onChange={(e) => updateFormData('highSchool', { graduationYear: e.target.value })}
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="gpa" className="text-lg mb-4 block">평균내신</Label>
            <Input
              id="gpa"
              type="text"
              placeholder="예: 2.5"
              value={formData.highSchool.gpa || ''}
              onChange={(e) => updateFormData('highSchool', { gpa: e.target.value })}
              className="h-14 text-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUniversityStep = () => (
    <div className="space-y-8">
      {/* 문서 업로드 섹션 */}
      <Card className="border-2 border-purple-200 bg-purple-50/50">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">재학/졸업 증명서 업로드</CardTitle>
          <p className="text-purple-700">
            대학교 재학증명서나 졸업증명서, 성적증명서를 업로드하세요
          </p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center hover:border-purple-400 transition-colors bg-white">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h3 className="text-xl mb-4">대학교 관련 서류 업로드</h3>
            <p className="text-gray-600 mb-6 text-lg">
              재학증명서, 졸업증명서, 성적증명서 등을 업로드하세요
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              id="university-file-upload"
            />
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <label htmlFor="university-file-upload" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-3" />
                파일 선택하기
              </label>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              또는 아래에서 직접 입력할 수 있습니다
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 직접 입력 섹션 */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Edit className="w-6 h-6 mr-3" />
            대학교 정보 직접 입력
          </CardTitle>
          <p className="text-gray-600 text-lg">대학교/대학원 정보를 입력해주세요.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="university-name" className="text-lg mb-3 block">대학교명</Label>
            <Input 
              id="university-name"
              placeholder="예: 서울대학교"
              value={formData.university.name}
              onChange={(e) => updateFormData('university', { name: e.target.value })}
              className="h-14 text-lg"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="major" className="text-lg mb-3 block">전공</Label>
              <Input 
                id="major"
                placeholder="예: 컴퓨터공학과"
                value={formData.university.major}
                onChange={(e) => updateFormData('university', { major: e.target.value })}
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label className="text-lg mb-3 block">학위과정</Label>
              <Select onValueChange={(value) => updateFormData('university', { degree: value })}>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="학위 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">학사</SelectItem>
                  <SelectItem value="master">석사</SelectItem>
                  <SelectItem value="phd">박사</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label className="text-lg mb-3 block">재학상태</Label>
              <Select onValueChange={(value) => updateFormData('university', { status: value })}>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enrolled">재학중</SelectItem>
                  <SelectItem value="graduated">졸업</SelectItem>
                  <SelectItem value="leave">휴학</SelectItem>
                  <SelectItem value="dropout">중퇴</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year" className="text-lg mb-3 block">학년/졸업년도</Label>
              <Input 
                id="year"
                placeholder="3학년 또는 2024"
                value={formData.university.year}
                onChange={(e) => updateFormData('university', { year: e.target.value })}
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="gpa" className="text-lg mb-3 block">학점 (선택)</Label>
              <Input 
                id="gpa"
                placeholder="3.8/4.5"
                value={formData.university.gpa}
                onChange={(e) => updateFormData('university', { gpa: e.target.value })}
                className="h-14 text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMilitaryStep = () => (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Shield className="w-6 h-6 mr-3" />
          군복무 정보
        </CardTitle>
        <p className="text-gray-600 text-lg">군복무 정보를 입력해주세요.</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <Label className="text-lg mb-4 block">복무상태</Label>
          <RadioGroup 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            onValueChange={(value) => updateFormData('military', { status: value })}
          >
            <div className="flex items-center space-x-3 p-6 border-2 rounded-xl hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed" className="text-lg cursor-pointer">군필</Label>
            </div>
            <div className="flex items-center space-x-3 p-6 border-2 rounded-xl hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="exempted" id="exempted" />
              <Label htmlFor="exempted" className="text-lg cursor-pointer">면제</Label>
            </div>
            <div className="flex items-center space-x-3 p-6 border-2 rounded-xl hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="serving" id="serving" />
              <Label htmlFor="serving" className="text-lg cursor-pointer">복무중</Label>
            </div>
            <div className="flex items-center space-x-3 p-6 border-2 rounded-xl hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="text-lg cursor-pointer">미필</Label>
            </div>
          </RadioGroup>
        </div>
        
        {(formData.military.status === 'completed' || formData.military.status === 'serving') && (
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold">상세 정보</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg mb-3 block">군종</Label>
                <Select onValueChange={(value) => updateFormData('military', { branch: value })}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="군종 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="army">육군</SelectItem>
                    <SelectItem value="navy">해군</SelectItem>
                    <SelectItem value="airforce">공군</SelectItem>
                    <SelectItem value="marines">해병대</SelectItem>
                    <SelectItem value="alternative">대체복무</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rank" className="text-lg mb-3 block">계급 (전역시)</Label>
                <Input 
                  id="rank"
                  placeholder="예: 병장"
                  value={formData.military.rank}
                  onChange={(e) => updateFormData('military', { rank: e.target.value })}
                  className="h-14 text-lg"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="period" className="text-lg mb-3 block">복무기간</Label>
                <Input 
                  id="period"
                  placeholder="예: 2020.03 ~ 2021.12"
                  value={formData.military.period}
                  onChange={(e) => updateFormData('military', { period: e.target.value })}
                  className="h-14 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="specialty" className="text-lg mb-3 block">특기 (선택)</Label>
                <Input 
                  id="specialty"
                  placeholder="예: 정보통신"
                  value={formData.military.specialty}
                  onChange={(e) => updateFormData('military', { specialty: e.target.value })}
                  className="h-14 text-lg"
                />
              </div>
            </div>
          </div>
        )}
        
        {formData.military.status === 'exempted' && (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">병역 면제</h3>
                <p className="text-blue-700">병역 면제 대상자로 확인되었습니다.</p>
              </div>
            </div>
          </div>
        )}
        
        {formData.military.status === 'pending' && (
          <div className="p-6 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900">미필</h3>
                <p className="text-orange-700">추후 군복무 예정입니다.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderCertificateStep = () => (
    <div className="space-y-8">
      {/* 헤더 */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">자격증 등록</CardTitle>
          <p className="text-green-700 text-lg">
            보유하신 자격증을 등록해주세요. AI가 자동으로 정보를 인식합니다.
          </p>
        </CardHeader>
      </Card>

      {/* Upload Area */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Scan className="w-6 h-6 mr-3" />
            자격증 파일 업로드 (AI 자동 인식)
          </CardTitle>
          <p className="text-gray-600 text-lg">자격증 사본을 업로드하면 AI가 자동으로 정보를 인식합니다.</p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center hover:border-green-400 transition-colors bg-green-50/30">
            <FileImage className="w-16 h-16 mx-auto mb-6 text-green-400" />
            <h3 className="text-xl mb-4">자격증 파일 업로드</h3>
            <p className="text-gray-600 mb-6 text-lg">
              JPG, PNG, PDF 파일을 드래그하거나 클릭하여 업로드하세요
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              id="cert-file-upload"
            />
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <label htmlFor="cert-file-upload" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-3" />
                자격증 선택하기
              </label>
            </Button>
            <div className="mt-6 text-sm text-gray-500">
              <p>지원 파일 형식: JPG, PNG, PDF</p>
              <p>최대 파일 크기: 10MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Input */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Edit className="w-6 h-6 mr-3" />
            자격증 정보 직접 입력
          </CardTitle>
          <p className="text-gray-600 text-lg">파일 업로드가 어려운 경우 직접 입력할 수 있습니다.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cert-name" className="text-lg mb-3 block">자격증명</Label>
              <Input 
                id="cert-name" 
                placeholder="예: 정보처리기사" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="cert-issuer" className="text-lg mb-3 block">발급기관</Label>
              <Input 
                id="cert-issuer" 
                placeholder="예: 한국산업인력공단" 
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cert-date" className="text-lg mb-3 block">취득일</Label>
              <Input 
                id="cert-date" 
                type="date" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="cert-score" className="text-lg mb-3 block">점수/등급 (선택)</Label>
              <Input 
                id="cert-score" 
                placeholder="90점 또는 1급" 
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cert-number" className="text-lg mb-3 block">자격증 번호 (선택)</Label>
            <Input 
              id="cert-number" 
              placeholder="자격증 번호" 
              className="h-14 text-lg"
            />
          </div>
          <Button size="lg" className="w-full py-4 text-lg">
            <CheckCircle className="w-5 h-5 mr-3" />
            자격증 추가하기
          </Button>
        </CardContent>
      </Card>

      {/* 추가된 자격증 목록 */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">등록된 자격증</CardTitle>
          <p className="text-gray-600">현재까지 등록된 자격증 목록입니다.</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">아직 등록된 자격증이 없습니다.</p>
            <p>위에서 자격증을 추가해보세요.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExperienceStep = () => (
    <div className="space-y-8">
      {/* 헤더 */}
      <Card className="border-2 border-orange-200 bg-orange-50/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">경력/인턴십 정보</CardTitle>
          <p className="text-orange-700 text-lg">
            인턴십 경험 및 업무 경력을 입력해주세요. 없다면 건너뛰셔도 됩니다.
          </p>
        </CardHeader>
      </Card>

      {/* 인턴십 정보 */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <User className="w-6 h-6 mr-3" />
            인턴십 경험
          </CardTitle>
          <p className="text-gray-600 text-lg">인턴십 경험이 있다면 입력해주세요.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="intern-company" className="text-lg mb-3 block">회사명</Label>
              <Input 
                id="intern-company" 
                placeholder="예: 삼성전자" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="intern-position" className="text-lg mb-3 block">직무/부서</Label>
              <Input 
                id="intern-position" 
                placeholder="예: SW개발팀" 
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="intern-period" className="text-lg mb-3 block">인턴 기간</Label>
              <Input 
                id="intern-period" 
                placeholder="예: 2023.06 ~ 2023.08" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label className="text-lg mb-3 block">인턴 유형</Label>
              <Select>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">하계 인턴</SelectItem>
                  <SelectItem value="winter">동계 인턴</SelectItem>
                  <SelectItem value="regular">정규 인턴</SelectItem>
                  <SelectItem value="parttime">파트타임</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="intern-description" className="text-lg mb-3 block">주요 업무 (선택)</Label>
            <Textarea 
              id="intern-description" 
              placeholder="인턴십에서 수행한 주요 업무나 프로젝트를 간단히 설명해주세요"
              rows={4}
              className="text-lg resize-none"
            />
          </div>
          <Button size="lg" variant="outline" className="w-full py-4 text-lg">
            <CheckCircle className="w-5 h-5 mr-3" />
            인턴십 추가하기
          </Button>
        </CardContent>
      </Card>

      {/* 경력 정보 */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Briefcase className="w-6 h-6 mr-3" />
            업무 경력
          </CardTitle>
          <p className="text-gray-600 text-lg">업무 경력이 있다면 입력해주세요.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="work-company" className="text-lg mb-3 block">회사명</Label>
              <Input 
                id="work-company" 
                placeholder="예: 네이버" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="work-position" className="text-lg mb-3 block">직급/직책</Label>
              <Input 
                id="work-position" 
                placeholder="예: 주니어 개발자" 
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="work-department" className="text-lg mb-3 block">부서</Label>
              <Input 
                id="work-department" 
                placeholder="예: 플랫폼개발팀" 
                className="h-14 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="work-period" className="text-lg mb-3 block">재직 기간</Label>
              <Input 
                id="work-period" 
                placeholder="예: 2022.03 ~ 현재" 
                className="h-14 text-lg"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="work-description" className="text-lg mb-3 block">주요 업무 (선택)</Label>
            <Textarea 
              id="work-description" 
              placeholder="담당했던 주요 업무나 프로젝트를 간단히 설명해주세요"
              rows={4}
              className="text-lg resize-none"
            />
          </div>
          <Button size="lg" variant="outline" className="w-full py-4 text-lg">
            <CheckCircle className="w-5 h-5 mr-3" />
            경력 추가하기
          </Button>
        </CardContent>
      </Card>

      {/* 추가된 경력 목록 */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">등록된 경력 정보</CardTitle>
          <p className="text-gray-600">현재까지 등록된 인턴십 및 경력 목록입니다.</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">아직 등록된 경력이 없습니다.</p>
            <p>위에서 인턴십이나 경력을 추가해보세요.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderHighSchoolStep();
      case 1:
        return renderUniversityStep();
      case 2:
        return renderMilitaryStep();
      case 3:
        return renderCertificateStep();
      case 4:
        return renderExperienceStep();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-xl p-8 border-2 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">프로필 정보 입력</h1>
          <Badge variant="outline" className="px-4 py-2 text-lg">
            {currentStep + 1} / {steps.length}
          </Badge>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className="flex flex-col items-center space-y-3 group cursor-pointer transition-all hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' 
                    : 'border-gray-300 text-gray-400 bg-white group-hover:border-blue-300 group-hover:bg-blue-50'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-sm font-semibold text-center ${
                  index === currentStep ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h2>
          <p className="text-gray-600 text-lg">{steps[currentStep].description}</p>
        </div>
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-8">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 0}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          이전 단계
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" size="lg" className="px-6 py-4 text-lg">
            임시저장
          </Button>
          {currentStep === steps.length - 1 ? (
            <>
              <Button 
                variant="outline" 
                onClick={nextStep} 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                넘어가기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                정보 입력 완료
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={nextStep} 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                넘어가기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button onClick={nextStep} size="lg" className="px-8 py-4 text-lg">
                다음 단계
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}