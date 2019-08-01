import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import * as Pages from "./pages";
import store, { history, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Pages.LoginPage} />
          <Route path="/user/create" exact component={Pages.CreateUserPage} />
          <Route path="/encarte/upload" exact component={Pages.EncarteUpload} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Container>
//         <Row>
//           <Col>
//             <Login />
//           </Col>
//         </Row>
//         <header className="App-header">
//           <ImageMapper
//             image={
//               "https://http2.mlstatic.com/promoco-encarte-de-mercadoloja-30x42-1000-unid-4x4-D_NQ_NP_115601-MLB20347782124_072015-F.webp"
//             }
//           />
//         </header>
//       </Container>
//     );
//   }
// }

export default App;
