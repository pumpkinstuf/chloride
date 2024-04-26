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
            'erudaInit'
        ]);
    }
    erudaInit () {
        eruda.init();
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.erudaInit, props);
    }
}

Eruda.propTypes = {
    children: PropTypes.func,
    turboMode: PropTypes.bool,
    vm: PropTypes.shape({
        erudaInit: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    erudaInit: state.scratchGui.vmStatus.eruda
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(Eruda);