/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Changes the list_create block to use a +/- mutator UI.
 */

import Blockly from 'blockly/core';
import { createPlusField } from './field_plus';
import { createMinusField } from './field_minus';

/* eslint-disable quotes */
Blockly.defineBlocksWithJsonArray([
    {
        "type": "create_particles_test",
        "message0": "create %1 particles %2",
        "args0": [
            {
                "type": "field_number",
                "name": "NUM_PARTICLES",
                "value": 100
            },
            {
                "type": "input_dummy",
                "name": "EMPTY"
            }
        ],
        "colour": "#CC3366",
        "previousStatement": null,
        "nextStatement": null,
        "helpUrl": "%{BKY_LISTS_CREATE_WITH_HELPURL}",
        "tooltip": "creates particles with unpacking view",
        "mutator": "create_particle_mutator",
    },
]);
/* eslint-enable quotes */

const createParticleMutator = {
    /**
     * Boolean of item inputs the block has.
     * @type {boolean}
     */
    expanded_: false,

    /**
     * Creates XML to represent number of text inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.expanded_);
        return container;
    },
    /**
     * Parses XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        const unpackState = parseInt(xmlElement.getAttribute('items'));
        this.updateShape_(unpackState);
    },

    /**
     * Adds inputs to the block until it reaches the target number of inputs.
     * @param {boolean} unpackState The target number of inputs for the block.
     * @this {Blockly.Block}
     * @private
     */
    updateShape_: function (unpackState) {
        this.updateSymbol_(unpackState);
    },

    /**
     * Callback for the plus image. Adds an input to the end of the block and
     * updates the state of the minus.
     */
    plus: function () {
        this.addPart_();
        this.updateSymbol_(this.expanded_);
    },

    /**
     * Callback for the minus image. Removes an input from the end of the block
     * and updates the state of the minus.
     */
    minus: function () {
        if (this.expanded_ === false) {
            return;
        }
        this.removePart_();
        this.updateSymbol_(this.expanded_);
    },

    // To properly keep track of indices we have to increment before/after adding
    // the inputs, and decrement the opposite.
    // Because we want our first input to be ADD0 (not ADD1) we increment after.

    /**
     * Adds an input to the end of the block. If the block currently has no
     * inputs it updates the top 'NUM_PARTICLES' input to receive a block.
     * @this {Blockly.Block}
     * @private
     */
    addPart_: function () {
        if (this.expanded_ === false) {
            this.topInput_ = 
                this.appendDummyInput('INPUT_TYPE')
                    .appendField('type')
                    .appendField(new Blockly.FieldDropdown([
                        ['water', 'WATER'],
                        ['ink', 'INK']
                    ]), 'PARTICLE');
                this.appendDummyInput('INPUT_COLOR')
                    .appendField('color')
                    .appendField(new Blockly.FieldDropdown([
                        ['red', 'RED'],
                        ['yellow', 'YELLOW'],
                        ['green', 'GREEN'],
                        ['blue', 'BLUE']
                    ]), 'COLOR');
                this.appendDummyInput('INPUT_SIZE')
                    .appendField('size')
                    .appendField(new Blockly.FieldDropdown([
                        ['small', 'SMALL'],
                        ['medium', 'MEDIUM'],
                        ['big', 'BIG']
                    ]), 'SIZE')
            this.getInput('EMPTY').removeField('PLUS')
        }
        this.expanded_ = true;
    },

    /**
     * Removes an input from the end of the block. If we are removing the last
     * input this updates the block to have an 'NUM_PARTICLES' top input.
     * @this {Blockly.Block}
     * @private
     */
    removePart_: function () {
        this.removeInput('INPUT_TYPE');
        this.removeInput('INPUT_COLOR');
        this.removeInput('INPUT_SIZE');
        this.expanded_ = false;
    },

    /**
     * Makes it so the minus is visible iff there is an input available to remove.
     * @private
     */
    updateSymbol_: function (unpackState) {
        const minusField = this.getField('MINUS');
        const plusField = this.getField('PLUS');
        if (unpackState === false) {
            if(minusField)
            {
                this.getInput('EMPTY').removeField('MINUS');
            }
            if(!plusField)
            {
                this.getInput('EMPTY').insertFieldAt(0, createPlusField(), 'PLUS');

            }
        } 
        else if (unpackState === true) {
            if(plusField)
            {
                this.getInput('EMPTY').removeField('PLUS');
            }
            if(!minusField)
            {
                this.getInput('EMPTY').insertFieldAt(0, createMinusField(), 'MINUS');
            }
        }
    }
};

/**
 * Updates the shape of the block to have 3 inputs if no mutation is provided.
 * @this {Blockly.Block}
 */
const createParticleHelper = function () {
    this.updateShape_(this.expanded_);
};

Blockly.Extensions.registerMutator('create_particle_mutator',
    createParticleMutator, createParticleHelper);
