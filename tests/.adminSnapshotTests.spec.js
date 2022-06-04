import React, {} from 'react';
import AdminHome  from '../src/components/admin-components/admin-home.component';
const renderer = require('react-test-renderer');


describe("Snapshot testing sample", () => {
    test("Snapshot testing of AdminHome component", () => {
      const renderedComponent = renderer.create(<AdminHome />).toJSON();
      expect(renderedComponent).toMatchSnapshot();
    });
  });
  