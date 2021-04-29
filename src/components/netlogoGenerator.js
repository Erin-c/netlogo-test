import Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([{
    "type": "setup",
    "message0": "setup",
    "message1": "%1",
    "args1": [
        { 
            "type": "input_statement", 
            "name": "SETUP" 
        }
    ],
    "colour": '#663366'
},
{
    "type": "go",
    "message0": "go",
    "message1": "%1",
    "args1": [
        { 
            "type": "input_statement", 
            "name": "GO" 
        }
    ],
    "colour": '#663366'
},
{
    "type": "mouse_events",
    "message0": "on mouse click",
    "message1": "%1",
    "args1": [
        {
            "type": "input_statement",
            "name": "MOUSE"
        }
    ],
    "colour": '#663366'
},
// {
//     "type": "on_click",
//     "message0": "on mouse click %1",
//     "args0": [
//         {
//             "type": "input_statement",
//             "name": "MOUSE_DOWN"
//         }
//     ],
//     "inputsInline": true,
//     "previousStatement": null,
//     "nextStatement": null,
//     "colour": '#663366',
//     "tooltip": "",
//     "helpUrl": ""
// }
]);

export const netlogoGenerator = new Blockly.Generator('NETLOGO');
// netlogoGenerator.PRECEDENCE = 0;
// console.log(netlogoGenerator)
/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
netlogoGenerator.ORDER_ATOMIC = 0;           // 0 "" ...
netlogoGenerator.ORDER_NEW = 1.1;            // new
netlogoGenerator.ORDER_MEMBER = 1.2;         // . []
netlogoGenerator.ORDER_FUNCTION_CALL = 2;    // ()
netlogoGenerator.ORDER_INCREMENT = 3;        // ++
netlogoGenerator.ORDER_DECREMENT = 3;        // --
netlogoGenerator.ORDER_BITWISE_NOT = 4.1;    // ~
netlogoGenerator.ORDER_UNARY_PLUS = 4.2;     // +
netlogoGenerator.ORDER_UNARY_NEGATION = 4.3; // -
netlogoGenerator.ORDER_LOGICAL_NOT = 4.4;    // !
netlogoGenerator.ORDER_TYPEOF = 4.5;         // typeof
netlogoGenerator.ORDER_VOID = 4.6;           // void
netlogoGenerator.ORDER_DELETE = 4.7;         // delete
netlogoGenerator.ORDER_AWAIT = 4.8;          // await
netlogoGenerator.ORDER_EXPONENTIATION = 5.0; // **
netlogoGenerator.ORDER_MULTIPLICATION = 5.1; // *
netlogoGenerator.ORDER_DIVISION = 5.2;       // /
netlogoGenerator.ORDER_MODULUS = 5.3;        // %
netlogoGenerator.ORDER_SUBTRACTION = 6.1;    // -
netlogoGenerator.ORDER_ADDITION = 6.2;       // +
netlogoGenerator.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
netlogoGenerator.ORDER_RELATIONAL = 8;       // < <= > >=
netlogoGenerator.ORDER_IN = 8;               // in
netlogoGenerator.ORDER_INSTANCEOF = 8;       // instanceof
netlogoGenerator.ORDER_EQUALITY = 9;         // == != === !==
netlogoGenerator.ORDER_BITWISE_AND = 10;     // &
netlogoGenerator.ORDER_BITWISE_XOR = 11;     // ^
netlogoGenerator.ORDER_BITWISE_OR = 12;      // |
netlogoGenerator.ORDER_LOGICAL_AND = 13;     // &&
netlogoGenerator.ORDER_LOGICAL_OR = 14;      // ||
netlogoGenerator.ORDER_CONDITIONAL = 15;     // ?:
netlogoGenerator.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
netlogoGenerator.ORDER_YIELD = 17;           // yield
netlogoGenerator.ORDER_COMMA = 18;           // ,
netlogoGenerator.ORDER_NONE = 99;            // (...)
netlogoGenerator.INDENT = '  ';
netlogoGenerator.SIZE= {
    "SMALL": 1,
    "MEDIUM": 2,
    "BIG": 5
}

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
netlogoGenerator.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
    'ask,set,go,turtle,patches,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
