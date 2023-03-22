import React,{Component} from "react";
import { withRouter } from "react-router-dom";


class AuthVerify extends Component {
    constructor(props) {
      super(props);
      props.history.listen(() => {
        const token = JSON.parse(sessionStorage.getItem("TOKEN"));
        if (token) {
          const decodedDate = new Date(token.time);
          if (decodedDate < Date.now()) {
            props.logOut();
          }
        }
      });
    }
  
    render() {
      return <div></div>;
    }
  }
export default withRouter(AuthVerify);