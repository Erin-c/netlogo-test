<template>
  <div>
    <div id="blocklyDiv" class="blockly" ref="blocklyDiv">
    </div>
    <xml ref="blocklyToolbox" style="display:none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
import './prompt';
import * as basicBlocks from '@/data/basicBlocks.json';
import * as blockStyling from '@/data/blockStyling.json';
import { diffusionLibrary } from '@/data/blockLibraries/diffusion.js';
import Blockly from 'blockly';
// import '@blockly/block-plus-minus';
import { createPlayground } from '@blockly/dev-tools';
import { netlogoGenerator } from './netlogoGenerator';
import '../blocklyHelpers/create_particles';

export default {
    name: 'BlocklyComponent',
    mounted()
    {
        let categories = (basicBlocks.contents).concat(diffusionLibrary.content.categories);
        
        Blockly.defineBlocksWithJsonArray(diffusionLibrary.content.blocks);

        const defaultOptions = {
            renderer: 'thrasos',
            comments: true,
            toolbox: {
                'kind': basicBlocks.kind,
                'contents': categories
            },
            theme: Blockly.Theme.defineTheme('custom', {
                'base': Blockly.Themes.Classic,
                'blockStyles': blockStyling.blockStyles,
                'categoryStyles': blockStyling.categoryStyles,
                'componentStyles': blockStyling.componentStyles,
                'fontStyle': blockStyling.fontStyle,
            }),
        };
        
        createPlayground(document.getElementById('blocklyDiv'), (blocklyDiv, options) => {
            let workspace = Blockly.inject(blocklyDiv, options);
            netlogoGenerator.init(workspace)
            return workspace;
        }, defaultOptions)
        .then((playground) => {
            this.configurePlayground(playground);
        });
    },
    methods:
    {
        configurePlayground(playground) {
            // Rendering options.
            playground.addGenerator('NetLogo', netlogoGenerator);
            var gui = playground.getGUI();
            var renderingFolder = gui.addFolder('Rendering');
            var renderingOptions = {
                'font Size': 10,
            };
            renderingFolder.add(renderingOptions, 'font Size', 0, 50)
                .onChange(function(value) {
                var ws = playground.getWorkspace();
                var fontStyle = {
                    'size': value
                };
                ws.getTheme().setFontStyle(fontStyle);
                // Refresh theme.
                ws.setTheme(ws.getTheme());
                });
        }
    }
}
</script>

<style scoped>

.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}

</style>