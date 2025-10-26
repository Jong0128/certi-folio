import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Award, 
  Calendar, 
  Search, 
  Filter,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Plus,
  ExternalLink,
  Clock,
  Upload,
  FileImage,
  Scan
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expiring-soon' | 'expired';
  score?: string;
  certificateNumber?: string;
  category: string;
  imageUrl?: string;
}

export default function MyCertificates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);

  const certificates: Certificate[] = [
    {
      id: '1',
      name: '정보처리기사',
      issuer: '한국산업인력공단',
      issueDate: '2023.06.15',
      status: 'active',
      certificateNumber: '23-01-123456',
      category: 'IT'
    },
    {
      id: '2',
      name: 'TOEIC',
      issuer: 'ETS',
      issueDate: '2023.08.20',
      expiryDate: '2025.08.20',
      status: 'active',
      score: '890점',
      category: '어학'
    },
    {
      id: '3',
      name: 'SQLD',
      issuer: '한국데이터진흥원',
      issueDate: '2023.12.10',
      status: 'active',
      certificateNumber: '2023-DB-00789',
      category: 'IT'
    },
    {
      id: '4',
      name: '컴퓨터활용능력 1급',
      issuer: '대한상공회의소',
      issueDate: '2022.05.15',
      expiryDate: '2024.11.30',
      status: 'expiring-soon',
      certificateNumber: 'KO22-01-9876',
      category: 'IT'
    },
    {
      id: '5',
      name: 'OPIc',
      issuer: 'ACTFL',
      issueDate: '2022.09.10',
      expiryDate: '2024.09.10',
      status: 'expired',
      score: 'IH (Intermediate High)',
      category: '어학'
    },
    {
      id: '6',
      name: '한국사능력검정시험',
      issuer: '국사편찬위원회',
      issueDate: '2023.03.20',
      status: 'active',
      score: '1급',
      category: '기타'
    }
  ];

  const categories = ['all', 'IT', '어학', '기타'];
  const statuses = ['all', 'active', 'expiring-soon', 'expired'];

  const statusConfig = {
    active: { label: '유효', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'expiring-soon': { label: '만료 임박', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
    expired: { label: '만료됨', color: 'bg-gray-100 text-gray-700', icon: Clock }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || cert.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    expiringSoon: certificates.filter(c => c.status === 'expiring-soon').length,
    expired: certificates.filter(c => c.status === 'expired').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">내 자격증</h1>
          <p className="text-gray-600 mt-1">보유한 자격증을 관리하고 확인하세요</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              자격증 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>자격증 추가</DialogTitle>
              <DialogDescription>
                증명서를 업로드하거나 직접 입력하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* 파일 업로드 섹션 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50">
                <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-gray-900 mb-2">자격증 사본 업로드</h3>
                <p className="text-gray-600 mb-4">
                  AI가 자동으로 정보를 인식합니다
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="cert-upload-file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setIsOcrProcessing(true);
                      setTimeout(() => {
                        setOcrData({
                          name: '정보처리기사',
                          issuer: '한국산업인력공단',
                          issueDate: '2023-06-15',
                          certificateNumber: '23-01-123456',
                          category: 'IT'
                        });
                        setIsOcrProcessing(false);
                      }, 2000);
                    }
                  }}
                />
                <Button asChild variant="outline">
                  <label htmlFor="cert-upload-file" className="cursor-pointer">
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

              {/* 직접 입력 폼 */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cert-name">자격증명</Label>
                    <Input 
                      id="cert-name"
                      placeholder="예: 정보처리기사"
                      value={ocrData?.name || ''}
                      onChange={(e) => setOcrData({ ...ocrData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cert-issuer">발급기관</Label>
                    <Input 
                      id="cert-issuer"
                      placeholder="예: 한국산업인력공단"
                      value={ocrData?.issuer || ''}
                      onChange={(e) => setOcrData({ ...ocrData, issuer: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cert-date">취득일</Label>
                    <Input 
                      id="cert-date"
                      type="date"
                      value={ocrData?.issueDate || ''}
                      onChange={(e) => setOcrData({ ...ocrData, issueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cert-expiry">유효기간 (선택)</Label>
                    <Input 
                      id="cert-expiry"
                      type="date"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cert-score">점수/등급 (선택)</Label>
                    <Input 
                      id="cert-score"
                      placeholder="예: 90점 또는 1급"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cert-category">분야</Label>
                    <Select
                      value={ocrData?.category || ''}
                      onValueChange={(value) => setOcrData({ ...ocrData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="분야 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="어학">어학</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cert-number">자격증 번호 (선택)</Label>
                  <Input 
                    id="cert-number"
                    placeholder="자격증 번호"
                    value={ocrData?.certificateNumber || ''}
                    onChange={(e) => setOcrData({ ...ocrData, certificateNumber: e.target.value })}
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
                <p className="text-gray-600">전체 자격증</p>
                <p className="text-gray-900 mt-1">{stats.total}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">유효</p>
                <p className="text-gray-900 mt-1">{stats.active}개</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">만료 임박</p>
                <p className="text-gray-900 mt-1">{stats.expiringSoon}개</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">만료됨</p>
                <p className="text-gray-900 mt-1">{stats.expired}개</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
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
                placeholder="자격증 또는 발급기관 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 분야</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="어학">어학</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="active">유효</SelectItem>
                <SelectItem value="expiring-soon">만료 임박</SelectItem>
                <SelectItem value="expired">만료됨</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredCertificates.map((cert) => {
          const StatusIcon = statusConfig[cert.status].icon;
          
          return (
            <Card key={cert.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-gray-900">{cert.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{cert.issuer}</p>
                  </div>
                  <Badge className={statusConfig[cert.status].color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig[cert.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>취득일</p>
                      <p className="text-gray-900">{cert.issueDate}</p>
                    </div>
                    {cert.expiryDate && (
                      <div>
                        <p className="text-gray-500" style={{ fontSize: '13px' }}>유효기간</p>
                        <p className="text-gray-900">{cert.expiryDate}</p>
                      </div>
                    )}
                  </div>

                  {cert.score && (
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>점수/등급</p>
                      <p className="text-gray-900">{cert.score}</p>
                    </div>
                  )}

                  {cert.certificateNumber && (
                    <div>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>자격증 번호</p>
                      <p className="text-gray-900 font-mono" style={{ fontSize: '14px' }}>
                        {cert.certificateNumber}
                      </p>
                    </div>
                  )}

                  <Badge variant="secondary">{cert.category}</Badge>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          상세보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{cert.name}</DialogTitle>
                          <DialogDescription>자격증 상세 정보</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <p className="text-gray-500 mb-1">발급기관</p>
                            <p className="text-gray-900">{cert.issuer}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">취득일</p>
                            <p className="text-gray-900">{cert.issueDate}</p>
                          </div>
                          {cert.expiryDate && (
                            <div>
                              <p className="text-gray-500 mb-1">유효기간</p>
                              <p className="text-gray-900">{cert.expiryDate}</p>
                            </div>
                          )}
                          {cert.score && (
                            <div>
                              <p className="text-gray-500 mb-1">점수/등급</p>
                              <p className="text-gray-900">{cert.score}</p>
                            </div>
                          )}
                          {cert.certificateNumber && (
                            <div>
                              <p className="text-gray-500 mb-1">자격증 번호</p>
                              <p className="text-gray-900 font-mono">{cert.certificateNumber}</p>
                            </div>
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
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">자격증이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              검색 조건을 변경하거나 새로운 자격증을 추가해보세요.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              자격증 추가
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
