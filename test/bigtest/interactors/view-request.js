import {
  interactor,
  isPresent,
  clickable,
  selectable,
  attribute,
} from '@bigtest/interactor';

import { contains } from './helpers';

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class HeaderDropdownMenu {
  clickCancel = clickable('#clickable-cancel-request');
  clickEdit = clickable('#clickable-edit-request');
  clickDuplicate = clickable('#duplicate-request');
}

@interactor class CancelRequestDialog {
  clickConfirm = clickable('[data-test-confirm-cancel-request]');
  clickCancel = clickable('[data-test-cancel-cancel-request]');
  chooseReason = selectable('[data-test-select-cancelation-reason]');
}

@interactor class ItemAccordion {
  isExpanded = attribute('#accordion-toggle-button-item-info', 'aria-expanded') === 'true';
}

@interactor class ViewRequestInteractor {
  headerDropdown = new HeaderDropdown('[class*=paneHeaderCenterInner---] [class*=dropdown---]');
  headerDropdownMenu = new HeaderDropdownMenu();
  itemAccordion = new ItemAccordion('#item-info');
  cancelRequestDialog = new CancelRequestDialog('[data-test-cancel-request-modal]');
  requestSectionPresent = isPresent('#request-info');
  requesterSectionPresent = isPresent('#requester-info');
  requesterInfoContains = contains('#requester-info');
  requestInfoContains = contains('#request-info');

  itemAccordionClick = clickable('#accordion-toggle-button-item-info');
}

export default new ViewRequestInteractor();
