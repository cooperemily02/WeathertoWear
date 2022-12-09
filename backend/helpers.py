def get_default_template_id_from_weather_str(weather_str: str, temp: int):
    if 'rain' in weather_str.lower():
        return 3
    if 'gym' in weather_str.lower():
        return 1
    if 'snow' in weather_str.lower():
        return 4
    if temp<45:
        return 6
    if temp>75:
        return 5
    return 2