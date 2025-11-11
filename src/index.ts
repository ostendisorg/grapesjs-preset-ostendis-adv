import type {Component, Plugin} from "grapesjs";
import loadBlocks from "./blocks";
import loadCommands from "./commands";
import loadPanels from "./panels";
import loadTraits from "./traits";
import loadComponents from "./components";
import loadRte from "./rte";
import PluginOptions from "./pluginOptions";
import {ostTrans} from "./ostTranslations";
import {
    headerTrait,
    ostTypeTextTrait,
    ostTypeHideInSimpleHtmlTrait,
} from "./consts";

export type RequiredPluginOptions = Required<PluginOptions>;

type ToolbarButton = {
    attributes?: {
        class?: string;
        style?: string;
        "data-tooltip"?: string;
        "data-tooltip-pos"?: "bottom",
    };
    label?: string;
    command: string;
};

const plugin: Plugin<PluginOptions> = async (
    editor,
    opts: Partial<PluginOptions> = {}
) => {
    let config = editor.getConfig();

    const options: RequiredPluginOptions = {
        blocks: [],
        block: () => ({}),
        usedOstBlocks: [],
        cmdOpenExport: "gjs-open-export-template",
        cmdOpenImport: "gjs-open-import-template",
        cmdInlineHtml: "gjs-get-inlined-html",
        codeViewerTheme: "hopscotch",
        inlineCss: true,
        juiceOpts: {},
        updateStyleManager: true,
        showStylesOnChange: true,
        showBlocksOnLoad: false,
        showTraitsOnLoad: true,
        showOutlineOnLoad: true,
        t9n: ostTrans,
        ...opts,
    };

    // Change some config
    config.devicePreviewMode = true;

    loadComponents(editor, options);
    loadTraits(editor, options);
    await loadCommands(editor, options);
    loadBlocks(editor, options);
    loadPanels(editor, options);
    await loadRte(editor, options);

    // On load
    editor.on("load", () => {
        // Create ostendis toolbar
        const tools = document.getElementById("gjs-tools");
        const ostTools = document.createElement("div");
        ostTools.classList.add("gjs-ost-toolbar");
        tools?.append(ostTools);

        // Change all elements with header tags from type text to header
        const changeHeaderType = (component: Component): void => {
            const tagName = component.get("tagName");

            const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
            if (
                tagName &&
                headings.includes(tagName.toLowerCase()) &&
                component.get("type") === "text"
            ) {
                component.set({type: "header"});
                component.setTraits([
                    {name: "id"},
                    headerTrait(options),
                    ostTypeTextTrait(options),
                    ostTypeHideInSimpleHtmlTrait(options),
                ]);
            }
            const children = component.components();
            children.each((child) => changeHeaderType(child));
        };
        const wrapper = editor.getWrapper();
        const components = wrapper?.components();
        components?.each((component) => changeHeaderType(component));
    });

    // On selected components
    editor.on("component:selected", () => {
        let selected = editor.getSelected();

        if (selected != undefined) {
            if (selected.is("ulistitem")) {
                showOstToolbar(selected);
            } else if (selected.isChildOf("ulistitem")) {
                showOstToolbar(selected.closestType("ulistitem"));
            } else if (selected.getEl()?.tagName === "LI") {
                // If list element is empty replace with placeholder text (M&E case:)
                if (selected.components().length === 0 && !selected.get("content")) {
                    const selectedPosition = selected.index();
                    const newComponent = selected
                        .parent()
                        ?.append("<li>Text</li>", {at: selectedPosition});
                    selected.remove();
                    editor.select(newComponent);
                    selected = editor.getSelected();
                }
                showOstToolbar(selected);
            } else if (isChildOfElement(selected.getEl(), "LI")) {
                showOstToolbar(selected.closest("li"));
            } else if (selected.getEl()?.tagName === "UL") {
                // UL is selected - show toolbar with paste-from-word and standard buttons with SVG icons
                const ulToolbar: ToolbarButton[] = [
                    {
                        attributes: {
                            class: "fa-solid fa-file-word",
                            "data-tooltip": options.t9n.ostToolbarPasteFromWord,
                            "data-tooltip-pos": "bottom"
                        },
                        command: "paste-from-word",
                    },
                    {
                        label: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"></path></svg>',
                        command: "select-parent",
                    },
                    {
                        label: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z"></path></svg>',
                        command: "tlb-move",
                    },
                    {
                        label: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>',
                        command: "tlb-clone"
                    },
                    {
                        label: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>',
                        command: "tlb-delete"
                    },
                ];

                selected.set({
                    toolbar: ulToolbar,
                });

                // Hide OST toolbar for UL elements
                const ostToolbar = document.querySelector(".gjs-ost-toolbar");
                ostToolbar?.classList.remove("show");
            } else {
                // For other elements, just hide OST toolbar
                const ostToolbar = document.querySelector(".gjs-ost-toolbar");
                ostToolbar?.classList.remove("show");
            }
        }
    });

    // On deselected components
    editor.on("component:deselected", () => {
        const ostToolbar = document.querySelector(".gjs-ost-toolbar");
        ostToolbar?.classList.remove("show");
    });

    function isChildOfElement(element: HTMLElement | undefined, tag: string) {
        while (element?.parentNode) {
            element = element.parentNode as HTMLElement;
            if (element.tagName === tag) return element;
        }
        return false;
    }

    function showOstToolbar(listItem: Component | undefined) {
        const elPos = listItem?.index() || 0;
        const elLast = listItem?.parent()?.getLastChild().index();

        const ostToolbar = document.querySelector(".gjs-ost-toolbar");
        if (ostToolbar != undefined) {
            ostToolbar.innerHTML = "";

            // Add clone button
            const cBtn = document.createElement("div");
            cBtn.innerHTML =
                '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 0 0 0 18 9 9 0 0 0 0-18zm-1.3 3.88h2.6v3.82h3.82v2.6H13.3v3.82h-2.6V13.3H6.88v-2.6h3.82z"/></svg>';
            cBtn.classList.add("gjs-ost-toolbar-item", "clone");
            cBtn.title = options.t9n.ostToolbarClone;
            cBtn.addEventListener("click", () => {
                if (!listItem || !editor) return;
                const clonedItem = listItem?.clone();
                listItem?.parent()?.append(clonedItem, {at: elPos + 1});
            });
            ostToolbar.appendChild(cBtn);

            //Add delete button
            const dBtn = document.createElement("div");
            dBtn.innerHTML =
                '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm5.12 7.7v2.6H6.88v-2.6z"/></svg>';
            dBtn.title = options.t9n.ostToolbarDelete;
            dBtn.classList.add("gjs-ost-toolbar-item", "del");
            if (elLast != 0) {
                dBtn.addEventListener("click", () => {
                    listItem?.remove();
                    ostToolbar?.classList.remove("show");
                });
            } else {
                dBtn.classList.add("disable");
            }
            ostToolbar.appendChild(dBtn);

            // Add move up button
            const upBtn = document.createElement("div");
            upBtn.innerHTML =
                '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M1.9 20.75 12 3.25l10.1 17.5Z"/></svg>';
            upBtn.title = options.t9n.ostToolbarUp;
            upBtn.classList.add("gjs-ost-toolbar-item", "up");
            if (elPos > 0) {
                upBtn.addEventListener("click", () => {
                    if (elPos && listItem?.parent() != undefined) {
                        let parent = listItem.parent();
                        if (parent) {
                            listItem?.move(parent, {at: elPos - 1});
                        }
                        editor.selectRemove(listItem);
                        editor.select(listItem);
                    }
                });
            } else {
                upBtn.classList.add("disable");
            }
            ostToolbar.appendChild(upBtn);

            // Add move down button
            const dwnBtn = document.createElement("div");
            dwnBtn.innerHTML =
                '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22.4 3.25 12 20.75 1.6 3.25Z"/></svg>';
            dwnBtn.title = options.t9n.ostToolbarDown;
            dwnBtn.classList.add("gjs-ost-toolbar-item", "down");
            if (elPos != elLast) {
                let toPos = elPos + 2;
                if (elPos == elLast) {
                    toPos = 0;
                }
                dwnBtn.addEventListener("click", () => {
                    if (toPos && listItem?.parent() != undefined) {
                        let parent = listItem.parent();
                        if (parent) {
                            listItem.move(parent, {at: toPos});
                        }
                        editor.selectRemove(listItem);
                        editor.select(listItem);
                    }
                });
            } else {
                dwnBtn.classList.add("disable");
            }
            ostToolbar.appendChild(dwnBtn);

            // Add show
            ostToolbar.classList.add("show");
        }
    }
};

export default plugin;
