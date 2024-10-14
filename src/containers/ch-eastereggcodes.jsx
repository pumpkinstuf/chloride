import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {openUsernameModal} from '../reducers/modals';
import {closeEditMenu} from '../reducers/menus';
import isScratchDesktop from '../lib/isScratchDesktop';

const messages = defineMessages({
    cannotOpenWhileRunning: {
        defaultMessage: 'Most eastereggs cannot be activated while the project is running due to corruptions',
        description: 'Alert that appears when trying to open eastereggs while project is running to prevent corruption',
        id: 'tw.eastereggs.cannotOpenWhileRunning'
    }
});

class EasterEggs extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'easterEggsMenu'
        ]);
    }
    easterEggsMenu () {
        this.props.closeEdits();
        const easterEgg = prompt("Easteregg Code:");
        if (easterEgg == "rick") {
            document.location.replace("https://www.youtube.com/watch?v=xvFZjo5PgG0");
        } else if (easterEgg == "anticloud") {
            document.dontcarecloud = true;
            console.warn(`Easteregg activated ${easterEgg}, glitches are bound to be found!`);
        } else {
            alert(`Unknown easter egg ${easterEgg}`);
            return;
        }
    }
    render () {
        return this.props.children(this.easterEggsMenu);
    }
}

EasterEggs.propTypes = {
    children: PropTypes.func,
    closeEdits: PropTypes.func,
    running: PropTypes.bool,
    intl: intlShape
};

const mapStateToProps = state => ({
    running: state.scratchGui.vmStatus.running
});

const mapDispatchToProps = dispatch => ({
    closeEdits: () => {
        dispatch(closeEditMenu());
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(EasterEggs));
