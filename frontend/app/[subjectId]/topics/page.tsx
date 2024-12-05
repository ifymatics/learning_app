"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { requestConfig } from "@/services/axios";
import Topic from "@/app/topic/topicLayout";
import { useRouter } from "next/navigation";
import "./page.scss";

export type Topic = {
  title: string;
  video: string;
  description: string;
  id: number;
  subjectId: number;
  isCompleted: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopicsPage = ({ params }: any) => {
  console.log(params);
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/")[1];
  const [, setIsLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const url = `/api/topics/subject/${id}`;

      try {
        setIsLoading(true);
        const { data } = await requestConfig.get(url);

        setTopics(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, [id]);
  const onNavigate = (topicId: number, isCompleted: boolean) => {
    const params = new URLSearchParams();
    params.set("count", String(topics.length));
    params.set("status", String(isCompleted));
    router.push(`topics/${topicId}?${params.toString()}`);
  };
  return (
    <div>
      <h2
        style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}
      >
        Topics
      </h2>
      {Array.isArray(topics) &&
        topics?.map((topic, index) => (
          <div
            className="topicTitle"
            key={topic.id}
            onClick={() => onNavigate(topic.id, topic.isCompleted)}
          >
            {index + 1}. <div>{topic.title}</div>
          </div>
        ))}
    </div>
  );
};

export default TopicsPage;
