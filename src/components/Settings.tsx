import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  User,
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  Trash2,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Save,
  Check
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: '김민수',
    email: 'demo@example.com',
    phone: '010-1234-5678',
    location: '서울특별시 강남구',
    university: '서울대학교',
    major: '컴퓨터공학과',
    year: '3학년',
    company: 'ABC Corp (인턴)',
    bio: '백엔드 개발에 관심이 많은 컴퓨터공학과 학생입니다. Spring Boot와 React를 공부하고 있습니다.'
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    mentoring: true,
    study: true,
    certificate: true,
    jobRecommendation: true,
    systemUpdates: false,
    newsletter: true
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showCertificates: true,
    allowMessages: true,
    showActivity: true
  });

  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'ko',
    fontSize: 'medium'
  });

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('프로필이 성공적으로 저장되었습니다.');
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('알림 설정이 저장되었습니다.');
    }, 1000);
  };

  const handleSavePrivacy = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('개인정보 설정이 저장되었습니다.');
    }, 1000);
  };

  const handleSaveAppearance = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('환경 설정이 저장되었습니다.');
    }, 1000);
  };

  const handleDeleteAccount = () => {
    toast.error('계정 삭제 기능은 데모 모드에서 사용할 수 없습니다.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">설정</h1>
        <p className="text-gray-600">계정 및 환경 설정을 관리하세요</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            프로필
          </TabsTrigger>
          <TabsTrigger value="account">
            <Lock className="w-4 h-4 mr-2" />
            계정
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            알림
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="w-4 h-4 mr-2" />
            개인정보
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            환경
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>회원님의 공개 프로필 정보를 수정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
                  <AvatarFallback>김</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    사진 변경
                  </Button>
                  <p className="text-gray-500 mt-2" style={{ fontSize: '13px' }}>
                    JPG, PNG 파일 (최대 5MB)
                  </p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">위치</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              {/* Education & Career */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">대학교</Label>
                    <Input
                      id="university"
                      value={profileData.university}
                      onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">전공</Label>
                    <Input
                      id="major"
                      value={profileData.major}
                      onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">학년</Label>
                    <Select value={profileData.year} onValueChange={(value) => setProfileData({ ...profileData, year: value })}>
                      <SelectTrigger id="year">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1학년">1학년</SelectItem>
                        <SelectItem value="2학년">2학년</SelectItem>
                        <SelectItem value="3학년">3학년</SelectItem>
                        <SelectItem value="4학년">4학년</SelectItem>
                        <SelectItem value="졸업">졸업</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">현재 직장/인턴</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-input-background"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  {profileData.bio.length}/500
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>저장 중...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장하기
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>계정 보안</CardTitle>
              <CardDescription>비밀번호 및 보안 설정을 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">비밀번호 확인</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Lock className="w-4 h-4 mr-2" />
                  비밀번호 변경
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">계정 삭제</CardTitle>
              <CardDescription>계정을 영구적으로 삭제합니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    계정 삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>정말 계정을 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                      이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">이메일 알림</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      중요한 업데이트를 이메일로 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">푸시 알림</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <h4 className="text-gray-900">알림 종류</h4>

                <div className="space-y-3 pl-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mentoring-notif">멘토링 알림</Label>
                    <Switch
                      id="mentoring-notif"
                      checked={notificationSettings.mentoring}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, mentoring: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="study-notif">스터디/프로젝트 알림</Label>
                    <Switch
                      id="study-notif"
                      checked={notificationSettings.study}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, study: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="cert-notif">자격증 관련 알림</Label>
                    <Switch
                      id="cert-notif"
                      checked={notificationSettings.certificate}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, certificate: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="job-notif">기업 추천 알림</Label>
                    <Switch
                      id="job-notif"
                      checked={notificationSettings.jobRecommendation}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, jobRecommendation: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notif">시스템 업데이트</Label>
                    <Switch
                      id="system-notif"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="newsletter-notif">뉴스레터</Label>
                    <Switch
                      id="newsletter-notif"
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, newsletter: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} disabled={isSaving}>
                  {isSaving ? (
                    <>저장 중...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장하기
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>개인정보 보호</CardTitle>
              <CardDescription>공개 범위 및 개인정보를 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">프로필 공개</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      다른 사용자가 내 프로필을 볼 수 있습니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.profilePublic}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, profilePublic: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">이메일 공개</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      프로필에 이메일 주소를 표시합니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, showEmail: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">전화번호 공개</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      프로필에 전화번호를 표시합니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showPhone}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, showPhone: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">자격증 공개</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      다른 사용자가 내 자격증 목록을 볼 수 있습니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showCertificates}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, showCertificates: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">메시지 수신</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      다른 사용자로부터 메시지를 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowMessages}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, allowMessages: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">활동 내역 공개</p>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      최근 활동 내역을 프로필에 표시합니다
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, showActivity: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePrivacy} disabled={isSaving}>
                  {isSaving ? (
                    <>저장 중...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장하기
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>데이터 다운로드</CardTitle>
              <CardDescription>내 데이터 사본을 다운로드하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Certi-Folio에 저장된 모든 데이터를 다운로드할 수 있습니다.
              </p>
              <Button variant="outline">
                데이터 다운로드 요청
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>환경 설정</CardTitle>
              <CardDescription>앱 외형 및 언어를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">테마</Label>
                  <Select value={appearanceSettings.theme} onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, theme: value })}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">라이트 모드</SelectItem>
                      <SelectItem value="dark">다크 모드</SelectItem>
                      <SelectItem value="system">시스템 설정 따라가기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAppearance} disabled={isSaving}>
                  {isSaving ? (
                    <>저장 중...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장하기
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
