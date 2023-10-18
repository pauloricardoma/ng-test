import { combineReducers } from 'redux';

import auth from './Auth/Auth.reducer';
import account from './Account/Account.reducer';
import transaction from './Transaction/Transaction.reducer';
import theme from './Theme/Theme.reducer';

export const rootReducer = combineReducers({
  auth,
  account,
  transaction,
  theme,
});
