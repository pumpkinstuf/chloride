import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

class Eruda extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'erudaToggle'
        ]);
    }
    erudaToggle () {
        if (!eruda._isInit) {
            eruda.init();
        } else {
            eruda.destroy();
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.erudaToggle, props);
    }
}

Eruda.propTypes = {
    children: PropTypes.func,
    vm: PropTypes.shape({
        erudaToggle: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    erudaToggle: state.scratchGui.vmStatus.eruda
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(Eruda);