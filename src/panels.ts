import type { Editor } from "grapesjs";
import PluginOptions from "./pluginOptions";
import { cmdDeviceDesktop, cmdDeviceMobile, cmdDeviceTablet } from "./consts";

export default (editor: Editor, opts: Required<PluginOptions>) => {
  const { Panels } = editor;
  const { cmdOpenImport } = opts;
  const openExport = "export-template";
  const openStyleManager = "open-sm";
  const openTraits = "open-tm";
  const openLayers = "open-layers";
  const openBlocks = "open-blocks";
  const activateOutline = "sw-visibility";
  const iconStyle = 'style="display: block; max-width: 22px"';

  // Turn off default devices select and create new one
  editor.getConfig().showDevices = false;

  Panels.getPanels().reset([
    {
      id: "commands",
      buttons: [{}],
    },
    {
      id: "devices-c",
      buttons: [
        {
          id: cmdDeviceDesktop,
          command: cmdDeviceDesktop,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnDesktopLabel,
            "data-tooltip-pos": "bottom",
          },
          active: true,
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
        </svg>`,
        },
        {
          id: cmdDeviceTablet,
          command: cmdDeviceTablet,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnTabletLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
        </svg>`,
        },
        {
          id: cmdDeviceMobile,
          command: cmdDeviceMobile,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnMobileLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>`,
        },
      ],
    },
    {
      id: "options",
      buttons: [
        {
          id: "ost-blocks-visibility",
          command: "ost-blocks-visibility",
          context: "ost-blocks-visibility",
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnViewOstBlocks,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M2.998 3.998C2.998 4.032 10 4 10 4l.001 4.997C9.997 8.994 15 9 15 9v1.206a5.501 5.501 0 0 0-1.697 9.772c-.1.016-.2.022-.303.022l-10-.002zM15 8h-4V4Zm-3 7.5c0-6 9-6 9 0s-9 6-9 0zm6.462-1.841L16 16.139l-1.292-1.151-.63.649 1.955 1.825 3.135-3.097z"/>
            </svg>`,
        },
        {
          id: activateOutline,
          command: activateOutline,
          context: activateOutline,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnViewCompLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M4.286 21a1.286 1.286 0 1 1 0-2.571 1.286 1.286 0 1 1 0 2.571zm3.857-2.571a1.286 1.286 0 1 1 0 2.571 1.286 1.286 0 1 1 0-2.571zM8.143 3a1.286 1.286 0 1 1 0 2.571 1.286 1.286 0 1 1 0-2.571zm0 10.286a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572zm7.714 5.143a1.286 1.286 0 1 1 0 2.571 1.286 1.286 0 1 1 0-2.571zm0-12.858a1.286 1.286 0 1 1 0-2.571 1.286 1.286 0 1 1 0 2.571zm0 5.143a1.286 1.286 0 1 1 0 2.572 1.286 1.286 0 1 1 0-2.572zM12 21a1.286 1.286 0 1 1 0-2.571A1.286 1.286 0 1 1 12 21Zm0-18a1.286 1.286 0 1 1 0 2.571A1.286 1.286 0 1 1 12 3Zm0 10.286a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572zm7.714 5.143a1.286 1.286 0 1 1 0 2.571 1.286 1.286 0 1 1 0-2.571zm0-15.429a1.286 1.286 0 1 1 0 2.571 1.286 1.286 0 1 1 0-2.571zM4.286 5.571a1.286 1.286 0 1 1 0-2.571 1.286 1.286 0 1 1 0 2.571zm15.428 5.143a1.286 1.286 0 1 1 0 2.572 1.286 1.286 0 1 1 0-2.572zM4.286 13.286a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572zM12 14.57a1.286 1.286 0 1 1 0 2.572 1.286 1.286 0 1 1 0-2.572zm7.714 2.572a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572zM4.286 14.57a1.286 1.286 0 1 1 0 2.572 1.286 1.286 0 1 1 0-2.572zm15.428-5.14a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572zM4.286 6.857a1.286 1.286 0 1 1 0 2.572 1.286 1.286 0 1 1 0-2.572zM12 9.43a1.286 1.286 0 1 1 0-2.572 1.286 1.286 0 1 1 0 2.572z"/>
            </svg>`,
        },
        {
          id: openExport,
          command: openExport,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnExportLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
          </svg>`,
        },
        {
          id: cmdOpenImport,
          command: cmdOpenImport,
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnImportLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
              <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>`,
        },
        {
          id: "undo",
          command: "core:undo",
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnUndoLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
        </svg>`,
        },
        {
          id: "redo",
          command: "core:redo",
          attributes: {
            "data-tooltip": opts.t9n.cmdBtnRedoLabel,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`,
        },
      ],
    },
    {
      id: "views",
      buttons: [
        {
          id: openStyleManager,
          command: openStyleManager,
          active: true,
          attributes: {
            "data-tooltip": opts.t9n.openStyleManager,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
              <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
          </svg>`,
        },
        {
          id: openTraits,
          command: openTraits,
          attributes: {
            "data-tooltip": opts.t9n.openTraits,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>`,
        },
        {
          id: openLayers,
          command: openLayers,
          attributes: {
            "data-tooltip": opts.t9n.openLayers,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
        </svg>`,
        },
        {
          id: openBlocks,
          command: openBlocks,
          attributes: {
            "data-tooltip": opts.t9n.openBlocks,
            "data-tooltip-pos": "bottom",
          },
          label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
        </svg>`,
        },
      ],
    },
  ]);

  editor.onReady(() => {
    if (opts.showOutlineOnLoad) {
      const btn = Panels.getButton("options", activateOutline);
      btn?.set("active", true);
    }

    if (opts.showBlocksOnLoad) {
      const btn = Panels.getButton("views", openBlocks);
      btn?.set("active", true);
    }

    if (opts.showTraitsOnLoad) {
      const btn = Panels.getButton("views", openTraits);
      btn?.set("active", true);
    }
  });
};
