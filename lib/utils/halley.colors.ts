/**
 * Halley colors is an add-on that allow you to colour a part of an string
 */

'use strict';

export type HColorsSelection = "cyan";

export class HColors {

    private originalMessage: string;
    private partToColor: string;

    /**
     * Print a message of some color
     * 
     * @param {string} originalMessage The `originalMessage`, where a part of this message will be colored
     * @param {string} partToColor The part of the `originalMessage` that will be colored
     */
    constructor(originalMessage: string, partToColor: string) {
        // Check if the originalMessage include the part to be colored
        if (!originalMessage.includes(partToColor)) {
            throw new TypeError("The original Message not includes the part that want apply the color!");
        };

        // Avoiding to reassign parameter
        const originalMessageReplaced = originalMessage.replace(partToColor, "");

        // Initialize the class properties
        this.originalMessage = originalMessageReplaced;
        this.partToColor = partToColor;
    }

    /**
     * 
     * @param {HColorsSelection} options 
     * @returns The originalMessage printed with the color indicated
     */
    print(options: HColorsSelection) {

        if (options === "cyan") this.partToColor = `\x1b[36m${this.partToColor}\x1b[0m`;

        return `${this.originalMessage}${this.partToColor}`;
    };
};