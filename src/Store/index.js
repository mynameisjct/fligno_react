import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../Reducer';
import thunk from 'redux-thunk';

// export let store;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','userid','customMessage']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () =>{
    let store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(store)

    return {store, persistor}
}

// export default function configureStore(){
//     store = createStore(
//         rootReducer,
//         initialState,
//         applyMiddleware(thunk)
//     );

//     return store;
// }