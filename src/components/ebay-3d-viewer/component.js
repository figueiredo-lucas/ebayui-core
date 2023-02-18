// @ts-check

import { CDNLoader } from '../../common/cdn';

/**
 * // TODO: Retrieve types directly from @google/model-viewer instead of listing manually here
 * @typedef {{
 *   src: string,
 *   cdnVersion?: string,
 *   cdnUrl?: string,
 *   a11yText?: string,
 *   a11yStartText?: string,
 *   a11yLoadText?: string,
 *   errorText?: string,
 *   version?: string,
 *   poster?: string
 *   class?: string,
 * }} Input
 * @typedef {{
 *   failed: boolean,
 *   isLoaded: boolean,
 *   showLoading: boolean
 * }} State
 * @extends {Marko.Component<Input, State>}
 */
export default class extends Marko.Component {
    /** @type {CDNLoader} */
    cdnLoader;

    /**
     * @param {unknown} err
     */
    handleError(err) {
        this.state.failed = true;
        this.state.isLoaded = true;
        this.emit('load-error', err);
    }

    onCreate() {
        this.state = {
            showLoading: false,
            isLoaded: true,
            failed: false,
        };

        this.cdnLoader = new CDNLoader(this, {
            key: 'modelViewer',
            types: ['module'],
            files: ['model-viewer.min.js'],
            setLoading: (value) => {
                this.state.showLoading = value;
            },
            handleError: this.handleError.bind(this),
            handleSuccess: this.handleSuccess.bind(this),
        });
    }

    onUpdate() {}
    onRender() {}
    onInput() {}
    onDestroy() {}

    handleSuccess() {
        this.state.isLoaded = true;
        this.state.showLoading = false;
        this.state.failed = false;
    }

    onMount() {
        this.viewer = this.getEl('3d-viewer');
        this._loadViewer();
    }

    _loadViewer() {
        this.state.failed = false;
        this.state.isLoaded = false;

        this.cdnLoader.setOverrides([this.input.cdnUrl], this.input.version).mount();
    }
}
