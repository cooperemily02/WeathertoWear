from typing import Set


def DEFAULT_OUTFIT_TEMPLATE():
    return [set(["top"]), set(["bottom"]), set(["shoes"])]


def DEFAULT_OUTFIT_TEMPLATE_SNOWY_RAINY():
    return [
        set(["top", "rainy"]),
        set(["bottom", "rainy"]),
        set(["shoes", "rainy"]),
        set(["outerwear"]),
    ]


# Right now, weather_str is supposed matches the weather.py file's output
def get_template_from_weather_str(weather_str):
    if "snow" in weather_str.lower():
        return DEFAULT_OUTFIT_TEMPLATE_SNOWY_RAINY()
    if "rain" in weather_str.lower():
        return DEFAULT_OUTFIT_TEMPLATE_SNOWY_RAINY()
    return DEFAULT_OUTFIT_TEMPLATE()


def get_matching_outfit(outfit_template, items: Set["Item"]):
    outfit = []
    while outfit_template:
        attr_set = outfit_template.pop()
        is_found_match = False
        for item in items:
            if all(required_attr in item.attributes for required_attr in attr_set):
                outfit.append(item)
                items.remove(
                    item
                )  # Item has been added to outfit, so remove it from items
                is_found_match = True
                break  # We are done with matching an item for the current attr_set
        if is_found_match:
            continue
        else:
            raise ValueError(f"Failed to find item matching: {attr_set}")
    return outfit


def pick_outfit(items: Set["Item"], weather_str):
    return get_matching_outfit(
        outfit_template=get_template_from_weather_str(weather_str), items=items
    )


class Item:
    def __init__(self, name, attributes):
        self.name = name
        self.attributes = attributes
