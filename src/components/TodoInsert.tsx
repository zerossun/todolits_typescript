import React, {ChangeEvent, useState} from "react";
import {MdAdd} from "react-icons/md";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

interface TodoInsertProps {
  onInsert: (memo: string) => void;
}

export default function TodoInsert({onInsert}: TodoInsertProps) {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const [memo, setMemo] = useState("");

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
    console.log(memo);
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMemo("");
    onInsert(memo);
  };
  return (
    <>
      <form onSubmit={submit}>
        <input value={memo} onChange={onchange} placeholder="일정 적기" />
        <button type="submit">
          <MdAdd />
        </button>
        <div>
          {hasRecognitionSupport ? (
            <>
              <div>
                <button onClick={startListening}>start Listening</button>
              </div>
              <div>
                <button onClick={stopListening}>stop Lisetening</button>
              </div>
              {isListening ? (
                <div>Your browser is currently listening</div>
              ) : null}
              {text}
            </>
          ) : (
            <h1>Your browser has no speech recognition support</h1>
          )}
        </div>
      </form>
    </>
  );
}
