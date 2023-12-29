import {getRoot, Question, State} from "../../../api";
import {QuestionViewContainer, MediaView, hasMedia, QuestionTitle, TitleSize} from "../QuestionViewComponents";


export function BuzzerQuestionView({state, question}:{state: State, question: Question}) {
    let titleSize = TitleSize.MEDIUM;
    if (hasMedia(question)) titleSize = TitleSize.SMALL

    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={titleSize} />

        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'start' }}>
            <MediaView question={question} />

            <div className='buzzer-responses'>
                {state.users.filter(x => x.answer.length > 0).sort((a, b) => parseFloat(a.answer) - parseFloat(b.answer)).map(user => (
                    <div key={user.id}>
                        <img alt='player-avatar' src={getRoot() + "/" + user.image} />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </QuestionViewContainer>
}


export function BuzzerAnswerView({state, question}:{state: State, question: Question}) {
    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={TitleSize.MEDIUM} />

        <div style={{fontSize: '80px', textShadow: "10px 10px 10px black"}}>
            {question.answer}
        </div>
    </QuestionViewContainer>
}

