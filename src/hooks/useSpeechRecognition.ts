import { useEffect, useState } from "react";
import { Todo } from "../App";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "ko-KR";
}

interface useSpeechRecognitionProps {
  todos: Todo[];
  onInsert: (text: string) => void;
}

const useSpeechRecognition = ({todos, onInsert}:useSpeechRecognitionProps) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      //   console.log("onresult event: ", event);
      setText(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    if (!isListening) {
      setText("");
      setIsListening(true);
      console.log(todos);
      recognition.start();
      console.log(`녹음 시작`);
    }
  };

  const stopListening = () => {
    if (isListening) {
      onInsert(text);
      console.log(todos);
      setIsListening(false);
      recognition.stop();
      console.log(`녹음 끝 : ${text}`); 
    }
  };

  
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;