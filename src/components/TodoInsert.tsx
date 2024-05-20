// import React, {ChangeEvent, useState} from "react";
// import {MdAdd} from "react-icons/md";
// import useSpeechRecognition from "../hooks/useSpeechRecognition";

// interface TodoInsertProps {
//   onInsert: (text: string) => void;
// }

// export default function TodoInsert({onInsert}: TodoInsertProps) {
//   const {
//     text,
//     startListening,
//     stopListening,
//     isListening,
//     hasRecognitionSupport,
//   } = useSpeechRecognition();

//   // const [memo, setMemo] = useState(text);

//   const onchange = (e: ChangeEvent<HTMLInputElement>) => {
//     // setMemo(e.target.value);
//     console.log(text);
//   };
//   const submit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onInsert(text);
//   };
//   return (
//     <>
//       <form onSubmit={submit}>
//         {/* <input value={memo} onChange={onchange} placeholder="일정 적기" /> */}
//         {/* <button type="submit">
//           <MdAdd />
//         </button> */}
//         <div>
//           {hasRecognitionSupport ? (
//             <>
//               {isListening ? (
//                 // <div>Your browser is currently listening</div>
//                 <input value={text} onChange={onchange} placeholder="녹음 중" />
//               ) : null}
//               {text}

//               <div>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     startListening();
//                   }}
//                 >
//                   start Listening
//                 </button>
//               </div>
//               <div>
//                 <button type="submit" onClick={stopListening}>
//                   stop Lisetening
//                 </button>
//               </div>
//             </>
//           ) : (
//             <h1>Your browser has no speech recognition support</h1>
//           )}
//         </div>
//       </form>
//     </>
//   );
// }

import React, {useEffect, useState} from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { Todo } from "../App";

interface TodoInsertProps {
  onInsert: (text: string) => void;
  todos: Todo[];
}

export default function TodoInsert({onInsert, todos}: TodoInsertProps) {
  //하단은 받아온 것들 다시 지정한거고
  const {
    text,
    startListening,
    stopListening,
    
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition({onInsert ,todos});

  // 얘는 stop버튼 클릭했을 때만 submit이 될 수 있도록 usestate로 지정
  // const [isFirstRender, setIsFirstRender] = useState(true);

  // isfirstrender가 true가 아닐 때
  // useEffect(() => {
  //   // 첫 번째 렌더링 후에는 호출하지 않도록 설정
  //   if (!isFirstRender) {
  //     onInsert(text);  
      
  //   } else {
  //     setIsFirstRender(false);
  //   }
  // }, [isFirstRender, onInsert, text]);

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
            <>
              {isListening ? (
                <input value={text} readOnly placeholder="녹음 중" />
              ) : null}
              {/* {text} */}

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    startListening();
                  }}
                >
                  start Listening
                </button>
              </div>
              <div>
                <button type="submit">Stop Listening</button>
              </div>
            </>
          ) : (
            <h1>Your browser has no speech recognition support</h1>
          )}
        </div>
      </form>
    </>
  );
}
