/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
import { getCategories, addCategory } from "services/categoriesService";

const mock = new MockAdapter(axios);

const categoryData = {
  categories: [
    { id: 1, text: "Category 1" },
    { id: 2, text: "Category 2" },
  ],
};

jest.mock("services/baseService", () => ({
  getRequest: jest.fn(),
  postRequest: jest.fn(),
}));

mock.onGet("/categories/").reply(200, categoryData);
mock.onPost("/categories").reply(200, categoryData);

describe("CategoriesService", () => {
  it("gets categories", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Get categories
    getCategories(success);

    // Verify that getRequest was called correctly
    expect(getRequest).toHaveBeenCalledWith("categories/", success, console.error);
  });

  it("posts a category", () => {
    // Create success and error spy functions
    const success = jest.fn();

    // Add category
    addCategory(success, "Wrestling", "And his name is JOHN CENA!");

    // Verify that postRequest was called correctly
    const categoryPost = {
      name: "Wrestling",
      description: "And his name is JOHN CENA!",
    };
    expect(postRequest).toHaveBeenCalledWith("categories", categoryPost, success, console.error);
  });
});
