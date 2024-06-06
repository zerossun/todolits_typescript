import {useEffect, useState} from "react";
import {Todo} from "../App";

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

const useSpeechRecognition = ({todos, onInsert}: useSpeechRecognitionProps) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsListening(false);
      onInsert(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [onInsert]);

  const startListening = () => {
    if (!isListening) {
      setText("");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
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
