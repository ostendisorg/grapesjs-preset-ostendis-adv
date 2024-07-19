import type { Editor } from 'grapesjs';
import PluginOptions from "./pluginOptions";
import { cmdDeviceDesktop, cmdDeviceMobile, cmdDeviceTablet } from './consts';

export default async (editor: Editor, opts: Required<PluginOptions>) => {
    const { Commands } = editor;

    Commands.add(cmdDeviceDesktop, {
      run: (ed) => ed.setDevice('Desktop'),
      stop: () => {},
    });

    Commands.add(cmdDeviceTablet, {
      run: (ed) => ed.setDevice('Tablet'),
      stop: () => {},
    });

    Commands.add(cmdDeviceMobile, {
      run: (ed) => ed.setDevice('Mobile portrait'),
      stop: () => {},
    });

    Commands.add('ost-blocks-visibility', {
      run(editor) {
        const cList = editor.Canvas.getBody().classList;
        cList.add("show-ost-blocks");
      },
      stop(editor) {
        const cList = editor.Canvas.getBody().classList;
        cList.remove("show-ost-blocks");
      },
    });
};