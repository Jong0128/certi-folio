import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Plus,
  Pin,
  MessageCircle,
  Bookmark,
  Share2,
  MoreVertical,
  Send
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    university: string;
    major: string;
    profileImage?: string;
  };
  category: string;
  tags: string[];
  isPinned?: boolean;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export default function Board() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  
  // Dialog state
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
  
  // New post form
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: '',
    category: '취업 정보',
    tags: ''
  });

  const posts: Post[] = [
    {
      id: '1',
      title: '취업 준비하시는 분들께 도움이 되었으면 하는 이야기',
      content: '안녕하세요! 작년에 네이버에 입사한 개발자입니다. 제가 취준할 때 도움이 되었던 것들을 공유하고자 합니다...',
      author: {
        name: '김준영',
        university: '서울대학교',
        major: '컴퓨터공학과',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      category: '취업 정보',
      tags: ['취업', '면접', '포트폴리오'],
      isPinned: true,
      stats: {
        views: 1247,
        likes: 156,
        comments: 43
      },
      timestamp: '2시간 전',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '2',
      title: '정보처리기사 실기 합격 후기 및 공부 방법',
      content: '이번에 정보처리기사 실기 시험에 합격했습니다! 제가 공부했던 방법과 팁을 공유합니다.',
      author: {
        name: '이서연',
        university: '연세대학교',
        major: '소프트웨어학과',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
      },
      category: '자격증',
      tags: ['정보처리기사', '실기', '합격후기'],
      stats: {
        views: 892,
        likes: 98,
        comments: 27
      },
      timestamp: '5시간 전',
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '3',
      title: '카카오 코딩테스트 준비 어떻게 하셨나요?',
      content: '다음 달에 카카오 코딩테스트가 있는데, 어떤 문제 유형을 주로 준비하면 좋을까요?',
      author: {
        name: '박민수',
        university: '고려대학교',
        major: '컴퓨터학과'
      },
      category: '질문',
      tags: ['카카오', '코딩테스트', '알고리즘'],
      stats: {
        views: 534,
        likes: 42,
        comments: 15
      },
      timestamp: '1일 전'
    },
    {
      id: '4',
      title: 'React 공부하면서 만든 토이 프로젝트 피드백 부탁드립니다',
      content: 'React와 TypeScript를 사용해서 간단한 투두리스트 앱을 만들어봤는데, 코드 리뷰 부탁드립니다!',
      author: {
        name: '최지우',
        university: '성균관대학교',
        major: '소프트웨어학과',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      category: '프로젝트',
      tags: ['React', 'TypeScript', '코드리뷰'],
      stats: {
        views: 423,
        likes: 38,
        comments: 12
      },
      timestamp: '1일 전'
    },
    {
      id: '5',
      title: '부트캠프 vs 독학, 어떤 게 더 나을까요?',
      content: '개발자로 전직을 준비 중인데, 부트캠프를 다니는 게 나을지 독학으로 공부하는 게 나을지 고민입니다.',
      author: {
        name: '정현우',
        university: '한양대학교',
        major: '경영학과'
      },
      category: '커리어',
      tags: ['부트캠프', '독학', '커리어전환'],
      stats: {
        views: 678,
        likes: 54,
        comments: 31
      },
      timestamp: '2일 전'
    },
    {
      id: '6',
      title: 'AWS 자격증 공부 자료 공유합니다',
      content: 'AWS Solutions Architect Associate 자격증 준비하시는 분들을 위해 제가 사용한 자료들을 공유합니다.',
      author: {
        name: '강민지',
        university: '이화여대',
        major: '컴퓨터공학과',
        profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
      },
      category: '자격증',
      tags: ['AWS', 'SAA', '자료공유'],
      isPinned: true,
      stats: {
        views: 1156,
        likes: 142,
        comments: 38
      },
      timestamp: '3일 전',
      isBookmarked: false
    }
  ];

  const categories = ['all', '취업 정보', '자격증', '질문', '프로젝트', '커리어', '기타'];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.stats.likes - a.stats.likes;
      } else if (sortBy === 'comments') {
        return b.stats.comments - a.stats.comments;
      }
      return 0; // latest (default order)
    });

  const pinnedPosts = filteredPosts.filter(p => p.isPinned);
  const regularPosts = filteredPosts.filter(p => !p.isPinned);

  const stats = {
    totalPosts: posts.length,
    todayPosts: posts.filter(p => p.timestamp.includes('시간 전')).length,
    totalViews: posts.reduce((acc, p) => acc + p.stats.views, 0),
    activeUsers: 234
  };
  
  // Handler
  const handleNewPostSubmit = () => {
    if (!newPostForm.title || !newPostForm.content) {
      toast.error('제목과 내용을 입력해주세요');
      return;
    }
    toast.success('게시글이 작성되었습니다!');
    setNewPostDialogOpen(false);
    setNewPostForm({ title: '', content: '', category: '취업 정보', tags: '' });
  };

  return (
    <div className="space-y-6">
      {/* New Post Dialog */}
      <Dialog open={newPostDialogOpen} onOpenChange={setNewPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>새 게시글 작성</DialogTitle>
            <DialogDescription>
              커뮤니티에 공유하고 싶은 내용을 작성하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">제목 *</Label>
              <Input
                id="post-title"
                placeholder="게시글 제목을 입력하세요"
                value={newPostForm.title}
                onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-category">카테고리</Label>
              <Select
                value={newPostForm.category}
                onValueChange={(value) => setNewPostForm({ ...newPostForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="취업 정보">취업 정보</SelectItem>
                  <SelectItem value="자격증">자격증</SelectItem>
                  <SelectItem value="질문">질문</SelectItem>
                  <SelectItem value="프로젝트">프로젝트</SelectItem>
                  <SelectItem value="커리어">커리어</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">내용 *</Label>
              <Textarea
                id="post-content"
                placeholder="게시글 내용을 입력하세요"
                rows={8}
                value={newPostForm.content}
                onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-tags">태그</Label>
              <Input
                id="post-tags"
                placeholder="쉼표로 구분하여 입력 (예: 취업, 면접, 포트폴리오)"
                value={newPostForm.tags}
                onChange={(e) => setNewPostForm({ ...newPostForm, tags: e.target.value })}
              />
              <p className="text-gray-500" style={{ fontSize: '12px' }}>
                관련 태그를 입력하면 다른 사용자들이 쉽게 찾을 수 있습니다.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPostDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleNewPostSubmit}>
              <Send className="w-4 h-4 mr-2" />
              작성하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">자유 게시판</h1>
          <p className="text-gray-600 mt-1">자유롭게 정보를 공유하고 소통하세요</p>
        </div>
        <Button onClick={() => setNewPostDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          글 작성
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">전체 게시글</p>
                <p className="text-gray-900 mt-1">{stats.totalPosts}개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">오늘 작성</p>
                <p className="text-gray-900 mt-1">{stats.todayPosts}개</p>
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
                <p className="text-gray-600">총 조회수</p>
                <p className="text-gray-900 mt-1">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">활성 사용자</p>
                <p className="text-gray-900 mt-1">{stats.activeUsers}명</p>
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
                placeholder="제목, 내용, 태그로 검색..."
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
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? '전체 카테고리' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="comments">댓글순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Pin className="w-4 h-4 text-blue-600" />
            <h3 className="text-gray-900">공지사항</h3>
          </div>
          {pinnedPosts.map((post) => (
            <Card key={post.id} className="border-blue-200 bg-blue-50/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Pin className="w-4 h-4 text-blue-600" />
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="text-gray-900 mb-2 cursor-pointer hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.author.profileImage} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>
                          {post.author.name}
                        </span>
                        <span className="text-gray-400" style={{ fontSize: '13px' }}>
                          {post.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <Eye className="w-4 h-4 mr-1" />
                          {post.stats.views}
                        </span>
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.stats.likes}
                        </span>
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.stats.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Regular Posts */}
      <div className="space-y-3">
        {regularPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-gray-900 mb-2 cursor-pointer hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author.profileImage} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600" style={{ fontSize: '14px' }}>
                        {post.author.name}
                      </span>
                      <span className="text-gray-400" style={{ fontSize: '13px' }}>
                        {post.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <Eye className="w-4 h-4 mr-1" />
                          {post.stats.views}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={likedPosts.includes(post.id) ? 'text-blue-600' : 'text-gray-500'}
                          onClick={() => {
                            if (likedPosts.includes(post.id)) {
                              setLikedPosts(likedPosts.filter(id => id !== post.id));
                              toast.success('좋아요를 취소했습니다');
                            } else {
                              setLikedPosts([...likedPosts, post.id]);
                              toast.success('좋아요를 눌렀습니다');
                            }
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-blue-600' : ''}`} />
                          {post.stats.likes}
                        </Button>
                        <span className="flex items-center" style={{ fontSize: '14px' }}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.stats.comments}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (bookmarkedPosts.includes(post.id)) {
                            setBookmarkedPosts(bookmarkedPosts.filter(id => id !== post.id));
                            toast.success('북마크를 해제했습니다');
                          } else {
                            setBookmarkedPosts([...bookmarkedPosts, post.id]);
                            toast.success('북마크에 저장했습니다');
                          }
                        }}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedPosts.includes(post.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toast.success('공유 기능은 준비 중입니다')}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">게시글이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              검색 조건을 변경하거나 새 글을 작성해보세요.
            </p>
            <Button onClick={() => setNewPostDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              글 작성
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
