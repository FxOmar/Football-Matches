## Setup & Run

Before you start your json-server you have to add `routes.json` file:

```json
{
  "/api/*/_search?*=:searchstring": "/$1/?$2_like=:searchstring",
  "/api/*": "/$1"
}
```

After you added `routes.json` run this command to run json-server:

```bash
json-server db.json --routes routes.json
```

Clone this repo:

```bash
  git clone https://github.com/FxOmar/Elbotola-Interview-assignment.git
```

Go to `nextJS` folder and run these commands:

```bash
# to install the dependencies
yarn install
# run nextJs server
yarn dev
```

## Tech Stack

**Client:** NextJs, Typescript, MUI

**Server:** Node, json-server

## Author

- [@omarchadidi](https://www.github.com/FxOmar)
