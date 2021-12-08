import React from "react";
import { shallow } from "enzyme";
import SignUp from "../../../screens/Login/views/signup";
import { store } from "../../../store/store";
import { Provider } from "react-redux";

test("should test Signup component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
