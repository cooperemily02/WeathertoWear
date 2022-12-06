import requests
import sys
import datetime

WEATHER_API_KEY = "6d741a9fc1d14b66613a8bb0c8f7ceb3"


def get_forecast(zipcode: str) -> dict:
    """
    Get 5-day forecast in 3hr intervals using
    the OpenWeather api

    Returns:    {"timex": str, "tempx": int, "weatherx": str}
                where x == time entry in forecast
                e.g. 0 == time of call, 1 == 3+(time0)
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
        dt = day.get("dt")
        dt = str(datetime.datetime.fromtimestamp(dt))
        forecast["time" + str(i)] = dt
        temp = day.get("main").get("temp")
        forecast["temp" + str(i)] = int((temp - 273.15) * (9 / 5) + 32)
        forecast["weather" + str(i)] = day.get("weather")[0].get("main")
        # TODO breaking here to get one 3-hr interval, fix for 1.0
        break

    city = response.json().get("city").get("name")
    forecast["city_name"] = city
    return forecast


# for testing
if __name__ == "__main__":
    weather = get_forecast("01002")
    print(weather)
