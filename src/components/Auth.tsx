import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  Award, 
  Mail, 
  Lock, 
  User, 
  GraduationCap,
  Building,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

export default function Auth({ onLogin }: { onLogin: (userData: any) => void }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    university: '',
    major: '',
    year: '',
    interests: [],
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const universities = [
    '서울대학교', '연세대학교', '고려대학교', '성균관대학교', '한양대학교',
    '중앙대학교', '경희대학교', '서강대학교', '이화여자대학교', '홍익대학교',
    '건국대학교', '동국대학교', '국민대학교', '숭실대학교', '세종대학교'
  ];

  const majors = [
    '컴퓨터공학과', '컴퓨터과학과', '소프트웨어학과', '정보통신공학과',
    '전자공학과', '전기공학과', '기계공학과', '산업공학과', '경영학과',
    '경제학과', '수학과', '통계학과', '물리학과', '화학과', '기타'
  ];

  const interestOptions = [
    '백엔드 개발', '프론트엔드 개발', '풀스택 개발', 'AI/ML', '데이터 사이언스',
    '클라우드/DevOps', '모바일 개발', '게임 개발', 'UI/UX 디자인', '사이버보안',
    '블록체인', 'IoT', '임베디드', '네트워크', '데이터베이스'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = '이름을 입력해주세요.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = '이용약관에 동의해주세요.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: formData.name || '김민수',
        email: formData.email,
        university: formData.university || '서울대학교',
        major: formData.major || '컴퓨터공학과',
        year: formData.year || '3',
        interests: formData.interests.length > 0 ? formData.interests : ['백엔드 개발'],
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  const handleEmailVerification = () => {
    if (formData.email && formData.university) {
      // Simulate email verification
      setEmailVerified(true);
      setTimeout(() => {
        alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
      }, 500);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length < 4) return { strength: 'weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 'medium', color: 'bg-yellow-500' };
    return { strength: 'strong', color: 'bg-green-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Certi-Folio</h1>
          <p className="text-gray-600 mt-2">자격증 통합 관리 플랫폼</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {mode === 'login' ? '로그인' : '회원가입'}
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">
              {mode === 'login' 
                ? 'Certi-Folio에 오신 것을 환영합니다' 
                : '새로운 계정을 만들어 시작하세요'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@university.ac.kr"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                  {mode === 'signup' && formData.email && formData.university && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={handleEmailVerification}
                    >
                      {emailVerified ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        '인증'
                      )}
                    </Button>
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8자 이상 입력해주세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {mode === 'signup' && formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded">
                        <div 
                          className={`h-1 rounded transition-all ${getPasswordStrength().color}`}
                          style={{ width: formData.password.length < 4 ? '33%' : formData.password.length < 8 ? '66%' : '100%' }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 capitalize">
                        {getPasswordStrength().strength === 'weak' ? '약함' : 
                         getPasswordStrength().strength === 'medium' ? '보통' : '강함'}
                      </span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {mode === 'signup' && (
                <>
                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="name"
                        placeholder="실명을 입력해주세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* University and Major */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>학교</Label>
                      <Select value={formData.university} onValueChange={(value) => handleInputChange('university', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="학교 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni} value={uni}>
                              {uni}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.university && (
                        <p className="text-xs text-red-600">{errors.university}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>전공</Label>
                      <Select value={formData.major} onValueChange={(value) => handleInputChange('major', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="전공 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {majors.map((major) => (
                            <SelectItem key={major} value={major}>
                              {major}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.major && (
                        <p className="text-xs text-red-600">{errors.major}</p>
                      )}
                    </div>
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label>학년</Label>
                    <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="학년 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1학년</SelectItem>
                        <SelectItem value="2">2학년</SelectItem>
                        <SelectItem value="3">3학년</SelectItem>
                        <SelectItem value="4">4학년</SelectItem>
                        <SelectItem value="graduate">대학원생</SelectItem>
                        <SelectItem value="graduated">졸업생</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-sm text-red-600">{errors.year}</p>
                    )}
                  </div>

                  {/* Interests */}
                  <div className="space-y-2">
                    <Label>관심 분야 (최소 1개 선택)</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={() => handleInterestToggle(interest)}
                          />
                          <Label htmlFor={interest} className="text-sm cursor-pointer">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.interests}
                      </p>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      <span className="text-blue-600 underline">이용약관</span> 및 <span className="text-blue-600 underline">개인정보처리방침</span>에 동의합니다
                    </Label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.agreeTerms}
                    </p>
                  )}
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{mode === 'login' ? '로그인 중...' : '가입 중...'}</span>
                  </div>
                ) : (
                  mode === 'login' ? '로그인' : '회원가입'
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google로 {mode === 'login' ? '로그인' : '회원가입'}
                </Button>
                <Button variant="outline" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400" type="button">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.029 3 3 6.34 3 10.5c0 2.635 1.693 4.95 4.282 6.316L6.378 21l4.278-2.54c.444.08.903.123 1.377.123C16.971 18.583 21 15.243 21 11.086 21 6.929 16.971 3.589 12 3.589V3z"/>
                  </svg>
                  카카오로 {mode === 'login' ? '로그인' : '회원가입'}
                </Button>
              </div>
            </div>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
                <Button
                  variant="link"
                  className="ml-1 p-0 h-auto"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setErrors({});
                    setFormData({
                      email: '',
                      password: '',
                      confirmPassword: '',
                      name: '',
                      university: '',
                      major: '',
                      year: '',
                      interests: [],
                      agreeTerms: false
                    });
                  }}
                >
                  {mode === 'login' ? '회원가입' : '로그인'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 Certi-Folio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}