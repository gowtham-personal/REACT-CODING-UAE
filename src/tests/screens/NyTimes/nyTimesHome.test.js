import React from "react";
import { shallow } from "enzyme";
import NyTimesHome from "../../../screens/NyTimes/views/nyTimesHome";
import { store } from "../../../store/store";
import { Provider } from "react-redux";

test("should test Home component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <NyTimesHome />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
