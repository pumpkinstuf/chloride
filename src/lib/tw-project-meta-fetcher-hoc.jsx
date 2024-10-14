import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import log from './log';

import {setProjectTitle} from '../reducers/project-title';
import {setAuthor, setDescription} from '../reducers/tw';

const trampolines = [
    `https://trampoline.turbowarp.org`,
    `https://trampoline.turbowarp.xyz`,
    `https://twextraapis.vercel.app/trampoline`,
    `https://twextraapis.vercel.app/trampo`
];

let workingtrampoline = null; // temp solution for broken apis

export const fetchProjectMeta = async projectId => {
    let firstError;
    for (const url of trampolines) {
        //console.log(`${url}/api/projects/${projectId}`);
        try {
            const res = await fetch(`${url}/api/projects/${projectId}`);
            const data = await res.json();
            if (res.ok) {
                workingtrampoline = url;
                return data;
            }
            if (res.status === 404) {
                throw new Error('Project is probably unshared');
            }
            throw new Error(`Unexpected status code: ${res.status}`);
        } catch (err) {
            if (!firstError) {
                firstError = err;
            }
        }
    }
    //throw firstError;
};

const getNoIndexTag = () => document.querySelector('meta[name="robots"][content="noindex"]');
const setIndexable = indexable => {
    if (indexable) {
        const tag = getNoIndexTag();
        if (tag) {
            tag.remove();
        }
    } else if (!getNoIndexTag()) {
        const tag = document.createElement('meta');
        tag.name = 'robots';
        tag.content = 'noindex';
        document.head.appendChild(tag);
    }
};

const TWProjectMetaFetcherHOC = function (WrappedComponent) {
    class ProjectMetaFetcherComponent extends React.Component {
        componentDidUpdate (prevProps) {
            // project title resetting is handled in titled-hoc.jsx
            if (this.props.reduxProjectId !== prevProps.reduxProjectId) {
                this.props.onSetAuthor('', '');
                this.props.onSetDescription('', '');
                const projectId = this.props.reduxProjectId;

                if (projectId === '0') {
                    // don't try to get metadata
                } else {
                    fetchProjectMeta(projectId).then(data => {
                        // If project ID changed, ignore the results.
                        if (this.props.reduxProjectId !== projectId) {
                            return;
                        }

                        const title = data.title;
                        if (title) {
                            this.props.onSetProjectTitle(title);
                        }
                        const authorName = data.author.username;
                        const authorThumbnail = `${workingtrampoline}/avatars/${data.author.id}`;
                        this.props.onSetAuthor(authorName, authorThumbnail);
                        const instructions = data.instructions || '';
                        const credits = data.description || '';
                        if (instructions || credits) {
                            this.props.onSetDescription(instructions, credits);
                        }
                        setIndexable(true);
                    })
                        .catch(err => {
                            setIndexable(false);
                            if (`${err}`.includes('unshared')) {
                                this.props.onSetDescription('unshared', 'unshared');
                            }
                            log.warn('cannot fetch project meta', err);
                        });
                }
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                reduxProjectId,
                onSetAuthor,
                onSetDescription,
                onSetProjectTitle,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    {...props}
                />
            );
        }
    }
    ProjectMetaFetcherComponent.propTypes = {
        reduxProjectId: PropTypes.string,
        onSetAuthor: PropTypes.func,
        onSetDescription: PropTypes.func,
        onSetProjectTitle: PropTypes.func
    };
    const mapStateToProps = state => ({
        reduxProjectId: state.scratchGui.projectState.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onSetAuthor: (username, thumbnail) => dispatch(setAuthor({
            username,
            thumbnail
        })),
        onSetDescription: (instructions, credits) => dispatch(setDescription({
            instructions,
            credits
        })),
        onSetProjectTitle: title => dispatch(setProjectTitle(title))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectMetaFetcherComponent);
};

export {
    TWProjectMetaFetcherHOC as default
};
