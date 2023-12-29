import {Question, State} from "../../../api";
import {QuestionViewContainer, MediaView, hasMedia, QuestionTitle, TitleSize} from "../QuestionViewComponents";
import {getRandomRotation, getRandomScreenPos} from "../../../utils/random-jiggle-times.ts";


export function FreeTextQuestionView({state, question}:{state: State, question: Question}) {
    let titleSize = TitleSize.MEDIUM;
    if (hasMedia(question)) titleSize = TitleSize.SMALL

    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={titleSize} />
        <MediaView question={question} />
    </QuestionViewContainer>
}


export function FreeTextAnswerView({state, question}:{state: State, question: Question}) {
    return <>
        <QuestionViewContainer>
            <QuestionTitle question={question} state={state} size={TitleSize.MEDIUM} />

            <div style={{fontSize: '80px', textShadow: "10px 10px 10px black"}}>
                {question.answer}
            </div>
        </QuestionViewContainer>

        {state.users.filter(x => (x.answer ?? '').length > 0).map((user, idx) => {
            return <span className='user-answers' style={{
                left: `${getRandomScreenPos(idx + state.question * 5).x * 100}%`,
                top: `${getRandomScreenPos(idx + state.question * 5).y * 100}%`,
                transform: `rotate(${getRandomRotation(idx + state.question * 5)})`,
            }}>
                <span>{user.answer}</span>
                <span style={{fontSize: 30}}>{user.name}</span>
            </span>
        })}
    </>
}

