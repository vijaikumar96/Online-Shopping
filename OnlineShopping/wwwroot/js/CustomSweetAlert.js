function InvokeAlert(title, icon, text, html, successEvent) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        allowOutsideClick: false,
        //footer: footer,
        html: html
    }).then((result) => {
        if (result.isConfirmed) {
            successEvent = successEvent || "";
            successEvent != "" ? successEvent() : "";
        }
    });
}

function InfoAlert(title, text, successEvent, html) {
    InvokeAlert(title, "info", text, html, successEvent);
}
function WarningAlert(title, text, successEvent, html) {
    InvokeAlert(title, "warning", text, html);
}
function ErrorAlert(title, text, successEvent, html) {
    InvokeAlert(title, "error", text, html, successEvent);
}
function SuccessAlert(title, text, successEvent, html) {
    InvokeAlert(title, "success", text, html, successEvent);
}

function ConfirmAlert(title, text, OkButtontext, CancelBtnText, successEvent, cancelEvent, html) {
    Swal.fire({
        title: title,
        text: text,
        html: html,
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: OkButtontext,
        cancelButtonText: CancelBtnText
    }).then((result) => {
        if (result.isConfirmed) {
            successEvent();
        }
        else {
            cancelEvent();
        }
    });
}