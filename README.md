# ISIN Code

The ISIN Code VS Code extension displays the name and type of an ISIN code.

## Features

📟 Displays the name and type of an ISIN code on hover.

![isin-code](https://user-images.githubusercontent.com/2587348/47117786-a2d1fa00-d265-11e8-8e87-742caba85812.gif)

## Open FIGI API and rate limiting

The extension makes use of the [OpenFIGI API](https://openfigi.com/api) to retrieve information based on
an ISIN Code.

The API has a rate limiting policy:

| Type of limitation                            | Without API Key | With API Key |
| --------------------------------------------- | --------------- | ------------ |
| Number of requests you could make per minute  | 5               |         250  |

If you wish to get an API Key, [sign-up to OpenFIGI](https://openfigi.com/user/signup) (free, requires an
institutional email adress, i.e. no GMail) and go to the [API page](https://openfigi.com/api#api-key): your
API Key will be displayed.

## Extension Settings

* `isin-code.OpenFIGIAPIKey`: Add your OpenFIGI API Key.

## Known Issues

## Release Notes

### 0.0.2

- Removed unnecessary regex match for better performance
- Added more file types (Python, R)

### 0.0.1

Functional hover box with basic info on ISIN code 🎉
