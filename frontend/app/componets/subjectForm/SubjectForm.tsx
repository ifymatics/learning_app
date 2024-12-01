import { ChangeEvent, FC, MouseEvent, useState } from "react";
import "./SubjectForm.scss";
import Card from "../card/Card";

type SubjectFormProp = {
  onSubmitSubject: (e: MouseEvent<HTMLButtonElement>, value: string) => void;
  onSubmitTopic: (e: MouseEvent<HTMLButtonElement>, value: Topic) => void;
  err: string | null;
  isSubmitting: boolean;
  subjects: Subject[];
};
export type Topic = {
  title: string;
  video: string;
  description: string;
  subjectId: number;
  subjects: Subject[];
};
type Subject = {
  id: number;
  name: string;
};
const SubjectForm: FC<SubjectFormProp> = ({
  err,
  isSubmitting,
  onSubmitSubject,
  onSubmitTopic,
  subjects,
}) => {
  const [value, setValue] = useState("");
  const [topic, setTopic] = useState<Topic>({} as Topic);
  const [subjectFormSelected, setSubjectFormSelected] = useState(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onChangeTopicHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubjectFormSelected(e.target.value === "subject");
  };

  return (
    <Card className="formContainer">
      <select
        name=""
        id=""
        onChange={handleSelectChange}
        defaultValue={"subject"}
      >
        <option value="subject">Subject</option>
        <option value="topic">Topic</option>
      </select>

      {subjectFormSelected && (
        <form action="" className="subjectForm">
          <input
            name="name"
            onChange={onChangeHandler}
            type="text"
            placeholder="Subject name"
          />

          {err && <div className="error">Error: {err}</div>}
          {!isSubmitting && (
            <button type="button" onClick={(e) => onSubmitSubject(e, value)}>
              Submit
            </button>
          )}

          {isSubmitting && (
            <button
              type="button"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {"submitting ..."}
            </button>
          )}
        </form>
      )}
      {!subjectFormSelected && (
        <form action="" className="topicForm">
          <input
            name="title"
            onChange={onChangeTopicHandler}
            type="text"
            placeholder="title"
          />
          <input
            name="video"
            onChange={onChangeTopicHandler}
            type="text"
            placeholder="video"
          />
          <input
            name="description"
            onChange={onChangeTopicHandler}
            type="text"
            placeholder="description"
          />
          <select name="subjectId" id="" onChange={onChangeTopicHandler}>
            {subjects.length &&
              subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
          </select>
          {err && <div className="error">Error: {err}</div>}
          {!isSubmitting && (
            <button type="button" onClick={(e) => onSubmitTopic(e, topic)}>
              Submit
            </button>
          )}

          {isSubmitting && (
            <button
              type="button"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {"submitting ..."}
            </button>
          )}
        </form>
      )}
    </Card>
  );
};

export default SubjectForm;