netlogoGenerator.init = function (workspace) {
    // Create a dictionary of definitions to be printed before the code.
    netlogoGenerator.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    netlogoGenerator.functionNames_ = Object.create(null);

    if (!netlogoGenerator.variableDB_) {
        netlogoGenerator.variableDB_ =
            new Blockly.Names(netlogoGenerator.RESERVED_WORDS_);
    } else {
        netlogoGenerator.variableDB_.reset();
    }

    netlogoGenerator.variableDB_.setVariableMap(workspace.getVariableMap());

    let defvars = [];
    // Add developer variables (not created or named by the user).
    let devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
        defvars.push(netlogoGenerator.variableDB_.getName(devVarList[i],
            Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }

    // Add user variables, but only ones that are being used.
    let variables = Blockly.Variables.allUsedVarModels(workspace);
    for (let i = 0; i < variables.length; i++) {
        defvars.push(netlogoGenerator.variableDB_.getName(variables[i].getId(),
            Blockly.VARIABLE_CATEGORY_NAME));
    }

    // Declare all of the variables.
    if (defvars.length) {
        netlogoGenerator.definitions_['variables'] =
            'let ' + defvars.join(', ') + ';';
    }
    this.isInitialized = true;
};

// Text values
netlogoGenerator['text'] = function (block) {
    let textValue = block.getFieldValue('TEXT');
    let code = '"' + textValue + '"';
    return [code, netlogoGenerator.ORDER_NONE];
};

// Number values
netlogoGenerator['math_number'] = function (block) {
    const code = Number(block.getFieldValue('NUM'));
    return [code, netlogoGenerator.ORDER_NONE];
};

// Setup blocks
netlogoGenerator['setup'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'SETUP');
    const code = 'to setup\n' + netlogoGenerator.INDENT + 'clear-all' + '\n' + statement_members + 'end\n';
    return code;
};

// Go blocks
netlogoGenerator['go'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'GO');
    const code = 'to go\n' + statement_members + 'end\n';
    return code;
};

// Mouse Events blocks
netlogoGenerator['mouse_events'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'MOUSE');
    const code = 'to mouse-blocks\n' + statement_members + 'end\n';
    return code;
};

// Mouse Events blocks
netlogoGenerator['on_click'] = function (block) {
    const statement_members = netlogoGenerator.statementToCode(block, 'MOUSE_DOWN');
    const code = 'if mouse-down?\n[\n' + statement_members + ']\n';
    return code;
};

// Color picker
netlogoGenerator['colour_picker'] = function (block) {
    let code = hexToRgb(block.getFieldValue('COLOUR'));
    return [code, netlogoGenerator.ORDER_ATOMIC];
};

// Color rgb
netlogoGenerator['colour_rgb'] = function (block) {
    let red = netlogoGenerator.valueToCode(block, 'RED',
        netlogoGenerator.ORDER_NONE) || 0;
    let green = netlogoGenerator.valueToCode(block, 'GREEN',
        netlogoGenerator.ORDER_NONE) || 0;
    let blue = netlogoGenerator.valueToCode(block, 'BLUE',
        netlogoGenerator.ORDER_NONE) || 0;
    let code = red + ' ' + green + ' ' + blue;
    return [code, netlogoGenerator.ORDER_FUNCTION_CALL];
};

// If block
netlogoGenerator['controls_if'] = function (block) {
    // If/elseif/else condition.
    let n = 0;
    let code = '', branchCode, conditionCode;
    // if (Blockly.JavaScript.STATEMENT_PREFIX) {
    //     // Automatic prefix insertion is switched off for this block.  Add manually.
    //     code += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
    //         block);
    // }
    do {
        conditionCode = netlogoGenerator.valueToCode(block, 'IF' + n,
            netlogoGenerator.ORDER_NONE) || 'false';
        // console.log('condition', conditionCode)
        branchCode = netlogoGenerator.statementToCode(block, 'DO' + n);
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), netlogoGenerator.INDENT) + branchCode;
        }
        // console.log('branch in do loop', branchCode);
        code += (n > 0 ? ' else ' : '') +
            'if (' + conditionCode + ') [\n' + branchCode + ']';
        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE') || Blockly.JavaScript.STATEMENT_SUFFIX) {
        branchCode = netlogoGenerator.statementToCode(block, 'ELSE');
        if (Blockly.JavaScript.STATEMENT_SUFFIX) {
            branchCode = Blockly.JavaScript.prefixLines(
                Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
                    block), netlogoGenerator.INDENT) + branchCode;
        }
        // console.log('branch in if block', branchCode);
        code += ' else [\n' + branchCode + ']';
    }
    return code;
};

