// @ts-check

import * as eventUtils from '../../common/event-utils';

/**
 * @typedef {Marko.NativeTags["a" | "button"]["input"] & {
 *   renderBody?: Marko.Renderable,
 *   href?: string,
 *   size?: "none" | "regular" | "large",
 *   priority?: "none" | "primary" | "secondary" | "tertiary",
 *   bodyState?: "none" | "loading" | "reset" | "expand",
 *   a11yText?: string,
 *   variant?: "standard" | "destructive" | "form",
 *   fluid?: boolean,
 *   borderless?: boolean,
 *   disabled?: boolean,
 *   partiallyDisabled?: boolean,
 *   transparent?: boolean,
 *   fixedHeight?: boolean,
 *   truncate?: boolean,
 * }} Input
 * @extends Marko.Component<Input>
 */
export default class extends Marko.Component {
    /** @type {never} */
    state;

    /**
     * @param {Event} originalEvent
     */
    handleClick(originalEvent) {
        if (!this.input.disabled) {
            this.emit('click', { originalEvent });
        }
    }

    /**
     * @param {Event} originalEvent
     */
    handleKeydown(originalEvent) {
        eventUtils.handleEscapeKeydown(originalEvent, () => {
            if (!this.input.disabled) {
                this.emit('escape', { originalEvent });
            }
        });
    }

    /**
     * @param {Event} originalEvent
     */
    handleFocus(originalEvent) {
        this.emit('focus', { originalEvent });
    }

    /**
     * @param {Event} originalEvent
     */
    handleBlur(originalEvent) {
        this.emit('blur', { originalEvent });
    }
}
