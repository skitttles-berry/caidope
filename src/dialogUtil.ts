import type { Caido } from "@caido/sdk-frontend";
import { copyToClipboard } from './utils';

export const copyDialog = (caido: Caido, copied: string) => {
    const text = document.createElement("p");
    text.innerText = "Press enter key to copy."
    text.style.cssText = `
        margin: 20px;
        width: auto;
        height: auto;
    `;

    const copyButton = caido.ui.button({
        variant: "primary",
        label: "Copy",
        size: "small",
    });

    if (!copyButton) {
        console.error("❗ ERROR : There is no copy button.");
        return;
    }

    copyButton.style.cssText = `
        margin: 5px;
    `;

    const cancelButton = caido.ui.button({
        variant: "tertiary",
        label: "Cancel",
        size: "small",
    });

    if (!cancelButton) {
        console.error("❗ ERROR : There is no cancel button.");
        return;
    }

    cancelButton.style.cssText = `
        margin: 5px;
    `;

    const buttonGroup = document.createElement("div");

    if (!buttonGroup) {
        console.error("❗ ERROR : There is no button group.");
        return;
    }

    buttonGroup.style.cssText = `
        display: flex;
        justify-content: space-evenly;
        margin: 1px;
        padding: 5px;
        width: auto;
        height: auto;
    `;

    buttonGroup.appendChild(copyButton);
    buttonGroup.appendChild(cancelButton);

    // Create the dialog element
    let dialog = caido.ui.card({ body: text, footer: buttonGroup });

    if (!dialog) {
        console.error("❗ ERROR : There is no dialog.");
        return;
    }

    dialog.id = 'dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        z-index: 9999; // Ensure dialog is above other elements
        max-width: 300px; // Max width for better readability
        max-height: 200px;
        width: auto;
        height: auto;
    `;

    const cardElement = dialog.querySelector('.c-card') as HTMLElement; // Cast cardElement to HTMLElement

    if (!cardElement) {
        console.error("❗ ERROR : There is no card element.");
        return;
    }

    cardElement.style.cssText = `
        box-shadow: 5px 5px 3px black;
        border: 1px solid #daa04a;
    `;

    // Append the dialog to the body
    const app = document.getElementById("app");

    if (!app) {
        console.error("❗ ERROR : There is no app element.");
        return;
    }

    app.appendChild(dialog);

    function removeAllEventListeners() {
        document.removeEventListener('keydown', handleEnterKey);
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('click', handleOutsideClick);
    }

    function closeDialog() {
        if (dialog) {
            removeAllEventListeners();
            dialog.remove();
        }
    }

    copyButton.onclick = () => {
        if (dialog) {
            try {
                navigator.clipboard.writeText(copied);
            } catch (error) {
                console.error("❗ ERROR : Failed to Clipboard copy\n" + error)
            }
            closeDialog();
        }
    };

    cancelButton.onclick = () => {
        closeDialog();
    };

    function handleEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            try {
                navigator.clipboard.writeText(copied);
            } catch (error) {
                console.error("❗ ERROR : Failed to Clipboard copy\n" + error)
            }
            closeDialog();
        }
    }

    function handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeDialog();
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        if (event.target !== dialog && !dialog.contains(event.target as Node)) {
            closeDialog();
        }
    }

    document.addEventListener('keydown', handleEnterKey);
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('click', handleOutsideClick);
}