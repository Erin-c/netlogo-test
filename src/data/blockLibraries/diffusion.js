export let diffusionLibrary = {};

diffusionLibrary.content = {
    "categories": [
        {
            "kind": "category",
            "name": "Diffusion",
            "colour": "#CC3366",
            "contents": [
                // {
                //     "kind": "block",
                //     "type": "create_particles"
                // },
                {
                    "kind": "block",
                    "type": "create_particles_test"
                },
                {
                    "kind": "block",
                    "type": "for_each_particle"
                },
                {
                    "kind": "block",
                    "type": "set_mass"
                },
                {
                    "kind": "block",
                    "type": "set_color"
                },
                {
                    "kind": "block",
                    "type": "set_size"
                },
                {
                    "kind": "block",
                    "type": "bounce"
                },
                {
                    "kind": "block",
                    "type": "move"
                },
                {
                    "kind": "block",
                    "type": "collision"
                },
                {
                    "kind": "block",
                    "type": "add_ink"
                },
                {
                    "kind": "block",
                    "type": "change_temp"
                }
            ]
        }
    ],
        "blocks":
    [{
        "type": "create_particles",
        "message0": "create %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "NUM",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "AGENT",
                "options": [
                    [
                        "water particles",
                        "WATER_PARTICLE"
                    ],
                    [
                        "ink particles",
                        "INK_PARTICLE"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "unpack_particles",
        "message0": "type %1 %2 size %3 %4 mass %5 %6 color %7",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PARTICLE",
                "options": [
                    [
                        "water",
                        "WATER"
                    ],
                    [
                        "ink",
                        "INK"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "small",
                        "SMALL"
                    ],
                    [
                        "medium",
                        "MEDIUM"
                    ],
                    [
                        "big",
                        "BIG"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "MASS",
                "value": 1,
                "min": 0,
                "max": 5
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    [
                        "red",
                        "RED"
                    ],
                    [
                        "yellow",
                        "YELLOW"
                    ],
                    [
                        "green",
                        "GREEN"
                    ],
                    [
                        "blue",
                        "BLUE"
                    ]
                ]
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    // {
    //     "type": "create_particles_test1",
    //     "message0": "create %1 particles %2 size %3 %4 mass %5 %6 color %7",
    //     "args0": [
    //         {
    //             "type": "field_number",
    //             "name": "NAME",
    //             "value": 100
    //         },
    //         {
    //             "type": "input_dummy"
    //         },
    //         {
    //             "type": "field_dropdown",
    //             "name": "SIZE",
    //             "options": [
    //                 [
    //                     "small",
    //                     "SMALL"
    //                 ],
    //                 [
    //                     "medium",
    //                     "MEDIUM"
    //                 ],
    //                 [
    //                     "big",
    //                     "BIG"
    //                 ]
    //             ]
    //         },
    //         {
    //             "type": "input_dummy"
    //         },
    //         {
    //             "type": "field_number",
    //             "name": "MASS",
    //             "value": 1,
    //             "min": 0,
    //             "max": 5
    //         },
    //         {
    //             "type": "input_dummy"
    //         },
    //         {
    //             "type": "field_dropdown",
    //             "name": "COLOR",
    //             "options": [
    //                 [
    //                     "red",
    //                     "RED"
    //                 ],
    //                 [
    //                     "yellow",
    //                     "YELLOW"
    //                 ],
    //                 [
    //                     "green",
    //                     "GREEN"
    //                 ],
    //                 [
    //                     "blue",
    //                     "BLUE"
    //                 ]
    //             ]
    //         }
    //     ],
    //     "previousStatement": null,
    //     "nextStatement": null,
    //     "colour": "#CC3366",
    //     "tooltip": "",
    //     "helpUrl": ""
    // },
    {
        "type": "for_each_particle",
        "message0": "for each %1 particle %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AGENT",
                "options": [
                    [
                        "water",
                        "WATER_PARTICLE"
                    ],
                    [
                        "ink",
                        "INK_PARTICLE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FOR_EACH"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#A61E4D",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "set_mass",
        "message0": "set mass %1",
        "args0": [
            {
                "type": "field_number",
                "name": "MASS",
                "value": 0,
                "min": 0,
                "max": 5
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "pick a value between 0 and 5",
        "helpUrl": ""
    },
    {
        "type": "set_color",
        "message0": "set color %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "COLOR",
                "options": [
                    [
                        "red",
                        "RED"
                    ],
                    [
                        "yellow",
                        "YELLOW"
                    ],
                    [
                        "green",
                        "GREEN"
                    ],
                    [
                        "blue",
                        "BLUE"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "set_size",
        "message0": "set size %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "small",
                        "SMALL"
                    ],
                    [
                        "medium",
                        "MEDIUM"
                    ],
                    [
                        "big",
                        "BIG"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "bounce",
        "message0": "bounce off walls",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "move",
        "message0": "move",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "collision",
        "message0": "collide",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "add_ink",
        "message0": "add %1 %2 %3 %4 ink particles",
        "args0": [
            {
                "type": "input_value",
                "name": "NUM",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "small",
                        "SMALL"
                    ],
                    [
                        "medium",
                        "MEDIUM"
                    ],
                    [
                        "big",
                        "BIG"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "COLORS",
                "options": [
                    [
                        "red",
                        "RED"
                    ],
                    [
                        "yellow",
                        "YELLOW"
                    ],
                    [
                        "green",
                        "GREEN"
                    ],
                    [
                        "blue",
                        "BLUE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "change_temp",
        "message0": "%1 water",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TEMP",
                "options": [
                    [
                        "heat up",
                        "HEAT_UP"
                    ],
                    [
                        "cool down",
                        "COOL_DOWN"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#CC3366",
        "tooltip": "",
        "helpUrl": ""
    }]
}