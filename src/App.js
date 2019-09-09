import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './Store';
import Container from './Component/Container/Container';
import {PersistGate} from 'redux-persist/integration/react';

// const store = configureStore();

const {persistor,store} = configureStore();

class App extends Component{
  render(){
    return(
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container/>
        </PersistGate>
      </Provider>
    );
  }
}


export default App;





















// import React, {Component} from 'react';
// import Container from './Component/Container/Container.js';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   console.log('last');
//   return (
//     /*
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//     */
   
// // input cases here to redirect login or not

//     <Container/>
    
//   );
// }

// export default App;
