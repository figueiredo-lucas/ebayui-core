import { expect } from 'chai';
import { waitFor } from '@marko/testing-library';
import sinon from 'sinon';
import { CDNLoader } from '..';
import * as load from '../../loader';

describe('CDN Loader', () => {
    it('Properly loads files from CDN', async () => {
        sinon.stub(load, 'loader').returns(Promise.resolve());
        const setLoading = sinon.spy();
        const handleSuccess = sinon.spy();
        const handleError = sinon.spy();

        const cdnLoader = new CDNLoader(
            {
                subscribeTo: sinon.spy(),
            },
            {
                key: 'key',
                files: ['files'],
                types: ['src'],
                setLoading,
                handleSuccess,
                handleError,
            }
        );

        cdnLoader.mount();

        await waitFor(() => {
            expect(load.loader.called).to.equal(true, 'loader called');
            expect(handleError.called).to.equal(false, 'error called');
            expect(handleSuccess.called).to.equal(true, 'success called');
            expect(setLoading.calledWith(false)).to.equal(true);
            load.loader.restore();
        });
    });

    it('Properly fails', async () => {
        sinon.stub(load, 'loader').returns(Promise.reject());
        const setLoading = sinon.spy();
        const handleSuccess = sinon.spy();
        const handleError = sinon.spy();

        const cdnLoader = new CDNLoader(
            {
                subscribeTo: sinon.spy(),
            },
            {
                key: 'key',
                files: ['files'],
                types: ['src'],
                setLoading,
                handleSuccess,
                handleError,
            }
        );

        cdnLoader.mount();

        await waitFor(
            () => {
                expect(load.loader.called).to.equal(true, 'loader called');
                expect(handleError.called).to.equal(true, 'error called');
                expect(handleSuccess.called).to.equal(false, 'success called');
                expect(setLoading.calledWith(false)).to.equal(true);
                load.loader.restore();
            },
            { timeout: 6000 }
        );
    });
});
