import api
import unittest


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

#running the class for testing, dont delete lines 21-22
if __name__ == '__main__':
    unittest.main()