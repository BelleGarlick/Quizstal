import {useState} from "react";
import {Question, QuestionType, State, ViewState} from "../../api";
import {StateLoader} from "../../api/state-loader";
import {ScoreView} from "./ScoreView";
import {
    FreeTextQuestionView,
    FreeTextAnswerView,
    MultiChoiceQuestionView,
    MultiChoiceAnswerView,
    BuzzerQuestionView,
    BuzzerAnswerView,
    TimerQuestionView,
    TimerAnswerView
} from "./QuestionTypes";
import {initAudio} from "../../utils/buzzer.ts";


function QuestionView({state}:{state: State}) {
    const q: Question | undefined = state.questions.find(q => q.id == state.question);

    if (q === undefined)
        return null

    switch (q.type) {
        case QuestionType.BUZZER: return <BuzzerQuestionView state={state} question={q}/>;
        case QuestionType.MULTI_CHOICE: return <MultiChoiceQuestionView state={state} question={q}/>;
        case QuestionType.TIMER: return <TimerQuestionView state={state} question={q}/>;
        default: return <FreeTextQuestionView state={state} question={q}/>
    }
}


export function AnswerView({state}:{state: State}) {
    const q: Question | undefined = state.questions.find(q => q.id == state.question);

    if (q === undefined)
        return null

    switch (q.type) {
        case QuestionType.BUZZER: return <BuzzerAnswerView state={state} question={q} />;
        case QuestionType.MULTI_CHOICE: return <MultiChoiceAnswerView state={state} question={q} />;
        case QuestionType.TIMER: return <TimerAnswerView question={q} />;
        default: return <FreeTextAnswerView state={state} question={q} />
    }
}


export function ClientView() {
    // TODO Maybe move this to a state provider
    const [state, setState] = useState<State>({
        view: ViewState.SCORE,
        users: [],
        timer: -1,
        question: undefined,
        questions: [],
        db: "test"
    });

    StateLoader.onLoad = setState
    initAudio();

    return <div>
        {state.view == "SCORE" && <ScoreView state={state} />}
        {state.view == "QUESTION" && <QuestionView state={state} />}
        {state.view == "ANSWER" && <AnswerView state={state} />}
    </div>
}
