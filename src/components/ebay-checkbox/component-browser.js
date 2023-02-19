// @ts-check

export default {
    handleChange: forwardEvent('change'),
    handleFocus: forwardEvent('focus'),
    handleKeydown: forwardEvent('keydown'),
};

/**
 * @param {string} eventName
 */
function forwardEvent(eventName) {
    /**
     * @param {Event} originalEvent
     * @param {HTMLInputElement} el
     */
    return function (originalEvent, el) {
        const value = (el || this.el.querySelector('input')).value;
        const checked = (el || this.el.querySelector('input')).checked;
        this.emit(`${eventName}`, {
            originalEvent,
            value,
            checked,
        });
    };
}
