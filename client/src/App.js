import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.scss";

import Layout from "./wrappers/Layout/Layout";

import Artist from "./containers/Artists/Artist/Artist";
import ArtistAdd from "./containers/Artists/ArtistAdd/ArtistAdd";
import ArtistEdit from "./containers/Artists/ArtistEdit/ArtistEdit";
import ArtistList from "./containers/Artists/ArtistList/ArtistList";
import Label from "./containers/Labels/Label/Label";
import LabelAdd from "./containers/Labels/LabelAdd/LabelAdd";
import LabelEdit from "./containers/Labels/LabelEdit/LabelEdit";
import LabelList from "./containers/Labels/LabelList/LabelList";
import Release from "./containers/Releases/Release/Release";
import ReleaseAdd from "./containers/Releases/ReleaseAdd/ReleaseAdd";
import ReleaseEdit from "./containers/Releases/ReleaseEdit/ReleaseEdit";
import ReleaseList from "./containers/Releases/ReleaseList/ReleaseList";
import Dashboard from "./containers/Dashboard/Dashboard";

//===============================================================================================================//

class App extends Component {
  render() {
    let appRoutes = (
      <Switch>
        <Route path={"/artists"} exact component={ArtistList} />
        <Route path={"/artists/new"} exact component={ArtistAdd} />
        <Route path={"/artists/:id"} exact component={withRouter(Artist)} />
        <Route path={"/artists/:id/edit"} exact component={ArtistEdit} />
        <Route path={"/labels"} exact component={LabelList} />
        <Route path={"/labels/new"} exact component={LabelAdd} />
        <Route path={"/labels/:id"} exact component={withRouter(Label)} />
        <Route path={"/labels/:id/edit"} exact component={LabelEdit} />
        <Route path={"/releases"} exact component={ReleaseList} />
        <Route path={"/releases/new"} exact component={ReleaseAdd} />
        <Route path={"/releases/:id"} exact component={withRouter(Release)} />
        <Route path={"/releases/:id/edit"} exact component={ReleaseEdit} />
        <Route path={"/"} exact component={Dashboard} />
      </Switch>
    );
    return <Layout>{appRoutes}</Layout>;
  }
}

//===============================================================================================================//

export default withRouter(App);
