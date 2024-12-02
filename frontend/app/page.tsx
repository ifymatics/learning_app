/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";

import { requestConfig } from "@/services/axios";
import Subjects, { Subject } from "./components/subjects/Subjects";
import { AuthContext } from "./../auth.context";
import NavBar from "./components/navBar/NavBar";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const url = `/api/subjects`;

      try {
        setIsLoading(true);
        const { data } = await requestConfig.get(url);
        console.log(data);
        setSubjects(data);
      } catch (error: unknown) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, [currentUser?.id]);
  return (
    <>
      <Subjects
        subjects={subjects?.length ? subjects : []}
        pageTitle="Subjects To Learn"
      />
    </>
  );
}
