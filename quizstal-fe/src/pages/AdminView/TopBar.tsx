import {addUser, loadDb, setScreenState, setWallpaper, State} from "../../api";
import {ChangeEvent, useState} from "react";

import {Modal} from "@mui/material";
import {playAudio, stopAllAudio} from "../../api/server.ts";


function SoundboardModal({shown, setShown, audioAssets}:{shown: boolean, setShown: (show: boolean) => void,  audioAssets: string[]}) {
    const audioGroups: {header: string | undefined, items: string[]}[] = []
    for (const asset of audioAssets.sort()) {
        const header = asset.includes("/") ? asset.split("/")[0] + "/" : undefined;
        if (audioGroups.length == 0 || audioGroups[audioGroups.length - 1].header != header)
            audioGroups.push({header: header, items: []})
        audioGroups[audioGroups.length - 1].items.push(asset)
    }

    return <Modal
        open={shown}
        onClose={() => setShown(false)}>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: "translateX(-50%) translateY(-50%)",
            width: '800px',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '50% 50%',
                height: '50vh',
                background: '#333333',
                borderRadius: '12px',
                gap: '8px',
                padding: '16px',
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}>
                {audioGroups.map(item => (
                    <>
                        {item.header != undefined && <button key={item.header} style={{ gridColumn: '1/3', opacity: '0.5' }}>
                            {item.header}
                        </button>}

                        {item.items.map(fx => {
                            return <button
                                key={fx}
                                onClick={() => playAudio(fx)}>
                                {fx}
                            </button>
                        })}
                    </>))
                }
            </div>

            <button onClick={stopAllAudio}>Stop Audio</button>
        </div>
    </Modal>
}

export function TopBarView({state, imageAssets, showAddQuestion, audioAssets}: {state: State, imageAssets: string[], showAddQuestion: () => void, audioAssets: string[]}) {
    const [showSoundboard, setShowSoundboard] = useState(false);

    return <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        gridColumn: "1/4",
        background: 'black',
        justifyContent: 'space-between'
    }}>
        <SoundboardModal shown={showSoundboard} setShown={setShowSoundboard} audioAssets={audioAssets}  />

        <span>
            <button onClick={() => setShowSoundboard(true)}>Soundboard</button>
            <button onClick={showAddQuestion}>New Question</button>

            <button
                onClick={() => {
                    const name = prompt("Name?");
                    if (name != null)
                        addUser(name)
                }}>
                Add user
            </button>
        </span>

        <span>
            <select
                value={state.db}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    loadDb(event.target.value as string);
                }}>
                <option value='tm'>Task Master</option>
                <option value='bfqoty'>BFQOTY</option>
                <option value='test'>test</option>
            </select>

            <select
                value={state.wallpaper}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setWallpaper(event.target.value as string);
                }}>
                {imageAssets.map(fileName => <option
                    key={fileName}
                    value={fileName}>{fileName}</option>)}
            </select>

            <button onClick={() => setScreenState("SCORE")}>
                View Score
            </button>
        </span>
    </div>
}
