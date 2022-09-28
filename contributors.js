import { Halley } from "./dist/core/halley.js"
import * as HalleyTypes from "./dist/types/halley.types.js"
import { HRouter as HalleyRouter } from "./dist/core/router/halley.router.js"
import * as RouterTypes from "./dist/types/router.types.js"
import { HColors } from "./dist/utils/halley.colors.js"
import * as HColorsTypes from "./dist/types/HColors.types.js"

let contributors = {
    "main_developers": {
        "Raxabi": {
            "Contributions": {
                "Core": [Halley],
                "Router": [HalleyRouter],
                "HColors": [HColors],
                "types": [
                    [HalleyTypes],
                    [RouterTypes],
                    [HColorsTypes]
                ],
                "Main Committer": "Literally Me"
            }
        }
    }
}