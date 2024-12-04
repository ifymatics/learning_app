/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState, useContext, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { requestConfig } from "@/services/axios";
import TopicLayout from "@/app/topic/topicLayout";
import { AuthContext } from "./../../../../auth.context";
import { Topic } from "../page";
import Loader from "@/app/components/Loader/Loader";

const TopicPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentUser } = useContext(AuthContext);
  const ids = pathname.split("/");
  const topicsCount = searchParams.get("count");
  const isCompleted = searchParams.get("status");

  const subjectId = ids[1];
  const topicId = ids[3];

  const [completed, setCompleted] = useState(isCompleted);
  const [isLoading, setIsLoading] = useState(false);

  const [topic, setTopic] = useState<Topic>({} as Topic);

  useEffect(() => {
    const fetchTopic = async () => {
      const url = `/api/topics/${topicId}?subjectId=${subjectId}`;

      try {
        setIsLoading(true);
        const { data } = await requestConfig.get(url);

        setTopic(data);
      } catch (error: unknown) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopic();
  }, [topicId, subjectId]);

  const handleCompleted = async (id: number) => {
    const url = `/api/ranks`;

    try {
      setIsLoading(true);
      const { data } = await requestConfig.post(url, {
        completed: true,
        topicId,
        userId: currentUser?.id,
        subjectId,
        topicsCount,
      });

      setCompleted(data);
    } catch (error: unknown) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Suspense fallback={<Loader />}>
      <TopicLayout
        handleCompleted={handleCompleted}
        id={topic.id}
        title={topic.title}
        video={topic.video}
        completed={completed && completed != "undefined" ? true : false}
        desc={topic.description}
      />
    </Suspense>
  );
};

export default TopicPage;
