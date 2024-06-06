import React, {useEffect, useState} from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import {Todo} from "../App";
import {ReactComponent as Record} from "../assets/Record.svg";
import {ReactComponent as Stop} from "../assets/Stop.svg";
import styled from "styled-components";
import {Typography} from "../scss/Global";
interface TodoInsertProps {
  onInsert: (text: string) => void;
  todos: Todo[];
}
const Button = styled.div`
  position: absolute;
  width: auto;
  box-sizing: border-box;
  border-radius: 16px;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;
const ButtonDiv = styled.button`
  border-radius: 50%;
  border: 0px;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  background: ${({theme}) => theme.colors.white};
  &:first-child {
    margin-right: 16px;
  }
`;
export default function TodoInsert({onInsert, todos}: TodoInsertProps) {
  //하단은 받아온 것들 다시 지정한거고
  const {
    text,
    startListening,
    stopListening,

    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition({onInsert, todos});

  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening, startListening, stopListening]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopListening(); // 폼 제출 시 음성 인식 중지
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          {hasRecognitionSupport ? (
            <Button>
              <ButtonDiv
                onClick={(e) => {
                  e.preventDefault();
                  startListening();
                }}
              >
                <Record />
              </ButtonDiv>
              <ButtonDiv type="submit">
                <Stop />
              </ButtonDiv>
            </Button>
          ) : (
            <h1>Your browser has no speech recognition support</h1>
          )}
        </div>
      </form>
    </>
  );
}
