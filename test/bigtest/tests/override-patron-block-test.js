import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import NewRequest from '../interactors/new-request';
import ViewRequest from '../interactors/view-request';

const RequestForm = new NewRequest();
const ViewRequestPage = new ViewRequest();

describe('Override patron block', () => {
  let user;
  let item;
  let servicePoint;

  setupApplication({
    scenarios: ['automatedPatronBlocks'],
  });

  beforeEach(async function () {
    user = this.server.create('user', {
      barcode: '9676761472501',
    });

    item = this.server.create('item', {
      barcode: '111',
      title: 'Best Book Ever',
      materialType: {
        name: 'book',
      },
    });

    servicePoint = this.server.create('service-point');

    this.visit('/requests?layer=create');

    await RequestForm
      .fillItemBarcode(item.barcode)
      .clickItemEnterBtn()
      .fillUserBarcode(user.barcode)
      .clickUserEnterBtn()
      .whenReady();
  });

  it('should show patron block modal', () => {
    expect(RequestForm.patronBlockModal.isPresent).to.be.true;
  });

  it('should show override button', () => {
    expect(RequestForm.patronBlockModal.overrideButton.isPresent).to.be.true;
  });

  describe('click override button', () => {
    beforeEach(async () => {
      await RequestForm.patronBlockModal.overrideButton.click();
    });

    it('should hide patron block modal', () => {
      expect(RequestForm.patronBlockModal.isPresent).to.be.false;
    });

    describe('enter patrons barcode', () => {
      beforeEach(async () => {
        await RequestForm
          .whenServicePointIsPresent()
          .chooseServicePoint(servicePoint.name)
          .clickNewRequest();
        await ViewRequestPage.isPresent;
      });

      it('should create a new request after overriding patron blocks', () => {
        expect(ViewRequestPage.requestSectionPresent).to.be.true;
        expect(ViewRequestPage.requesterSectionPresent).to.be.true;
      });
    });
  });
});
