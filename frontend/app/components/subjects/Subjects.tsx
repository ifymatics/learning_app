import Card from "../card/Card";
import "./Subjects.scss";
import Subject from "../subject/Subject";
import { FC } from "react";
import { useRouter } from "next/navigation";

export type Subject = {
  name: string;
  id: number;
  completed: number;
  userid: number;
};
interface SubjectsProp {
  subjects: Subject[];
  pageTitle: string;
}

const Subjects: FC<SubjectsProp> = ({ subjects = [], pageTitle }) => {
  const router = useRouter();
  const onNavigate = (id: number) => {
    {
      router.push(`/${id}/topics`);
    }
  };
  return (
    <div className="subjectContainer">
      <Card className="subjects">
        <h2 className="title">{pageTitle}</h2>
        {Array.isArray(subjects) &&
          subjects?.map((subject, index) => (
            <Subject
              onClick={onNavigate}
              fromAdmin={false}
              id={subject.id}
              index={index}
              name={subject.name}
              key={subject.id}
              isCompleted={subject.completed}
              userId={subject.userid}
            />
          ))}
      </Card>
    </div>
  );
};

export default Subjects;
