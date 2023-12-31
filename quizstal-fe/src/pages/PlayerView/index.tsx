import {useEffect, useState} from "react";
import {Question, QuestionType, State, submitAnswer, User, ViewState} from "../../api";
import {StateLoader} from "../../api/state-loader";


export function UserView() {
    const [state, setState] = useState<State>({
        view: ViewState.SCORE,
        users: [],
        timer: -1,
        question: -1,
        questions: [],
        db: "test"
    });
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);

    StateLoader.onLoad = setState

    const question: Question | undefined = state.questions.find(question => question.id == state.question)

    useEffect(() => {
        setAnswer("")
        setSubmitted(false)
    }, [question?.id]);

    const queries = new URLSearchParams(new URL(window.location.href).search);
    const userid = queries.get("id")

    const user: User | undefined = state.users.find(x => x.id == userid)
    if (user === undefined)
        return <></>

    return <div className='user-view'>
        <span>{user.name.toUpperCase()}</span>
        <div>
            {(state.view == ViewState.QUESTION && question && !submitted) && <>
                {question.type == QuestionType.TEXT && <input
                    placeholder='Type your answer here...'
                    type='text'
                    value={answer}
                    maxLength={128}
                    onChange={(e) => setAnswer(e.target.value.substring(0, 128))} />}

                {question.type == QuestionType.MULTI_CHOICE && <>
                    {(question.options ?? '').split(",").map((item) => <div>
                        <span onClick={() => setAnswer(item.trim())} className='multi-select-option' style={{
                            backgroundColor: item.trim() == answer ? 'blue' : undefined,
                            color: item.trim() == answer ? 'white' : undefined,
                        }}>{item.trim()}</span>
                    </div>)}
                </>}
            </>}
        </div>
        <span
            style={{ display: (state.view == ViewState.QUESTION && !submitted) ? 'block' : 'none' }}
            onClick={() => {
                setSubmitted(true)
                submitAnswer(
                    user?.id ?? '',
                    question?.type == QuestionType.BUZZER
                        ? new Date().getTime().toString()
                        : answer)
            }}>
            {question?.type == QuestionType.BUZZER ? "BUZZ" : "Submit"}
        </span>
    </div>
}