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
            '/dummy/addClothingItem',
            data=json.dumps(request_data),
            content_type='application/json'
        )
        #TODO: add an assertion that the item was actually added (bit of a hassle because)
        self.assertEqual(response.status_code, 200)

#running the class for testing, dont delete lines 21-22
if __name__ == '__main__':
    unittest.main()