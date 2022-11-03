from typing import List, Set


def find_valid_outfit(items: Set['ClothingItem'], attribute_sets_to_match: List[Set['ItemAttribute']]) -> List['ClothingItem']:
    outfit: List['ClothingItem'] = []

    # Find a matching item for each required attribute_set
    for attr_set in attribute_sets_to_match:
        match_item = next((item for item in items if item.attributes.issuperset(attr_set)), None)
        if match_item is None:
            raise ValueError(f'Could not find item match for {attr_set}')
        outfit.append(match_item)
        items.remove(match_item) # This item is now part of the outfit, don't match it anymore
    return outfit


class ClothingItem:
    def __init__(self, attributes: Set['ItemAttribute']) -> None:
        self.attributes = attributes


class ItemAttribute:
    pass