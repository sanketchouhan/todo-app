import React from 'react'
import "./Modal.css"

function Modal({heading, onChange, value, close, save}) {

    return (
        <div className="modal">
            <div className="box">
                <p className="modal_heading">{heading}</p>
                <input type="text" name="input" id="input" maxLength='100' value={value} onChange={e => onChange(e)} />
                <div className="btns">
                    <div className="save" onClick={() => save()} >Save</div>
                    <div className="cancel" onClick={() => close()} >Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default Modal
