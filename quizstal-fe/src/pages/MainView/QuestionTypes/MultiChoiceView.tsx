import {Question, State, getRoot} from "../../../api";
import {QuestionViewContainer, MediaView, hasMedia, QuestionTitle, TitleSize} from "../QuestionViewComponents";


export function MultiChoiceQuestionView({ state, question }:{ state: State, question: Question }) {
    const showMedia = hasMedia(question)
    let titleSize = showMedia ? TitleSize.SMALL : TitleSize.MEDIUM;

    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={titleSize} />
        <MediaView question={question} />

        {!showMedia && <div className='multi-select-options'>
            {question.options.split(",").map((option) => <div key={option}>{option.trim()}</div>)}
        </div>}
    </QuestionViewContainer>
}


export function MultiChoiceAnswerView({ state, question }:{ state: State, question: Question }) {
    return <QuestionViewContainer>
        <QuestionTitle question={question} state={state} size={TitleSize.MEDIUM} />

        <div className='multi-select-options'>
            {question.options.split(",").map(option => <div key={option} style={{
                color: option.trim() == question.answer.trim() ? 'lime' : 'red',
                border: '4px solid ' + (option.trim() == question.answer.trim() ? 'lime' : 'red'),
            }}>
                {option.trim()}
                <div className='player-multi-choice-avatars'>
                    {state.users.filter(x => x.answer.trim().toLowerCase() == option.trim().toLowerCase()).map(x => {
                        return <img alt='player-avatar' key={x.image} src={`${getRoot()}/${x.image}`} />
                    })}
                </div>
            </div>)}
        </div>
    </QuestionViewContainer>
}

