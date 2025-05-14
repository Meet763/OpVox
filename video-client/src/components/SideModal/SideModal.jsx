import React from 'react';
import { X } from "lucide-react";
import "./SideModal.scss";

const SideModal = (
    {
        isOpen = false,
        title = null,
        showTitleIcon = true,
        titleIcon = null,
        children,
        showCloseIcon = true,
        onClose,
    }
) => {

    return (
        <div className={`side-modal-container ${isOpen ? 'open' : ''}`}>
            <div className="modal-header">
                <div className="modal-header-title">
                    {showTitleIcon && titleIcon}
                    {title}
                </div>
                {showCloseIcon && (
                    <div className="modal-header-btn">
                        <X onClick={onClose} />
                    </div>
                )}
            </div>
            <div className="modal-content">{children}</div>
        </div>
    )
}

export default SideModal;
