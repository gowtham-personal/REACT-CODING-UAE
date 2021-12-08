import React from "react";
import { shallow } from "enzyme";
import Header from "../../../screens/Header/views/header";
import { store } from "../../../store/store";
import { Provider } from "react-redux";

test("should test Header component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
