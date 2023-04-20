# ☎️  Belebel EC Project Client 

[![linter](https://github.com/viven-inc/belebel-ec-client/actions/workflows/linter.yml/badge.svg)](https://github.com/viven-inc/belebel-ec-client/actions/workflows/linter.yml)

## Environment

| Environment                                  | Branch        | URL                                  | Basic Auth                                                                 |
| -------------------------------------------- | ------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| (@cinchan-viven is Preparing now🏃)production | `v0.X.X`      | https://www.belmate.site             | [Yes](https://github.com/viven-inc/belebel-ec-client#basic-authentication) |
| (@cinchan-viven is Preparing now🏃)staging    | `main`        | https://staging.belmate.site         | [Yes](https://github.com/viven-inc/belebel-ec-client#basic-authentication) |
| developmoent                                 | `development` | https://www.development.belmate.site | [Yes](https://github.com/viven-inc/belebel-ec-client#basic-authentication) |


## Basic Authentication
- [1Password Link](https://share.1password.com/s#psXty-QX0M1zCyCJFf7VjEA9nBV5PfPFeV8gp7xiqLw)

## Getting Started

1. Download `.env` File from [this link](https://share.1password.com/s#Ug6wm308dZ6CLbO6TSwu04WI1mwm3neG9-hpHAXTi50)

2. In the root directory, please run 

```
yarn 
```

3. Run 

```
yarn start
```

## Call the Postman Request
- Set [env](https://share.1password.com/s#8OSeif2CBBHytl2OcynhpZMF2aw1I_GNc_ICgeqctL0) in Sidebar Menu, `development` Environments 


## File Structure
```
------- public 
    |--- src 
        |--- assets
            |--- imgs
            |--- icons
            |--- json
            |--- locales // Multi language resource files
                |--- en
                    |--- translation.json
                |--- ja
                    |--- translation.json
        |--- build
        |--- components
        |--- constants
        |--- modules
        |--- pages
            |--- home
                |--- components
                |--- index.tsx
        |--- queries
        |--- states //(Recoil Atoms)
        |--- themes
        |--- types
        |--- UILibrary
        |--- App.tsx // Implement all providers
        |--- Body.tsx // Implement layout and routing
```
