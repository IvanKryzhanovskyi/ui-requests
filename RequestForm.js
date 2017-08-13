import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form';

import Button from '@folio/stripes-components/lib/Button';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Select from '@folio/stripes-components/lib/Select';
import TextField from '@folio/stripes-components/lib/TextField';
import stripesForm from '@folio/stripes-form';

class RequestForm extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    onCancel: PropTypes.func,
    initialValues: PropTypes.object,
  //  okapi: PropTypes.object,
    optionLists: PropTypes.shape({
      requestTypes: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {
      handleSubmit,
      reset,  // eslint-disable-line no-unused-vars
      pristine,
      submitting,
      onCancel,
      initialValues,
      optionLists,
    } = this.props;

    const addRequestFirstMenu = <PaneMenu><Button onClick={onCancel} title="close" aria-label="Close New Request Dialog"><span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span></Button></PaneMenu>;
    const addRequestLastMenu = <PaneMenu><Button type="submit" title="Create New Request" disabled={pristine || submitting} onClick={handleSubmit}>Create Request</Button></PaneMenu>;
    const editRequestLastMenu = <PaneMenu><Button type="submit" title="Update Request" disabled={pristine || submitting} onClick={handleSubmit}>Update Request</Button></PaneMenu>;
    const requestTypeOptions = (optionLists.requestTypes || []).map(t => ({
      label: t.label, value: t.id }));

    return (
      <form id="form-requests" style={{ height: '100%', overflow: 'auto' }}>
        <Paneset isRoot>
          <Pane defaultWidth="100%" firstMenu={addRequestFirstMenu} lastMenu={false ? editRequestLastMenu : addRequestLastMenu} paneTitle={false ? 'Edit request' : 'New request'}>
            <Row>
              <Col sm={5} smOffset={1}>
                <h2>Request record</h2>
                  <Field
                    label="Request Type *"
                    name="requestType"
                    component={Select}
                    fullWidth
                    dataOptions={[{ label: 'Select request type', value: '' }, ...requestTypeOptions]}
                  />
                  <fieldset>
                    <legend>Item info *</legend>
                    <Row>
                      <Col xs={9}>
                        <Field
                          name="item.identifier"
                          placeholder={'Enter item barcode'}
                          aria-label="Item barcode"
                          fullWidth
                          component={TextField}
                        />
                      </Col>
                      <Col xs={3}>
                        <Button
                          buttonStyle="primary noRadius"
                          fullWidth
                          onClick={console.log('noop')}
                          disabled={submitting}
                        >Select item</Button>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset>
                    <legend>Requester info *</legend>
                    <Row>
                      <Col xs={9}>
                        <Field
                          name="requester.identifier"
                          placeholder={'Enter requester barcode'}
                          aria-label="Requester barcode"
                          fullWidth
                          component={TextField}
                        />
                      </Col>
                      <Col xs={3}>
                        <Button
                          buttonStyle="primary noRadius"
                          fullWidth
                          onClick={console.log('noop')}
                          disabled={submitting}
                        >Select requester</Button>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset>
                    <legend>Request details</legend>
                    <Field
                      name="requestExpirationDate"
                      label='Request expiration date'
                      aria-label="Request expiration date"
                      component={Datepicker}
                    />
                    <Field
                      name="holdShelfExpirationDate"
                      label='Hold shelf expiration date'
                      aria-label="Hold shelf expiration date"
                      component={Datepicker}
                    />
                  </fieldset>
              </Col>
            </Row>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'requestForm',

  navigationCheck: true,
})(RequestForm);
