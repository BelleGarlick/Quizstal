import {ReactNode} from "react";


export function QuestionViewContainer({ children }:{ children: ReactNode }) {
    return <div style={{
            fontWeight: 'bold',
            color: 'gold',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {children}
    </div>
}