// If else block
netlogoGenerator['controls_ifelse'] = netlogoGenerator['controls_if'];

// Print statement
netlogoGenerator['text_print'] = function (block) {
    let code = 'show ' + (netlogoGenerator.valueToCode(block, 'TEXT', netlogoGenerator.ORDER_NONE) || '\'\'') + '\n';
    return code;
};

// Comparison operator
netlogoGenerator['logic_compare'] = function (block) {
    let OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    let operator = OPERATORS[block.getFieldValue('OP')];
    let order = (operator == '==' || operator == '!=') ?
        netlogoGenerator.ORDER_EQUALITY : netlogoGenerator.ORDER_RELATIONAL;
    let argument0 = netlogoGenerator.valueToCode(block, 'A', order) || '0';
    let argument1 = netlogoGenerator.valueToCode(block, 'B', order) || '0';
    let code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

// Operations 'and', 'or'
netlogoGenerator['logic_operation'] = function (block) {
    let operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    let order = (operator == '&&') ? netlogoGenerator.ORDER_LOGICAL_AND :
        netlogoGenerator.ORDER_LOGICAL_OR;
    let argument0 = netlogoGenerator.valueToCode(block, 'A', order);
    let argument1 = netlogoGenerator.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        let defaultArgument = (operator == '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    let code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

// Negation operator
netlogoGenerator['logic_negate'] = function (block) {
  
    let order = netlogoGenerator.ORDER_LOGICAL_NOT;
    let argument0 = netlogoGenerator.valueToCode(block, 'BOOL', order) ||
        'true';
    let code = '!' + argument0;
    return [code, order];
};

 // Boolean values true and false
netlogoGenerator['logic_boolean'] = function (block) {
    let code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, netlogoGenerator.ORDER_ATOMIC];
};

// Random integer between [X] and [Y].
netlogoGenerator['math_random_int'] = function (block) {
    let argument0 = netlogoGenerator.valueToCode(block, 'FROM',
        netlogoGenerator.ORDER_COMMA) || '0';
    let argument1 = netlogoGenerator.valueToCode(block, 'TO',
        netlogoGenerator.ORDER_COMMA) || '0';
    let functionName = netlogoGenerator.provideFunction_(
        'mathRandomInt',
        ['function ' + netlogoGenerator.FUNCTION_NAME_PLACEHOLDER_ +
            '(a, b) {',
            '  if (a > b) {',
            '    // Swap a and b to ensure a is smaller.',
            '    let c = a;',
            '    a = b;',
            '    b = c;',
            '  }',
            '  return Math.floor(Math.random() * (b - a + 1) + a);',
            '}']);
    let code = functionName + '(' + argument0 + ', ' + argument1 + ')';
    return [code, netlogoGenerator.ORDER_FUNCTION_CALL];
};

// Gets all code not just one set
netlogoGenerator.scrub_ = function (block, code, opt_thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode =
            // opt_thisOnly ? '' : ',\n' + netlogoGenerator.blockToCode(nextBlock);
            opt_thisOnly ? '' : netlogoGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};


// Content specific block logic
// Create Particles
netlogoGenerator['create_particles'] = function (block) {
    let particleNum = netlogoGenerator.valueToCode(block, 'NUM', netlogoGenerator.ORDER_NONE) || 0;
    let particleName = block.getField('AGENT').selectedOption_[0] || 'water';
    let code = 'create-particles ' + particleNum + '\n[\n' + 
    netlogoGenerator.INDENT + 'set particle-type "' + particleName + '" \n' + 
    netlogoGenerator.INDENT + 'set speed initial-temperature\n' +
    netlogoGenerator.INDENT + 'set energy(.5 * mass * speed * speed)\n' +
    netlogoGenerator.INDENT + 'set first-time 1\n' +
    netlogoGenerator.INDENT + 'set last-collision nobody\n' + 
    netlogoGenerator.INDENT + 'setxy (-85 + random - float(170)) - 85 + random - float(170)\n' +
    netlogoGenerator.INDENT + 'set heading random - float 360\n]\n'
    return code;
};

netlogoGenerator['create_particles_test'] = function (block) {
    let particleNum = netlogoGenerator.valueToCode(block, 'NUM', netlogoGenerator.ORDER_NONE) || 0;
    let particleName = block.getField('AGENT').selectedOption_[0] || 'water';
    let code = 'create-particles ' + particleNum + '\n[\n' +
        netlogoGenerator.INDENT + 'set particle-type "' + particleName + '" \n' +
        netlogoGenerator.INDENT + 'set speed initial-temperature\n' +
        netlogoGenerator.INDENT + 'set energy(.5 * mass * speed * speed)\n' +
        netlogoGenerator.INDENT + 'set first-time 1\n' +
        netlogoGenerator.INDENT + 'set last-collision nobody\n' +
        netlogoGenerator.INDENT + 'setxy (-85 + random - float(170)) - 85 + random - float(170)\n' +
        netlogoGenerator.INDENT + 'set heading random - float 360\n]\n'
    return code;
};

// Ask Particles
netlogoGenerator['for_each_particle'] = function (block) {
    let particleName = block.getField('AGENT').selectedOption_[0] || 'water';
    const statement_members = netlogoGenerator.statementToCode(block, 'FOR_EACH');
    let code = 'ask ' + particleName + '\n' + '[\n' + statement_members + ']\n';
    return code;
};

// Set Particle Mass
netlogoGenerator['set_mass'] = function (block) {
    let mass = block.getField('MASS').value_;
    let code = 'set mass ' + mass + '\n';
    return code;
};

// Set Particle Color
netlogoGenerator['set_color'] = function (block) {
    let color = block.getField('COLOR').selectedOption_[0]
    let code = 'set color (' + color + ')\n';
    return code;
};

// Set Particle Size
netlogoGenerator['set_size'] = function (block) {
    let size = netlogoGenerator.SIZE[block.getField('SIZE').value_];
    let code = 'set size (' + size + ')\n';
    return code;
};

// Set Particle Behavior
netlogoGenerator['bounce'] = function (block) {
    let code = block.type + '\n';
    return code;
};

netlogoGenerator['move'] = function (block) {
    let code = block.type + '\n';
    return code;
};

netlogoGenerator['collision'] = function (block) {
    let code = 'check-for-' + block.type + '\n';
    return code;
};

// Set Mouse Click Behaviors
netlogoGenerator['add_ink'] = function (block) {
    let particleNum = netlogoGenerator.valueToCode(block, 'NUM', netlogoGenerator.ORDER_NONE) || 0;
    let particleColor = block.getField('COLORS').selectedOption_[0];
    let particleSize = netlogoGenerator.SIZE[block.getField('SIZE').value_];
    let code = 'ask patch round mouse-xcor round mouse-ycor \n[\n' + 
    netlogoGenerator.INDENT + 'sprout-particles ' + particleNum + 
    '\n' + netlogoGenerator.INDENT + '[\n'+
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set heading -180\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'setxy round mouse-xcor + random 20 round mouse-ycor + random 10\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set speed initial-temperature\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set mass 1\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set energy (.5 * mass * speed * speed)\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set color ' + particleColor + '\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set size ' + particleSize + '\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set first-time 0\n' +
        netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set last-collision nobody\n' +
    netlogoGenerator.INDENT +']' +
    '\n]\n';
    return code;
};

// Change temperature in a given radius
netlogoGenerator['change_temp'] = function (block) {
    console.log(block);
    let code = 'ask erasers\n[\n' + 
    netlogoGenerator.INDENT + 'if mouse-inside? [setxy mouse-xcor mouse-ycor]\n' + 
    netlogoGenerator.INDENT + 'if mouse-inside? [set shape "circle 3" set color ' + (block.getField('TEMP').value_ === 'HEAT_UP' ? 'red' : 'blue')+ ' set size 40]' + '\n]\n' +
    'ask patch round mouse-xcor round mouse-ycor\n' +
    '[\n' + netlogoGenerator.INDENT + 'ask particles in-radius 20\n' +
    netlogoGenerator.INDENT + '[' + '\n' +
    netlogoGenerator.INDENT + netlogoGenerator.INDENT + 'set speed ' + (block.getField('TEMP').value_ === 'HEAT_UP' ? 150 : 1) + '\n'+
    netlogoGenerator.INDENT + ']\n' +
    ']\n'
    return code;
}

// Converts hex colors to rgb colors for netlogo
function hexToRgb(hex)
{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? parseInt(result[1], 16) + ' ' + parseInt(result[2], 16) + ' ' + parseInt(result[3], 16) : null;
}