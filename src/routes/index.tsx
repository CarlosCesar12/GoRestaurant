import { Switch, Route } from "react-router-dom";
import { FoodProvider } from "../hooks/useFoods";

import { Dashboard } from "../pages/Dashboard";

const Routes = () => (
  <Switch>
    <FoodProvider>
      <Route path="/" exact component={Dashboard} />
    </FoodProvider>
  </Switch>
);

export default Routes;
