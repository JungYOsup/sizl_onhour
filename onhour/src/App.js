import { Route, Switch } from "react-router-dom";
import "./assets/css/root.css";
import Admin from "./routers/Admin";
import Landing from "./routers/authorization/Landing";
import Login from "./routers/authorization/Login";
import Register from "./routers/authorization/Register";
import CourseMake from "./routers/CourseMake";
import CourseManage from "./routers/CourseManage";
import management from "./routers/management";
import ContentManage from "./routers/admin/Edit/Contents/ContentManage";
import SideNavigation from "./components/SideNavigation";
import CategoryManage from "./routers/admin/Edit/Category/CategoryManage";
import PlayListManage from "./routers/admin/PlayList/PlayListManage";
import MemberManage from "./routers/admin/Member/MemberManage";
import BannerManage from "./routers/admin/Banner/BannerManage";
import ContentsModifies from "./routers/admin/Edit/Modifies/ContentsModifies";
import ContentsMakes from "./routers/admin/Edit/Make/ContentsMakes";
// swich는 swich문 생각하면 되겠다. switch문 할때 어떤 조건과 일치하면 그것만 나오고 나머지는 안나오잖아.
// 근데 그 조건이 맨 마지막과 일치하면, 처음 두번째도 나오고 맨 마지막도 나오게 된다.
// path와 일치 하는(정확하게 일치가 아닌 합집합?일때) 첫번째 컴포넌트가 발견되면 나머지는 다 버려버린다.

// 중첩 네비게이션을 활용해보자

function App() {
  return (
    <div>
      {/* login */}
      <Route path="/" exact component={Landing}></Route>
      <Route path="/authorization/register" component={Register}></Route>
      <Route path="/authorization/login" component={Login}></Route>

      {/* user */}

      <Switch>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/course_make" component={CourseMake}></Route>
        <Route path="/course_manage" component={CourseManage}></Route>
        <Route path="/management" component={management}></Route>
      </Switch>

      <div id="admin">
        <SideNavigation />
        <Switch>
          {/* admin */}
          <Route
            path="/admin/Edit/content_manage"
            component={ContentManage}
          ></Route>
          <Route
            path="/admin/Edit/category_manage"
            component={CategoryManage}
          ></Route>
          <Route
            path="/admin/PlayList/play_list_manage"
            component={PlayListManage}
          ></Route>
          <Route
            path="/admin/Banner/banner_manage"
            component={BannerManage}
          ></Route>
          <Route
            path="/admin/Member/member_manage"
            component={MemberManage}
          ></Route>
          {/* modify */}
          <Route
            path="/admin/Edit/content_edit"
            component={ContentsModifies}
          ></Route>
          {/* make */}
          <Route
            path="/admin/Edit/mediatool_manage"
            page={1}
            component={ContentsMakes}
          ></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
