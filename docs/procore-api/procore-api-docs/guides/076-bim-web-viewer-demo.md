# BIM Web Viewer Demo

Source: https://developers.procore.com/documentation/bim-web-viewer-demo

---

<!-- markdownlint-disable no-inline-html -->

<script src="https://unpkg.com/@procore/bim-webviewer-sdk@6.1.1"></script>
<script>
  const options = {
    parentElement: document.getElementById('bim-webviewer-parent-element'),
    meshUrl: '/documentation/bim_webviewer/parcel.mesh',
    meshnodeUrl: '/documentation/bim_webviewer/parcel.meshnode',
    nodeUrl: '/documentation/bim_webviewer/parcel.node',
    modelId: 1,
    modelRevisionId: 1,
    tools: [
      ProcoreBim.Webviewer.tools.CONTEXTMENU,
      ProcoreBim.Webviewer.tools.BOTTOMTOOL,
      ProcoreBim.Webviewer.tools.COACHMARKS,
      ProcoreBim.Webviewer.tools.MEASUREMENT_SD,
      ProcoreBim.Webviewer.tools.SETTINGS,
    ]
  };
  const viewer = new ProcoreBim.Webviewer(options);
  viewer.start();
</script>
