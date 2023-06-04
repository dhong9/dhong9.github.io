import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest, postRequest } from "services/baseService";
import { getContacts, addContact } from "services/emailService";

const mock = new MockAdapter(axios);

const contactsData = {
    contacts: [
        {id: 1, full_name: "Johnny Appleseed"},
        {id: 2, full_name: "Water Melon"}
    ]
};

jest.mock("services/baseService", () => ({
    getRequest: jest.fn(),
    postRequest: jest.fn()
}));

mock.onGet("/contacts").reply(200, contactsData);
mock.onPost("/contacts").reply(200, contactsData);

describe("EmailService", () => {
    it("gets contacts", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Get comments
        getContacts(success);

        // Verify that getRequest was called correctly
        expect(getRequest).toHaveBeenCalledWith('contacts', success, console.error);
    });

    it("sends emails", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Add contact
        addContact("Water Melon", "watermelon@summer.com", "Summer is here", "Can't wait to go to the pool!", success);

        // Verify that postRequest was called correctly
        const payload = {
            full_name: "Water Melon",
            email: "watermelon@summer.com",
            subject: "Summer is here",
            query_txt: "Can't wait to go to the pool!",
        }
        expect(postRequest).toHaveBeenCalledWith('contacts', payload, success, console.error);
    });
});