import { useState , useEffect, useRef} from "react";

export const TextArea = ({ textAreaState }) => {
    const {
        addInputValueTotheServer,
        style,
        placeholderText,
        textAreaValue,
        objctKey,
    } = textAreaState;
    const inputRef = useRef(null)

    function textAreaAdjust(e) {
        console.log(e)
        e.target.style.height = e.target.scrollHeight + "px";
    }


    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.style.height = inputRef.current.scrollHeight + "px";
        }
    },[inputRef.current])

    return (
        <textarea
            onChange={(e) => {
                textAreaAdjust(e);
                addInputValueTotheServer(objctKey, e.target.value);
            }}
            ref={inputRef}
            value={textAreaValue}
            className= {`note-input-textarea ${style}`}
            placeholder={`${placeholderText}`}
        />
    );
};
