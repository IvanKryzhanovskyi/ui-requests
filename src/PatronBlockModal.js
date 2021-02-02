import { take, orderBy, isObject } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Col,
  Modal,
  Row
} from '@folio/stripes/components';

const PatronBlockModal = ({
  open,
  onClose,
  patronBlocks,
  automatedPatronBlocks,
  viewUserPath,
  stripes,
  onOverride,
}) => {
  const orderedPatronBlocks = orderBy(patronBlocks, ['metadata.updatedDate'], ['desc']);
  const blocks = [...automatedPatronBlocks, ...orderedPatronBlocks];
  const canOverridePatronBlocks = stripes.hasPerm('ui-users.overridePatronBlock');

  const blocksToRender = take(blocks, 3).map(block => {
    return (
      <Row>
        <Col xs>
          <b>{ isObject(block) ? (block.desc || '') : block }</b>
        </Col>
      </Row>
    );
  });

  return (
    <Modal
      data-test-patron-block-modal
      open={open}
      dismissible
      onClose={onClose}
      label={
        <b>
          {' '}
          <FormattedMessage id="ui-requests.blockModal" />
        </b>
      }
    >
      <Row>
        <Col xs>
          <FormattedMessage id="ui-requests.blockedLabel" />
          :
        </Col>
      </Row>
      {blocksToRender}
      <br />
      <Row>
        <Col xs={6}>{(blocks.length > 3) && <FormattedMessage id="ui-requests.additionalReasons" />}</Col>
        <Col xs={6}>
          <Row end="xs">
            <Col>
              {canOverridePatronBlocks &&
                <Button onClick={onOverride}>
                  <FormattedMessage id="ui-requests.override" />
                </Button>
              }
              <Button onClick={onClose}><FormattedMessage id="ui-requests.close" /></Button>
              <Button buttonStyle="primary" onClick={viewUserPath}><FormattedMessage id="ui-requests.detailsButton" /></Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

PatronBlockModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  patronBlocks: PropTypes.arrayOf(PropTypes.object),
  automatedPatronBlocks: PropTypes.arrayOf(PropTypes.string),
  viewUserPath: PropTypes.func,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired,
  }),
  onOverride: PropTypes.func.isRequired,
};

export default PatronBlockModal;
