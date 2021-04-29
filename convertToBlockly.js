'use strict';
const fs = require('fs');
const path = require('path');
let starterBlocks = [];
let childBlocks = [];


function readNetLogo(file) 
{
    console.log('converting ' + file);
    const rawData = fs.readFileSync(file);
    let json = JSON.parse(rawData);
    let blocks = json.spaces[0].defs.blocks;
    let newJson = new Object();
    for (let block of blocks)
    {
        console.log(block);
    }

    writeBlocklyJson(newJson);
}

function writeBlocklyJson(json)
{
    fs.writeFileSync('./netlogoBlockly.json', JSON.stringify(json));
}

async function main()
{
    // check for proper usage
    let args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('usage npm ./convertToBlockly.js path/to/netlogo.ntjson');
    }
    else {
        const file = args[0]
        console.log(file)
        // check if file exists
        try 
        {
            if (fs.existsSync(file))
            {
                // split file by last period to separate file name from file extension
                let array = file.split(/\.(?=[^\.]+$)/);
                // check is file is .json or .ntjson
                if (array[1] === 'json' || array[1] === 'ntjson') 
                {
                    readNetLogo(file);
                }
            }
            else
            {
                console.log('file does not exist in specified path');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

main();