import {getRoot, State} from "./index.ts";
import * as api from "./index.ts";
import {playAudioFile, stopAllAudioPlayers} from "../utils/buzzer.ts";


export class StateLoader {

    private static websocket: WebSocket | undefined

    private static state: State | undefined = undefined
    public static onLoad: (state: State) => void = () => {}

    private static setState(state: State) {
        if (JSON.stringify(state) != JSON.stringify(StateLoader.state)) {
            StateLoader.state = state;
            StateLoader.onLoad(state)

            document.body.style.backgroundImage = `url(${getRoot()}/${state.wallpaper})`
        }
    }

    public static start() {
        setInterval(() => {
            api.getState().then(state => StateLoader.setState(state))
        }, 1000)

        this.connectWS();
    }

    private static connectWS() {
        if (this.websocket != undefined)
            this.websocket.close(1000, "New one is being created")

        this.websocket = new WebSocket(`${getRoot()}/ws`.replace("http", "ws"))
        this.websocket.onopen = () => {}
        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.id == "state")
                StateLoader.setState(data.data);
            else if (data.id == "playAudio")
                playAudioFile(data.data.file);
            else if (data.id == "stopAllAudio")
                stopAllAudioPlayers()
            else
                console.log(`Unknown update from server: ${data.id}`)
        }
        this.websocket.onclose = (event) => {
            setTimeout(() => this.connectWS(), 1000);
        }
    }

    public static send(path: string, data: {[key: string]: any}) {
        if (this.websocket == undefined)
            return

        // add a queue to retry sending data in event of issue
        this.websocket.send(JSON.stringify({"id": path, "data": data}))
    }
}

StateLoader.start()
setInterval(() => StateLoader.send("ping", {}), 1000)
