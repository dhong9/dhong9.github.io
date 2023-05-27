import React from "react";
import {configure, shallow} from "enzyme";
import chai, {expect} from "chai";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import DHComments from "components/DHComments";
configure({
   adapter: new Adapter()
});
describe("Testin <DHComments/> Component", () => {
   it("App renders a message", () => {
      const wrapper = shallow(<DHComments />);
      const message = <p>Edit <code>src/App.js</code> and save to   reload.</p>;
      expect(wrapper).to.contain(message);
   });
   chai.use(chaiEnzyme());
});