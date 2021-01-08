import { Route, Switch } from "react-router-dom";
import Admin from "./routers/Admin";
import Landing from "./routers/authorization/Landing";
import Login from "./routers/authorization/Login";
import Register from "./routers/authorization/Register";
import Course_make from "./routers/Course_make";
import Navigation from "./components/Navigation";
import Course_manage from "./routers/Course_manage";
import management from "./routers/management";
import Content_manage from "./routers/admin/Edit/Content_manage";
import SideNavigation from "./components/SideNavigation";
// swich는 swich문 생각하면 되겠다. switch문 할때 어떤 조건과 일치하면 그것만 나오고 나머지는 안나오잖아.
// 근데 그 조건이 맨 마지막과 일치하면, 처음 두번째도 나오고 맨 마지막도 나오게 된다.
// path와 일치 하는(정확하게 일치가 아닌 합집합?일때) 첫번째 컴포넌트가 발견되면 나머지는 다 버려버린다.

// 중첩 네비게이션을 활용해보자

function App() {
  return (
    <div>
      <Switch>
        {/* login */}
        <Route path="/" exact component={Landing}></Route>
        <Route path="/authorization/register" component={Register}></Route>
        <Route path="/authorization/login" component={Login}></Route>
      </Switch>

      {/* user */}

      <Navigation />
      <Switch>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/course_make" component={Course_make}></Route>
        <Route path="/course_manage" component={Course_manage}></Route>
        <Route path="/management" component={management}></Route>
      </Switch>

      <SideNavigation />
      <Route
        path="/admin/Edit/content_manage"
        component={Content_manage}
      ></Route>
    </div>
  );
}

export default App;
