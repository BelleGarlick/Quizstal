import {useEffect, useState} from "react";
import {Question, QuestionType, State} from "../../../api";


export enum TitleSize {
    LARGE,
    MEDIUM,
    SMALL
}

const titleSize = {
    [TitleSize.LARGE]: '240px',
    [TitleSize.MEDIUM]: '120px',
    [TitleSize.SMALL]: '80px'
}


let timer


export function QuestionTitle({question, size, state}: {question?: Question, size: TitleSize, state: State}) {
    const getCurrentText = () => {
        if (question?.type == QuestionType.TIMER) {
            const remainingTime = Math.max(0, ((state.timer) - (new Date().getTime() / 1000)));
            let mins = `${Math.floor(remainingTime / 60)}`;
            let secs = `${Math.floor(remainingTime % 60)}`;
            if (mins.length == 1) mins = "0" + mins;
            if (secs.length == 1) secs = "0" + secs;
            return `${mins}:${secs}`
        }

        return question?.question
    }

    const [text, setText] = useState(getCurrentText())

    useEffect(() => {
        clearInterval(timer);
        setText(getCurrentText())
        timer = setInterval(() => setText(getCurrentText()), 1000);

        return () => clearInterval(timer);
    }, [question]);

    return <span style={{
        fontSize: titleSize[size]
    }} className='question-text'>{text}</span>
}
