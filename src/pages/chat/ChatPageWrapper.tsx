import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ChatPage from "@/pages/chat/ChatPage";
import { axiosInstance } from "@/apis/axios-instance";

interface UserMeResponse {
  pkId: number;
  id: string;
  email: string;
  nickname: string | null;
  provider: string;
}

export default function ChatPageWrapper() {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<UserMeResponse>("/api/me");

      if (response.data && response.data.pkId) {
        setUserId(response.data.pkId);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("에러:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>사용자 정보 확인 중...</p>
        </div>
      </div>
    );
  }

  if (error || userId === null) {
    return <Navigate to='/auth/signin' replace />;
  }

  return <ChatPage currentUserId={Number(userId)} />;
}
