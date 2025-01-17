module.exports = {
    handleDismissClick: forwardEvent('dismiss'),
    handleDismissKeydown: forwardEvent('dismiss'),
};

function forwardEvent(eventName) {
    return function (value, originalEvent) {
        this.emit(eventName, {
            originalEvent,
            value: value,
        });
    };
}
