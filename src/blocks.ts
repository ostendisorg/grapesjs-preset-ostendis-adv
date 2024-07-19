import type { Editor, BlockProperties } from "grapesjs";
import PluginOptions from "./pluginOptions";

export default function (editor: Editor, opts: Required<PluginOptions>) {
  const { Blocks } = editor;

  const addBlock = (id: string, blockDef: BlockProperties) => {
    opts.blocks.indexOf(id)! >= 0 &&
      editor.Blocks.add(id, {
        select: true,
        ...blockDef,
        ...opts.block(id),
      });
  };

  Blocks.getAll().reset();

  Blocks.add("applyQrCode", {
    label: opts.t9n.applyQrCodeBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-qrcode" },
    content: {
      type: "image",
      editable: false,
      droppable: true,
      attributes: { src: "$$$ApplyQrCode$$$", alt: "Apply link QR code" },
    },
  });

  Blocks.add("viewQrCode", {
    label: opts.t9n.viewQrCodeBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-qrcode" },
    content: {
      type: "image",
      editable: false,
      droppable: true,
      attributes: { src: "$$$ViewQrCode$$$", alt: "View link QR code" },
    },
  });

  var btnStyle = `display: block; padding: 10px 30px; margin: 10px auto; text-decoration: none; border: none; color: #fff; text-align: center; background-color: #4b75cd; border-radius: 0.25rem 0.25rem 0.25em 0.25rem;`;

  Blocks.add("applyButton", {
    label: opts.t9n.buttonApplyBlkLabel,
    category: opts.t9n.categoryLabel,
    content: `<a data-gjs-type="link" href="$$$ApplyLink$$$" target="_blank" role="button" style="` + btnStyle + `">${opts.t9n.buttonApplyBlkText}</a>`,
    attributes: { class: "fa-regular fa-square-full" },
  });

  Blocks.add("button", {
    label: opts.t9n.buttonBlkLabel,
    category: opts.t9n.categoryLabel,
    content: `<a data-gjs-type="link" role="button" ` + btnStyle + `>Button</a>`,
    attributes: { class: "fa-regular fa-square-full" },
  });

  Blocks.add("divider", {
    label: opts.t9n.dividerBlkLabel,
    category: opts.t9n.categoryLabel,
    content: `<hr style="border-top: 1px solid #2b303b;" />`,
    attributes: { class: "fa-solid fa-grip-lines" },
  });

  Blocks.add("text", {
    label: opts.t9n.textBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-t" },
    content: {
      type: "text",
      content: "Text",
    },
  });

  Blocks.add("text2", {
    label: opts.t9n.textBlkLabelWithSpace,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-t" },
    content: {
      type: "text",
      content: "Text",
      style: { "margin-top": "15px", "margin-bottom": "15px" },
    },
  });

  Blocks.add("text-sect", {
    label: opts.t9n.textSectionBlkLabel,
    category: opts.t9n.categoryLabel,
    content: `<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>`,
    attributes: { class: "gjs-fonts gjs-f-h1p" },
  });

  Blocks.add("ulist", {
    label: opts.t9n.ulistBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-list-ul" },
    content: { type: "ulist" },
  });

  // Block icons
  var blockTitleAndText = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48.238" viewBox="0 0 12.7 12.763"><path fill="none" stroke="currentColor" stroke-width=".523" d="M.262 2.59h12.177v8.113H.262z"/><path fill="currentColor" stroke="currentColor" stroke-width=".106" d="M1.536 8.474h9.632v.556H1.536zm0-1.053h9.632v.556H1.535zm0-1.053h9.63v.557h-9.63zm-.004-2.106h6.954v.973H1.532z"/></svg>';
  var blockTitleAndList =
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48.238" viewBox="0 0 12.7 12.763"><path fill="none" stroke="currentColor" stroke-width=".523" d="M.262 2.59h12.177v8.113H.262z"/><path fill="currentColor" stroke="currentColor" stroke-width=".1" d="M2.058 8.752a.238.238 0 0 1-.238.238.238.238 0 0 1-.238-.238.238.238 0 0 1 .238-.238.238.238 0 0 1 .238.238zm0-1.053a.238.238 0 0 1-.238.238.238.238 0 0 1-.238-.238.238.238 0 0 1 .238-.238.238.238 0 0 1 .238.238zm0-1.053a.238.238 0 0 1-.238.238.238.238 0 0 1-.238-.238.238.238 0 0 1 .238-.238.238.238 0 0 1 .238.238zm.651 1.828h8.459v.556H2.709zm0-1.053h8.459v.556H2.709zm0-1.053h8.459v.556H2.709zM1.532 4.262h6.954v.973H1.532z"/></svg>';

  // Title and text block
  Blocks.add("titleAndText", {
    label: opts.t9n.titleAndTextBlkLabel,
    category: opts.t9n.categoryLabel,
    media: blockTitleAndText,
    content: {
      name: opts.t9n.titleAndTextBlkLabel,
      components: [
        {
          type: "text",
          content: `<h3>${opts.t9n.titleAndTextBlkContentTitle}</h3>`,
        },
        {
          type: "text",
          content: "<p>Text</p>",
        },
      ],
    },
  });

  // Title and list block
  Blocks.add("titleAndList", {
    label: opts.t9n.titleAndListBlkLabel,
    category: opts.t9n.categoryLabel,
    media: blockTitleAndList,
    content: {
      name: opts.t9n.titleAndListBlkLabel,
      components: [
        {
          type: "text",
          content: `<h3>${opts.t9n.titleAndListBlkContentTitle}</h3>`,
        },
        {
          type: "ulist",
        },
      ],
    },
  });

  Blocks.add("icon", {
    label: opts.t9n.iconBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-regular fa-face-smile" },
    content: { type: "icon" },
  });

  Blocks.add("image", {
    label: opts.t9n.imageBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-regular fa-image" },
    content: {
      type: "image",
      activeOnRender: 1,
    },
  });

  Blocks.add("video", {
    label: opts.t9n.videoBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-brands fa-youtube" },
    content: {
      type: "video",
      src: "/video.mp4",
      style: {
        width: "100%",
        height: "350px",
      },
    },
  });

  Blocks.add("map", {
    label: opts.t9n.mapBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-map-location-dot" },
    content: {
      type: "map",
      style: {
        width: "100%",
        height: "350px",
      },
    },
  });

  Blocks.add("sect55", {
    label: opts.t9n.sect55BlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "gjs-fonts gjs-f-b2" },
    content: `<div style="display:flex; flex-wrap: wrap; padding: 0.2rem 0">
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 280px; padding:20px;"></div>
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 280px; padding:20px;"></div>
     </div>`,
  });

  Blocks.add("sect37", {
    label: opts.t9n.sect37BlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "gjs-fonts gjs-f-b37" },
    content: `<div style="display:flex; flex-wrap: wrap; padding: 0.2rem 0">
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 38.2%; min-width:200px; padding:20px;"></div>
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 61.8%; padding:20px;"></div>
     </div>`,
  });

  Blocks.add("sect333", {
    label: opts.t9n.sect333BlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "gjs-fonts gjs-f-b3" },
    content: `<div style="display:flex; flex-wrap: wrap; padding: 0.2rem 0">
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 200px; padding:20px;"></div>
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 200px; padding:20px;"></div>
        <div style="flex-grow: 1; flex-shrink: 1; flex-basis: 200px; padding:20px;"></div>
     </div>`,
  });

  Blocks.add("box", {
    label: "Box",
    category: opts.t9n.categoryLabel,
    attributes: { class: "gjs-fonts gjs-f-b1" },
    content: {
      style: {
        padding: "20px",
      },
    },
  });

  Blocks.add("quote", {
    label: opts.t9n.quoteBlkLabel,
    category: opts.t9n.categoryLabel,
    content: `<blockquote class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</blockquote>`,
    attributes: { class: "fa-solid fa-quote-right" },
  });

  Blocks.add("link", {
    label: opts.t9n.linkBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-link" },
    content: {
      type: "link",
      content: "Link",
    },
  });

  Blocks.add("link-block", {
    label: opts.t9n.linkBlockBlkLabel,
    category: opts.t9n.categoryLabel,
    attributes: { class: "fa-solid fa-link" },
    content: {
      type: "link",
      editable: false,
      droppable: true,
      style: {
        display: "inline-block",
        padding: "5px",
        "min-height": "50px",
        "min-width": "50px",
      },
    },
  });

  Blocks.add("scale", {
    label: opts.t9n.inputRangeBlkLabel,
    category: opts.t9n.categoryLabel,
    content: { type: "scale" },
    attributes: { class: "fa-solid fa-bars-progress" },
  });

  // Social media sites blocks
  Blocks.add("facebook", {
    label: opts.t9n.facebookBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://facebook.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i aria-hidden="true" class="fa-brands fa-square-facebook"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-facebook" },
  });

  Blocks.add("instagram", {
    label: opts.t9n.instagramBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://instagram.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i aria-hidden="true" class="fab fa-instagram-square"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-instagram" },
  });

  Blocks.add("youtube", {
    label: opts.t9n.youtubeBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://www.youtube.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                     <i class="fa-brands fa-square-youtube"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-youtube" },
  });

  Blocks.add("linkedin", {
    label: opts.t9n.linkedinBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://linkedin.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i aria-hidden="true" class="fab fa-linkedin"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-linkedin" },
  });

  Blocks.add("xing", {
    label: opts.t9n.xingBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://xing.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i aria-hidden="true" class="fa-brands fa-square-xing"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-xing" },
  });

  Blocks.add("twitter", {
    label: opts.t9n.twitterBlkLabelSite,
    category: opts.t9n.smSitesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://twitter.com/",
        target: "_blank",
      },
      components: `<div style="display:flex; justify-content: center; align-items: center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i class="fa-brands fa-square-x-twitter"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-x-twitter" },
  });

  // Social Media Share blocks
  Blocks.add("facebookShare", {
    label: opts.t9n.facebookBlkLabelShare,
    category: opts.t9n.smSharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://www.facebook.com/sharer/sharer.php?u=$$$ViewLink$$$",
        target: "_blank",
      },
      components: `<div style="border: 2px solid #293133; border-radius: 3px; display:flex; justify-content: space-around; align-items: center; text-align:center; width:60px; height:28px; font-size:21px; color:#293133;">
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-brands fa-facebook-f"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-facebook" },
  });

  Blocks.add("linkedinShare", {
    label: opts.t9n.linkedinBlkLabelShare,
    category: opts.t9n.smSharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://www.linkedin.com/shareArticle?mini=true&url=$$$ViewLink$$$",
        target: "_blank",
      },
      components: `<div style="border: 2px solid #293133; border-radius: 3px; display:flex; justify-content: space-around; align-items: center; text-align:center; width:60px; height:28px; font-size:21px; color:#293133;">
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-linkedin" },
  });

  Blocks.add("xingShare", {
    label: opts.t9n.xingBlkLabelShare,
    category: opts.t9n.smSharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://www.xing.com/spi/shares/new?url=$$$ViewLink$$$",
        target: "_blank",
      },
      components: `<div style="border: 2px solid #293133; border-radius: 3px; display:flex; justify-content: space-around; align-items: center; text-align:center; width:60px; height:28px; font-size:21px; color:#293133;">
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-brands fa-xing"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-xing" },
  });

  Blocks.add("twitterShare", {
    label: opts.t9n.twitterBlkLabelShare,
    category: opts.t9n.smSharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://twitter.com/intent/tweet?url=$$$ViewLink$$$&text=",
        target: "_blank",
      },
      components: `<div style="border: 2px solid #293133; border-radius: 3px; display:flex; justify-content: space-around; align-items: center; text-align:center; width:60px; height:28px; font-size:21px; color:#293133;">
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-x-twitter" },
  });

  Blocks.add("whatsAppShare", {
    label: opts.t9n.whatsAppBlkLabelShare,
    category: opts.t9n.smSharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "https://wa.me/?text=$$$ViewLink$$$",
        target: "_blank",
      },
      components: `<div style="border: 2px solid #293133; border-radius: 3px; display:flex; justify-content: space-around; align-items: center; text-align:center; width:60px; height:28px; font-size:21px; color:#293133;">
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-brands fa-whatsapp"></i>
                  </div>`,
    },
    attributes: { class: "fa-brands fa-square-whatsapp" },
  });

  // conventional Shares
  Blocks.add("mail", {
    label: opts.t9n.mailBlkLabel,
    category: opts.t9n.sharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "mailto:example@mail.com?subject=Sieh%20dir%20dieses%20Inserat%20an&body=$$$ViewLink$$$",
      },
      components: `<div style="display:inline-block; text-align:center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i class="fa-solid fa-envelope"></i>
                  </div>`,
    },
    attributes: { class: "fa-solid fa-square-envelope" },
  });

  Blocks.add("sms", {
    label: opts.t9n.smsBlkLabel,
    category: opts.t9n.sharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "sms:?body=Sieh%20dir%20dieses%20Inserat%20an%20$$$ViewLink$$$",
      },
      components: `<div style="display:inline-block; text-align:center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i class="fa-solid fa-comment-sms"></i>
                  </div>`,
    },
    attributes: { class: "fa-solid fa-comment-sms" },
  });

  Blocks.add("print", {
    label: opts.t9n.printBlkLabel,
    category: opts.t9n.sharesCategoryLabel,
    content: {
      type: "link",
      style: {
        display: "inline-block",
        margin: "3px",
        "text-decoration": "none",
      },
      attributes: {
        href: "javascript:if(window.print)window.print()",
      },
      components: `<div style="display:inline-block; text-align:center; width:28px; height:28px; font-size:28px; color:#293133;">
                    <i class="fa-solid fa-print"></i>
                  </div>`,
    },
    attributes: { class: "fa-solid fa-print" },
  });
}
