import requests
import sys

WEATHER_API_KEY = "6d741a9fc1d14b66613a8bb0c8f7ceb3"


def get_forecast(zipcode: str) -> dict:
    """
    Returns 5-day forecast in 3hr intervals using
    the OpenWeather api
    Note: zipcode must be str bc ints cannot start with 0
    """

    url = (
        "https://api.openweathermap.org/data/2.5/forecast?zip="
        + zipcode
        + ",us&appid="
        + WEATHER_API_KEY
    )

    response = requests.get(url)
    days = response.json().get("list")

    forecast = {}
    for i, day in enumerate(days):
        forecast["day" + str(i)] = day.get("dt")
        forecast["temp" + str(i)] = day.get("main").get("temp")
        forecast["weather" + str(i)] = day.get("weather")[0].get("main")
    return forecast



# for testing
if __name__ == "__main__":
    weather = get_forecast("01002")
    print(weather)
