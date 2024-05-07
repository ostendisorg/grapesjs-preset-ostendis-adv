import type { Editor } from "grapesjs";
import juice from "juice";
import PluginOptions from "./pluginOptions";

export default (editor: Editor, opts: Required<PluginOptions>) => {
  const cmdm = editor.Commands;
  const pfx = editor.getConfig().stylePrefix;

  cmdm.add(opts.cmdInlineHtml, {
    run(editor, s, opts = {}) {
      const tmp = editor.getHtml() + `<style>${editor.getCss()}</style>`;
      return juice(tmp, { ...opts.juiceOpts, ...opts });
    },
  });

  cmdm.add("export-template", {
    containerEl: null as HTMLDivElement | null,
    codeEditorHtml: null as HTMLDivElement | null,

    createCodeViewer(): any {
      return editor.CodeManager.createViewer({
        codeName: "htmlmixed",
        theme: opts.codeViewerTheme,
      });
    },

    createCodeEditor() {
      const el = document.createElement("div");
      const codeEditor = this.createCodeViewer();

      el.style.flex = "1 0 auto";
      el.style.boxSizing = "border-box";
      el.className = `${pfx}export-code`;
      el.appendChild(codeEditor.getElement());

      return { codeEditor, el };
    },

    getCodeContainer(): HTMLDivElement {
      let containerEl = this.containerEl;

      if (!containerEl) {
        containerEl = document.createElement("div");
        containerEl.className = `${pfx}export-container`;
        containerEl.style.display = "flex";
        containerEl.style.gap = "5px";
        containerEl.style.flexDirection = "column";
        containerEl.style.justifyContent = "space-between";
        this.containerEl = containerEl;
      }

      return containerEl;
    },

    run(editor) {
      let { codeEditorHtml } = this as any;
      const container = this.getCodeContainer();

      // Init code viewer if not yet instantiated
      if (!codeEditorHtml) {
        const codeViewer = this.createCodeEditor();
        codeEditorHtml = codeViewer.codeEditor;
        this.codeEditorHtml = codeEditorHtml;

        if (opts.t9n.modalLabelExport) {
          let labelEl = document.createElement("div");
          labelEl.className = `${pfx}export-label`;
          labelEl.innerHTML = opts.t9n.modalLabelExport;
          container.appendChild(labelEl);
        }

        container.appendChild(codeViewer.el);
      }

      editor.Modal.open({
        title: opts.t9n.modalTitleExport,
        content: container,
      });

      if (codeEditorHtml) {
        const tmp = `${editor.getHtml()}<style>${editor.getCss()}</style>`;
        codeEditorHtml.setContent(opts.inlineCss ? juice(tmp, opts.juiceOpts) : tmp);
        codeEditorHtml.editor.refresh();
      }
    },
  });
};
