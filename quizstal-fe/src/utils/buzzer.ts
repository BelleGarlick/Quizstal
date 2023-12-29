import {getRoot, listAssets} from "../api";


class BuzzerPlayer {

    private track: string | undefined = undefined
    private player: HTMLAudioElement | undefined = undefined

    public setTrack(track: string) {
        if (track != this.track) {
            this.track = track
            this.player = document.createElement("audio")
            this.player.src = getRoot() + "/" + track
        }
        return this;
    }

    public play() {
        if (this.player != undefined) {
            this.player.currentTime = 0
            this.player.play()
        }
    }

    public stop() {
        if (this.player != undefined) {
            this.player.pause()
        }
    }
}


const SoundBoard = {}

export function initAudio() {
    if (Object.keys(SoundBoard).length == 0) {
        console.log("Init audio")
        listAssets().then(x => {
            x.audio.forEach(audio => SoundBoard[audio] = new BuzzerPlayer().setTrack(audio))
        })
    }
}


export function playAudioFile(file: string) {
    console.log(`Player audio: ${file}`)
    const player = SoundBoard[file]
    if (player != null)
        player.play()
}

export function stopAllAudioPlayers() {
    Object.keys(SoundBoard).forEach(file => SoundBoard[file].stop())
}
