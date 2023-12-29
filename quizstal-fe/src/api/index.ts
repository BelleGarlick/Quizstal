export interface User {
    id: string;
    name: string;
    image: string;
    buzzer: string;
    answer: string;
    points: number;
}
export enum QuestionType {
    TEXT = 'TEXT',
    BUZZER = 'BUZZER',
    MULTI_CHOICE = 'MULTI_CHOICE',
    TIMER = 'TIMER'
}
export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    options: string;
    answer: string;
    media?: string;
}
export enum ViewState {
    SCORE = 'SCORE',
    QUESTION = 'QUESTION'
}
export interface State {
    db: string;
    view: ViewState;
    wallpaper?: string;
    question?: number;
    timer: number;
    users: User[],
    questions: Question[]
}
export interface Assets {
    images: string[];
    audio: string[];
}

export function getRoot() {
    if (window.location.port == 5173)
        return "http://localhost:7070";
    return window.location.origin
}
function get<T> (path: string): Promise<T> {
    return fetch(`${getRoot()}/api${path}`)
        .then(x => x.json());
}


function post (path: string, data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    return fetch(`${getRoot()}/api${path}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
        body: formBody.join("&")
    });
}


export const getState = () => get<State>("/get-state")
export const listAssets = () => get<Assets>("/assets")
export const addUser = (name: string) => post("/admin/add-user", {'name': name})
export const setPoints = (id: string, points: number) => post("/admin/set-points", {"id": id, "points": points})
export const removeUser = (id: string) => post("/admin/remove-user", {"id": id})
export const removeQuestion = (id: string) => post("/admin/remove-question", {"id": id})
export const setScreenState = (view: string, question?: string) => post("/admin/set-state", {"view": view, "question": question})
export const setWallpaper = (src: string) => post("/admin/set-wallpaper", {"src": src})
export const loadDb = (db: string) => post("/admin/load-db", {"db": db})
export const newQuestion = (question: string, type: string, options: string, answers: string, media: string) => post("/admin/new-question", {
    "question": question,
    "type": type,
    "options": options,
    "answers": answers,
    "media": media
})
export const submitAnswer = (userId: string, answer: string) => post("/submit-answer", {
    "userId": userId,
    "answer": answer
})
export const setUserBuzzer = (userId: string, buzzer: string) => post("/admin/set-buzzer", {
    "userId": userId,
    "buzzer": buzzer
})
export const setUserImage = (userId: string, image: string) => post("/admin/set-image-path", {
    "userId": userId,
    "image": image
})
