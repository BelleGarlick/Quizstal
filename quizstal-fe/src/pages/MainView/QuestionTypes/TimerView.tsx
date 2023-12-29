import {Question, State} from "../../../api";
import {QuestionViewContainer, MediaView, hasMedia, QuestionTitle, TitleSize} from "../QuestionViewComponents";


export function TimerQuestionView({state, question}:{state: State, question: Question}) {
    let titleSize = TitleSize.LARGE;
    if (hasMedia(question)) titleSize = TitleSize.MEDIUM

    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={titleSize} />
        <MediaView question={question} />
    </QuestionViewContainer>
}


export function TimerAnswerView({question}:{question: Question}) {
    return <QuestionViewContainer>
        <div style={{fontSize: '80px', textShadow: "10px 10px 10px black"}}>
            {question.answer}
        </div>
    </QuestionViewContainer>
}
