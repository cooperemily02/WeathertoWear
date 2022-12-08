def get_default_template_id_from_weather_str(weather_str: str):
    if 'rain' in weather_str.lower():
        return 3
    if 'gym' in weather_str.lower():
        return 1
    return 2