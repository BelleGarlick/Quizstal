import {StateLoader} from "./state-loader.ts";


export const playAudio = (file: string) => StateLoader.send("playAudio", {"file": file});
export const stopAllAudio = () => StateLoader.send("stopAllAudio", {});
