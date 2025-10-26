import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  X,
  Star,
  MessageCircle,
  Calendar,
  MapPin,
  Building,
  Award,
  Users,
  Clock,
  CheckCircle2,
  ThumbsUp,
  BookOpen,
  TrendingUp,
  Mail,
  Phone,
  Video,
  Heart,
  Share2,
} from "lucide-react";

interface MentorProfileProps {
  mentor: {
    id: number;
    name: string;
    title: string;
    company: string;
    experience: string;
    rating: number;
    reviews: number;
    skills: string[];
    location: string;
    price: string;
    image: string;
    verified: boolean;
    description: string;
  };
  onClose: () => void;
  onStartChat: () => void;
}

export default function MentorProfile({
  mentor,
  onClose,
  onStartChat,
}: MentorProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data for detailed profile
  const mentorDetails = {
    bio: `${mentor.company}에서 ${mentor.experience} 동안 ${mentor.title}로 근무하고 있습니다. 대규모 서비스 개발과 팀 리딩 경험을 바탕으로 후배 개발자들에게 실무적인 조언을 제공하고 있습니다.`,
    education: [
      {
        degree: "컴퓨터공학 석사",
        school: "서울대학교",
        year: "2015-2017",
      },
      {
        degree: "컴퓨터공학 학사",
        school: "연세대학교",
        year: "2011-2015",
      },
    ],
    career: [
      {
        position: "시니어 백엔드 개발자",
        company: "네이버",
        period: "2020-현재",
        description: "검색 서비스 백엔드 개발 및 아키텍처 설계",
      },
      {
        position: "백엔드 개발자",
        company: "카카오",
        period: "2018-2020",
        description: "메시징 서비스 백엔드 개발",
      },
      {
        position: "주니어 개발자",
        company: "스타트업 A",
        period: "2017-2018",
        description: "웹 서비스 풀스택 개발",
      },
    ],
    achievements: [
      "네이버 우수사원상 수상 (2022)",
      "오픈소스 프로젝트 1000+ star 달성",
      "기술 블로그 누적 조회수 50만+",
      "컨퍼런스 발표 5회+",
    ],
    specialties: [
      { name: "Java/Spring Boot", level: 95 },
      { name: "AWS/클라우드", level: 90 },
      { name: "시스템 아키텍처", level: 88 },
      { name: "DevOps", level: 85 },
      { name: "MSA 설계", level: 82 },
    ],
    availableSlots: [
      {
        date: "2024-10-15",
        time: "14:00-15:00",
        type: "화상미팅",
      },
      {
        date: "2024-10-16",
        time: "19:00-20:00",
        type: "화상미팅",
      },
      {
        date: "2024-10-17",
        time: "10:00-11:00",
        type: "오프라인",
      },
      {
        date: "2024-10-18",
        time: "16:00-17:00",
        type: "화상미팅",
      },
    ],
    reviews: [
      {
        id: 1,
        reviewer: "이민수",
        rating: 5,
        date: "2024-09-28",
        content:
          "정말 친절하고 자세하게 설명해 주셔서 많은 도움이 되었습니다. 백엔드 개발 로드맵에 대해 구체적인 방향을 잡을 수 있었어요.",
        helpful: 12,
      },
      {
        id: 2,
        reviewer: "박지영",
        rating: 5,
        date: "2024-09-25",
        content:
          "실무 경험을 바탕으로 한 조언이 정말 유용했습니다. 포트폴리오 피드백도 꼼꼼하게 해주셔서 감사했어요.",
        helpful: 8,
      },
      {
        id: 3,
        reviewer: "김태현",
        rating: 4,
        date: "2024-09-20",
        content:
          "시스템 설계에 대한 깊이 있는 설명을 들을 수 있어서 좋았습니다. 다만 시간이 조금 더 있었으면 하는 아쉬움이 있네요.",
        helpful: 5,
      },
    ],
    responseStats: {
      averageResponseTime: "2시간",
      responseRate: "98%",
      totalMentoring: 127,
      repeatRate: "85%",
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Profile Header */}
        <CardHeader className="border-b relative">
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 pr-12">
            <Avatar className="w-24 h-24 mx-auto md:mx-0">
              <AvatarImage src={mentor.image} />
              <AvatarFallback className="text-lg">
                {mentor.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-2xl">{mentor.name}</h1>
                {mentor.verified && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                )}
              </div>

              <p className="text-lg text-gray-600 mb-1">
                {mentor.title}
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{mentor.company}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{mentor.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>경력 {mentor.experience}</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {mentor.rating}
                  </span>
                  <span className="text-gray-500">
                    ({mentor.reviews}개 리뷰)
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">
                    {mentorDetails.responseStats.totalMentoring}
                    회 멘토링
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {mentor.skills
                  .slice(0, 5)
                  .map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                {mentor.skills.length > 5 && (
                  <Badge variant="outline">
                    +{mentor.skills.length - 5}
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 mb-4">
                {mentorDetails.bio}
              </p>
            </div>

            <div className="flex flex-col space-y-2 md:min-w-[200px]">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl text-blue-600">
                  {mentor.price}
                </p>
                <p className="text-sm text-gray-600">
                  1시간 기준
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={onStartChat}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  상담 신청
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Heart
                    className={`w-4 h-4 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Profile Content */}
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="experience">경력</TabsTrigger>
              <TabsTrigger value="reviews">리뷰</TabsTrigger>
              <TabsTrigger value="schedule">스케줄</TabsTrigger>
              <TabsTrigger value="stats">통계</TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="space-y-6 mt-6"
            >
              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>전문 분야</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorDetails.specialties.map(
                      (specialty, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">
                              {specialty.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {specialty.level}%
                            </span>
                          </div>
                          <Progress
                            value={specialty.level}
                            className="h-2"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>주요 성과</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {mentorDetails.achievements.map(
                      (achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">
                            {achievement}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="experience"
              className="space-y-6 mt-6"
            >
              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>학력</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorDetails.education.map(
                      (edu, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-blue-200 pl-4"
                        >
                          <h4 className="font-medium">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-600">
                            {edu.school}
                          </p>
                          <p className="text-sm text-gray-500">
                            {edu.year}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Career */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>경력</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentorDetails.career.map((job, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-gray-200 pl-4 relative"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full" />
                        <h4 className="font-medium">
                          {job.position}
                        </h4>
                        <p className="text-blue-600">
                          {job.company}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {job.period}
                        </p>
                        <p className="text-sm text-gray-700">
                          {job.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="reviews"
              className="space-y-4 mt-6"
            >
              {mentorDetails.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {review.reviewer[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {review.reviewer}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ),
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {review.content}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        도움됨 {review.helpful}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>예약 가능한 시간</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mentorDetails.availableSlots.map(
                      (slot, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">
                                {slot.date}
                              </span>
                            </div>
                            <Badge
                              variant={
                                slot.type === "오프라인"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {slot.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{slot.time}</span>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-3"
                          >
                            예약하기
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>응답 통계</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>평균 응답 시간</span>
                        <span className="font-medium text-blue-600">
                          {
                            mentorDetails.responseStats
                              .averageResponseTime
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>응답률</span>
                        <span className="font-medium text-green-600">
                          {
                            mentorDetails.responseStats
                              .responseRate
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 멘토링 횟수</span>
                        <span className="font-medium">
                          {
                            mentorDetails.responseStats
                              .totalMentoring
                          }
                          회
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>재예약률</span>
                        <span className="font-medium text-purple-600">
                          {
                            mentorDetails.responseStats
                              .repeatRate
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>평점 분포</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage =
                          stars === 5
                            ? 75
                            : stars === 4
                              ? 20
                              : 5;
                        return (
                          <div
                            key={stars}
                            className="flex items-center space-x-3"
                          >
                            <div className="flex items-center space-x-1 w-12">
                              <span className="text-sm">
                                {stars}
                              </span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                            <Progress
                              value={percentage}
                              className="flex-1 h-2"
                            />
                            <span className="text-sm text-gray-600 w-8">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}