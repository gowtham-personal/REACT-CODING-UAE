import React from "react";
import { shallow } from "enzyme";
import Login from "../../../screens/Login/views/login";
import { store } from "../../../store/store";
import { Provider } from "react-redux";

test("should test Login component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
