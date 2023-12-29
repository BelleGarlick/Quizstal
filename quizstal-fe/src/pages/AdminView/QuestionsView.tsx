import {newQuestion, removeQuestion, setScreenState, State} from "../../api";
import {Button, Modal} from "@mui/material";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


function AddQuestionModal({shown, setShown}:{shown: boolean, setShown: (show: boolean) => void}) {
    const [question, setQuestion] = useState("")
    const [answerType, setAnswerType] = useState("TEXT")
    const [optionsData, setOptionsData] = useState("")
    const [answerData, setAnswerData] = useState("")
    const [mediaType, setMediaType] = useState("")
    const [media, setMedia] = useState("")

    useEffect(() => {
        setQuestion("")
        setAnswerType("TEXT")
        setOptionsData("")
        setAnswerData("")
        setMediaType("")
        setMedia("")
    }, [shown]);

    return <Modal
        open={shown}
        onClose={() => setShown(false)}>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translateX(-50%) translateY(-50%)",
            width: '600px',
            background: '#333333',
            display: 'flex',
            flexDirection: "column",
            gap: '8px',
            padding: '16px',
            color: 'white',
            borderRadius: '4px'
        }}>
            <span>Question</span>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} />
            <hr />
            <span>Answer/s</span>
            <div>
                {["TEXT", "BUZZER", "MULTI_CHOICE", "TIMER"].map(value => {
                    return <button
                        style={{ backgroundColor: value == answerType ? "#666666" : undefined, padding: '8px 12px' }}
                        onClick={() => setAnswerType(value)}>
                        {value}
                    </button>
                })}
            </div>
            Answer
            <input value={answerData} onChange={(e) => setAnswerData(e.target.value)} />
            {answerType == "MULTI_CHOICE" && <>
                Options
                <input value={optionsData} onChange={(e) => setOptionsData(e.target.value)} />
            </>}
            <hr />
            <span>Media</span>
            <div>
                {["", "image", "youtube"].map(value => {
                    return <button
                        style={{ backgroundColor: value == mediaType ? "#666666" : undefined, padding: '8px 12px' }}
                        onClick={() => setMediaType(value)}>
                        {value == "" ? "None" : value}
                    </button>
                })}
            </div>
            {mediaType != "" && <input value={media} onChange={(e) => setMedia(e.target.value)} />}
            <hr />
            <button onClick={() => {
                newQuestion(question, answerType, optionsData, answerData, mediaType + "+" + media)
                setShown(false)
            }}>Save</button>
        </div>
    </Modal>
}


export function QuestionsView({state, addQuestionShown, setAddQuestionShown}: {state: State, addQuestionShown: boolean, setAddQuestionShown: (value: boolean) => void}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        gap: '12px',
    }}>
        <AddQuestionModal shown={addQuestionShown} setShown={setAddQuestionShown} />

        {(state.questions??[]).map((question, idx) => {
            return <div
                onClick={() => setScreenState("QUESTION", question.id.toString())}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: question.id == state.question ? '#666' : 'black',
                    color: 'white',
                    padding: '16px',
                    boxSizing: 'border-box',
                    gap: '8px',
                    borderRadius: '8px'
                }}
                key={`${idx}-${question.id}`}>

                <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{question.question}</span>

                <span>{`[${question.type}] ${question.answer}`}</span>

                <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <span>
                        <button onClick={(e) => {
                            setScreenState("ANSWER", question.id.toString())
                            e.stopPropagation()
                        }}>Answer</button>
                    </span>

                    <button onClick={() => removeQuestion(question.id.toString())}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </span>
            </div>
        })}
    </div>
}
