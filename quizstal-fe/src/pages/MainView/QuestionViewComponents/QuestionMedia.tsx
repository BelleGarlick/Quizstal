import {getRoot, Question} from "../../../api";


export function hasMedia(question: Question) {
    return (question.media ?? '').length > 2;
}


export function MediaView({question}: {question: Question}) {
    if ((question.media ?? '').startsWith("youtube+"))
        return <iframe
            width={800}
            height={500}
            style={{ border: '0px' }}
            src={"https://www.youtube.com/embed/" + question.media!.substring(8) + '?autoplay=1'}/>

    if ((question.media ?? '').startsWith("image+")) {
        let url = question.media!.substring(6);
        if (url.startsWith("/")) url = getRoot() + "/" + url;

        return <img
            style={{
                border: '0px',
                objectFit: 'contain',
                maxHeight: '500px',
                maxWidth: '800px',
                boxShadow: '20px 20px 20px black',
                background: 'white'
            }}
            src={url}/>
    }

    return null
}
