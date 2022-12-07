import api
import unittest
from flask import json
from models import ItemTemplate, ClothingItem


class MyTestCase(unittest.TestCase):
    # not a test, dont delete lines 7-9
    def setUp(self):
        api.app.testing = True
        self.app = api.app.test_client()

    # dummy test
    def test_list_int(self):
        """
        Test that it can sum a list of integers
        """
        data = [1, 2, 3]
        result = sum(data)
        self.assertEqual(result, 6)
    
    def test_add_item(self):
        request_data = {
            "user": 1,
            "item": {"name": "item to test add-item", "attributes": ["something"]},
        }
        response = self.app.post(
            '/dummy/clothingItem',
            data=json.dumps(request_data),
            content_type='application/json'
        )
        #TODO: add an assertion that the item was actually added (bit of a hassle because)
        self.assertEqual(response.status_code, 200)
    
    
    def test_get_users_items(self):
        request_data = {
            "user": 1,
        }
        response = self.app.post(
            "/dummy/Closet",
            data=json.dumps(request_data),
            content_type="application/json",
        )
        # user with id=1 should have this item from a previous test
        item_name_that_should_be_there_from_add_test = "item to test add-item"
        json_items = response.get_json()
        self.assertTrue(
            any(
                item["name"] == item_name_that_should_be_there_from_add_test
                for item in json_items
            )
        )

    def test_gen_outfit(self):
        response = self.app.post(
            "/gen-outfit",
            data=json.dumps({"user": 1, "zipcode": "01002"}),
            content_type="application/json",
        )

        resp_data = response.get_json()
        #TODO: add test checks that each item satisfies the 'item_template' with it (idk how to test the DB)

        assert(response.status_code == 200)

    def test_get_outfit_templates(self):
        response = self.app.post(
            "/outfit-templates",
            data=json.dumps({"user": 1}),
            content_type="application/json",
        )
        assert(any(
            "Gym Outfit" in template['name'] for template in response.get_json()
        ))
    

    def test_get_item_from_template(self):
        response = self.app.post(
            "/item-from-template",
            data=json.dumps({"user": 1, "item_template": 1, "excluded_item": 1}),
            content_type="application/json",
        )
        #TODO: this test relies on init_db not changing much, re-factor
        # or ignore if it fails because of that
        assert(response.get_json()['id'] == 9)
        # This should give an error, as the excluded '9' is the only thing matching template '1'.
        try:
            response = self.app.post(
                "/item-from-template",
                data=json.dumps({"user": 1, "item_template": 1, "excluded_item": 9}),
                content_type="application/json",
            )
            assert(False) # The error should happen before this point
        except ValueError:
            pass

# running the class for testing, dont delete lines 21-22
if __name__ == "__main__":
    unittest.main()
