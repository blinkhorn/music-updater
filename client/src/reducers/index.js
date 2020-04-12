import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import artist from './artist';
import label from './label';

export default combineReducers({
    alert,
    auth,
    artist,
    label
});
