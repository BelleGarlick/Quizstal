import {getRoot, removeUser, setPoints, setUserBuzzer, setUserImage, State} from "../../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare, faTrash} from "@fortawesome/free-solid-svg-icons";


export function PlayersView({state, imageAssets, audioAssets}: {state: State, imageAssets: string[], audioAssets: string[]}) {
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
        {state.users.map(user => {
            return <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                background: 'black',
                color: 'white',
                padding: '16px',
                boxSizing: 'border-box',
                gap: '8px',
                borderRadius: '8px'
            }} key={user.id}>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{`${user.name} (${user.points})`}</span>

                <span>{user.answer}</span>

                <div style={{display: 'flex', gap: '4px', flexDirection: 'row', justifyContent: 'center'  }}>
                    <button onClick={() => setPoints(user.id, user.points - 2)}>-2</button>
                    <button onClick={() => setPoints(user.id, user.points - 1)}>-1</button>
                    <button onClick={() => setPoints(user.id, user.points + 1)}>+1</button>
                    <button onClick={() => setPoints(user.id, user.points + 2)}>+2</button>
                    <button onClick={() => setPoints(user.id, user.points + 3)}>+3</button>
                    <button onClick={() => setPoints(user.id, user.points + 4)}>+4</button>
                    <button onClick={() => setPoints(user.id, user.points + 5)}>+5</button>
                </div>

                <div style={{display: 'flex', gap: '8px'}}>
                    <select
                        style={{width: '50%'}}
                        value={user.buzzer}
                        onChange={event => {
                            setUserBuzzer(user.id, event.target.value as string);
                        }}>
                        {audioAssets.sort().map(fileName => <option
                            key={fileName}
                            value={fileName}>{fileName}</option>)}
                    </select>

                    <select
                        style={{width: '50%'}}
                        value={user.image}
                        onChange={(event) => setUserImage(user.id, event.target.value as string)}>
                        {imageAssets.map(fileName => <option
                            key={fileName}
                            value={fileName}>{fileName}</option>)}
                    </select>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <button onClick={() => window.open(getRoot() + "/user?id=" + user.id)}>
                        <FontAwesomeIcon icon={faShare} />
                    </button>

                    <button onClick={() => removeUser(user.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        })}
    </div>
}
