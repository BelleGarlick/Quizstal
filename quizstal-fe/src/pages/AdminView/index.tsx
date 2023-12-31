import {useEffect, useState} from "react";
import {listAssets, State, ViewState} from "../../api";
import {StateLoader} from "../../api/state-loader";
import {PlayersView} from "./PlayersView";
import {TopBarView} from "./TopBar";
import {QuestionsView} from "./QuestionsView";


// TODO
//  change m4a audio clips
//  finish bfqoty
//  -
//  find measurements and notes
//  add notes on questions to remind me how to present them

// TODO Future Work
//  Save messages send when sockets was closed
//  Allow for storing questions in json files
//  add password to admin page
//  create a single db to hold all data which can be switched between
//  rename questions, reorder questions, insert after current question.
//  change status bar colour on iphone
//  db migrations
//  allow client to upload to server
//  add a timer to a question (will need new column in questions db - may be able to rework the timer screen)
//  have questions auto trigger audio
//  add a pass the bomb game mode (requires web sockets first)
//  run an adhoc spontanous timer on a question
//  use a context provider for state
//  stop/play audio (on client using web sockets)

export function AdminView() {
    const [state, setState] = useState<State>({
        view: ViewState.SCORE,
        users: [],
        timer: -1,
        question: undefined,
        db: "test",
        questions: []
    });
    const [assets, setAssets] = useState<string[]>([]);
    const [audioAssets, setAudioAssets] = useState<string[]>([]);
    const [addQuestionShown, setAddQuestionShown] = useState(false);

    StateLoader.onLoad = setState

    useEffect(() => {
        listAssets().then(assets => {
            setAudioAssets(assets.audio)
            setAssets(assets.images)
        })
    }, []);

    return <div style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        display: 'grid',
        gridTemplateRows: "60px calc(100svh - 60px)",
        gridTemplateColumns: '50% 50%'
    }}>
        <TopBarView state={state} imageAssets={assets} audioAssets={audioAssets} showAddQuestion={() => setAddQuestionShown(true)} />
        <PlayersView state={state} imageAssets={assets} audioAssets={audioAssets} />
        <QuestionsView state={state} addQuestionShown={addQuestionShown} setAddQuestionShown={setAddQuestionShown} />
    </div>
}
