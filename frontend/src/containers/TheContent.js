import React, { Suspense, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import IdleTimer from "../IdleTimer";
// routes config
import innerRoutes from "../routes/DashboardRoutes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const [isTimeout, setIsTimeout] = React.useState(false);

  let history = useHistory();

  React.useEffect(() => {
    const timer = new IdleTimer({
      timeout: 600, //expire after 10 seconds
      onTimeout: () => {
        setIsTimeout(true);
        sessionStorage.clear();
        // window.location.href='/login'
        history.push("/login");
        console.log("timed out");
        //
      },
      onExpired: () => {
        setIsTimeout(true);
        //do something if expired on load
        sessionStorage.clear();
        history.push("/login");
        console.log("expired");
      },
    });
    return () => {
      timer.cleanUp();
    };
  }, [history]);

  return (
    <main className="c-main">
      <CContainer>
        <Suspense fallback={loading}>
          <Switch>
            {innerRoutes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            {/* {isTimeout && <Redirect to="/login"/>} */}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
