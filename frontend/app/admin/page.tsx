"use client";
import React, { MouseEvent, useContext, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Subject from "../components/subject/Subject";

import { requestConfig } from "@/services/axios";

import Card from "../components/card/Card";
import { AuthContext } from "./../../auth.context";
import "./admin.scss";
import ModalLayout from "../components/modalLayout/ModalLayout";
import Rank from "../components/rank/Rank";
import Ranks from "../components/Ranks/Ranks";
import SubjectForm from "../components/subjectForm/SubjectForm";
import { Topic } from "../components/subjectForm/SubjectForm";

export type Subject = {
  name: string;
  id: number;
  completed: number;
  userid: number;
};
export type Rank = {
  id: number;
  rate: number;
  subjectid: number;
  completed: boolean;
  userid: number;
  email: string;
};

const AdminPage = () => {
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateSubject, setShowCreateSubject] = useState(false);
  const [showRanks, setShowRanks] = useState(false);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const { currentUser } = useContext(AuthContext);
  const [isSuccessfull, setIsSuccessfull] = useState("");
  const [, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useLayoutEffect(() => {
    if (!currentUser?.id || Number(currentUser.role) !== 1) {
      redirect("/");
    }
  }, [currentUser?.id, currentUser?.role]);
  useEffect(() => {
    // const fetchSubjects = async () => {
    //   const url = `/api/subjects`;

    //   try {
    //     setIsLoading(true);
    //     const { data } = await requestConfig.get(url);

    //     setSubjects(data);
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } catch (error: unknown) {
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchSubjects();
    fetchSubjects();
  }, []);
  async function fetchSubjects() {
    const url = `/api/subjects`;

    try {
      setIsLoading(true);
      const { data } = await requestConfig.get(url);

      setSubjects(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
    } finally {
      setIsLoading(false);
    }
  }
  const onClickCreateSubject = () => {
    setShowCreateSubject(true);
  };

  const onClickViewRank = async (id: number) => {
    const url = `/api/ranks/subject/${id}`;
    try {
      const { data } = await requestConfig.get(url);
      //console.log(data);
      setRanks(data);
      setShowRanks(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const onCancelModal = () => {
    setShowCreateSubject(false);
    setShowRanks(false);
    fetchSubjects();
  };

  const onSubmitSubject = async (
    e: MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    if (value.trim().length <= 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await requestConfig.post("/api/subjects", {
        name: value,
      });
      setIsSuccessfull("Subject created successfully!!");

      setTimeout(() => {
        setIsSuccessfull("");
      }, 2000);

      setIsSubmitting(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSubmitting(false);
      console.log(error.response.data);
      setErr(error.response.data.message);
    }
  };
  const onSubmitTopic = async (
    e: MouseEvent<HTMLButtonElement>,
    value: Topic
  ) => {
    e.preventDefault();

    if (
      value.title?.trim().length <= 0 ||
      value.description?.trim().length <= 0 ||
      value.video?.trim().length <= 0 ||
      !value.subjectId
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      await requestConfig.post("/api/topics", {
        ...value,
      });

      setIsSuccessfull("Topic created successfully!!");
      setTimeout(() => {
        setIsSuccessfull("");
      }, 2000);
      setIsSubmitting(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSubmitting(false);
      console.log(error.response.data);
      setErr(error.response.data.message);
    }
  };
  return (
    <div className="subjectContainer">
      {showCreateSubject && (
        <ModalLayout
          title="Create Subjects And Topics"
          onCancelModal={onCancelModal}
        >
          <SubjectForm
            err={err}
            isSubmitting={isSubmitting}
            onSubmitSubject={onSubmitSubject}
            onSubmitTopic={onSubmitTopic}
            subjects={subjects}
            isSuccessfull={isSuccessfull}
          />
        </ModalLayout>
      )}

      {showRanks && <Ranks ranks={ranks} onCancelModal={onCancelModal} />}
      <Card className="subjects">
        <h2 className="title">Admin Page</h2>
        <div className="container">
          <div className="created_subjects">Subjects</div>
          <div className="create" onClick={onClickCreateSubject}>
            create new
          </div>
        </div>

        <div className="courses">
          {subjects.length > 0 &&
            subjects?.map((subject, index) => (
              <Subject
                id={subject.id}
                index={index}
                name={subject.name}
                key={subject.id}
                isCompleted={subject.completed}
                userId={subject.userid}
                fromAdmin={true}
                onClick={onClickViewRank}
              />
            ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminPage;
///////////////////////////////////
