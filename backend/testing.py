import api
import unittest
from flask import json

class MyTestCase(unittest.TestCase):
    #not a test, dont delete lines 7-9
    def setUp(self):
        api.app.testing = True
        self.app = api.app.test_client()

    #dummy test
    def test_list_int(self):
        """
        Test that it can sum a list of integers
        """
        data = [1, 2, 3]
        result = sum(data)
        self.assertEqual(result, 6)
    
    def test_add_item(self):
        request_data = {
            'user': 1,
            'item': {
                'name': 'item to test add-item',
                'attributes': ['something']
            }
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
            'user': 1,
        }
        response = self.app.post(
            '/dummy/Closet',
            data=json.dumps(request_data),
            content_type='application/json'
        )
        # user with id=1 should have this item from a previous test
        item_name_that_should_be_there_from_add_test = 'item to test add-item'
        json_items = response.get_json()
        self.assertTrue(
            any(
                item['name'] == item_name_that_should_be_there_from_add_test for item in json_items
            )
        )

    def test_gen_outfit(self):
        response = self.app.post(
            '/gen-outfit',
            data=json.dumps({'user': 1, 'zipcode': '01002'}),
            content_type='application/json'
        )

        # TODO: re-design test
        # For now, regardless of the weather, an outfit includes:
        # top + bottom + shoes
        resp_data = response.get_json()
        self.assertTrue(any('top' in item['tags'] for item in resp_data))
        self.assertTrue(any('bottom' in item['tags'] for item in resp_data))
        self.assertTrue(any('shoes' in item['tags'] for item in resp_data))
        

#running the class for testing, dont delete lines 21-22
if __name__ == '__main__':
    unittest.main()