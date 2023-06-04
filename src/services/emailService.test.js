import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRequest } from "services/baseService";
import { getContacts } from "services/emailService";

const mock = new MockAdapter(axios);

const contactsData = {
    contacts: [
        {id: 1, full_name: "Johnny Appleseed"},
        {id: 2, full_name: "Water Melon"}
    ]
};

jest.mock("services/baseService", () => ({
    getRequest: jest.fn()
}));

mock.onGet("/contacts").reply(200, contactsData);

describe("EmailService", () => {
    it("gets contacts", () => {
        // Create success and error spy functions
        const success = jest.fn();

        // Get comments
        getContacts(success);

        // Verify that getRequest was called correctly
        expect(getRequest).toHaveBeenCalledWith('contacts', success, console.error);
    })
});